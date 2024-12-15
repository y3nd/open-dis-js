/**
 * Section 5.2.33. Three floating point values, x, y, and z.
 */

/**
 * @typedef {import("../common/InputStream.js").default} InputStream
 */

class Vector3Float {
  /**
   * X value.
   * @type {number}
   */
  x = 0;

  /**
   * Y value.
   * @type {number}
   */
  y = 0;

  /**
   * Z value.
   * @type {number}
   */
  z = 0;

  /**
   * Initializes the vector from a binary input stream.
   * @param {InputStream} inputStream - The input stream to read data from.
   */
  initFromBinary(inputStream) {
    this.x = inputStream.readFloat32();
    this.y = inputStream.readFloat32();
    this.z = inputStream.readFloat32();
  }

  // /**
  //  * Encodes the vector to a binary output stream.
  //  * @param {DataView} outputStream - The output stream to write data to.
  //  * @param {number} offset - The offset in the output stream to start writing.
  //  * @returns {number} The new offset after writing.
  //  */
  // encodeToBinary(outputStream, offset = 0) {
  //   outputStream.setFloat32(offset, this.x, true);
  //   outputStream.setFloat32(offset + 4, this.y, true);
  //   outputStream.setFloat32(offset + 8, this.z, true);
  //   return offset + 12;
  // }
}

export default Vector3Float;
export { Vector3Float };