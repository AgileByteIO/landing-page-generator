import type { ShaderConfig } from './index';

const fragmentShader = `
  precision mediump float;
  
  uniform float u_time;
  uniform vec2 u_resolution;
  uniform vec3 u_color1;
  uniform vec3 u_color2;
  uniform vec3 u_color3;
  uniform vec3 u_color4;
  uniform float u_intensity;
  
  void main() {
    vec2 uv = gl_FragCoord.xy / u_resolution;
    vec3 color = u_color4;
    
    float wave1 = sin(uv.y * 10.0 + u_time * 2.0) * 0.5 + 0.5;
    float wave2 = sin(uv.y * 15.0 + u_time * 1.5 + 1.0) * 0.5 + 0.5;
    float wave3 = sin(uv.y * 8.0 + u_time * 1.0 + 2.0) * 0.5 + 0.5;
    
    float line1 = smoothstep(0.48, 0.5, wave1) * smoothstep(0.52, 0.5, wave1);
    float line2 = smoothstep(0.48, 0.5, wave2) * smoothstep(0.52, 0.5, wave2);
    float line3 = smoothstep(0.48, 0.5, wave3) * smoothstep(0.52, 0.5, wave3);
    
    float lines = (line1 + line2 + line3) * u_intensity;
    
    float gradient = uv.y;
    vec3 waveColor = mix(u_color1, u_color3, gradient);
    
    color = mix(u_color4, waveColor, lines * 0.8);
    
    float edge = smoothstep(0.0, 0.05, uv.x) * smoothstep(1.0, 0.95, uv.x);
    edge *= smoothstep(0.0, 0.05, uv.y) * smoothstep(1.0, 0.95, uv.y);
    color = mix(u_color4, color, edge);
    
    gl_FragColor = vec4(color, 1.0);
  }
`;

export const wavePattern: ShaderConfig = {
  fragmentShader,
  speed: 1.0,
  intensity: 0.6
};

export default wavePattern;