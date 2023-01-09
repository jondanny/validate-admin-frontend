import moment from 'moment';
export interface Column {
  id: string;
  label: string;
  minWidth?: number;
  align?: 'center';
  name?: boolean;
  format?: (value: number) => string;
  dateFormater?: (value: string) => string;
}

const dateConversionHandler = (date: string) => {
  return moment(date).format('DD-MM-YYYY');
};
const dateTimeConversionHandler = (date: string) => {
  return moment(date).format('DD-MM-YYYY hh:mm:ss');
};

export const columns: Column[] = [
  { id: 'uuid', label: 'UUID', minWidth: 100 },
  {
    id: 'marketType',
    label: 'Market Type',
    minWidth: 130,
    align: 'center',
    format: (value: number) => value.toLocaleString('en-US'),
  },
  {
    id: 'salePrice',
    label: 'Sale Price',
    minWidth: 130,
    align: 'center',
    format: (value: number) => value.toLocaleString('en-US'),
  },
  {
    id: 'saleCurrency',
    label: 'Currency',
    minWidth: 60,
    align: 'center',
    format: (value: number) => value.toLocaleString('en-US'),
  },
  {
    id: 'status',
    label: 'Orders Status',
    minWidth: 60,
    align: 'center',
    format: (value: number) => value.toLocaleString('en-US'),
  },
  {
    id: 'paymentStatus',
    label: 'Payment Status',
    minWidth: 60,
    align: 'center',
    name: true,
  },
];
