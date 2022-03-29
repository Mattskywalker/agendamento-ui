import { Switch } from "react-router-dom";
import React from 'react'

import routes from "./Routes";
import RenderRoutes from "./RenderRoutes";

export default function index() {
    return (
        <div>
            <Switch>
                {RenderRoutes(routes)}
            </Switch>
        </div>
    )
}
