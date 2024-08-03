import sharp from 'sharp';

export async function compress(buffer) {
  return sharp(buffer)
    .resize(800) // Зміна розміру, наприклад, до 800px в ширину
    .jpeg({ quality: 70 }) // Збереження у формат JPEG з якістю 70%
    .toBuffer();
}