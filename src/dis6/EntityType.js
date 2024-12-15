/**
 * Section 5.2.16. Identifies the type of entity, including kind of entity, domain (surface, subsurface, air, etc), country, category, etc
 */

/**
 * @typedef {import("../common/InputStream.js").default} InputStream
 * @typedef {import("../common/OutputStream.js").default} OutputStream
 */

class EntityType {
  /**
   * Kind of entity.
   * @type {number}
   */
  entityKind = 0;

  /**
   * Domain of entity (air, surface, subsurface, space, etc).
   * @type {number}
   */
  domain = 0;

  /**
   * Country to which the design of the entity is attributed.
   * @type {number}
   */
  country = 0;

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
    this.entityKind = inputStream.readUByte();
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
    outputStream.writeUByte(this.entityKind);
    outputStream.writeUByte(this.domain);
    outputStream.writeUShort(this.country);
    outputStream.writeUByte(this.category);
    outputStream.writeUByte(this.subcategory);
    outputStream.writeUByte(this.spec);
    outputStream.writeUByte(this.extra);
  }
}

export default EntityType;
export { EntityType };