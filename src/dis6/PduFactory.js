import PduFactory from "../common/PduFactory.js";
import PDU_MAP from "./PduMap.js";

class DIS6_PduFactory extends PduFactory {
  constructor() {
    super();

    this.pduMap = PDU_MAP;
  }
}

export default DIS6_PduFactory;
export { DIS6_PduFactory };