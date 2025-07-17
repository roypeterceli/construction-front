import { TagItem } from '@wow/shared/interfaces';

/*
  Enums
*/

export enum StateType {
  PENDING = 1,
  IN_PROGRESS = 2,
  BUILT = 3
}

export enum SaleType {
  BLOCKED = 1,
  IN_SALE = 2
}

/*
  Helpers
*/

const createSupportState = (
  pending: TagItem,
  inProgress: TagItem,
  built: TagItem
): Record<StateType, TagItem> => ({
  [StateType.PENDING]: pending,
  [StateType.IN_PROGRESS]: inProgress,
  [StateType.BUILT]: built
});

const createSaleState = (
  blocked: TagItem,
  inSale: TagItem
): Record<SaleType, TagItem> => ({
  [SaleType.BLOCKED]: blocked,
  [SaleType.IN_SALE]: inSale
});

/*
  Zone States
*/
export const ZONE_SUPPORT_STATE = createSupportState(
  {
    text: 'Pendiente',
    textClass: 'text-blue-600',
    bgClass: 'bg-blue-600/10',
    previewClass: 'bg-blue-600'
  },
  {
    text: 'En construcción',
    textClass: 'text-white',
    bgClass: 'bg-[#4C6DAF]',
    previewClass: 'bg-amber-600'
  },
  {
    text: 'Construido',
    textClass: 'text-green-600',
    bgClass: 'bg-[#4CAF50]',
    previewClass: 'bg-green-600'
  }
);

export const ZONE_SALE_STATE = createSaleState(
  {
    text: 'Bloqueado',
    textClass: 'text-white',
    bgClass: 'bg-[#9C9C9C]',
    previewClass: 'bg-blue-600'
  },
  {
    text: 'En venta',
    textClass: 'text-amber-600',
    bgClass: 'bg-[#4CAF50]',
    previewClass: 'bg-amber-600'
  }
);

/*
  Troncal States
*/
export const TRONCAL_SUPPORT_STATE = { ...ZONE_SUPPORT_STATE };
export const TRONCAL_SALE_STATE = { ...ZONE_SALE_STATE };

/*
  Node States
*/
export const NODE_SUPPORT_STATE = { ...ZONE_SUPPORT_STATE };
export const NODE_SALE_STATE = { ...ZONE_SALE_STATE };
