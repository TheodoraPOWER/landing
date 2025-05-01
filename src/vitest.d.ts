/// <reference types="vitest/globals" />
import '@testing-library/jest-dom/matchers'; // Import existing matchers
import { TestingLibraryMatchers } from '@testing-library/jest-dom/matchers';
import { Matchers } from 'jest-axe';

declare module 'vitest' {
  // Extend Vitest's Assertion interface with jest-axe and jest-dom matchers
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  interface Assertion<T = any> extends Matchers<T>, TestingLibraryMatchers<typeof expect.stringContaining, T> {}
  // Extend Vitest's AsymmetricMatchers interface if needed (usually not required for basic use)
  // interface AsymmetricMatchersContaining extends jest.Expect {} 
} 