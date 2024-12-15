/**
 * Section 5.2.5. Articulation parameters for movable parts and attached parts of an entity.
 * Specifies whether or not a change has occurred, the part identification of the articulated part
 * to which it is attached, and the type and value of each parameter.
 */

/**
  @typedef {import("../common/InputStream.js").default} InputStream
  @typedef {import("../common/OutputStream.js").default} OutputStream
 */

class ArticulationParameter {
  /**
   * Constructor initializes default values for ArticulationParameter
   */
  constructor() {
    this.parameterTypeDesignator = 0;
    this.changeIndicator = 0;
    this.partAttachedTo = 0;
    this.parameterType = 0;
    this.parameterValue = 0;
  }

  /**
   * Initializes the ArticulationParameter object from a binary input stream
   * @param {InputStream} inputStream - Stream to read values from
   */
  initFromBinary(inputStream) {
    this.parameterTypeDesignator = inputStream.readUByte();
    this.changeIndicator = inputStream.readUByte();
    this.partAttachedTo = inputStream.readUShort();
    this.parameterType = inputStream.readInt();
    this.parameterValue = inputStream.readFloat64();
  }

  /**
   * Encodes the ArticulationParameter object to a binary output stream
   * @param {OutputStream} outputStream - Stream to write values to
   */
  encodeToBinary(outputStream) {
    outputStream.writeUByte(this.parameterTypeDesignator);
    outputStream.writeUByte(this.changeIndicator);
    outputStream.writeUShort(this.partAttachedTo);
    outputStream.writeInt(this.parameterType);
    outputStream.writeFloat64(this.parameterValue);
  }
}

export default ArticulationParameter;
export { ArticulationParameter };