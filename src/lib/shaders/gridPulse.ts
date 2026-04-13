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
    
    vec2 grid = fract(uv * 8.0);
    vec2 gridId = floor(uv * 8.0);
    
    float lineX = smoothstep(0.02, 0.0, grid.x) + smoothstep(0.98, 1.0, grid.x);
    float lineY = smoothstep(0.02, 0.0, grid.y) + smoothstep(0.98, 1.0, grid.y);
    float lines = lineX + lineY;
    
    float pulse = sin(u_time * 2.0 + gridId.x * 0.5 + gridId.y * 0.3) * 0.5 + 0.5;
    
    float fade = 0.3 + 0.7 * pulse * u_intensity;
    
    float randomBrightness = fract(sin(dot(gridId, vec2(12.9898, 78.233))) * 43758.5453);
    float cellBrightness = randomBrightness * pulse * 0.3;
    
    vec3 color = u_color4;
    
    color = mix(color, u_color3, lines * fade);
    color = mix(color, u_color2, cellBrightness);
    
    float edge = smoothstep(0.0, 0.05, uv.x) * smoothstep(1.0, 0.95, uv.x);
    edge *= smoothstep(0.0, 0.05, uv.y) * smoothstep(1.0, 0.95, uv.y);
    color = mix(u_color4, color, edge);
    
    gl_FragColor = vec4(color, 1.0);
  }
`;

export const gridPulse: ShaderConfig = {
  fragmentShader,
  speed: 1.0,
  intensity: 0.5
};

export default gridPulse;