import fs from 'node:fs';
import path from 'node:path';

import { optimizeAndResizeImage } from './optimizeAndResizeImage';
import type { BatchProcessOptions } from './types';

export async function batchProcessImages(
  options: BatchProcessOptions,
): Promise<string[]> {
  const {
    inputDir,
    outputDir,
    width,
    height,
    quality = 80,
    formats = ['.jpg', '.jpeg', '.png'],
  } = options;

  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const files = fs.readdirSync(inputDir);

  const processed: string[] = [];

  for (const file of files) {
    const extension = path.extname(file).toLowerCase();
    const base = path.basename(file, extension);

    if (!formats.includes(extension)) continue;

    const input = path.join(inputDir, file);
    const output = path.join(outputDir, `${base}-${width}x${height}.webp`);

    await optimizeAndResizeImage(input, output, width, height, quality);
    processed.push(output);
  }

  return processed;
}
