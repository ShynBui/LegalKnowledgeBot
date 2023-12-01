import { lazy } from 'react';
import Loading from '@p/Loading';
import Empty from '~/layout/Empty';

const Home = lazy(() => import('@p/Home'));
const PhapDien = lazy(() => import('@p/PhapDien'));
const Chat = lazy(() => import('@p/Chat'));
const ChiTietPhapDien = lazy(() => import('@p/ChiTietPhapDien'));
const QPPL = lazy(() => import('@p/QPPL'));
const ThuatNgu = lazy(() => import('@p/ThuatNgu'));
const PhapDienV2 = lazy(() => import('@p/PhapDienV2'));


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
        path: '/phap-dien/:id',
        page: ChiTietPhapDien,
    },
    {
        path: '/qppl',
        page: QPPL,
    },
    {
        path: '/thuatngu',
        page: ThuatNgu,
    },
    {
        path: '/phapdien',
        page: PhapDienV2,
    },
    {
        path: '*',
        page: Loading,
        layout: Empty,
    },
];

export default routes;
