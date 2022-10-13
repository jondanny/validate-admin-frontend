import moment from "moment";
export interface Column {
  id: string;
  label: string;
  minWidth?: number;
  name?:boolean
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
    id: "userFrom",
    label: "User From",
    align: "center",
    name: true,
  },
  {
    id: "userTo",
    label: "User To",
    align: "center",
    name: true
  },
  {
    id: "ticketId",
    label: "Ticket Id",
    align: "center"
  },
  {
    id: "ticketProvider",
    label: "Ticket Provider",
    align: "center",
    name: true
  },
  {
    id: "status",
    label: "Status",
    align: "center"
  },
  {
    id: 'createdAt',
    label: 'Created At',
    minWidth: 150,
    align: 'center',
    dateFormater: (value: string) => dateConversionHandler(value),
  },
];
