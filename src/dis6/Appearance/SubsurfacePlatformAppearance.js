/**
 * @typedef {import("../common/InputStream.js").default} InputStream
 * @typedef {import("../common/OutputStream.js").default} OutputStream
 */

/**
 * @typedef {number} PaintScheme
 * @typedef {number} Damage
 * @typedef {number} Hatch
 * @typedef {number} State
 **/

class SubsurfacePlatformAppearance {
  /**
   * Bit masks for each property.
   */
  static BIT_MASKS = {
    paintScheme: 0b1 << 0, // Paint Scheme (Bit 0)
    mobilityKilled: 0b1 << 1, // Mobility Killed (Bit 1)
    damage: 0b11 << 3, // Damage (Bits 3-4)
    isSmokeEmanating: 0b1 << 5, // Is Smoke Emanating (Bit 5)
    isEngineEmittingSmoke: 0b1 << 6, // Is Engine Emitting Smoke (Bit 6)
    hatch: 0b111 << 9, // Hatch (Bits 9-11)
    runningLightsOn: 0b1 << 12, // Running Lights On (Bit 12)
    isFlaming: 0b1 << 15, // Is Flaming (Bit 15)
    isFrozen: 0b1 << 21, // Is Frozen (Bit 21)
    powerPlantOn: 0b1 << 22, // Power Plant On (Bit 22)
    state: 0b1 << 23, // State (Bit 23)
  };

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
   * @enum {Hatch}
   */
  static HATCH = {
    NOT_APPLICABLE: 0,
    CLOSED: 1,
    OPEN: 4,
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
  paintScheme = SubsurfacePlatformAppearance.PAINT_SCHEME.CAMOUFLAGE;

  /** @type {boolean} */
  mobilityKilled = false;

  /** @type {Damage} */
  damage = SubsurfacePlatformAppearance.DAMAGE.NO_DAMAGE;

  /** @type {boolean} */
  isSmokeEmanating = false;

  /** @type {boolean} */
  isEngineEmittingSmoke = false;

  /** @type {Hatch} */
  hatch = SubsurfacePlatformAppearance.HATCH.NOT_APPLICABLE;

  /** @type {boolean} */
  runningLightsOn = false;

  /** @type {boolean} */
  isFlaming = false;

  /** @type {boolean} */
  isFrozen = false;

  /** @type {boolean} */
  powerPlantOn = false;

  /** @type {State} */
  state = SubsurfacePlatformAppearance.STATE.ACTIVE;

  /**
   * Write the appearance to an int32 using BIT_MASKS
   */
  toUInt32() {
    let result = 0;

    result |= (this.paintScheme & 0b1) << 0;
    result |= (this.mobilityKilled ? 1 : 0) << 1;
    result |= (this.damage & 0b11) << 3;
    result |= (this.isSmokeEmanating ? 1 : 0) << 5;
    result |= (this.isEngineEmittingSmoke ? 1 : 0) << 6;
    result |= (this.hatch & 0b111) << 9;
    result |= (this.runningLightsOn ? 1 : 0) << 12;
    result |= (this.isFlaming ? 1 : 0) << 15;
    result |= (this.isFrozen ? 1 : 0) << 21;
    result |= (this.powerPlantOn ? 1 : 0) << 22;
    result |= (this.state & 0b1) << 23;

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
    this.hatch = (uint32 >> 9) & 0b111;
    this.runningLightsOn = ((uint32 >> 12) & 0b1) === 1;
    this.isFlaming = ((uint32 >> 15) & 0b1) === 1;
    this.isFrozen = ((uint32 >> 21) & 0b1) === 1;
    this.powerPlantOn = ((uint32 >> 22) & 0b1) === 1;
    this.state = (uint32 >> 23) & 0b1;
  }

  /**
   * Utility method to reset all properties to defaults
   */
  reset() {
    this.paintScheme = SubsurfacePlatformAppearance.PAINT_SCHEME.CAMOUFLAGE;
    this.mobilityKilled = false;
    this.damage = SubsurfacePlatformAppearance.DAMAGE.NO_DAMAGE;
    this.isSmokeEmanating = false;
    this.isEngineEmittingSmoke = false;
    this.hatch = SubsurfacePlatformAppearance.HATCH.NOT_APPLICABLE;
    this.runningLightsOn = false;
    this.isFlaming = false;
    this.isFrozen = false;
    this.powerPlantOn = false;
    this.state = SubsurfacePlatformAppearance.STATE.ACTIVE;
  }
}

export default SubsurfacePlatformAppearance;
export { SubsurfacePlatformAppearance };