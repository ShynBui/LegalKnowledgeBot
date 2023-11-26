import { request, HEADER } from './header';

const get = async (path, options = {}, headerOptions = {}) => {
    try {
        const response = await request.get(path, options, { ...HEADER, ...headerOptions }).catch((err) => {
            throw err;
        });
        return response;
    } catch (err) {
        return { ...err.response, status: err.response };
    }
};

export default get;
