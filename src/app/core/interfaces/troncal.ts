import { TagItem } from '@wow/shared/interfaces';
import { SaleType, StateType, TRONCAL_SALE_STATE, TRONCAL_SUPPORT_STATE } from './support';


export interface TroncalSupport {
  troncalId: number;
  troncalCode: string;
  ubigeoDistrictId: string;
  nodePrefix: string;
  nodeStart: number;
  nodeEnd: number;
  zoneId: number;
  troncalAdvance: number;
  nodesCount: number;
  updatedAt: Date;
  troncalState: number;
  stateSale: number;
}

export class Troncal{
  troncalId: number;
  troncalCode: string;
  ubigeoDistrictId: string;
  nodePrefix: string;
  nodeStart: number;
  nodeEnd: number;
  zoneId: number;
  troncalAdvance: number;
  nodesCount: number;
  updatedAt: Date;
  troncalState: StateType;
  saleState: SaleType;

  constructor(model: Troncal){
    this.troncalId = model.troncalId;
    this.troncalCode = model.troncalCode;
    this.ubigeoDistrictId = model.ubigeoDistrictId;
    this.nodePrefix = model.nodePrefix;
    this.nodeStart = model.nodeStart;
    this.nodeEnd = model.nodeEnd;
    this.zoneId = model.zoneId;
    this.troncalAdvance = model.troncalAdvance;
    this.nodesCount = model.nodesCount;
    this.updatedAt = model.updatedAt;
    this.troncalState = model.troncalState;
    this.saleState = model.saleState;
  }

  get codeTroncal(): string {
    return this.troncalCode;
  }

  get districtTroncal(): string | null {
    return this.ubigeoDistrictId;
  }

  get prefixTroncal(): string | null {
    return this.nodePrefix;
  }

  get nodeInitial(): number | null {
    return this.nodeStart;
  }

  get nodeFinal(): number | null {
    return this.nodeEnd;
  }

  get advanceTroncal(): number | null {
    return this.troncalAdvance;
  }

  get countNodes(): number | null {
    return this.nodesCount;
  }
  
  get fecUpdate(): Date | null {
    return this.updatedAt;
  }

  get stateTroncal(): TagItem | null {
    return TRONCAL_SUPPORT_STATE[this.troncalState];

  }

  get stateSale(): TagItem | null {
    return TRONCAL_SALE_STATE[this.saleState];
  }
}