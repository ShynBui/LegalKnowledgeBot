import { request, HEADER } from './header';

const put = async (path, options = {}, headerOptions = {}) => {
    const response = await request.put(path, options, { ...HEADER, ...headerOptions });
    return response;
};

export default put;
