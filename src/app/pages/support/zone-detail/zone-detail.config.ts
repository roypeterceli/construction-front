import { TableColumn } from '@wow/shared/components/table';
import { Troncal } from '@wow/core/interfaces';

export const columns: TableColumn<Troncal>[] = [
  {
    label: 'Id',
    type: 'text',
    property: 'troncalId',
    visible: true,
    cssClasses: ['font-semibold', 'text-gray-800']
  },
  {
    label: 'Código',
    type: 'text',
    property: 'troncalCode',
    visible: true,
    cssClasses: ['font-semibold', 'text-gray-800']
  },
  {
    label: 'Distrito',
    type: 'text',
    property: 'ubigeoDistrictId',
    visible: true,
    cssClasses: ['font-semibold', 'text-gray-800']
  },
  {
    label: 'Prefijo',
    type: 'text',
    property: 'nodePrefix',
    visible: true,
    cssClasses: ['font-semibold', 'text-gray-800']
  },
  {
    label: 'N. Inicial',
    type: 'text',
    property: 'nodeStart',
    visible: true,
    cssClasses: ['font-semibold', 'text-gray-800']
  },
  {
    label: 'N. Final',
    type: 'text',
    property: 'nodeEnd',
    visible: true,
    cssClasses: ['font-semibold', 'text-gray-800']
  },
  {
    label: 'Constr.',
    type: 'text',
    property: 'troncalAdvance',
    visible: true,
    cssClasses: ['font-semibold', 'text-gray-800']
  },
  // {
  //   label: 'F. Actualización',
  //   type: 'date',
  //   format: 'yyyy-MM-dd',
  //   property: 'updatedAt',
  //   visible: true,
  //     cssClasses: []
  // },
  // {
  //   label: 'Estado',
  //   type: 'badge',
  //   property: 'stateTroncal',
  //   visible: true,
  //   cssClasses: []
  // },
  // {
  //   label: 'Venta',
  //   type: 'badge',
  //   property: 'stateSale',
  //   visible: true,
  //   cssClasses: []
  // },
]
