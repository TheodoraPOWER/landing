import '@testing-library/jest-dom/matchers';
import * as jestDomMatchers from '@testing-library/jest-dom/matchers'; // Import all jest-dom matchers
import { expect, vi } from 'vitest'; // Import vi as well
import { toHaveNoViolations } from 'jest-axe';

// Mock IntersectionObserver Class
class MockIntersectionObserver implements IntersectionObserver {
  readonly root: Element | Document | null = null;
  readonly rootMargin: string = '';
  readonly thresholds: ReadonlyArray<number> = [];
  observe: (target: Element) => void = vi.fn();
  unobserve: (target: Element) => void = vi.fn();
  disconnect: () => void = vi.fn();
  takeRecords: () => IntersectionObserverEntry[] = vi.fn(() => []);
}

vi.stubGlobal('IntersectionObserver', MockIntersectionObserver);

// Mock import.meta.env GLOBALLY
vi.stubGlobal('import.meta.env', {
  VITE_APPS_SCRIPT_URL: 'MOCK_GLOBAL_APPS_SCRIPT_URL'
});

// Extend Vitest's expect interface
expect.extend(toHaveNoViolations);
expect.extend(jestDomMatchers); // Extend with jest-dom matchers

// No need to extend jest-dom manually if the import above works as intended by @testing-library/jest-dom

// Since extend-expect likely modifies expect globally, we might not need to call expect.extend manually.
// If tests fail saying matchers are missing, uncomment the lines below and adjust the import if needed.
// import * as matchers from 'jest-axe'; // Or potentially from the index?
// expect.extend(matchers); 