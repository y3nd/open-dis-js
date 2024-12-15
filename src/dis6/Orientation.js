/**
 * Section 5.2.17. Three floating point values representing an orientation, psi, theta, and phi, aka the euler angles, in radians
 */

/**
 * @typedef {import("../common/InputStream.js").default} InputStream
 */

class Orientation {
  constructor() {
    this.psi = 0;
    this.theta = 0;
    this.phi = 0;
  }

  /**
   * Initializes the Orientation object from a binary input stream
   * @param {InputStream} inputStream - Stream to read the float32 values from
   */
  initFromBinary(inputStream) {
    this.psi = inputStream.readFloat32();
    this.theta = inputStream.readFloat32();
    this.phi = inputStream.readFloat32();
  }

  /**
   * Encodes the Orientation object to a binary output stream
   * @param {Object} outputStream - Stream to write the float32 values to
   */
  encodeToBinary(outputStream) {
    outputStream.writeFloat32(this.psi);
    outputStream.writeFloat32(this.theta);
    outputStream.writeFloat32(this.phi);
  }
}

export default Orientation;
export { Orientation };
