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
    label: 'Código',
    type: 'text',
    property: 'ubigeo_department_id',
    visible: true,
    cssClasses: ['font-semibold', 'text-gray-800']
  },
  {
    label: 'Distrito',
    type: 'text',
    property: 'ubigeo_province_id',
    visible: true,
    cssClasses: ['font-semibold', 'text-gray-800']
  },
  {
    label: 'Prefijo',
    type: 'text',
    property: 'zone_code',
    visible: true,
     cssClasses: ['font-semibold', 'text-gray-800']
  },
  {
    label: 'N. Inicial',
    type: 'number',
    property: 'troncales',
    visible: true,
     cssClasses: ['font-semibold', 'text-gray-800']
  },
  {
    label: 'N. Final',
    type: 'number',
    property: 'box_naps',
    visible: true,
     cssClasses: ['font-semibold', 'text-gray-800']
  },
  {
    label: 'Constr.',
    type: 'number',
    property: 'advance_id',
    visible: true,
    cssClasses: ['font-semibold', 'text-gray-800']
  },
  {
    label: 'F. Actualización',
    type: 'date',
    format: 'yyyy-MM-dd',
    property: 'created_at',
    visible: true,
    cssClasses: ['font-semibold', 'text-gray-800']
  },
  {
    label: 'Estado',
    type: 'badge',
    property: 'stateBadge',
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
