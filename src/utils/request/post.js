import { request, HEADER } from './header';

const post = async (path, options = {}, headerOptions = {}) => {
    const response = await request.post(path, options, { ...HEADER, ...headerOptions });
    return response;
};

export default post;
