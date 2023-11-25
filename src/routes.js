import { lazy } from 'react';
import Loading from '@p/Loading';

const Home = lazy(() => import('@p/Home'));
const PhapDien = lazy(() => import('@p/PhapDien'));
const Chat = lazy(() => import('@p/Chat'));

const routes = [
    {
        path: '/',
        page: Home,
    },
    {
        path: '/phap-dien',
        page: PhapDien,
    },
    {
        path: '/chat',
        page: Chat,
    },
    {
        path: '*',
        page: Loading,
    },
];

export default routes;
