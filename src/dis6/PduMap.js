import { EntityStatePdu } from "./Pdu/EntityStatePdu.js";
/*import { FirePdu } from "./Pdu/FirePdu.js";
import { DetonationPdu } from "./Pdu/DetonationPdu.js";
import { CollisionPdu } from "./Pdu/CollisionPdu.js";
import { ServiceRequestPdu } from "./Pdu/ServiceRequestPdu.js";
import { CollisionElasticPdu } from "./Pdu/CollisionElasticPdu.js";
import { ResupplyReceivedPdu } from "./Pdu/ResupplyReceivedPdu.js";
import { RepairCompletePdu } from "./Pdu/RepairCompletePdu.js";
import { RepairResponsePdu } from "./Pdu/RepairResponsePdu.js";
import { CreateEntityPdu } from "./Pdu/CreateEntityPdu.js";
import { RemoveEntityPdu } from "./Pdu/RemoveEntityPdu.js";
import { StartResumePdu } from "./Pdu/StartResumePdu.js";
import { StopFreezePdu } from "./Pdu/StopFreezePdu.js";
import { AcknowledgePdu } from "./Pdu/AcknowledgePdu.js";
import { ActionRequestPdu } from "./Pdu/ActionRequestPdu.js";
import { ActionResponsePdu } from "./Pdu/ActionResponsePdu.js";
import { DataQueryPdu } from "./Pdu/DataQueryPdu.js";
import { SetDataPdu } from "./Pdu/SetDataPdu.js";
import { DataPdu } from "./Pdu/DataPdu.js";
import { EventReportPdu } from "./Pdu/EventReportPdu.js";
import { CommentPdu } from "./Pdu/CommentPdu.js";
import { ElectronicEmissionsPdu } from "./Pdu/ElectronicEmissionsPdu.js";
import { DesignatorPdu } from "./Pdu/DesignatorPdu.js";
import { TransmitterPdu } from "./Pdu/TransmitterPdu.js";
import { SignalPdu } from "./Pdu/SignalPdu.js";
import { ReceiverPdu } from "./Pdu/ReceiverPdu.js";
import { UaPdu } from "./Pdu/UaPdu.js";
import { IntercomSignalPdu } from "./Pdu/IntercomSignalPdu.js";
import { IntercomControlPdu } from "./Pdu/IntercomControlPdu.js";
import { IsPartOfPdu } from "./Pdu/IsPartOfPdu.js";
import { MinefieldStatePdu } from "./Pdu/MinefieldStatePdu.js";
import { MinefieldResponseNackPdu } from "./Pdu/MinefieldResponseNackPdu.js";
import { PointObjectStatePdu } from "./Pdu/PointObjectStatePdu.js";
import { ArealObjectStatePdu } from "./Pdu/ArealObjectStatePdu.js";
import { CreateEntityReliablePdu } from "./Pdu/CreateEntityReliablePdu.js";
import { RemoveEntityReliablePdu } from "./Pdu/RemoveEntityReliablePdu.js";
import { StopFreezeReliablePdu } from "./Pdu/StopFreezeReliablePdu.js";
import { AcknowledgeReliablePdu } from "./Pdu/AcknowledgeReliablePdu.js";
import { ActionRequestReliablePdu } from "./Pdu/ActionRequestReliablePdu.js";
import { ActionResponseReliablePdu } from "./Pdu/ActionResponseReliablePdu.js";
import { DataQueryReliablePdu } from "./Pdu/DataQueryReliablePdu.js";
import { SetDataReliablePdu } from "./Pdu/SetDataReliablePdu.js";
import { DataReliablePdu } from "./Pdu/DataReliablePdu.js";
import { EventReportReliablePdu } from "./Pdu/EventReportReliablePdu.js";
import { CommentReliablePdu } from "./Pdu/CommentReliablePdu.js";
import { RecordQueryReliablePdu } from "./Pdu/RecordQueryReliablePdu.js";
import { EntityStateUpdatePdu } from "./Pdu/EntityStateUpdatePdu.js";
import { EntityDamageStatusPdu } from "./Pdu/EntityDamageStatusPdu.js";*/

/** @type {Record<number, any>} */
const DIS6_PDU_MAP = {
  1: EntityStatePdu,
  /*2: FirePdu,
  3: DetonationPdu,
  4: CollisionPdu,
  5: ServiceRequestPdu,
  6: CollisionElasticPdu,
  7: ResupplyReceivedPdu,
  9: RepairCompletePdu,
  10: RepairResponsePdu,
  11: CreateEntityPdu,
  12: RemoveEntityPdu,
  13: StartResumePdu,
  14: StopFreezePdu,
  15: AcknowledgePdu,
  16: ActionRequestPdu,
  17: ActionResponsePdu,
  18: DataQueryPdu,
  19: SetDataPdu,
  20: DataPdu,
  21: EventReportPdu,
  22: CommentPdu,
  23: ElectronicEmissionsPdu,
  24: DesignatorPdu,
  25: TransmitterPdu,
  26: SignalPdu,
  27: ReceiverPdu,
  29: UaPdu,
  31: IntercomSignalPdu,
  32: IntercomControlPdu,
  36: IsPartOfPdu,
  37: MinefieldStatePdu,
  40: MinefieldResponseNackPdu,
  41: PointObjectStatePdu,
  45: ArealObjectStatePdu,
  51: CreateEntityReliablePdu,
  52: RemoveEntityReliablePdu,
  54: StopFreezeReliablePdu,
  55: AcknowledgeReliablePdu,
  56: ActionRequestReliablePdu,
  57: ActionResponseReliablePdu,
  58: DataQueryReliablePdu,
  59: SetDataReliablePdu,
  60: DataReliablePdu,
  61: EventReportReliablePdu,
  62: CommentReliablePdu,
  63: RecordQueryReliablePdu,
  67: EntityStateUpdatePdu,
  69: EntityDamageStatusPdu,*/
};

export default DIS6_PDU_MAP;
export { DIS6_PDU_MAP };