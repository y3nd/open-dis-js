/**
 * @typedef {import("../common/InputStream.js").default} InputStream
 * @typedef {import("../common/OutputStream.js").default} OutputStream
 */

/**
 * @typedef {number} PaintScheme
 * @typedef {number} Health
 * @typedef {number} ComplianceStatus
 * @typedef {number} State
 * @typedef {number} WeaponImplement
 * @typedef {number} CamouflageType
 * @typedef {number} Posture
 **/

class HumanLifeFormAppearance {
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
   * @enum {Health}
   * @brief Describes the visual appearance of the severity of any injury.
   */
  static HEALTH = {
    NO_INJURY: 0,
    SLIGHT_INJURY: 1,
    MODERATE_INJURY: 2,
    SEVERE_INJURY: 3,
  };

  /**
   * @readonly
   * @enum {ComplianceStatus}
   * @brief Describes the compliance state of the life form.
   */
  static COMPLIANCE_STATUS = {
    NOT_SPECIFIED: 0,
    DETAINED: 1,
    SURRENDER: 2,
    USING_FISTS: 3,
    VERBAL_ABUSE_LEVEL_1: 4,
    VERBAL_ABUSE_LEVEL_2: 5,
    VERBAL_ABUSE_LEVEL_3: 6,
    PASSIVE_RESISTANCE_LEVEL_1: 7,
    PASSIVE_RESISTANCE_LEVEL_2: 8,
    PASSIVE_RESISTANCE_LEVEL_3: 9,
    USING_NON_LETHAL_WEAPON_1: 10,
    USING_NON_LETHAL_WEAPON_2: 11,
    USING_NON_LETHAL_WEAPON_3: 12,
    USING_NON_LETHAL_WEAPON_4: 13,
    USING_NON_LETHAL_WEAPON_5: 14,
    USING_NON_LETHAL_WEAPON_6: 15,
  };

  /**
   * @readonly
   * @enum {Posture}
   * @brief Describes the posture (position) of the life form.
   */
  static LIFE_FORM_POSTURE = {
    NOT_SPECIFIED: 0,
    UPRIGHT_STANDING_STILL: 1,
    UPRIGHT_WALKING: 2,
    UPRIGHT_RUNNING: 3,
    KNEELING: 4,
    PRONE: 5,
    CRAWLING: 6,
    SWIMMING: 7,
    PARACHUTING: 8,
    JUMPING: 9,
    SITTING: 10,
    SQUATTING: 11,
    CROUCHING: 12,
    WADING: 13,
    SURRENDER: 14,
    DETAINED: 15,
  };

  /**
   * @readonly
   * @enum {WeaponImplement}
   * @brief Describes the position of the primary and secondary weapon/implement.
   */
  static WEAPON_IMPLEMENT = {
    NO_WEAPON: 0,
    STOWED: 1,
    DEPLOYED: 2,
    FIRING_POSITION: 3,
  };

  /**
   * @readonly
   * @enum {State}
   */
  static STATE = {
    ACTIVE: 0,
    DEACTIVATED: 1,
  };

  /**
   * 0 Desert Camouflage
1 Winter Camouflage
2 Forest Camouflage
3 Other
   */

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

  /** @type {PaintScheme} */
  paintScheme = HumanLifeFormAppearance.PAINT_SCHEME.DEFAULT;

  /** @type {Health} */
  health = HumanLifeFormAppearance.HEALTH.NO_INJURY;

  /** @type {ComplianceStatus} */
  complianceStatus = HumanLifeFormAppearance.COMPLIANCE_STATUS.NOT_SPECIFIED;

  /** @type {Posture} */
  lifeFormPosture = HumanLifeFormAppearance.LIFE_FORM_POSTURE.NOT_SPECIFIED;

  /** @type {WeaponImplement} */
  primaryWeapon = HumanLifeFormAppearance.WEAPON_IMPLEMENT.NO_WEAPON;

  /** @type {WeaponImplement} */
  secondaryWeapon = HumanLifeFormAppearance.WEAPON_IMPLEMENT.NO_WEAPON;

