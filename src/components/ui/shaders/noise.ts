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
  
  float noise(vec2 st) {
    vec2 i = floor(st);
    vec2 f = fract(st);
    
    float a = random(i);
    float b = random(i + vec2(1.0, 0.0));
    float c = random(i + vec2(0.0, 1.0));
    float d = random(i + vec2(1.0, 1.0));
    
    vec2 u = f * f * (3.0 - 2.0 * f);
    
    return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
  }
  
  float fbm(vec2 st) {
    float value = 0.0;
    float amplitude = 0.5;
    
    for (int i = 0; i < 5; i++) {
      value += amplitude * noise(st);
      st *= 2.0;
      amplitude *= 0.5;
    }
    return value;
  }
  
  void main() {
    vec2 uv = gl_FragCoord.xy / u_resolution;
    
    vec2 q = vec2(
      fbm(uv + vec2(0.0, 0.0)),
      fbm(uv + vec2(5.2, 1.3))
    );
    
    vec2 r = vec2(
      fbm(uv + 4.0 * q + vec2(1.7, 9.2)),
      fbm(uv + 4.0 * q + vec2(8.3, 2.8))
    );
    
    float f = fbm(uv + 4.0 * r);
    
    vec3 color = mix(u_color2, u_color1, clamp(f * f * 4.0, 0.0, 1.0));
    color = mix(color, u_color3, clamp(length(q), 0.0, 1.0) * u_intensity);
    color = mix(color, u_color4, clamp(length(r.x), 0.0, 1.0) * 0.5);
    
    float edge = smoothstep(0.0, 0.1, uv.x) * smoothstep(1.0, 0.9, uv.x);
    edge *= smoothstep(0.0, 0.1, uv.y) * smoothstep(1.0, 0.9, uv.y);
    color = mix(u_color4, color, edge);
    
    gl_FragColor = vec4(color, 1.0);
  }
`;

export const noise: ShaderConfig = {
  fragmentShader,
  speed: 0.5,
  intensity: 0.5
};

export default noise;