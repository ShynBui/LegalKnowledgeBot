import { request, HEADER } from './header';

const del = async (path, options = {}, headerOptions = {}) => {
    const response = await request.delete(path, options, { ...HEADER, ...headerOptions });
    return response.data;
};

export default del;
