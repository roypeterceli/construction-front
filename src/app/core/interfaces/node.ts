import { TagItem } from '@wow/shared/interfaces';

export enum NodeStateType {
  PENDING = 1,
  IN_PROGRESS = 2,
  BUILT = 3
}

export enum NodeSaleType {
  BLOCKED = 1,
  IN_SALE = 2
}

export const NODE_SUPPORT_STATE: Record<NodeStateType, TagItem> = {
  [NodeStateType.PENDING]: {
    text: 'Pendiente',
    textClass: 'text-blue-600',
    bgClass: 'bg-blue-600/10',
    previewClass: 'bg-blue-600'
  },
  [NodeStateType.IN_PROGRESS]: {
    text: 'En construcción',
    textClass: 'text-white',
    bgClass: 'bg-[#4C6DAF]',
    previewClass: 'bg-amber-600'
  },
  [NodeStateType.BUILT]: {
    text: 'Construido',
    textClass: 'text-green-600',
    bgClass: 'bg-[#4CAF50]',
    previewClass: 'bg-green-600'
  }
};

export const NODE_SALE_STATE: Record<NodeSaleType, TagItem> = {
  [NodeSaleType.BLOCKED]: {
    text: 'Bloqueado',
    textClass: 'text-white',
    bgClass: 'bg-[#9C9C9C]',
    previewClass: 'bg-blue-600'
  },
  [NodeSaleType.IN_SALE]: {
    text: 'En venta',
    textClass: 'text-amber-600',
    bgClass: 'bg-[#4CAF50]',
    previewClass: 'bg-amber-600'
  }
};

export interface NodeSupport {
  nodeId: number;
  nodeCorrelative: string;
  nodeSufix: string;
  napsCount: number;
  nodeState: number;
  stateSale: number;
}
export class Node{
  nodeId: number;
  nodeCorrelative: string;
  nodeSufix: string;
  napsCount: number;
  nodeState: NodeStateType;
  stateSale: NodeSaleType;

  constructor(model: Node){
    this.nodeId = model.nodeId;
    this.nodeCorrelative = model.nodeCorrelative;
    this.nodeSufix = model.nodeSufix;
    this.napsCount = model.napsCount;
    this.nodeState = model.nodeState;
    this.stateSale = model.stateSale;
  }

  get correlative(): string {
    return this.nodeCorrelative;
  }

  get sufix(): string | null {
    return this.nodeSufix;
  }

  get countNaps(): number | null {
    return this.napsCount;
  }

  // get nodeInitial(): string | null {
  //   return this.sufixNode;
  // }

  get stateNode(): TagItem | null {
    return NODE_SUPPORT_STATE[this.nodeState];

  }

  get saleState(): TagItem | null {
    return NODE_SALE_STATE[this.stateSale];

  }
}