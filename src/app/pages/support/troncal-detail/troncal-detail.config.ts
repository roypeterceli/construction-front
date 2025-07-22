import { TableColumn } from '@wow/shared/components/table';
import { Node } from '@wow/core/interfaces';

export const columns: TableColumn<Node>[] = [
  // {
  //   label: 'Id',
  //   type: 'text',
  //   property: 'nodeId',
  //   visible: true,
  //   cssClasses: ['font-semibold', 'text-gray-800']
  // },
  {
    label: 'Nodo',
    type: 'text',
    property: 'nodeCorrelative',
    visible: true,
    cssClasses: ['font-semibold', 'text-gray-800']
  },
  {
    label: 'Subnodo',
    type: 'text',
    property: 'nodeSufix',
    visible: true,
    cssClasses: ['font-semibold', 'text-gray-800']
  },
  {
    label: 'Naps',
    type: 'text',
    property: 'napsCount',
    visible: true,
    cssClasses: ['font-semibold', 'text-gray-800']
  },
  {
    label: 'Estado',
    type: 'badge',
    property: 'stateNode',
    visible: true,
  },
  {
    label: 'Venta',
    type: 'badge',
    property: 'saleBadge',
    visible: true,
  }
]
