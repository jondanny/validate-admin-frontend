import InboxIcon from '@mui/icons-material/AirplaneTicket';
import SendIcon from '@mui/icons-material/Send';
import PeopleIcon from '@mui/icons-material/People';
import ApiIcon from '@mui/icons-material/Api';
import BusinessIcon from '@mui/icons-material/Business';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import EventIcon from '@mui/icons-material/Event';

export const sideBarMenu = [
  { title: 'Users', icon: PeopleIcon, path: '/users' },
  { title: 'Tickets', icon: InboxIcon, path: '/ticket' },
  { title: 'Ticket Providers', icon: BusinessIcon, path: '/ticket-provider' },
  { title: 'Ticket Provider Api Token', icon: ApiIcon, path: '/ticket-provider-api-token' },
  { title: 'Ticket Provider Encryption Key', icon: VpnKeyIcon, path: '/ticket-provider-encryption-key' },
  { title: 'Ticket Transfer Log', icon: SendIcon, path: '/ticket-transfer' },
  { title: 'Events', icon: EventIcon, path: '/events'},
];
