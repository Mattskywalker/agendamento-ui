import Home from "../pages/home";
import Scheduling from "../pages/scheduling";
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";

const routes = [
    {
        path: "/",
        exact: true,
        component: SignIn,
    },
    {
        path: "/agendamento",
        exact: true,
        isPrivate: true,
        component: Scheduling,
    },
    {
        path: "/register",
        exact: true,
        component: SignUp,
    },
    {
        path: "/chamados",
        exact: true,
        isPrivate: true,
        component: Home,
    },
];

export default routes;
