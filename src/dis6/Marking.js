/**
 * Section 5.2.15. Specifies the character set used in the first byte, followed by 11 characters of text data.
 * This class includes methods to convert between arrays and strings, clamping string length to 11 characters.
 */

/**
 * @typedef {import("../common/InputStream.js").default} InputStream
 * @typedef {import("../common/OutputStream.js").default} OutputStream
 */

class Marking {
  /**
   * Constructor initializes default values for Marking
   */
  constructor() {
    /** The character set */
    this.characterSet = 0;

    /** The characters */
    this.characters = Array(11).fill(0);
  }

  /**
   * Initializes the Marking object from a binary input stream
   * @param {InputStream} inputStream - Stream to read values from
   */
  initFromBinary(inputStream) {
    this.characterSet = inputStream.readUByte();
    for (let idx = 0; idx < 11; idx++) {
      this.characters[idx] = inputStream.readByte();
    }
  }

  /**
   * Encodes the Marking object to a binary output stream
   * @param {OutputStream} outputStream - Stream to write values to
   */
  encodeToBinary(outputStream) {
    outputStream.writeUByte(this.characterSet);
    for (let idx = 0; idx < 11; idx++) {
      outputStream.writeByte(this.characters[idx]);
    }
  }

  /**
   * Converts the byte array marking to a string format
   * @returns {string} String representation of the marking characters
   */
  getMarking() {
    let chrs = this.characters.map((char) => String.fromCharCode(char)).join('');
    // remove any null characters from the end of the string
    chrs = chrs.replace(/\0+$/, '');
    return chrs;
  }

  /**
   * Given a string format marking, sets the bytes of the marking object
   * to the appropriate character values. Clamps the string to no more
   * than 11 characters.
   * 
   * @param {string} newMarking - String format marking
   */
  setMarking(newMarking) {
    const stringLen = Math.min(newMarking.length, 11);

    // Copy over up to 11 characters from the string to the array
    for (let idx = 0; idx < stringLen; idx++) {
      this.characters[idx] = newMarking.charCodeAt(idx);
    }

    // Zero-fill the remainder of the character array
    for (let idx = stringLen; idx < 11; idx++) {
      this.characters[idx] = 0;
    }
  }
}

export default Marking;
export { Marking };
