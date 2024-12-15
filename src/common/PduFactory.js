import InputStream from './InputStream.js';

class PduFactory {
  /** @type {Record<number, any>} */
  pduMap = null;
  /**
   * Decodes incoming binary data and returns the appropriate PDU type.
   *
   * @param {ArrayBuffer} data - The IEEE 1278.1 binary data.
   * @returns {Object} An instance of the appropriate PDU type.
   * @throws {Error} If the PDU type is unrecognized.
   */
  createPdu(data) {
    const asUint8Array = new Uint8Array(data);
    const pduType = asUint8Array[2];
    const inputStream = new InputStream(data);

    /** @type {Class} */
    const PduClass = this.pduMap[pduType];
    if (!PduClass) {
      throw new Error(`PduType ${pduType} unrecognized. Add PDU in PDU_MAP.`);
    }

    const newPdu = new PduClass();
    newPdu.initFromBinary(inputStream);
    return newPdu;
  }

  /**
   * Parses a bundle of PDUs from the given data.
   *
   * @param {ArrayBuffer} data - The binary data containing multiple PDUs.
   * @returns {Object[]} An array of PDU instances.
   */
  getPdusFromBundle(data) {
    // Implement if needed; logic for handling bundles
  }
}

export default PduFactory;
export { PduFactory };