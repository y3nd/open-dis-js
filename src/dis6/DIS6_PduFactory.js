import PduFactory from "../common/PduFactory.js";
import DIS6_PDU_MAP from "./DIS6_PduMap.js";

class DIS6_PduFactory extends PduFactory {
  constructor() {
    super();

    this.pduMap = DIS6_PDU_MAP;
  }
}

export default DIS6_PduFactory;
export { DIS6_PduFactory };