import { TableColumn } from '@wow/shared/components/table';
import { ZoneSupport } from '@wow/core/interfaces';

export const columns: TableColumn<ZoneSupport>[] = [
  {
    label: 'ID',
    type: 'text',
    property: 'zoneId',
    visible: true,
    cssClasses: ['font-semibold', 'text-gray-800']
  },
  {
    label: 'Departamento',
    type: 'text',
    property: 'department',
    visible: true,
    cssClasses: ['font-semibold', 'text-gray-800']
  },
  {
    label: 'Provincia',
    type: 'text',
    property: 'province',
    visible: true,
    cssClasses: ['font-semibold', 'text-gray-800']
  },
  {
    label: 'Código',
    type: 'text',
    property: 'zoneCode',
    visible: true
  },
  // {
  //   label: 'Troncales',
  //   type: 'number',
  //   property: 'troncals',
  //   visible: true
  // },
  // {
  //   label: 'Nodos',
  //   type: 'number',
  //   property: 'nodes',
  //   visible: true
  // },
  // {
  //   label: 'Avance',
  //   type: 'number',
  //   property: 'advance',
  //   visible: true
  // },
  {
    label: 'F. Creación',
    type: 'date',
    format: 'yyyy-MM-dd',
    property: 'created_at',
    visible: true
  },
  {
    label: 'Estado',
    type: 'badge',
    property: 'stateBadge',
    visible: true
  },
  {
    label: 'Venta',
    type: 'badge',
    property: 'saleState',
    visible: true
  },
  {
    label: 'Acciones',
    type: 'icon',
    icon: 'open_in_new',
    property: 'shares',
    visible: true
  }
]
