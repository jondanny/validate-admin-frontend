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
  { id: 'id', label: 'Id', minWidth: 40 },
  { id: 'uuid', label: 'UUID', minWidth: 100 },
  {
    id: 'name',
    label: 'Name',
    minWidth: 130,
    align: 'center',
    format: (value: number) => value.toLocaleString('en-US'),
  },
  {
    id: 'imageUrl',
    label: 'Image URL',
    minWidth: 130,
    align: 'center',
    format: (value: number) => value.toLocaleString('en-US'),
  },
  {
    id: 'contractId',
    label: 'Contract ID',
    minWidth: 60,
    align: 'center',
    format: (value: number) => value.toLocaleString('en-US'),
  },
  {
    id: 'tokenId',
    label: 'Token ID',
    minWidth: 60,
    align: 'center',
    format: (value: number) => value.toLocaleString('en-US'),
  },
  {
    id: 'ticketProvider',
    label: 'Ticket Provider',
    minWidth: 60,
    align: 'center',
    name: true,
  },
  {
    id: 'user',
    label: 'User ID',
    minWidth: 60,
    align: 'center',
    name: true,
  },
  {
    id: 'status',
    label: 'Status',
    minWidth: 40,
    align: 'center',
    format: (value: number) => value.toFixed(2),
  },
  {
    id: 'ipfsUri',
    label: 'IPFS URI',
    minWidth: 130,
    align: 'center',
    format: (value: number) => value.toLocaleString('en-US'),
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
