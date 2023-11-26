import React, { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.scss';
import Loading from '@p/Loading';
import routes from './routes';
import MyUserReducer from '@c/MyUserReducer';
import { createContext, useReducer } from 'react';
import cookie from 'react-cookies';
import Default from '~/layout/Default';

export const MyUserContext = createContext();

const App = () => {
    const [user, dispatch] = useReducer(MyUserReducer, cookie.load('user') || null);

    return (
        <MyUserContext.Provider value={[user, dispatch]}>
            <div className="App vh-100 overflow-hidden">
                <Suspense fallback={<Loading />}>
                    <Routes>
                        {routes.map((route, index) => {
                            let Layout = route.layout ?? Default;
                            return (
                                <Route
                                    key={index}
                                    path={route.path}
                                    element={
                                        <Layout>
                                            <route.page />
                                        </Layout>
                                    }
                                />
                            );
                        })}
                    </Routes>
                </Suspense>
            </div>
        </MyUserContext.Provider>
    );
};

export default App;
