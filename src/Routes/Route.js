import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { AuthContext } from "./../contexts/auth";

export default function RouteWraper({
    component: Component,
    isPrivate,
    ...rest
}) {
    const { signed, loading, isAdmin } = useContext(AuthContext);

    if (loading) {
        return <div>carregando...</div>;
    }

    if (!signed && isPrivate) {
        return <Redirect to="/" />;
    }

    if (signed && !isPrivate && !isAdmin()) {
        return <Redirect to="/agendamento" />;
    }

    if (signed && !isPrivate && isAdmin()) {
        return <Redirect to="/chamados" />;
    }

    return <Route {...rest} render={(props) => <Component {...props} />} />;
}
