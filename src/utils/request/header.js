import axios from 'axios';
import cookie from 'react-cookies';

export const request = axios.create({
    baseURL: 'http://localhost:5051/api',
});

export const HEADER = {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
    'Access-Control-Allow-Credentials': 'true',
    // Authorization: cookie.load('token'),
};
