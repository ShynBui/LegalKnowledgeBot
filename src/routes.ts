import { lazy } from 'react';
import { IRoute } from '~/interfaces';

import Loading from '@p/Loading';

const Home = lazy(() => import('@p/Home'));

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
