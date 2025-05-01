// src/jest-axe.d.ts
declare module 'jest-axe' {
  import { Result } from 'axe-core';

  interface JestAxeMatchers<R = void> {
    toHaveNoViolations(): R;
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-interface, @typescript-eslint/no-explicit-any
  export interface AxeMatchers extends JestAxeMatchers<any> {}

  export const axe: (html: string | Element) => Promise<Result[]>;
  export const configureAxe: (options?: any) => any;
  export const toHaveNoViolations: { 
    toHaveNoViolations: () => { pass: boolean; message: () => string }
  };
} 