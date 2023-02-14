import React from "react";
import { Route, Navigate } from "react-router-dom";

const ProtectedRoute = ({ element: Element, ...props }) => {

    return (
        <Route exact path={props.path}>
            {() =>
                props.isLoggedIn ? <Element {...props} /> : <Navigate to='/sign-in' />
            }
        </Route>
    )
}

export default ProtectedRoute