/// <reference types="vitest/globals" />
import '@testing-library/jest-dom/matchers'; // Import existing matchers
import { TestingLibraryMatchers } from '@testing-library/jest-dom/matchers';
// Reference the main jest-axe types instead of a specific Matchers type
import type {} from 'jest-axe'; 

declare module 'vitest' {
  // Extend Vitest's Assertion interface 
  // Use interface merging with jest-axe's JestMatchers interface
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface Assertion<T = any> extends jest.AxeMatchers, TestingLibraryMatchers<typeof expect.stringContaining, T> {}
  // Extend Vitest's AsymmetricMatchers interface if needed (usually not required for basic use)
  // interface AsymmetricMatchersContaining extends jest.Expect {} 
} 