import { lazy } from 'react';
import { IRoute } from '~/interfaces';

import Loading from '@pages/Loading';

const Home = lazy(() => import('@pages/Home'));

const routes: IRoute[] = [
    {
        path: '/',
        page: Home,
    },
    {
        path: '*',
        page: Loading,
    },
];

export default routes;
