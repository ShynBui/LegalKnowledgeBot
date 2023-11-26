import { request, HEADER } from './header';

const patch = async (path, options = {}, headerOptions = {}) => {
    const response = await request.patch(path, options, { ...HEADER, ...headerOptions });
    return response;
};

export default patch;
