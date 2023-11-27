import { request, HEADER } from './header';

const get = async (path, options = {}, headerOptions = {}) => {
    const get = await request.get(path, options, { ...HEADER, ...headerOptions });
    return get;
};

export default get;

