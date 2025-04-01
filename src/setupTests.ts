import "@testing-library/jest-dom";
import { TextEncoder, TextDecoder } from 'util';

declare global {
  // eslint-disable-next-line no-var
  var TextEncoder: typeof TextEncoder;
  // eslint-disable-next-line no-var
  var TextDecoder: typeof TextDecoder;
}

global.TextEncoder = TextEncoder as unknown as typeof globalThis.TextEncoder;
global.TextDecoder = TextDecoder as unknown as typeof globalThis.TextDecoder;

// Mock matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});