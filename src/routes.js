import { lazy } from 'react';
import Loading from '@p/Loading';

const Home = lazy(() => import('@p/Home'));
const PhapDien = lazy(() => import('@p/PhapDien'));

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
        path: '*',
        page: Loading,
    },
];

export default routes;
