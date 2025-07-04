import { TagItem } from '@wow/shared/interfaces';

export enum TroncalStateType {
  PENDING = 1,
  IN_PROGRESS = 2,
  BUILT = 3
}

export enum TroncalSaleType {
  BLOCKED = 1,
  IN_SALE = 2
}

export const TRONCAL_SUPPORT_STATE: Record<TroncalStateType, TagItem> = {
  [TroncalStateType.PENDING]: {
    text: 'Pendiente',
    textClass: 'text-blue-600',
    bgClass: 'bg-blue-600/10',
    previewClass: 'bg-blue-600'
  },
  [TroncalStateType.IN_PROGRESS]: {
    text: 'En construcción',
    textClass: 'text-white',
    bgClass: 'bg-[#4C6DAF]',
    previewClass: 'bg-amber-600'
  },
  [TroncalStateType.BUILT]: {
    text: 'Construido',
    textClass: 'text-green-600',
    bgClass: 'bg-[#4CAF50]',
    previewClass: 'bg-green-600'
  }
};

export const TRONCAL_SALE_STATE: Record<TroncalSaleType, TagItem> = {
  [TroncalSaleType.BLOCKED]: {
    text: 'Bloqueado',
    textClass: 'text-white',
    bgClass: 'bg-[#9C9C9C]',
    previewClass: 'bg-blue-600'
  },
  [TroncalSaleType.IN_SALE]: {
    text: 'En venta',
    textClass: 'text-amber-600',
    bgClass: 'bg-[#4CAF50]',
    previewClass: 'bg-amber-600'
  }
};


export interface TroncalSupport {
  troncalId: number;
  troncalCode: string;
  ubigeoDistrictId: string;
  nodePrefix: string;
  nodeStart: number;
  nodeEnd: number;
  zoneId: number;
  troncalAdvance: number;
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
  updatedAt: Date;
  troncalState: TroncalStateType;
  saleState: TroncalSaleType;

  constructor(model: Troncal){
    this.troncalId = model.troncalId;
    this.troncalCode = model.troncalCode;
    this.ubigeoDistrictId = model.ubigeoDistrictId;
    this.nodePrefix = model.nodePrefix;
    this.nodeStart = model.nodeStart;
    this.nodeEnd = model.nodeEnd;
    this.zoneId = model.zoneId;
    this.troncalAdvance = model.troncalAdvance;
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