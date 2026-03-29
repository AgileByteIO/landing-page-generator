import gradientFlow from './gradientFlow';
import particleField from './particleField';
import wavePattern from './wavePattern';
import noise from './noise';
import gridPulse from './gridPulse';

export interface ShaderConfig {
  fragmentShader: string;
  speed?: number;
  intensity?: number;
}

export type ShaderType = 'gradientFlow' | 'particleField' | 'wavePattern' | 'noise' | 'gridPulse';

export const shaders: Record<ShaderType, ShaderConfig> = {
  gradientFlow,
  particleField,
  wavePattern,
  noise,
  gridPulse
};

const envShaderType = (() => {
  const env = typeof import.meta !== 'undefined' ? (import.meta as any).env : {};
  return (env.PUBLIC_HERO_SHADER as ShaderType) || 'gradientFlow';
})();

const envSpeed = (() => {
  const env = typeof import.meta !== 'undefined' ? (import.meta as any).env : {};
  return parseFloat(env.PUBLIC_SHADER_SPEED || '1.0');
})();

const envIntensity = (() => {
  const env = typeof import.meta !== 'undefined' ? (import.meta as any).env : {};
  return parseFloat(env.PUBLIC_SHADER_INTENSITY || '0.5');
})();

export function getShaderConfig(type?: string): ShaderConfig {
  const shaderType = (type as ShaderType) || envShaderType;
  
  const config = shaders[shaderType] || shaders.gradientFlow;
  
  return {
    ...config,
    speed: config.speed !== undefined ? config.speed * envSpeed : envSpeed,
    intensity: config.intensity !== undefined ? config.intensity * envIntensity : envIntensity
  };
}

export function getShaderTypeFromEnv(): ShaderType {
  return envShaderType;
}

export interface ComponentStyleConfig {
  borderWidth: string;
  borderRadius: string;
  boxShadow: string;
}

const envBorderWidth = (() => {
  const env = typeof import.meta !== 'undefined' ? (import.meta as any).env : {};
  return env.BORDER_WIDTH || '2px';
})();

const envBorderRadius = (() => {
  const env = typeof import.meta !== 'undefined' ? (import.meta as any).env : {};
  return env.BORDER_RADIUS || '8px';
})();

const envBoxShadow = (() => {
  const env = typeof import.meta !== 'undefined' ? (import.meta as any).env : {};
  return env.BOX_SHADOW || '0 1px 3px rgba(0,0,0,0.1)';
})();

export function getComponentStyleConfig(): ComponentStyleConfig {
  return {
    borderWidth: envBorderWidth,
    borderRadius: envBorderRadius,
    boxShadow: envBoxShadow
  };
}

export { useShader, isWebGLAvailable } from './useShader';