import { createContext } from 'react';

export const initialUserState = {
  ticketProviderId: '',
  ticketId: '',
};

export const colorContext = createContext({ ...initialUserState });
