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
 */

class EntityStatePdu {
  constructor() {
    this.protocolVersion = 6;
    this.exerciseID = 0;
    this.pduType = 1;
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
    this.entityAppearance = inputStream.readInt();
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

  encodeToBinary(outputStream) {
    outputStream.writeUByte(this.protocolVersion);
    outputStream.writeUByte(this.exerciseID);
    outputStream.writeUByte(this.pduType);
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
    outputStream.writeInt(this.entityAppearance);
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

  getPaintScheme() {
    return this._extractBits(0x1, 0);
  }

  setPaintScheme(val) {
    this._setBits(0x1, 0, val);
  }

  getMobility() {
    return this._extractBits(0x2, 1);
  }

  setMobility(val) {
    this._setBits(0x2, 1, val);
  }

  getFirepower() {
    return this._extractBits(0x4, 2);
  }

  setFirepower(val) {
    this._setBits(0x4, 2, val);
  }

  getDamage() {
    return this._extractBits(0x18, 3);
  }

  setDamage(val) {
    this._setBits(0x18, 3, val);
  }

  getSmoke() {
    return this._extractBits(0x60, 5);
  }

  setSmoke(val) {
    this._setBits(0x60, 5, val);
  }

  getTrailingEffects() {
    return this._extractBits(0x180, 7);
  }

  setTrailingEffects(val) {
    this._setBits(0x180, 7, val);
  }

  getHatch() {
    return this._extractBits(0xe00, 9);
  }

  setHatch(val) {
    this._setBits(0xe00, 9, val);
  }

  getHeadlights() {
    return this._extractBits(0x1000, 12);
  }

  setHeadlights(val) {
    this._setBits(0x1000, 12, val);
  }

  getTailLights() {
    return this._extractBits(0x2000, 13);
  }

  setTailLights(val) {
    this._setBits(0x2000, 13, val);
  }

  getBrakeLights() {
    return this._extractBits(0x4000, 14);
  }

  setBrakeLights(val) {
    this._setBits(0x4000, 14, val);
  }

  getFlaming() {
    return this._extractBits(0x8000, 15);
  }

  setFlaming(val) {
    this._setBits(0x8000, 15, val);
  }

  getLauncher() {
    return this._extractBits(0x10000, 16);
  }

  setLauncher(val) {
    this._setBits(0x10000, 16, val);
  }

  getCamouflageType() {
    return this._extractBits(0x60000, 17);
  }

  setCamouflageType(val) {
    this._setBits(0x60000, 17, val);
  }
}

export default EntityStatePdu;
export { EntityStatePdu };