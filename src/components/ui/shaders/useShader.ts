import { useEffect, useRef, useCallback } from 'react';
import type { ShaderConfig } from './index';

export type { ShaderConfig };

const vertexShaderSource = `
  attribute vec2 a_position;
  void main() {
    gl_Position = vec4(a_position, 0.0, 1.0);
  }
`;

function hexToRgbNormalized(hex: string): [number, number, number] {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (result) {
    return [
      parseInt(result[1], 16) / 255,
      parseInt(result[2], 16) / 255,
      parseInt(result[3], 16) / 255
    ];
  }
  return [0, 0, 0];
}

function getCssColor(variable: string, fallback: string): [number, number, number] {
  if (typeof window === 'undefined') {
    return hexToRgbNormalized(fallback);
  }
  const style = getComputedStyle(document.documentElement);
  const value = style.getPropertyValue(variable).trim() || fallback;
  return hexToRgbNormalized(value);
}

export function useShader(
  canvasRef: React.RefObject<HTMLCanvasElement>,
  shaderConfig: ShaderConfig | null,
  fallback: () => void
) {
  const animationRef = useRef<number>();
  const glRef = useRef<WebGLRenderingContext | null>(null);
  const programRef = useRef<WebGLProgram | null>(null);

  const initShader = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas || !shaderConfig) return;

    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl') as WebGLRenderingContext;
    if (!gl) {
      fallback();
      return;
    }

    glRef.current = gl;

    const vertexShader = gl.createShader(gl.VERTEX_SHADER);
    if (!vertexShader) return;
    gl.shaderSource(vertexShader, vertexShaderSource);
    gl.compileShader(vertexShader);

    const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
    if (!fragmentShader) return;
    gl.shaderSource(fragmentShader, shaderConfig.fragmentShader);
    gl.compileShader(fragmentShader);

    const program = gl.createProgram();
    if (!program) return;
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error('Program link error:', gl.getProgramInfoLog(program));
      fallback();
      return;
    }

    programRef.current = program;

    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
      -1, -1, 1, -1, -1, 1,
      -1, 1, 1, -1, 1, 1
    ]), gl.STATIC_DRAW);

    const positionLocation = gl.getAttribLocation(program, 'a_position');
    gl.enableVertexAttribArray(positionLocation);
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

    gl.useProgram(program);
  }, [canvasRef, shaderConfig, fallback]);

  const render = useCallback(() => {
    const gl = glRef.current;
    const program = programRef.current;
    const canvas = canvasRef.current;

    if (!gl || !program || !canvas) return;

    const timeLocation = gl.getUniformLocation(program, 'u_time');
    const resolutionLocation = gl.getUniformLocation(program, 'u_resolution');
    const color1Location = gl.getUniformLocation(program, 'u_color1');
    const color2Location = gl.getUniformLocation(program, 'u_color2');
    const color3Location = gl.getUniformLocation(program, 'u_color3');
    const color4Location = gl.getUniformLocation(program, 'u_color4');
    const intensityLocation = gl.getUniformLocation(program, 'u_intensity');

    const primaryColor = getCssColor('--primary', '#2563eb');
    const secondaryColor = getCssColor('--secondary', '#1e293b');
    const accentColor = getCssColor('--accent', '#f59e0b');
    const backgroundColor = getCssColor('--background', '#f8fafc');

    const speed = shaderConfig?.speed || 1.0;
    const intensity = shaderConfig?.intensity || 0.5;

    const time = performance.now() * 0.001 * speed;

    gl.uniform1f(timeLocation, time);
    gl.uniform2f(resolutionLocation, canvas.width, canvas.height);
    gl.uniform3fv(color1Location, primaryColor);
    gl.uniform3fv(color2Location, secondaryColor);
    gl.uniform3fv(color3Location, accentColor);
    gl.uniform3fv(color4Location, backgroundColor);
    gl.uniform1f(intensityLocation, intensity);

    gl.drawArrays(gl.TRIANGLES, 0, 6);

    animationRef.current = requestAnimationFrame(render);
  }, [canvasRef, shaderConfig]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * window.devicePixelRatio;
      canvas.height = rect.height * window.devicePixelRatio;
      if (glRef.current) {
        glRef.current.viewport(0, 0, canvas.width, canvas.height);
      }
    };

    resize();
    window.addEventListener('resize', resize);

    initShader();

    if (glRef.current && programRef.current) {
      render();
    }

    return () => {
      window.removeEventListener('resize', resize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      if (glRef.current && programRef.current) {
        glRef.current.deleteProgram(programRef.current);
      }
    };
  }, [canvasRef, shaderConfig, initShader, render]);
}

export function isWebGLAvailable(): boolean {
  if (typeof window === 'undefined') return false;
  try {
    const canvas = document.createElement('canvas');
    return !!(canvas.getContext('webgl') || canvas.getContext('experimental-webgl'));
  } catch {
    return false;
  }
}