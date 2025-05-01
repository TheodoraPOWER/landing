import '@testing-library/jest-dom/extend-expect'; 
import { expect } from 'vitest';
import * as matchers from 'jest-axe/matchers';

expect.extend(matchers); 