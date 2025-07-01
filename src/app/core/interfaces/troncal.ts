
export interface TroncalSupport {
  idTroncal: string;
  codeTroncal: string;
  districtTroncal: string;
  prefixTroncal: string;
  nodeInitial: string;
  nodeFinal: string;
  zoneId: string;
  percentage: string;
  fecUpdate: Date;
  stateTroncal: string;
  stateSale: string;
}

export class Troncal{
  idTroncal: string;
  codeTroncal: string;
  districtTroncal: string;
  prefixTroncal: string;
  nodeInitial: string;
  nodeFinal: string;
  zoneId: string;
  percentage: string;
  fecUpdate: Date;
  stateTroncal: string;
  stateSale: string;

  constructor(model: Troncal){
    this.idTroncal = model.idTroncal;
    this.codeTroncal = model.codeTroncal;
    this.districtTroncal = model.districtTroncal;
    this.prefixTroncal = model.prefixTroncal;
    this.nodeInitial = model.nodeInitial;
    this.nodeFinal = model.nodeFinal;
    this.zoneId = model.zoneId;
    this.percentage = model.percentage;
    this.fecUpdate = model.fecUpdate;
    this.stateTroncal = model.stateTroncal;
    this.stateSale = model.stateSale;
  }

  // get zendeskTicket(): string | null {
  //   return this.zendesk_ticket;
  // }
}