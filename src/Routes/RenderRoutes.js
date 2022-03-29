import Route from "./Route";
import React from "react";

export default function RenderRoutes(routes) {
    return (
        <>
            {routes.map((page) => (
                <Route
                    key={page.component.name}
                    exact={page.exact}
                    path={page.path}
                    component={page.component}
                    isPrivate={page.isPrivate}
                ></Route>
            ))}
        </>
    );
}
