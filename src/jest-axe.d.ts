// src/jest-axe.d.ts
declare module 'jest-axe' {
  import { Result } from 'axe-core';

  interface JestAxeMatchers<R = void> {
    toHaveNoViolations(): R;
  }

  export interface AxeMatchers extends JestAxeMatchers<any> {}

  export const axe: (html: string | Element) => Promise<Result[]>;
  export const configureAxe: (options?: any) => any;
  export const toHaveNoViolations: { 
    toHaveNoViolations: () => { pass: boolean; message: () => string }
  };
} 