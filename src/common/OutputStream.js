class OutputStream {
  /**
   * @param {ArrayBuffer} binaryDataBuffer - The buffer to write binary data to
   */
  constructor(binaryDataBuffer) {
    this.binaryData = binaryDataBuffer;
    this.dataView = new DataView(this.binaryData); // Initialize DataView with buffer
    this.currentPosition = 0; // Pointer to current position in the buffer
  }

  /**
   * Returns a trimmed byte array containing only the data written to the stream.
   * @returns {ArrayBuffer} - A sliced ArrayBuffer containing written data
   */
  toByteArray() {
    return this.binaryData.slice(0, this.currentPosition);
  }

  /**
   * Writes an unsigned byte to the buffer.
   * @param {number} userData - The data to write
   */
  writeUByte(userData) {
    this.dataView.setUint8(this.currentPosition, userData);
    this.currentPosition += 1;
  }

  /**
   * Writes a signed byte to the buffer.
   * @param {number} userData - The data to write
   */
  writeByte(userData) {
    this.dataView.setInt8(this.currentPosition, userData);
    this.currentPosition += 1;
  }

  /**
   * Writes an unsigned 16-bit integer to the buffer.
   * @param {number} userData - The data to write
   */
  writeUShort(userData) {
    this.dataView.setUint16(this.currentPosition, userData, true);
    this.currentPosition += 2;
  }

  /**
   * Writes a signed 16-bit integer to the buffer.
   * @param {number} userData - The data to write
   */
  writeShort(userData) {
    this.dataView.setInt16(this.currentPosition, userData, true);
    this.currentPosition += 2;
  }

  /**
   * Writes an unsigned 32-bit integer to the buffer.
   * @param {number} userData - The data to write
   */
  writeUInt(userData) {
    this.dataView.setUint32(this.currentPosition, userData, true);
    this.currentPosition += 4;
  }

  /**
   * Writes a signed 32-bit integer to the buffer.
   * @param {number} userData - The data to write
   */
  writeInt(userData) {
    this.dataView.setInt32(this.currentPosition, userData, true);
    this.currentPosition += 4;
  }

  /**
   * Writes a 32-bit floating point number to the buffer.
   * @param {number} userData - The data to write
   */
  writeFloat32(userData) {
    this.dataView.setFloat32(this.currentPosition, userData, true);
    this.currentPosition += 4;
  }

  /**
   * Writes a 64-bit floating point number to the buffer.
   * @param {number} userData - The data to write
   */
  writeFloat64(userData) {
    this.dataView.setFloat64(this.currentPosition, userData, true);
    this.currentPosition += 8;
  }

  /**
 * Writes a 64-bit integer to the buffer.
 * @param {number|BigInt} userData - The data to write (as a number or BigInt)
 */
  writeLong(userData) {
    // Ensure the value is a BigInt for 64-bit operations
    const value = BigInt(userData);

    // Extract the high and low 32-bit parts
    const highBits = Number((value >> 32n) & 0xFFFFFFFFn); // High 32 bits
    const lowBits = Number(value & 0xFFFFFFFFn); // Low 32 bits

    // Write the high and low 32 bits
    this.dataView.setInt32(this.currentPosition, highBits, true);
    this.dataView.setInt32(this.currentPosition + 4, lowBits, true);

    // Move the position pointer forward by 8 bytes
    this.currentPosition += 8;
  }
}

export default OutputStream;
export { OutputStream };