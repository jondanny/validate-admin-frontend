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
  { id: 'id', label: 'Id', minWidth: 30 },
  { id: 'uuid', label: 'UUID', minWidth: 160 },
  {
    id: 'name',
    label: 'Name',
    minWidth: 30,
    align: 'center',
    format: (value: number) => value.toLocaleString('en-US'),
  },
  {
    id: 'email',
    label: 'Email',
    minWidth: 100,
    align: 'center',
    format: (value: number) => value.toLocaleString('en-US'),
  },
  {
    id: 'phoneNumber',
    label: 'Contact Info',
    align: 'center',
  },
  {
    id: 'walletAddress',
    label: 'Wallet Address',
    align: 'center',
    minWidth: 200,
  },
  {
    id: 'ticketProvider',
    label: 'Ticket Provider',
    align: 'center',
    minWidth: 100,
    name: true,
  },
  {
    id: 'seedPhrase',
    label: 'Seed Phrase',
    align: 'center',
    minWidth: 150,
  },
  {
    id: 'photoUrl',
    label: 'Photo Url',
    align: 'center',
    minWidth: 100,
  },
  {
    id: 'status',
    label: 'Status',
    minWidth: 80,
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
];
