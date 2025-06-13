export interface User {
  nIdUsuario: number;
  sCodigo: string;
  sNombres: string;
  sApePaterno: string;
  sApeMaterno: string;
  sEmail: string;
  nTelefono: number;
  nEstado: Estado;
  nIdCanal: null;
  sCanal: null;
  nIdOrigen: null;
  sOrigen: null;
  nIdUnidad: number;
  sUnidad: string;
  nIdCanal2: number;
  sCanal2: string;
  nIdSubcanal: number;
  sSubcanal: string;
  nIdRazonSocial: number;
  sRazonSocial: string;
  nIdSubcanal2: null;
  sSubcanal2: null;
  nIdSubcanal3: null;
  sSubcana3: null;
  nIdCuadrilla: null;
  nIdCuadrillaDealer: null;
  sCuadrilla: null;
  sCuadrillaDealer: null;
  bCheckDealer: number;
  nIdVentaIndirectaDealer: null;
  sVentaIndirecta: null;
  bCheckVentaDealer: number;
  bCheckOrigen: number;
  aRol: Rol;
  sTipoDoc: string;
  sTipoDocVal: string;
  sNroDoc: string;
  bAsignacionEquipo: number;
  nIdInbox: null;
  bAyudante: null;
  sFileTecnico: null;
  dContrato: null;
  dRenuncia: null;
  nIdArea: number;
  nHoraInicio: string;
  nHorarioFinal: string;
  nIsBlocked: number;
  sIsBlockedDesc: string;
}

export interface Rol {
  nIdRol: number;
  bAgendar: boolean;
  Zytrust: boolean;
  sDescription: string;
  ContratoFisico: boolean;
}

export interface Estado {
  nIdEstado: number;
  sEstado: string;
}
