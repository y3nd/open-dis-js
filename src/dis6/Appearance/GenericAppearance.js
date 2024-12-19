/**
 * @typedef {import("../common/InputStream.js").default} InputStream
 * @typedef {import("../common/OutputStream.js").default} OutputStream
 */

/**
 * @typedef {number} State
 **/

class GenericAppearance {
  /**
   * @readonly
   * @enum {State}
   */
  static STATE = {
    ACTIVE: 0,
    DEACTIVATED: 1,
  };

  /** @type {State} */
  state = GenericAppearance.STATE.ACTIVE;

  /**
   * Write the appearance to an int32
   */
  toUInt32() {
    let result = 0;

    result |= (this.state & 0b1) << 23;

    return result;
  }

  /**
   * Populate the appearance properties from a uint32
   * @param {number} uint32
   */
  fromUInt32(uint32) {
    this.state = (uint32 >> 23) & 0b1;
  }

  /**
   * Utility method to reset all properties to defaults
   */
  reset() {
    this.state = GenericAppearance.STATE.ACTIVE;
  }
}

export default GenericAppearance;
export { GenericAppearance };