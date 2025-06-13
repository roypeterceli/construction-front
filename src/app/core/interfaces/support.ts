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
  troncal_id: number;
  node_id: number;
  advance_id: number;
  zone_state: ZoneStateType;
  sale_state: ZoneSaleType;
  
  created_at: Date;
  created_by?: number;

  constructor(model: ZoneSupport) {
    this.zone_id = model.zone_id;
    this.ubigeo_department_id = model.ubigeo_department_id;
    this.ubigeo_province_id = model.ubigeo_province_id;
    this.zone_code = model.zone_code;
    this.troncal_id = model.troncal_id;
    this.node_id = model.node_id;
    this.advance_id = model.advance_id;
    this.zone_state = model.zone_state;
    this.sale_state = model.sale_state;

    this.created_by = model.created_by;
    this.created_at = model.created_at;
  }

  get stateBadge(): TagItem {
    return ZONE_SUPPORT_STATE[this.zone_state];
  }


  get zoneId(): number {
    return this.zone_id;
  }
  get department(): string {
    return this.ubigeo_department_id;
  }

  get province(): string {
    return this.ubigeo_province_id;
  }

  get zoneCode(): string | null {
    return this.zone_code;
  }

  // get troncals(): number {
  //   return this.troncal_id;
  // }

  // get nodes(): number {
  //   return this.node_id;
  // }

  // get advance(): number {
  //   return this.advance_id;
  // }

  get zoneState(): number {
    return this.zone_state;
  }

  get saleState(): number {
    return this.sale_state;
  }

  get shares(): string | null {
    return this.shares;
  }

}
