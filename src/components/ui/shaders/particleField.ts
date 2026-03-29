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
  
  float random(vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
  }
  
  void main() {
    vec2 uv = gl_FragCoord.xy / u_resolution;
    vec3 color = u_color4;
    
    float numParticles = 50.0;
    float pointSize = 3.0;
    
    for (float i = 0.0; i < 50.0; i++) {
      float t = u_time * 0.2;
      vec2 seed = vec2(i * 0.1, i * 0.07);
      
      float x = fract(random(seed) + t * 0.1 + i * 0.02);
      float y = fract(random(seed + 1.0) + t * 0.15 + i * 0.03);
      
      vec2 pos = vec2(x, y);
      float dist = length(uv - pos);
      
      float brightness = smoothstep(pointSize / u_resolution.x, 0.0, dist);
      brightness *= 0.5 + 0.5 * sin(t * 3.0 + i);
      
      vec3 particleColor = mix(u_color3, u_color2, random(seed + 2.0));
      color = mix(color, particleColor, brightness * u_intensity);
    }
    
    float edge = smoothstep(0.0, 0.05, uv.x) * smoothstep(1.0, 0.95, uv.x);
    edge *= smoothstep(0.0, 0.05, uv.y) * smoothstep(1.0, 0.95, uv.y);
    color = mix(u_color4, color, edge);
    
    gl_FragColor = vec4(color, 1.0);
  }
`;

export const particleField: ShaderConfig = {
  fragmentShader,
  speed: 1.0,
  intensity: 0.7
};

export default particleField;