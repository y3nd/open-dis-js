/**
 * Section 5.2.16. Identifies the type of entity, including kind of entity, domain (surface, subsurface, air, etc), country, category, etc
 */

/**
 * @typedef {import("../common/InputStream.js").default} InputStream
 * @typedef {import("../common/OutputStream.js").default} OutputStream
 */

/**
 * @typedef {number} EntityKind
 * @typedef {number} Domain
 * @typedef {number} MunitionDomain
 * @typedef {number} Country
 **/

class EntityType {
  /**
   * Kind of entity.
   * @type {EntityKind}
   */
  kind = EntityType.EntityKind.OTHER;

  /**
   * Domain of entity (air, surface, subsurface, space, etc.).
   * @type {Domain|MunitionDomain}
   */
  domain = EntityType.Domain.OTHER

  /**
   * Country to which the design of the entity is attributed.
   * @type {Country}
   */
  country = 71; // France

  /**
   * Category of entity.
   * @type {number}
   */
  category = 0;

  /**
   * Subcategory of entity.
   * @type {number}
   */
  subcategory = 0;

  /**
   * Specific info based on subcategory field. Renamed from `specific` because it is a reserved word in SQL.
   * @type {number}
   */
  spec = 0;

  /**
   * Extra information about the entity.
   * @type {number}
   */
  extra = 0;

  /**
   * Initializes the entity type from a binary input stream.
   * @param {InputStream} inputStream - The input stream to read data from.
   */
  initFromBinary(inputStream) {
    this.kind = inputStream.readUByte();
    this.domain = inputStream.readUByte();
    this.country = inputStream.readUShort();
    this.category = inputStream.readUByte();
    this.subcategory = inputStream.readUByte();
    this.spec = inputStream.readUByte();
    this.extra = inputStream.readUByte();
  }

  /**
   * Encodes the entity type to a binary output stream.
   * @param {OutputStream} outputStream - The output stream to write data to.
   */
  encodeToBinary(outputStream) {
    outputStream.writeUByte(this.kind);
    outputStream.writeUByte(this.domain);
    outputStream.writeUShort(this.country);
    outputStream.writeUByte(this.category);
    outputStream.writeUByte(this.subcategory);
    outputStream.writeUByte(this.spec);
    outputStream.writeUByte(this.extra);
  }

  /**
   * Convert to string with DIS notation (e.g. "1.1.2.4")
   * @returns {string}
   */
  toString() {
    return `${this.kind}.${this.domain}.${this.country}.${this.category}.${this.subcategory}.${this.spec}.${this.extra}`;
  }

  /**
   * @readonly
   * @enum {EntityKind}
   */
  static EntityKind = {
    OTHER: 0,
    PLATFORM: 1,
    MUNITION: 2,
    LIFE_FORM: 3,
    ENVIRONMENTAL: 4,
    CULTURAL_FEATURE: 5,
    SUPPLY: 6,
  };

  /**
   * @readonly
   * @enum {MunitionDomain}
   */
  static MunitionDomain = {
    OTHER: 0,
    ANTI_AIR: 1,
    ANTI_ARMOR: 2,
    ANTI_GUIDED_WEAPON: 3,
    ANTI_RADAR: 4,
    ANTI_SATELLITE: 5,
    ANTI_SHIP: 6,
    ANTI_SUBMARINE: 7,
    ANTI_PERSONNEL: 8,
    BATTLEFIELD_SUPPORT: 9,
    STRATEGIC: 10,
    TACTICAL: 11,
    DIRECTED_ENERGY_WEAPON: 12,
  };

  /**
   * @readonly
   * @enum {Domain}
   */
  static Domain = {
    OTHER: 0,
    LAND: 1,
    AIR: 2,
    SURFACE: 3,
    SUBSURFACE: 4,
    SPACE: 5,
    NON_COMBATANT: 6,
  };
}

export default EntityType;
export { EntityType };