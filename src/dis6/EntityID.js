/**
 * Each entity in a given DIS simulation application shall be given an entity identifier number unique to all
 * other entities in that application. This identifier number is valid for the duration of the exercise; however,
 * entity identifier numbers may be reused when all possible numbers have been exhausted. No entity shall
 * have an entity identifier number of NO_ENTITY, ALL_ENTITIES, or RQST_ASSIGN_ID. The entity identifier
 * number need not be registered or retained for future exercises. The entity identifier number shall be
 * specified by a 16-bit unsigned integer. An entity identifier number equal to zero with valid site and
 * application identification shall address a simulation application. An entity identifier number equal to
 * ALL_ENTITIES shall mean all entities within the specified site and application. An entity identifier number
 * equal to RQST_ASSIGN_ID allows the receiver of the create entity to define the entity identifier number of
 * the new entity.
 */

/**
 * @typedef {import("../common/InputStream.js").default} InputStream
 * @typedef {import("../common/OutputStream.js").default} OutputStream
 */

class EntityID {
  /**
   * The site ID.
   * @type {number}
   */
  site = 0;

  /**
   * The application ID.
   * @type {number}
   */
  application = 0;

  /**
   * The entity ID.
   * @type {number}
   */
  entity = 0;

  /**
   * Initializes the entity ID from a binary input stream.
   * @param {InputStream} inputStream - The input stream to read data from.
   */
  initFromBinary(inputStream) {
    this.site = inputStream.readUShort();
    this.application = inputStream.readUShort();
    this.entity = inputStream.readUShort();
  }

  /**
   * Encodes the entity ID to a binary output stream.
   * @param {OutputStream} outputStream - The output stream to write data to.
   */
  encodeToBinary(outputStream) {
    outputStream.writeUShort(this.site);
    outputStream.writeUShort(this.application);
    outputStream.writeUShort(this.entity);
  }

  /**
   * 
   * @param {EntityID} entityID_A 
   * @param {EntityID} entityID_B 
   * @returns 
   */
  static checkMatchingEntityID(entityID_A, entityID_B) {
    if (entityID_A.siteID === entityID_B.siteID &&
      entityID_A.applicationID === entityID_B.applicationID &&
      entityID_A.entityID === entityID_B.entityID) {
      return true;
    }
  }

  toString() {
    return `${this.site}.${this.application}.${this.entity}`;
  }
}

export default EntityID;
export { EntityID };