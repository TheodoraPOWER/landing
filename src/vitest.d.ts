/// <reference types="vitest/globals" />
import '@testing-library/jest-dom/matchers'; // Import existing matchers
import { TestingLibraryMatchers } from '@testing-library/jest-dom/matchers';
// Reference the main jest-axe types instead of a specific Matchers type
import type {} from 'jest-axe'; 

// Extend Vitest's Assertion interface with jest-axe matchers

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import type { Assertion, AsymmetricMatchersContaining } from 'vitest'
import type { AxeMatchers } from './jest-axe.d.ts'

declare module 'vitest' {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  interface Assertion<T = any> extends AxeMatchers {}
  // Removed eslint-disable comment
  interface AsymmetricMatchersContaining extends AxeMatchers {}
} 