class InputStream {
  /**
   * Constructor for InputStream.
   * @param {ArrayBuffer} binaryData - The binary data to read.
   */
  constructor(binaryData) {
    this.dataView = new DataView(binaryData, 0); // DataView allows reading binary data
    this.currentPosition = 0; // Pointer to the current position in the data
  }

  /**
   * Reads an unsigned 8-bit integer.
   * @returns {number} The unsigned byte.
   */
  readUByte() {
    const data = this.dataView.getUint8(this.currentPosition);
    this.currentPosition += 1;
    return data;
  }

  /**
   * Reads a signed 8-bit integer.
   * @returns {number} The signed byte.
   */
  readByte() {
    const data = this.dataView.getInt8(this.currentPosition);
    this.currentPosition += 1;
    return data;
  }

  /**
   * Reads an unsigned 16-bit integer.
   * @returns {number} The unsigned short.
   */
  readUShort() {
    const data = this.dataView.getUint16(this.currentPosition);
    this.currentPosition += 2;
    return data;
  }

  /**
   * Reads a signed 16-bit integer.
   * @returns {number} The signed short.
   */
  readShort() {
    const data = this.dataView.getInt16(this.currentPosition);
    this.currentPosition += 2;
    return data;
  }

  /**
   * Reads an unsigned 32-bit integer.
   * @returns {number} The unsigned integer.
   */
  readUInt() {
    const data = this.dataView.getUint32(this.currentPosition);
    this.currentPosition += 4;
    return data;
  }

  /**
   * Reads a signed 32-bit integer.
   * @returns {number} The signed integer.
   */
  readInt() {
    const data = this.dataView.getInt32(this.currentPosition);
    this.currentPosition += 4;
    return data;
  }

  //   /**
  //    * Reads a signed 64-bit integer as a string. Uses the Long library.
  //    * @returns {string} The signed 64-bit integer as a string.
  //    */
  //   readLong() {
  //     const high = this.dataView.getInt32(this.currentPosition);
  //     const low = this.dataView.getInt32(this.currentPosition + 4);
  //     const long = new Long(low, high);
  //     this.currentPosition += 8;
  //     return long.toString();
  //   }

  /**
 * Reads a signed 64-bit integer as a BigInt.
 * This version does not use external libraries.
 * @returns {BigInt} The signed 64-bit integer as a BigInt.
 */
  readLong() {
    const high = this.dataView.getInt32(this.currentPosition); // High 32 bits
    const low = this.dataView.getUint32(this.currentPosition + 4); // Low 32 bits
    this.currentPosition += 8; // Move position forward by 8 bytes

    // Combine high and low into a single 64-bit integer using BigInt
    const long = BigInt(high) << 32n | BigInt(low);
    return long;
  }


  /**
   * Reads a 32-bit floating point number.
   * @returns {number} The float value.
   */
  readFloat32() {
    const data = this.dataView.getFloat32(this.currentPosition);
    this.currentPosition += 4;
    return data;
  }

  /**
   * Reads a 64-bit floating point number.
   * @returns {number} The double value.
   */
  readFloat64() {
    const data = this.dataView.getFloat64(this.currentPosition);
    this.currentPosition += 8;
    return data;
  }

  /**
   * Reads a long integer using 64-bit Big Endian format.
   * This is a placeholder as the original function wasn't implemented.
   * Replace with actual BigInteger support if needed.
   */
  readLongInt() {
    const high = this.dataView.getInt32(this.currentPosition);
    const low = this.dataView.getInt32(this.currentPosition + 4);
    this.currentPosition += 8;
    return { high, low }; // Returns the high and low components for future processing
  }
}

export default InputStream;
export { InputStream };