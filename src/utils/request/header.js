import axios from 'axios';

export const request = axios.create({
    baseURL: import.meta.env.VITE_SERVER_URL + "/api",
});

export const HEADER = {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
    'Access-Control-Allow-Credentials': 'true',
    // Authorization: cookie.load('token'),
};
