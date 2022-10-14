import moment from 'moment';
export interface Column {
  id: string;
  label: string;
  minWidth?: number;
  name?: boolean;
  align?: 'center';
  format?: (value: number) => string;
  dateFormater?: (value: string) => string;
}

const dateConversionHandler = (date: string) => {
  return moment(date).format('DD-MM-YYYY hh:mm:ss');
};

export const columns: Column[] = [
  { id: 'id', label: 'Id', minWidth: 80 },
  {
    id: 'ticketProvider',
    label: 'Ticket Provider',
    align: 'center',
    name: true,
  },
  {
    id: 'token',
    label: 'Token',
    align: 'center',
  },
  {
    id: 'createdAt',
    label: 'Created At',
    minWidth: 150,
    align: 'center',
    dateFormater: (value: string) => dateConversionHandler(value),
  },
  {
    id: 'delete',
    label: 'Action',
    align: 'center',
    minWidth: 10,
  },
];
