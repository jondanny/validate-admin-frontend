import InboxIcon from '@mui/icons-material/AirplaneTicket';
import SendIcon from '@mui/icons-material/Send';
import PeopleIcon from '@mui/icons-material/People';
import ApiIcon from '@mui/icons-material/Api';
import BusinessIcon from '@mui/icons-material/Business';
import VpnKeyIcon from '@mui/icons-material/VpnKey';

export const sideBarMenu = [
  { title: 'Ticket', icon: InboxIcon, path: '/ticket' },
  { title: 'Ticket Providers', icon: BusinessIcon, path: '/' },
  { title: 'Users', icon: PeopleIcon, path: '/users' },
  { title: 'Ticket Provider Api Token', icon: ApiIcon, path: '/ticket-provider-api-token' },
  { title: 'Ticket Transfer', icon: SendIcon, path: '/ticket-transfer' },
  { title: 'Ticket Provider Encryption Key', icon: VpnKeyIcon, path: '/ticket-provider-encryption-key' },
];
