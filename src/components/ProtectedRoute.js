import React from "react";
import { Route, Navigate, Routes } from "react-router-dom";

const ProtectedRoute = ({ element: Element, ...props }) => {

    return (
        <Routes>
                    <Route exact path={props.path}>
            {() =>
                props.isLoggedIn ? <Element {...props} /> : <Navigate to='/sign-in' />
            }
        </Route>
        </Routes>

    )
}

export default ProtectedRoute