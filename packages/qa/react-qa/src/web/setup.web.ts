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
  encode(input: string): Uint8Array {
    if (typeof input !== 'string') {
      throw new TypeError('`input` must be a string');
    }

    const decodedURI = decodeURIComponent(encodeURIComponent(input));
    const bufferUint8Array  = new Uint8Array(decodedURI.length);
    // Type string can only be iterated through when using the --downlevelIteration flag
    // eslint-disable-next-line
    const chars = decodedURI.split('');
    for (let index = 0; index < chars.length; index++) {
      bufferUint8Array[index] = get(decodedURI, [index], '').codePointAt(0);
    }
    return bufferUint8Array;
  }
}

if (globalThis.window !== undefined) {
  Object.defineProperty(globalThis, 'scrollTo', {
    value: () => {},
    writable: true,
  });
}

Object.defineProperty(globalThis, 'TextEncoder', {
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
