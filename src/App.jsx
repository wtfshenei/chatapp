import React, {useContext} from 'react';
import Register from "./pages/register/index.jsx";
import "./style.scss"
import Login from "./pages/login/index.jsx";
import Home from "./pages/home/index.jsx";
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import {AuthContext} from "./context/authContext.jsx";

const App = () => {
    const {currentUser} = useContext(AuthContext)

    const ProtectedRoute = ({ children }) => {
        if (!currentUser) {
            return <Navigate to={'/login'} />
        }

        return children
    }

    return (
        <BrowserRouter>
            <Routes>
                <Route path={'/'}>
                    <Route index element={
                        <ProtectedRoute>
                            <Home />
                        </ProtectedRoute>
                    }/>
                    <Route path={'/login'} element={<Login />} />
                    <Route path={'/register'} element={<Register />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
};

export default App;
