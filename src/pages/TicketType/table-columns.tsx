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
  return moment(date).format('DD-MM-YYYY hh:mm:ss');
};

export const columns: Column[] = [
  { id: 'uuid', label: 'UUID', minWidth: 100 },
  {
    id: 'name',
    label: 'Name',
    minWidth: 130,
    align: 'center',
    format: (value: number) => value.toLocaleString('en-US'),
  },
  {
    id: 'saleEnabled',
    label: 'Sale Enabled',
    minWidth: 130,
    align: 'center',
    format: (value: number) => value.toLocaleString('en-US'),
  },
  {
    id: 'saleAmount',
    label: 'Sale Amount',
    minWidth: 130,
    align: 'center',
    format: (value: number) => value.toLocaleString('en-US'),
  },
  {
    id: 'saleEnabledFromDate',
    label: 'Sale Enabled From',
    minWidth: 150,
    align: 'center',
    dateFormater: (value: string) => dateConversionHandler(value),
  },
  {
    id: 'saleEnabledToDate',
    label: 'Sale Enabled To',
    minWidth: 150,
    align: 'center',
    dateFormater: (value: string) => dateConversionHandler(value),
  },
  {
    id: 'resaleEnabled',
    label: 'Resale Enabled',
    minWidth: 130,
    align: 'center',
    format: (value: number) => value.toLocaleString('en-US'),
  },
  {
    id: 'resaleMaxPrice',
    label: 'Resale Max Price',
    minWidth: 120,
    align: 'center',
    format: (value: number) => value.toLocaleString('en-US'),
  },
  {
    id: 'resaleMinPrice',
    label: 'Resale Min Price',
    minWidth: 120,
    align: 'center',
    format: (value: number) => value.toLocaleString('en-US'),
  },
  {
    id: 'resaleEnabledFromDate',
    label: 'Resale Enabled From',
    minWidth: 150,
    align: 'center',
    dateFormater: (value: string) => dateConversionHandler(value),
  },
  {
    id: 'resaleEnabledToDate',
    label: 'Resale Enabled To',
    minWidth: 150,
    align: 'center',
    dateFormater: (value: string) => dateConversionHandler(value),
  },
  {
    id: 'createdAt',
    label: 'Created At',
    minWidth: 150,
    align: 'center',
    dateFormater: (value: string) => dateConversionHandler(value),
  },
  {
    id: 'updatedAt',
    label: 'Updated At',
    minWidth: 150,
    align: 'center',
    dateFormater: (value: string) => dateConversionHandler(value),
  },
];
