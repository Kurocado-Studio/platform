import '@testing-library/jest-dom';
import '@testing-library/jest-dom/vitest';
import 'fast-text-encoding';
import { get } from 'lodash-es';
import { expect, vi } from 'vitest';
// the extension is needed as Vitest (through Node) does not automatically resolve on other ESModules
import 'vitest-axe/extend-expect.js';
import * as matchers from 'vitest-axe/matchers.js';

// @see https://github.com/vitest-dev/vitest/issues/4043#issuecomment-2383567554
class ESBuildAndJSDOMCompatibleTextEncoder extends TextEncoder {
  constructor() {
    super();
  }

  encode(input: string): Uint8Array {
    if (typeof input !== 'string') {
      throw new TypeError('`input` must be a string');
    }

    const decodedURI = decodeURIComponent(encodeURIComponent(input));
    const arr = new Uint8Array(decodedURI.length);
    const chars = decodedURI.split('');
    for (let i = 0; i < chars.length; i++) {
      arr[i] = get(decodedURI, [i], '').charCodeAt(0);
    }
    return arr;
  }
}

if (typeof window !== 'undefined') {
  Object.defineProperty(window, 'scrollTo', {
    value: () => {},
    writable: true,
  });
}

Object.defineProperty(global, 'TextEncoder', {
  value: ESBuildAndJSDOMCompatibleTextEncoder,
  writable: true,
});

expect.extend(matchers);

// @ts-expect-error since we are mocking HTMLCanvasElement.getContext
HTMLCanvasElement.prototype.getContext = () => {
  return {
    beginPath: vi.fn(),
    clearRect: vi.fn(),
    closePath: vi.fn(),
    createImageData: vi.fn(),
    drawImage: vi.fn(),
    fillRect: vi.fn(),
    fillText: vi.fn(),
    getImageData: vi.fn(() => ({
      data: new Uint8ClampedArray([255, 0, 0, 255]),
    })),
    lineTo: vi.fn(),
    moveTo: vi.fn(),
    putImageData: vi.fn(),
    restore: vi.fn(),
    save: vi.fn(),
    scale: vi.fn(),
    setTransform: vi.fn(),
    stroke: vi.fn(),
    translate: vi.fn(),
  };
};
