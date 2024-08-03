import sharp from 'sharp';

export async function compress(buffer) {
  if (!buffer || buffer.length === 0) {
    throw new Error('Invalid input: Buffer is empty');
  }
  
  return sharp(buffer)
    .resize(800)
    .jpeg({ quality: 40 })
    .toBuffer();
}