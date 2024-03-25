import axios from "axios";

const client = axios.create({ baseURL: process.env.EXPO_PUBLIC_BACKEND_URL, headers: { 'x-local': 'en' } });
client.interceptors.response.use((response) => response.data, (error) => error);

export default client;