  /** @type {CamouflageType} */
  camouflageType = HumanLifeFormAppearance.CAMOUFLAGE_TYPE.DESERT;

  /** @type {boolean} */
  isFrozen = false;

  /** @type {boolean} */
  isSmokingCigarette = false;

  /** @type {boolean} */
  signalSmokeInUse = false;

  /** @type {boolean} */
  flashLightsOn = false;

  /** @type {boolean} */
  signalMirrorInUse = false;

  /** @type {boolean} */
  irStrobeOn = false;

  /** @type {boolean} */
  irIlluminatorOn = false;

  /** @type {boolean} */
  mountedOrHoisted = false;

  /** @type {boolean} */
  concealedStationary = false;

  /** @type {boolean} */
  concealedMovement = false;

  /** @type {State} */
  state = HumanLifeFormAppearance.STATE.ACTIVE;

  /**
   * Write the appearance to an int32 using BIT_MASKS
   */
  toUInt32() {
    let result = 0;

    result |= (this.paintScheme & 0b1) << 0;
    result |= (this.health & 0b11) << 3;
    result |= (this.complianceStatus & 0b1111) << 5;
    result |= (this.lifeFormPosture & 0b1111) << 16;
    result |= (this.isSmokingCigarette ? 1 : 0) << 20;
    result |= (this.isFrozen ? 1 : 0) << 21;
    result |= (this.mountedOrHoisted ? 1 : 0) << 22;
    result |= (this.state & 0b1) << 23;
    result |= (this.primaryWeapon & 0b11) << 24;
    result |= (this.secondaryWeapon & 0b11) << 26;
    result |= (this.camouflageType & 0b11) << 28;
    result |= (this.concealedStationary ? 1 : 0) << 30;
    result |= (this.concealedMovement ? 1 : 0) << 31;

    return result;
  }

  /**
   * Populate the appearance properties from a uint32
   * @param {number} uint32
   */
  fromUInt32(uint32) {
    this.paintScheme = (uint32 >> 0) & 0b1;
    this.health = (uint32 >> 3) & 0b11;
    this.complianceStatus = (uint32 >> 5) & 0b1111;
    this.lifeFormPosture = (uint32 >> 16) & 0b1111;
    this.isSmokingCigarette = ((uint32 >> 20) & 0b1) === 1;
    this.isFrozen = ((uint32 >> 21) & 0b1) === 1;
    this.mountedOrHoisted = ((uint32 >> 22) & 0b1) === 1;
    this.state = (uint32 >> 23) & 0b1;
    this.primaryWeapon = (uint32 >> 24) & 0b11;
    this.secondaryWeapon = (uint32 >> 26) & 0b11;
    this.camouflageType = (uint32 >> 28) & 0b11;
    this.concealedStationary = ((uint32 >> 30) & 0b1) === 1;
    this.concealedMovement = ((uint32 >> 31) & 0b1) === 1;
  }

  /**
   * Utility method to reset all properties to defaults
   */
  reset() {
    this.paintScheme = HumanLifeFormAppearance.PAINT_SCHEME.DEFAULT;
    this.health = HumanLifeFormAppearance.HEALTH.NO_INJURY;
    this.complianceStatus = HumanLifeFormAppearance.COMPLIANCE_STATUS.NOT_SPECIFIED;
    this.lifeFormPosture = HumanLifeFormAppearance.LIFE_FORM_POSTURE.UPRIGHT;
    this.primaryWeapon = HumanLifeFormAppearance.WEAPON_IMPLEMENT.NO_WEAPON;
    this.secondaryWeapon = HumanLifeFormAppearance.WEAPON_IMPLEMENT.NO_WEAPON;
    this.camouflageType = HumanLifeFormAppearance.CAMOUFLAGE_TYPE.NONE;
    this.isSmokingCigarette = false;
    this.isFrozen = false;
    this.mountedOrHoisted = false;
    this.concealedStationary = false;
    this.concealedMovement = false;
    this.state = HumanLifeFormAppearance.STATE.ACTIVE;
  }
}

export default HumanLifeFormAppearance;
export { HumanLifeFormAppearance };
