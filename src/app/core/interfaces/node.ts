import { TagItem } from '@wow/shared/interfaces';
import { NODE_SALE_STATE, NODE_SUPPORT_STATE, SaleType, StateType } from './support';

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
  nodeState: StateType;
  stateSale: SaleType;

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