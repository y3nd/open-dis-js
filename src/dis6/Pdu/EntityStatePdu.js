/**
 * Section 5.3.3.1. Represents the position and state of one entity in the world.
 *
 * Licensed under the BSD open source license.
 * @author DMcG
 * @author y3n
 */

import EntityID from "../EntityID.js";
import EntityType from "../EntityType.js";
import Vector3Float from "../Vector3Float.js";
import Vector3Double from "../Vector3Double.js";
import Orientation from "../Orientation.js";
import DeadReckoningParameter from "../DeadReckoningParameter.js";
import Marking from "../Marking.js";
import ArticulationParameter from "../ArticulationParameter.js";

/**
 * @typedef {import("../../common/InputStream.js").default} InputStream
 * @typedef {import("../../common/OutputStream.js").default} OutputStream
 */

/**
 * @typedef {number} ForceID
 */

class EntityStatePdu {
  /**
   * @readonly
   */
  static pduType = 1;

  /**
   * @readonly
   * @enum {ForceID}
   */
  static FORCE_ID = {
    OTHER: 0,
    FRIENDLY: 1,
    OPPOSING: 2,
    NEUTRAL: 3,
    FRIENDLY_2: 4,
    OPPOSING_2: 5,
    NEUTRAL_2: 6,
    FRIENDLY_3: 7,
    OPPOSING_3: 8,
    NEUTRAL_3: 9,
    FRIENDLY_4: 10,
    OPPOSING_4: 11,
    NEUTRAL_4: 12,
    FRIENDLY_5: 13,
    OPPOSING_5: 14,
    NEUTRAL_5: 15,
    FRIENDLY_6: 16,
    OPPOSING_6: 17,
    NEUTRAL_6: 18,
    FRIENDLY_7: 19,
    OPPOSING_7: 20,
    NEUTRAL_7: 21,
    FRIENDLY_8: 22,
    OPPOSING_8: 23,
    NEUTRAL_8: 24,
    FRIENDLY_9: 25,
    OPPOSING_9: 26,
    NEUTRAL_9: 27,
    FRIENDLY_10: 28,
    OPPOSING_10: 29,
    NEUTRAL_10: 30,
  };

  constructor() {
    this.protocolVersion = 6;
    this.exerciseID = 0;
    this.protocolFamily = 1;
    this.timestamp = 0;
    this.pduLength = 0;
    this.padding = 0;

    this.entityID = new EntityID();
    this.forceId = 0;
    this.numberOfArticulationParameters = 0;
    this.entityType = new EntityType();
    this.alternativeEntityType = new EntityType();
    this.entityLinearVelocity = new Vector3Float();
    this.entityLocation = new Vector3Double();
    this.entityOrientation = new Orientation();
    this.entityAppearance = 0;
    this.deadReckoningParameters = new DeadReckoningParameter();
    this.marking = new Marking();
    this.capabilities = 0;
    this.articulationParameters = [];
  }

  /**
   * 
   * @param {InputStream} inputStream 
   */
  initFromBinary(inputStream) {
    this.protocolVersion = inputStream.readUByte();
    this.exerciseID = inputStream.readUByte();
    this.pduType = inputStream.readUByte();
    this.protocolFamily = inputStream.readUByte();
    this.timestamp = inputStream.readUInt();
    this.pduLength = inputStream.readUShort();
    this.padding = inputStream.readShort();
    this.entityID.initFromBinary(inputStream);
    this.forceId = inputStream.readUByte();
    this.numberOfArticulationParameters = inputStream.readByte();
    this.entityType.initFromBinary(inputStream);
    this.alternativeEntityType.initFromBinary(inputStream);
    this.entityLinearVelocity.initFromBinary(inputStream);
    this.entityLocation.initFromBinary(inputStream);
    this.entityOrientation.initFromBinary(inputStream);
    this.entityAppearance = inputStream.readUInt();
    this.deadReckoningParameters.initFromBinary(inputStream);
    this.marking.initFromBinary(inputStream);
    this.capabilities = inputStream.readInt();
    for (let idx = 0; idx < this.numberOfArticulationParameters; idx++) {
      /** @type {ArticulationParameter} */
      const anX = new this.dependencies.ArticulationParameter();
      anX.initFromBinary(inputStream);
      this.articulationParameters.push(anX);
    }
  }

  /**
   * 
   * @param {OutputStream} outputStream 
   */
  encodeToBinary(outputStream) {
    outputStream.writeUByte(this.protocolVersion);
    outputStream.writeUByte(this.exerciseID);
    outputStream.writeUByte(EntityStatePdu.pduType);
    outputStream.writeUByte(this.protocolFamily);
    outputStream.writeUInt(this.timestamp);
    outputStream.writeUShort(this.pduLength);
    outputStream.writeShort(this.padding);
    this.entityID.encodeToBinary(outputStream);
    outputStream.writeUByte(this.forceId);
    outputStream.writeByte(this.numberOfArticulationParameters);
    this.entityType.encodeToBinary(outputStream);
    this.alternativeEntityType.encodeToBinary(outputStream);
    this.entityLinearVelocity.encodeToBinary(outputStream);
    this.entityLocation.encodeToBinary(outputStream);
    this.entityOrientation.encodeToBinary(outputStream);
    outputStream.writeUInt(this.entityAppearance);
    this.deadReckoningParameters.encodeToBinary(outputStream);
    this.marking.encodeToBinary(outputStream);
    outputStream.writeInt(this.capabilities);
    for (const param of this.articulationParameters) {
      param.encodeToBinary(outputStream);
    }
  }

  _extractBits(mask, shift) {
    return (this.entityAppearance & mask) >> shift;
  }

  _setBits(mask, shift, val) {
    this.entityAppearance = (this.entityAppearance & ~mask) | (val << shift);
  }
}

export default EntityStatePdu;
export { EntityStatePdu };