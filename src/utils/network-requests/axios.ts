import axios from 'axios';

interface HttpRequestsInterface {
  url: string,
  data?: any
}
export const HttpGetRequests = async ({ url, data}: HttpRequestsInterface) => {
  const response = await axios({
    method: "GET",
    url,
    params: data ? data : null
  })

  return response.data;
}

export const HttpPostRequests = async ({ url, data}: HttpRequestsInterface) => {
  const response = await axios({
    method: "POST",
    url,
    data
  })

  return response.data;
}