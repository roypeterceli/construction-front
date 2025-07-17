import { TagItem } from "@wow/shared/interfaces";
import { SaleType, StateType, ZONE_SALE_STATE, ZONE_SUPPORT_STATE } from "./support";


export interface ZoneSupport {
  zoneId: number;
  ubigeoDepartmentId: string;
  departmentName?: string;
  ubigeoProvinceId: string;
  provinceName?: string;
  zoneCode: string;
  troncales: string;
  boxNaps: string;
  advanceId: number;
  stateId: number;
  saleId: number;
}

export class Zone {
  zoneId: number;
  ubigeoDepartmentId: string;
  departmentName: string;
  ubigeoProvinceId: string;
  provinceName: string;
  zoneCode: string;
  troncales: number;
  boxNaps: number;
  advanceId: number;
  stateId: StateType;
  saleId: SaleType;

  createdAt?: Date;
  updated_at?: Date;
  created_by?: number;
  updated_by?: number;

  constructor(model: Zone) {
    this.zoneId = model.zoneId;
    this.ubigeoDepartmentId = model.ubigeoDepartmentId;
    this.departmentName = model.departmentName;
    this.ubigeoProvinceId = model.ubigeoProvinceId;
    this.provinceName = model.provinceName;
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
    const departamento = this.ubigeoDepartmentId
    // return this.ubigeoDepartmentId;
    return departamento;    
  }

  get province(): string {
    return this.ubigeoProvinceId;
  }

  get zonecode(): string | null {
    return this.zoneCode;
  }

  get troncals(): number | null {
    return this.troncales;
  }

  get nodes(): number | null {
    return this.boxNaps;
  }

  get advance(): number | null {
    return this.advanceId;
  }

  // get stateBadge(): TagItem | null {
  //   return ZONE_SUPPORT_STATE[this.state_id];
  // }

  get zoneState(): TagItem | null {
    // const index = STATE_CONSTRUCTION.findIndex(item => item.id === this.state_id)
    // return STATE_CONSTRUCTION[index].name;
    return ZONE_SUPPORT_STATE[this.stateId];

  }

  get saleState(): TagItem | null {
    // const index = STATE_SALE.findIndex(item => item.id === this.sale_id)
    // return STATE_SALE[index].name;
    return ZONE_SALE_STATE[this.saleId];

  }


}
