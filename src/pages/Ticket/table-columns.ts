import moment from 'moment';
export interface Column {
  id: string;
  label: string;
  minWidth?: number;
  align?: 'center';
  format?: (value: number) => string;
  dateFormater?: (value: string) => string;
}

const dateConversionHandler = (date: string) => {
  return moment(date).format('DD-MM-YYYY hh:mm:ss');
};

export const columns: Column[] = [
  { id: 'id', label: 'Id', minWidth: 80 },
  { id: 'uuid', label: 'UUID', minWidth: 300 },
  {
    id: 'name',
    label: 'Name',
    minWidth: 130,
    align: 'center',
    format: (value: number) => value.toLocaleString('en-US'),
  },
  {
    id: 'image_url',
    label: 'Image URL',
    minWidth: 170,
    align: 'center',
    format: (value: number) => value.toLocaleString('en-US'),
  },
  {
    id: 'contract_id',
    label: 'Contract ID',
    minWidth: 170,
    align: 'center',
    format: (value: number) => value.toLocaleString('en-US'),
  },
  {
    id: 'token_id',
    label: 'Token ID',
    minWidth: 170,
    align: 'center',
    format: (value: number) => value.toLocaleString('en-US'),
  },
  {
    id: 'ticket_provider_id',
    label: 'Ticket Provider ID',
    minWidth: 170,
    align: 'center',
    format: (value: number) => value.toLocaleString('en-US'),
  },
  {
    id: 'user_id',
    label: 'User ID',
    minWidth: 170,
    align: 'center',
    format: (value: number) => value.toLocaleString('en-US'),
  },
  {
    id: 'ipfs_uri',
    label: 'IPFS URI',
    minWidth: 170,
    align: 'center',
    format: (value: number) => value.toLocaleString('en-US'),
  },
  {
    id: 'status',
    label: 'Status',
    minWidth: 120,
    align: 'center',
    format: (value: number) => value.toFixed(2),
  },
  {
    id: 'createdAt',
    label: 'Created At',
    minWidth: 150,
    align: 'center',
    dateFormater: (value: string) => dateConversionHandler(value),
  },
  {
    id: '',
    label: 'Delete',
    align: 'center',
    minWidth: 10,
  },
];
