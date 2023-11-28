import { request, HEADER } from './header';

const get = async (path, options = {}, headerOptions = {}) => {
    const response = await request.get(path, options, { ...HEADER, ...headerOptions });
    return response.data;
};

export default get;
