import { TagItem } from '@wow/shared/interfaces';
import { STATE_CONSTRUCTION, STATE_SALE } from '@wow/core/interfaces';

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
    textClass: 'text-amber-600',
    bgClass: 'bg-amber-600/10',
    previewClass: 'bg-amber-600'
  },
  [ZoneStateType.BUILT]: {
    text: 'Construido',
    textClass: 'text-green-600',
    bgClass: 'bg-green-600/10',
    previewClass: 'bg-green-600'
  }
};

export const ZONE_SALE_STATE: Record<ZoneSaleType, TagItem> = {
  [ZoneSaleType.BLOCKED]: {
    text: 'Bloqueado',
    textClass: 'text-blue-600',
    bgClass: 'bg-blue-600/10',
    previewClass: 'bg-blue-600'
  },
  [ZoneSaleType.IN_SALE]: {
    text: 'En venta',
    textClass: 'text-amber-600',
    bgClass: 'bg-amber-600/10',
    previewClass: 'bg-amber-600'
  }
};

export interface EndZoneRequest {
  codeAtention: string;
  zendeskZone: string;
  zendeskUrl: string;
}


export class ZoneSupport {
  zone_id: number;
  ubigeo_department_id: string;
  ubigeo_province_id: string;
  zone_code: string;
  troncales: number;
  box_naps: number;
  advance_id: number;
  state_id: ZoneStateType;
  sale_id: ZoneSaleType;
  
  created_at?: Date;
  updated_at?: Date;
  created_by?: number;
  updated_by?: number;

  constructor(model: ZoneSupport) {
    this.zone_id = model.zone_id;
    this.ubigeo_department_id = model.ubigeo_department_id;
    this.ubigeo_province_id = model.ubigeo_province_id;
    this.zone_code = model.zone_code;
    this.troncales = model.troncales;
    this.box_naps = model.box_naps;
    this.advance_id = model.advance_id;
    this.state_id = model.state_id;
    this.sale_id = model.sale_id;
    
    this.created_at = model.created_at;
    this.updated_at = model.updated_at;
    this.created_by = model.created_by;
    this.updated_by = model.updated_by;

  }

  get stateBadge(): TagItem | null {
    return ZONE_SUPPORT_STATE[this.state_id];
  }


  get zoneId(): number | null {
    return this.zone_id;
  }

  get department(): string {
    return this.ubigeo_department_id;
  }

  get province(): string {
    return this.ubigeo_province_id;
  }

  get zoneCode(): string | null{
    return this.zone_code;
  }

  get troncals(): number |null {
    return this.troncales;
  }

  get nodes(): number  |null{
    return this.box_naps;
  }

  get advance(): number |null {
    return this.advance_id;
  }

  get zoneState(): string |null {
    const index = STATE_CONSTRUCTION.findIndex(item => item.id === this.state_id)
    return STATE_CONSTRUCTION[index].name;
  }

  get saleState(): string | null {
    const index = STATE_SALE.findIndex(item => item.id === this.sale_id)
    return STATE_SALE[index].name;
  }

  get shares(): string | null {
    return this.shares;
  }

}
