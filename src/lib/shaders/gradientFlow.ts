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
    
    float diagonal = (uv.x + uv.y) * 0.5;
    float moving = mod(diagonal + u_time * 0.3, 1.0);
    
    float wave1 = sin(uv.x * 3.0 + u_time * 0.5) * 0.5 + 0.5;
    float wave2 = sin(uv.y * 2.0 + u_time * 0.3) * 0.5 + 0.5;
    
    float blend = mix(moving, wave1 * wave2, u_intensity * 0.5);
    
    vec3 color = mix(u_color1, u_color2, blend);
    
    float edge = smoothstep(0.0, 0.1, uv.x) * smoothstep(1.0, 0.9, uv.x);
    edge *= smoothstep(0.0, 0.1, uv.y) * smoothstep(1.0, 0.9, uv.y);
    color = mix(u_color4, color, edge);
    
    gl_FragColor = vec4(color, 1.0);
  }
`;

export const gradientFlow: ShaderConfig = {
  fragmentShader,
  speed: 1.0,
  intensity: 0.5
};

export default gradientFlow;