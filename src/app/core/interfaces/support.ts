import { TagItem } from '@wow/shared/interfaces';

export enum ZoneStateType {
  PENDING = 1,
  IN_PROGRESS = 2,
  BUILT = 3
}

export enum ZoneSaleType {
  BLOCKED = 1,
  IN_SALE = 2
}

export const ZONE_SUPPORT_STATE: Record<ZoneStateType, TagItem> = {
  [ZoneStateType.PENDING]: {
    text: 'Pendiente',
    textClass: 'text-blue-600',
    bgClass: 'bg-blue-600/10',
    previewClass: 'bg-blue-600'
  },
  [ZoneStateType.IN_PROGRESS]: {
    text: 'En construcción',
    textClass: 'text-white',
    bgClass: 'bg-[#4C6DAF]',
    previewClass: 'bg-amber-600'
  },
  [ZoneStateType.BUILT]: {
    text: 'Construido',
    textClass: 'text-green-600',
    bgClass: 'bg-[#4CAF50]',
    previewClass: 'bg-green-600'
  }
};

export const ZONE_SALE_STATE: Record<ZoneSaleType, TagItem> = {
  [ZoneSaleType.BLOCKED]: {
    text: 'Bloqueado',
    textClass: 'text-white',
    bgClass: 'bg-[#9C9C9C]',
    previewClass: 'bg-blue-600'
  },
  [ZoneSaleType.IN_SALE]: {
    text: 'En venta',
    textClass: 'text-amber-600',
    bgClass: 'bg-[#4CAF50]',
    previewClass: 'bg-amber-600'
  }
};

export interface EndZoneRequest {
  codeAtention: string;
  zendeskZone: string;
  zendeskUrl: string;
}


export class Zone {
  zoneId: number;
  ubigeoDepartmentId: string;
  ubigeoProvinceId: string;
  zoneCode: string;
  troncales: number;
  boxNaps: number;
  advanceId: number;
  stateId: ZoneStateType;
  saleId: ZoneSaleType;
  
  createdAt?: Date;
  updated_at?: Date;
  created_by?: number;
  updated_by?: number;

  constructor(model: Zone) {
    this.zoneId = model.zoneId;
    this.ubigeoDepartmentId = model.ubigeoDepartmentId;
    this.ubigeoProvinceId = model.ubigeoProvinceId;
    this.zoneCode = model.zoneCode;
    this.troncales = model.troncales;
    this.boxNaps = model.boxNaps;
    this.advanceId = model.advanceId;
    this.stateId = model.stateId;
    this.saleId = model.saleId;
    
    this.createdAt = model.createdAt;
    this.updated_at = model.updated_at;
    this.created_by = model.created_by;
    this.updated_by = model.updated_by;

  }

  // get zoneId(): number | null {
  //   return this.zoneId;
  // }

  get department(): string {
    return this.ubigeoDepartmentId;
  }

  get province(): string {
    return this.ubigeoProvinceId;
  }

  get zonecode(): string | null{
    return this.zoneCode;
  }

  get troncals(): number |null {
    return this.troncales;
  }

  get nodes(): number  |null{
    return this.boxNaps;
  }

  get advance(): number |null {
    return this.advanceId;
  }

  // get stateBadge(): TagItem | null {
  //   return ZONE_SUPPORT_STATE[this.state_id];
  // }

  get zoneState(): TagItem | null  {
    // const index = STATE_CONSTRUCTION.findIndex(item => item.id === this.state_id)
    // return STATE_CONSTRUCTION[index].name;
    return ZONE_SUPPORT_STATE[this.stateId];
    
  }

  get saleState(): TagItem | null  {
    // const index = STATE_SALE.findIndex(item => item.id === this.sale_id)
    // return STATE_SALE[index].name;
    return ZONE_SALE_STATE[this.saleId];
    
  }


}
