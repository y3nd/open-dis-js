/**
 * @typedef {import("../common/InputStream.js").default} InputStream
 * @typedef {import("../common/OutputStream.js").default} OutputStream
 */

/**
 * @typedef {number} DamageArea
 * @typedef {number} Damage
 * @typedef {number} State
 **/

class CulturalFeatureAppearance {
  /**
   * @readonly
   * @enum {DamageArea}
   * @brief Describes the damaged area (bits 0-2).
   */
  static DAMAGE_AREA = {
    NOT_SPECIFIED: 0,
  };

  /**
   * @readonly
   * @enum {Damage}
   * @brief Describes the degree of damage appearance (bits 3-4).
   */
  static DAMAGE = {
    NO_DAMAGE: 0,
    SLIGHT_DAMAGE: 1,
    MODERATE_DAMAGE: 2,
    DESTROYED: 3,
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

  /** @type {DamageArea} */
  damageArea = CulturalFeatureAppearance.DAMAGE_AREA.NONE;

  /** @type {Damage} */
  damage = CulturalFeatureAppearance.DAMAGE.NO_DAMAGE;

  /** @type {boolean} */
  isSmokeEmanating = false;

  /** @type {boolean} */
  isFlaming = false;

  /** @type {boolean} */
  isFrozen = false;

  /** @type {boolean} */
  internalHeatOn = false;

  /** @type {State} */
  state = CulturalFeatureAppearance.STATE.ACTIVE;

  /** @type {boolean} */
  exteriorLightsOn = false;

  /** @type {boolean} */
  interiorLightsOn = false;

  /** @type {boolean} */
  maskedOrCloaked = false;

  /**
   * Write the appearance to an int32 using BIT_MASKS.
   * @returns {number} - The encoded appearance as a uint32.
   */
  toUInt32() {
    let result = 0;

    result |= (this.damageArea & 0b111) << 0; // Bits 0-2
    result |= (this.damage & 0b11) << 3;      // Bits 3-4
    result |= (this.isSmokeEmanating ? 1 : 0) << 5;
    result |= (this.isFlaming ? 1 : 0) << 15;
    result |= (this.isFrozen ? 1 : 0) << 21;
    result |= (this.internalHeatOn ? 1 : 0) << 22;
    result |= (this.state & 0b1) << 23;
    result |= (this.exteriorLightsOn ? 1 : 0) << 28;
    result |= (this.interiorLightsOn ? 1 : 0) << 29;
    result |= (this.maskedOrCloaked ? 1 : 0) << 31;

    return result >>> 0; // Ensure unsigned 32-bit integer
  }

  /**
   * Populate the appearance properties from a uint32.
   * @param {number} uint32
   */
  fromUInt32(uint32) {
    this.damageArea = (uint32 >> 0) & 0b111;
    this.damage = (uint32 >> 3) & 0b11;
    this.isSmokeEmanating = ((uint32 >> 5) & 0b1) === 1;
    this.isFlaming = ((uint32 >> 15) & 0b1) === 1;
    this.isFrozen = ((uint32 >> 21) & 0b1) === 1;
    this.internalHeatOn = ((uint32 >> 22) & 0b1) === 1;
    this.state = (uint32 >> 23) & 0b1;
    this.exteriorLightsOn = ((uint32 >> 28) & 0b1) === 1;
    this.interiorLightsOn = ((uint32 >> 29) & 0b1) === 1;
    this.maskedOrCloaked = ((uint32 >> 31) & 0b1) === 1;
  }

  /**
   * Utility method to reset all properties to defaults.
   */
  reset() {
    this.damageArea = CulturalFeatureAppearance.DAMAGE_AREA.NONE;
    this.damage = CulturalFeatureAppearance.DAMAGE.NO_DAMAGE;
    this.isSmokeEmanating = false;
    this.isFlaming = false;
    this.isFrozen = false;
    this.internalHeatOn = false;
    this.state = CulturalFeatureAppearance.STATE.ACTIVE;
    this.exteriorLightsOn = false;
    this.interiorLightsOn = false;
    this.maskedOrCloaked = false;
  }
}

export default CulturalFeatureAppearance;
export { CulturalFeatureAppearance };
