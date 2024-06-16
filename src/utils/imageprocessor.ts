import sharp from "sharp";
import crypto from "crypto";
import path from "path";

/**
 * Interface for the parameters required to process an image.
 */
interface IProcessImageParams {
  /**
   * The buffer containing the image data.
   */
  buffer: Buffer;
  /**
   * The original filename of the image.
   */
  filename: string;
  /**
   * The optional filepath where the processed image should be saved.
   * If not provided, the image will be saved in the 'public' directory.
   */
  filepath?: string;
}

/**
 * Processes an image by resizing it to a maximum dimension of 500 pixels
 * if its dimensions exceed this limit, and saves it as a PNG file with
 * a hashed filename for uniqueness.
 * @example
 * import fs from 'fs';
 * import path from 'path';
 * import { processImage } from './imageProcessor';
 *
 * const imageBuffer = fs.readFileSync('/path/to/image.jpg');
 *
 * const image = await processImage({
 *   buffer: imageBuffer,
 *   filename: 'image.jpg',
 *   filepath: '/profile',
 * });
 *
 * console.log(image) // '/profile/hashedFilename.png';
 *
 * @param {IProcessImageParams} params - The parameters required to process the image.
 * @param {Buffer} params.buffer - The buffer containing the image data.
 * @param {string} params.filename - The original filename of the image.
 * @param {string} [params.filepath] - The optional filepath where the processed image should be saved.
 * @returns {Promise<string>} - A promise that resolves to the new file path of the processed image.
 * @throws {Error} - Throws an error if the image dimensions are invalid.
 */
export const processImage = async ({
  buffer,
  filename,
  filepath,
}: IProcessImageParams): Promise<string> => {
  const file = path.parse(filename);
  const ext = file.ext;
  const name = file.name;

  const hash = crypto.createHash("sha256");
  hash.update(name + Date.now().toString());
  const hashedFilename = hash.digest("hex");

  const newFilePath = path.join(
    process.cwd(),
    "public",
    "uploads",
    ...(filepath?.split("/") || []),
    hashedFilename + ext
  );

  const image = sharp(buffer);

  const { width, height } = await image.metadata();
  if (!width || !height) {
    throw new Error("Invalid image dimensions");
  }

  const maxDimension = Math.max(width, height);

  const resizedImage = maxDimension > 500 ? image.resize(500) : image;

  await resizedImage.toFormat("png").toFile(newFilePath);

  return `${filepath}/${hashedFilename}${ext}`;
};
