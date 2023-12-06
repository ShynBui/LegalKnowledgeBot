import { lazy } from 'react';
import Loading from '@p/Loading';
import Empty from '~/layout/Empty';

const Home = lazy(() => import('@p/Home'));

const Chat = lazy(() => import('@p/Chat'));
const ChatGG = lazy(() => import('@p/ChatGG'));

const QPPL = lazy(() => import('@p/QPPL'));
const ThuatNgu = lazy(() => import('@p/ThuatNgu'));
const PhapDienV2 = lazy(() => import('@p/PhapDienV2'));
const DienDan = lazy(() => import('@p/DienDan'));
const DetailQuestion = lazy(() => import('@p/DetailQuestion'));
const TimKiemThuatNgu = lazy(() => import('@p/TimKiemThuatNgu'));

const routes = [
    {
        path: '/',
        page: Home,
    },

    {
        path: '/chat',
        page: Chat,
    },
    {
        path: '/chatgg',
        page: ChatGG,
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
        path: '/diendan',
        page: DienDan,
    },
    {
        path: '/cauhoi/:id',
        page: DetailQuestion,
    },
    {
        path: '/timkiemthuatngu',
        page: TimKiemThuatNgu,
    },
    {
        path: '*',
        page: Loading,
        layout: Empty,
    },
];

export default routes;
