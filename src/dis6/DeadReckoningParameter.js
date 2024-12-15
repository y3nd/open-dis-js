/**
 * Represents values used in dead reckoning algorithms
 */

/**
 * @typedef {import("../common/InputStream.js").default} InputStream
 */

import Vector3Float from './Vector3Float.js'; // Assuming Vector3Float is another ESM class in the same project.

class DeadReckoningParameter {
  /**
   * Constructor initializes default values for DeadReckoningParameter
   */
  constructor() {
    /** Enumeration of what dead reckoning algorithm to use */
    this.deadReckoningAlgorithm = 0;

    /** Other parameters to use in the dead reckoning algorithm */
    this.otherParameters = Array(15).fill(0);

    /** Linear acceleration of the entity */
    this.entityLinearAcceleration = new Vector3Float();

    /** Angular velocity of the entity */
    this.entityAngularVelocity = new Vector3Float();
  }

  /**
   * Initializes the DeadReckoningParameter object from a binary input stream
   * @param {InputStream} inputStream - Stream to read values from
   */
  initFromBinary(inputStream) {
    this.deadReckoningAlgorithm = inputStream.readUByte();
    for (let idx = 0; idx < 15; idx++) {
      this.otherParameters[idx] = inputStream.readByte();
    }
    this.entityLinearAcceleration.initFromBinary(inputStream);
    this.entityAngularVelocity.initFromBinary(inputStream);
  }

  /**
   * Encodes the DeadReckoningParameter object to a binary output stream
   * @param {Object} outputStream - Stream to write values to
   */
  encodeToBinary(outputStream) {
    outputStream.writeUByte(this.deadReckoningAlgorithm);
    for (let idx = 0; idx < 15; idx++) {
      outputStream.writeByte(this.otherParameters[idx]);
    }
    this.entityLinearAcceleration.encodeToBinary(outputStream);
    this.entityAngularVelocity.encodeToBinary(outputStream);
  }
}

export default DeadReckoningParameter;
export { DeadReckoningParameter };