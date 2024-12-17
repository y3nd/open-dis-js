/**
 * @typedef {import("../common/InputStream.js").default} InputStream
 * @typedef {import("../common/OutputStream.js").default} OutputStream
 */

/**
 * @typedef {number} PaintScheme
 * @typedef {number} Damage
 * @typedef {number} State
 **/

class SurfacePlatformAppearance {
  /**
   * @readonly
   * @enum {PaintScheme}
   */
  static PAINT_SCHEME = {
    CAMOUFLAGE: 0,
    COLOR: 1,
  };

  /**
   * @readonly
   * @enum {Damage}
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
   */
  static STATE = {
    ACTIVE: 0,
    DEACTIVATED: 1,
  };

  /** @type {PaintScheme} */
  paintScheme = SurfacePlatformAppearance.PAINT_SCHEME.CAMOUFLAGE;

  /** @type {boolean} */
  mobilityKilled = false;

  /** @type {Damage} */
  damage = SurfacePlatformAppearance.DAMAGE.NO_DAMAGE;

  /** @type {boolean} */
  isSmokeEmanating = false;

  /** @type {boolean} */
  isEngineEmittingSmoke = false;

  /** @type {number} */
  wakeSize = 0;

  /** @type {boolean} */
  runningLightsOn = false;

  /** @type {boolean} */
  isFlaming = false;

  /** @type {boolean} */
  isAccomodationLadderLowered = false;

  /** @type {boolean} */
  isFenceRaised = false;

  /** @type {boolean} */
  isFlagRaised = false;

  /** @type {boolean} */
  isFrozen = false;

  /** @type {boolean} */
  powerPlantOn = false;

  /** @type {State} */
  state = SurfacePlatformAppearance.STATE.ACTIVE;

  /** @type {boolean} */
  spotLightsOn = false;

  /** @type {boolean} */
  interiorLightsOn = false;

  /**
   * Write the appearance to an int32
   */
  toUInt32() {
    let result = 0;
    result |= (this.paintScheme & 0b1) << 0;
    result |= (this.mobilityKilled ? 1 : 0) << 1;
    result |= (this.damage & 0b11) << 3;
    result |= (this.isSmokeEmanating ? 1 : 0) << 5;
    result |= (this.isEngineEmittingSmoke ? 1 : 0) << 6;
    result |= (this.wakeSize & 0b11) << 7;
    result |= (this.runningLightsOn ? 1 : 0) << 12;
    result |= (this.isFlaming ? 1 : 0) << 15;
    result |= (this.isAccomodationLadderLowered ? 1 : 0) << 16;
    result |= (this.isFenceRaised ? 1 : 0) << 17;
    result |= (this.isFlagRaised ? 1 : 0) << 18;
    result |= (this.isFrozen ? 1 : 0) << 21;
    result |= (this.powerPlantOn ? 1 : 0) << 22;
    result |= (this.state & 0b1) << 23;
    result |= (this.spotLightsOn ? 1 : 0) << 28;
    result |= (this.interiorLightsOn ? 1 : 0) << 29;
    return result;
  }

  /**
   * Populate the appearance properties from a uint32
   * @param {number} uint32
   */
  fromUInt32(uint32) {
    this.paintScheme = (uint32 >> 0) & 0b1;
    this.mobilityKilled = ((uint32 >> 1) & 0b1) === 1;
    this.damage = (uint32 >> 3) & 0b11;
    this.isSmokeEmanating = ((uint32 >> 5) & 0b1) === 1;
    this.isEngineEmittingSmoke = ((uint32 >> 6) & 0b1) === 1;
    this.wakeSize = (uint32 >> 7) & 0b11;
    this.runningLightsOn = ((uint32 >> 12) & 0b1) === 1;
    this.isFlaming = ((uint32 >> 15) & 0b1) === 1;
    this.isAccomodationLadderLowered = ((uint32 >> 16) & 0b1) === 1;
    this.isFenceRaised = ((uint32 >> 17) & 0b1) === 1;
    this.isFlagRaised = ((uint32 >> 18) & 0b1) === 1;
    this.isFrozen = ((uint32 >> 21) & 0b1) === 1;
    this.powerPlantOn = ((uint32 >> 22) & 0b1) === 1;
    this.state = (uint32 >> 23) & 0b1;
    this.spotLightsOn = ((uint32 >> 28) & 0b1) === 1;
    this.interiorLightsOn = ((uint32 >> 29) & 0b1) === 1;
  }

  /**
   * Utility method to reset all properties to defaults
   */
  reset() {
    this.paintScheme = SurfacePlatformAppearance.PAINT_SCHEME.CAMOUFLAGE;
    this.mobilityKilled = false;
    this.damage = SurfacePlatformAppearance.DAMAGE.NO_DAMAGE;
    this.isSmokeEmanating = false;
    this.isEngineEmittingSmoke = false;
    this.wakeSize = 0;
    this.runningLightsOn = false;
    this.isFlaming = false;
    this.isAccomodationLadderLowered = false;
    this.isFenceRaised = false;
    this.isFlagRaised = false;
    this.isFrozen = false;
    this.powerPlantOn = false;
    this.state = SurfacePlatformAppearance.STATE.ACTIVE;
    this.spotLightsOn = false;
    this.interiorLightsOn = false;
  }
}

export default SurfacePlatformAppearance;
export { SurfacePlatformAppearance };
