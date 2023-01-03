import InboxIcon from '@mui/icons-material/AirplaneTicket';
import SendIcon from '@mui/icons-material/Send';
import PeopleIcon from '@mui/icons-material/People';
import ApiIcon from '@mui/icons-material/Api';
import BusinessIcon from '@mui/icons-material/Business';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import EventIcon from '@mui/icons-material/Event';

export const sideBarWebMenu = [
  { title: 'Users', icon: PeopleIcon, path: '/validate-backend/users' },
  { title: 'Tickets', icon: InboxIcon, path: '/validate-backend/ticket' },
  { title: 'Ticket Providers', icon: BusinessIcon, path: '/validate-backend/ticket-provider' },
  { title: 'Ticket Provider Api Token', icon: ApiIcon, path: '/validate-backend/ticket-provider-api-token' },
  { title: 'Ticket Provider Encryption Key', icon: VpnKeyIcon, path: '/validate-backend/ticket-provider-encryption-key' },
  { title: 'Ticket Transfer Log', icon: SendIcon, path: '/validate-backend/ticket-transfer' },
  { title: 'Events', icon: EventIcon, path: '/validate-backend/events'},
];

export const sideBarBackendMenu = [
  { title: 'Users', icon: PeopleIcon, path: '/validate-web-backend/users' },
  { title: 'Tickets', icon: InboxIcon, path: '/validate-web-backend/ticket' },
  { title: 'Ticket Providers', icon: BusinessIcon, path: '/validate-web-backend/ticket-provider' },
  { title: 'Events', icon: EventIcon, path: '/validate-web-backend/events'},
]
