import { TableColumn } from '@wow/shared/components/table';
import { ZoneSupport } from '@wow/core/interfaces';

export const columns: TableColumn<ZoneSupport>[] = [
  {
    label: 'Id',
    type: 'text',
    property: 'zone_id',
    visible: true,
    cssClasses: ['font-semibold', 'text-gray-800']
  },
  {
    label: 'Departamento',
    type: 'text',
    property: 'ubigeo_department_id',
    visible: true,
    cssClasses: ['font-semibold', 'text-gray-800']
  },
  {
    label: 'Provincia',
    type: 'text',
    property: 'ubigeo_province_id',
    visible: true,
    cssClasses: ['font-semibold', 'text-gray-800']
  },
  {
    label: 'Código',
    type: 'text',
    property: 'zone_code',
    visible: true,
     cssClasses: ['font-semibold', 'text-gray-800']
  },
  {
    label: 'Troncales',
    type: 'number',
    property: 'troncales',
    visible: true,
     cssClasses: ['font-semibold', 'text-gray-800']
  },
  {
    label: 'Nodos',
    type: 'number',
    property: 'box_naps',
    visible: true,
     cssClasses: ['font-semibold', 'text-gray-800']
  },
  {
    label: 'Avance',
    type: 'number',
    property: 'advance_id',
    visible: true,
    cssClasses: ['font-semibold', 'text-gray-800']
  },
  {
    label: 'F. Creación',
    type: 'date',
    format: 'yyyy-MM-dd',
    property: 'created_at',
    visible: true,
    cssClasses: ['font-semibold', 'text-gray-800']
  },
  {
    label: 'Estado',
    type: 'badge',
    property: 'zoneState',
    visible: true,
  },
  {
    label: 'Venta',
    type: 'badge',
    property: 'saleState',
    visible: true,
  },
  {
    label: 'Acciones',
    type: 'icon',
    icon: 'more_vert',
    property: 'shares',
    visible: true,
  }
]
