/**
 * @typedef {import("../common/InputStream.js").default} InputStream
 * @typedef {import("../common/OutputStream.js").default} OutputStream
 */

/**
 * @typedef {number} Damage
 * @typedef {number} VaporTrailSize
 * @typedef {number} CoverShroudStatus
 * @typedef {number} State
 **/

class MunitionAppearance {
  /**
   * @readonly
   * @enum {Damage}
   * @brief Describes the damaged appearance (bits 3-4).
   */
  static DAMAGE = {
    NO_DAMAGE: 0,
    SLIGHT_DAMAGE: 1,
    MODERATE_DAMAGE: 2,
    DESTROYED: 3,
  };

  /**
   * @readonly
   * @enum {VaporTrailSize}
   * @brief Describes the size of the vapor trail (bits 7-8).
   */
  static VAPOR_TRAIL_SIZE = {
    NONE: 0,
    SMALL: 1,
    MEDIUM: 2,
    LARGE: 3,
  };

  /**
   * @readonly
   * @enum {CoverShroudStatus}
   * @brief Describes the status of the cover or shroud (bits 24-25).
   */
  static COVER_SHROUD_STATUS = {
    NOT_PRESENT: 0,
    DEPLOYED: 1,
    RETRACTED: 2,
    DAMAGED: 3, // fill here, UID 426
  };

  /**
   * @readonly
   * @enum {State}
   * @brief Describes whether the entity is active or deactivated (bit 23).
   */
  static STATE = {
    ACTIVE: 0,
    DEACTIVATED: 1,
  };

  /** @type {Damage} */
  damage = MunitionAppearance.DAMAGE.NO_DAMAGE;

  /** @type {boolean} */
  isSmokeVaporEmanating = false;

  /** @type {boolean} */
  isEngineEmittingSmoke = false;

  /** @type {VaporTrailSize} */
  vaporTrailSize = MunitionAppearance.VAPOR_TRAIL_SIZE.NONE;

  /** @type {boolean} */
  isFlaming = false;

  /** @type {boolean} */
  launchFlashPresent = false;

  /** @type {boolean} */
  isFrozen = false;

  /** @type {boolean} */
  powerPlantOn = false;

  /** @type {State} */
  state = MunitionAppearance.STATE.ACTIVE;

  /** @type {CoverShroudStatus} */
  coverShroudStatus = MunitionAppearance.COVER_SHROUD_STATUS.NOT_PRESENT;

  /** @type {boolean} */
  maskedOrCloaked = false;

  /**
   * Write the appearance to an int32 using BIT_MASKS.
   * @returns {number} - The encoded appearance as a uint32.
   */
  toUInt32() {
    let result = 0;

    result |= (this.damage & 0b11) << 3;               // Bits 3-4
    result |= (this.isSmokeVaporEmanating ? 1 : 0) << 5;
    result |= (this.isEngineEmittingSmoke ? 1 : 0) << 6;
    result |= (this.vaporTrailSize & 0b11) << 7;       // Bits 7-8
    result |= (this.isFlaming ? 1 : 0) << 15;
    result |= (this.launchFlashPresent ? 1 : 0) << 16;
    result |= (this.isFrozen ? 1 : 0) << 21;
    result |= (this.powerPlantOn ? 1 : 0) << 22;
    result |= (this.state & 0b1) << 23;
    result |= (this.coverShroudStatus & 0b11) << 24;   // Bits 24-25
    result |= (this.maskedOrCloaked ? 1 : 0) << 31;

    return result >>> 0; // Ensure unsigned 32-bit integer
  }

  /**
   * Populate the appearance properties from a uint32.
   * @param {number} uint32
   */
  fromUInt32(uint32) {
    this.damage = (uint32 >> 3) & 0b11;
    this.isSmokeVaporEmanating = ((uint32 >> 5) & 0b1) === 1;
    this.isEngineEmittingSmoke = ((uint32 >> 6) & 0b1) === 1;
    this.vaporTrailSize = (uint32 >> 7) & 0b11;
    this.isFlaming = ((uint32 >> 15) & 0b1) === 1;
    this.launchFlashPresent = ((uint32 >> 16) & 0b1) === 1;
    this.isFrozen = ((uint32 >> 21) & 0b1) === 1;
    this.powerPlantOn = ((uint32 >> 22) & 0b1) === 1;
    this.state = (uint32 >> 23) & 0b1;
    this.coverShroudStatus = (uint32 >> 24) & 0b11;
    this.maskedOrCloaked = ((uint32 >> 31) & 0b1) === 1;
  }

  /**
   * Utility method to reset all properties to defaults.
   */
  reset() {
    this.damage = MunitionAppearance.DAMAGE.NO_DAMAGE;
    this.isSmokeVaporEmanating = false;
    this.isEngineEmittingSmoke = false;
    this.vaporTrailSize = MunitionAppearance.VAPOR_TRAIL_SIZE.NONE;
    this.isFlaming = false;
    this.launchFlashPresent = false;
    this.isFrozen = false;
    this.powerPlantOn = false;
    this.state = MunitionAppearance.STATE.ACTIVE;
    this.coverShroudStatus = MunitionAppearance.COVER_SHROUD_STATUS.NOT_PRESENT;
    this.maskedOrCloaked = false;
  }
}

export default MunitionAppearance;
export { MunitionAppearance };
