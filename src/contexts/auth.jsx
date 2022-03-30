import React, { createContext, useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import api from "../utils/axios";

export const AuthContext = createContext({});

const cookieName = "agendamento.token";

const AuthProvider = ({ children }) => {
    const [cookies, setCookie, removeCookie] = useCookies([cookieName]);

    const [user, setUser] = useState();
    const [signed, setSigned] = useState(null);

    useEffect(() => {
        //onInit
        console.log("Inicio");
        cookies["agendamento.token"] &&
            getUserDataWithToken(cookies["agendamento.token"]);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (user) {
            user.userData.avatar = `https://avatars.dicebear.com/api/jdenticon/:${user.userData.nome.toLowerCase()}.svg`;
            console.log(user);
            setSigned(true);
        }
    }, [user]);

    function isAdmin() {
        return (
            user.userDetails.authorities.filter(
                (role) => role.role === "ROLE_ADMIN"
            ).length !== 0
        );
    }

    async function signIn(email, senha) {
        const data = { email, senha };
        console.log(data);
        await api
            .post("/login", JSON.stringify(data))
            .then((response) => {
                setUser(response.data);
                setCookie("agendamento.token", response.data.token, {
                    path: "/",
                });
            })
            .catch((error) => console.log(error));
    }

    async function signUp(userData) {
        await api
            .post("/api/user-signup", userData)
            .then((response) => {
                console.log(response);
            })
            .catch((e) => console.log(e));
    }

    function signOut() {
        setUser(null);
        setSigned(false);
        removeCookie(cookieName);
    }

    async function getUserDataWithToken(token) {
        await api
            .get("/api/user-auth", {
                headers: { Authorization: `Bearer ${token}` },
            })
            .then((response) => {
                setUser(response.data);
                setCookie("agendamento.token", response.data.token, {
                    path: "/",
                });
            })
            .catch(() => signOut());
    }

    return (
        <AuthContext.Provider
            value={{ signIn, signOut, signUp, isAdmin, user, signed }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
