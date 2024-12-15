/**
 * Section 5.3.34. Three double precision floating point values, x, y, and z.
 */

/**
 * @typedef {import("../common/InputStream.js").default} InputStream
 * @typedef {import("../common/OutputStream.js").default} InputStream
 */

class Vector3Double {
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
    this.x = inputStream.readFloat64();
    this.y = inputStream.readFloat64();
    this.z = inputStream.readFloat64();
  }

  /**
   * Encodes the vector to a binary output stream.
   * @param {OutputStream} outputStream - The output stream to write data to.
   */
  encodeToBinary(outputStream, offset = 0) {
    outputStream.write
    outputStream.setFloat64(offset + 8, this.y, true);
    outputStream.setFloat64(offset + 16, this.z, true);
    return offset + 24;
  }
}

export default Vector3Double;
export { Vector3Double };
