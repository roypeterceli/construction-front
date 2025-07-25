import { TableColumn } from '@wow/shared/components/table';
import { Zone } from '@wow/core/interfaces';

export const columns: TableColumn<Zone>[] = [
  {
    label: 'Id',
    type: 'text',
    property: 'zoneId',
    visible: true,
    cssClasses: ['font-semibold', 'text-gray-800']
  },
  { 
    label: 'Departamento',
    type: 'text',
    property: 'departmentName',
    visible: true,
    cssClasses: ['font-semibold', 'text-gray-800']
  },
  {
    label: 'Provincia',
    type: 'text',
    property: 'provinceName',
    visible: true,
    cssClasses: ['font-semibold', 'text-gray-800']
  },
  {
    label: 'Código',
    type: 'text',
    property: 'zoneCode',
    visible: true,
    cssClasses: ['font-semibold', 'text-[#7030A0]']
  },
  {
    label: 'Tot. Troncales',
    type: 'text',
    property: 'troncalTotals',
    visible: true
  },
  {
    label: 'Troncales',
    type: 'text',
    property: 'troncales',
    visible: true
  },
  {
    label: 'Tot. Nodos',
    type: 'text',
    property: 'totNodes',
    visible: true
  },
  {
    label: 'Nodos',
    type: 'text',
    property: 'boxNaps',
    visible: true
  },
  {
    label: 'Avance',
    type: 'text',
    property: 'advanceId',
    visible: true,
    cssClasses: ['font-semibold', 'text-gray-800', 'after:content-["%"]']
  },
  {
    label: 'F. Creación',
    type: 'date',
    format: 'yyyy-MM-dd',
    property: 'createdAt',
    visible: true,
    cssClasses: []
  },
  {
    label: 'Estado',
    type: 'badge',
    property: 'zoneState',
    visible: true,
    cssClasses: []
  },
  {
    label: 'Venta',
    type: 'badge',
    property: 'saleState',
    visible: true,
    cssClasses: []
  }
]
