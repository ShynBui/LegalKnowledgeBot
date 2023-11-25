import React, { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.scss';
import Loading from '@p/Loading';
import routes from './routes';
import MyUserReducer from '@c/MyUserReducer';
import { createContext, useReducer } from 'react';
import cookie from 'react-cookies';

export const MyUserContext = createContext(null);

const App = () => {
    const [user, dispatch] = useReducer(MyUserReducer, cookie.load('user') || null);

    return (
        <MyUserContext.Provider value={[user, dispatch]}>
            <div className="App vh-100 overflow-hidden">
                <Suspense fallback={<Loading />}>
                    <Routes>
                        {routes.map((route, index) => (
                            <Route key={index} path={route.path} element={<route.page />} />
                        ))}
                    </Routes>
                </Suspense>
            </div>
        </MyUserContext.Provider>
    );
};

export default App;
