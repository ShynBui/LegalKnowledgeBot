import React, { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.scss';
import Loading from '@pages/Loading';
import routes from './routes';

const App: React.FC = () => {
    return (
        <div className="App vh-100 overflow-hidden" app-mode="light">
            <Suspense fallback={<Loading />}>
                <Routes>
                    {routes.map((route, index) => (
                        <Route key={index} path={route.path} element={<route.page />} />
                    ))}
                </Routes>
            </Suspense>
        </div>
    );
};

export default App;
