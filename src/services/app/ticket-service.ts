import network from "../../utils/network";

export interface createTicketInterface {
    ticket_provider_id: number,
    name: string,
    image_url: string,
    contract_id: number,
    token_id: number,
    user_id: number
}

export const getTickets = async () => {
    const response = await network.get(`/ticket`);
    return response.data;
}

export const createTicket = async (data: createTicketInterface) => {
    const response = await network.post(`/ticket`, data);
    return response.data
}

export const deleteTicket = async (id: string) => {
    const response = await network.delete(`/ticket/${id}`);
    return response.data;
}