/**
 * @typedef {import("../common/InputStream.js").default} InputStream
 * @typedef {import("../common/OutputStream.js").default} OutputStream
 */

/**
 * @typedef {number} PaintScheme
 * @typedef {number} Damage
 * @typedef {number} CamouflageType
 * @typedef {number} State
 **/

class LandPlatformAppearance {
  /**
   * @readonly
   * @enum {State}
   * @brief Describes whether the entity is active or deactivated (bit 23).
   */
  static STATE = {
    ACTIVE: 0,
    DEACTIVATED: 1,
  };

  /**
   * @readonly
   * @enum {PaintScheme}
   * @brief Describes the visual paint design.
   */
  static PAINT_SCHEME = {
    CAMOUFLAGE: 0,
    COLOR: 1,
  };

  /**
   * @readonly
   * @enum {Damage}
   * @brief Describes the degree of damage appearance.
   */
  static DAMAGE = {
    NO_DAMAGE: 0,
    SLIGHT_DAMAGE: 1,
    MODERATE_DAMAGE: 2,
    DESTROYED: 3,
  };

  /**
   * @readonly
   * @enum {CamouflageType}
   * @brief Describes the camouflage color.
   */
  static CAMOUFLAGE_TYPE = {
    DESERT: 0,
    WINTER: 1,
    FOREST: 2,
    OTHER: 3,
  };

  /**
   * @readonly
   * @enum {State}
   * @brief Describes whether the entity is active or deactivated.
   */
  static STATE = {
    ACTIVE: 0,
    DEACTIVATED: 1,
  };

  /** @type {PaintScheme} */
  paintScheme = LandPlatform*Appearance.PAINT_SCHEME.DEFAULT;

  /** @type {boolean} */
  mobilityKilled = false;

  /** @type {boolean} */
  firePowerKilled = false;

  /** @type {Damage} */
  damage = LandPlatform*Appearance.DAMAGE.NO_DAMAGE;

  /** @type {boolean} */
  isSmokeEmanating = false;

  /** @type {boolean} */
  isEngineEmittingSmoke = false;

  /** @type {boolean} */
  trailingDustCloud = false;

  /** @type {boolean} */
  primaryHatchOpen = false;

  /** @type {boolean} */
  headlightsOn = false;

  /** @type {boolean} */
  tailLightsOn = false;

  /** @type {boolean} */
  brakeLightsOn = false;

  /** @type {boolean} */
  isFlaming = false;

  /** @type {boolean} */
  launcherOperational = false;

  /** @type {CamouflageType} */
  camouflageType = LandPlatform*Appearance.CAMOUFLAGE_TYPE.NONE;

  /** @type {boolean} */
  isFrozen = false;

  /** @type {boolean} */
  powerPlantOn = false;

  /** @type {boolean} */
  tentExtended = false;

  /** @type {boolean} */
  rampExtended = false;

  /** @type {boolean} */
  blackoutLightsOn = false;

  /** @type {boolean} */
  blackoutBrakeLightsOn = false;

  /** @type {boolean} */
  spotSearchLightOn = false;

  /** @type {boolean} */
  interiorLightsOn = false;

  /** @type {boolean} */
  vehicleSurrendered = false;

  /** @type {boolean} */
  maskedOrCloaked = false;

  /** @type {State} */
  state = LandPlatform*Appearance.STATE.ACTIVE;

  /**
   * Write the appearance to an int32 using BIT_MASKS
   */
  toUInt32() {
    let result = 0;

    result |= (this.paintScheme & 0b1) << 0;
    result |= (this.mobilityKilled ? 1 : 0) << 1;
    result |= (this.firePowerKilled ? 1 : 0) << 2;
    result |= (this.damage & 0b11) << 3;
    result |= (this.isSmokeEmanating ? 1 : 0) << 5;
    result |= (this.isEngineEmittingSmoke ? 1 : 0) << 6;
    result |= (this.trailingDustCloud ? 1 : 0) << 7;
    result |= (this.primaryHatchOpen ? 1 : 0) << 9;
    result |= (this.headlightsOn ? 1 : 0) << 10;
    result |= (this.tailLightsOn ? 1 : 0) << 11;
    result |= (this.brakeLightsOn ? 1 : 0) << 14;
    result |= (this.isFlaming ? 1 : 0) << 15;
    result |= (this.launcherOperational ? 1 : 0) << 16;
    result |= (this.camouflageType & 0b11) << 17;
    result |= (this.isFrozen ? 1 : 0) << 21;
    result |= (this.powerPlantOn ? 1 : 0) << 22;
    result |= (this.tentExtended ? 1 : 0) << 24;
    result |= (this.rampExtended ? 1 : 0) << 25;
    result |= (this.blackoutLightsOn ? 1 : 0) << 26;
    result |= (this.blackoutBrakeLightsOn ? 1 : 0) << 27;
    result |= (this.spotSearchLightOn ? 1 : 0) << 28;
    result |= (this.interiorLightsOn ? 1 : 0) << 29;
    result |= (this.vehicleSurrendered ? 1 : 0) << 30;
    result |= (this.maskedOrCloaked ? 1 : 0) << 31;

    return result;
  }

  /**
   * Populate the appearance properties from a uint32
   * @param {number} uint32
   */
  fromUInt32(uint32) {
    this.paintScheme = (uint32 >> 0) & 0b1;
    this.mobilityKilled = ((uint32 >> 1) & 0b1) === 1;
    this.firePowerKilled = ((uint32 >> 2) & 0b1) === 1;
    this.damage = (uint32 >> 3) & 0b11;
    this.isSmokeEmanating = ((uint32 >> 5) & 0b1) === 1;
    this.isEngineEmittingSmoke = ((uint32 >> 6) & 0b1) === 1;
    this.trailingDustCloud = ((uint32 >> 7) & 0b1) === 1;
    this.primaryHatchOpen = ((uint32 >> 9) & 0b1) === 1;
    this.headlightsOn = ((uint32 >> 10) & 0b1) === 1;
    this.tailLightsOn = ((uint32 >> 11) & 0b1) === 1;
    this.brakeLightsOn = ((uint32 >> 14) & 0b1) === 1;
    this.isFlaming = ((uint32 >> 15) & 0b1) === 1;
    this.launcherOperational = ((uint32 >> 16) & 0b1) === 1;
    this.camouflageType = (uint32 >> 17) & 0b11;
    this.isFrozen = ((uint32 >> 21) & 0b1) === 1;
    this.powerPlantOn = ((uint32 >> 22) & 0b1) === 1;
    this.tentExtended = ((uint32 >> 24) & 0b1) === 1;
    this.rampExtended = ((uint32 >> 25) & 0b1) === 1;
    this.blackoutLightsOn = ((uint32 >> 26) & 0b1) === 1;
    this.blackoutBrakeLightsOn = ((uint32 >> 27) & 0b1) === 1;
    this.spotSearchLightOn = ((uint32 >> 28) & 0b1) === 1;
    this.interiorLightsOn = ((uint32 >> 29) & 0b1) === 1;
    this.vehicleSurrendered = ((uint32 >> 30) & 0b1) === 1;
    this.maskedOrCloaked = ((uint32 >> 31) & 0b1) === 1;
  }
}

export default LandPlatformAppearance;
export { LandPlatformAppearance };
