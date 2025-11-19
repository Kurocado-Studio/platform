import sharp from 'sharp';

export async function optimizeAndResizeImage(
  inputFile: string,
  outputFile: string,
  width: number,
  height: number,
  quality = 80,
): Promise<void> {
  await sharp(inputFile)
    .resize(width, height)
    .webp({ quality })
    .toFile(outputFile);
}
