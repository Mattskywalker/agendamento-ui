import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import VisibilityIcon from "@material-ui/icons/Visibility";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";

import "./SignIn.css";

import { AuthContext } from "../../contexts/auth";

export default function SignIn() {
    const { signIn, loadingAuth } = useContext(AuthContext);

    const [form, setForm] = useState({
        values: {
            email: "",
            senha: "",
        },
    });

    const [visibility, setVisibility] = useState(false);

    const handleChange = (prop) => (event) => {
        setForm((form) => ({
            ...form,
            values: {
                ...form.values,
                [prop]: event.target.value,
            },
        }));
    };

    function handleSubmit(event) {
        event.preventDefault();
        signIn(form.values.email, form.values.senha);
    }

    return (
        <div className="container-center">
            <div className="login">
                <div className="logo-area">
                    <img
                        src={"https://creb.com.br/images/agendamento-creb.png"}
                        alt="logo do sistema"
                    />
                </div>

                <form onSubmit={handleSubmit}>
                    <h1>Entrar</h1>
                    <input
                        autoComplete="username"
                        type="email"
                        placeholder="email@email.com"
                        value={form.values.email}
                        onChange={handleChange("email")}
                    />
                    <div className="divInput">
                        <input
                            autoComplete="current-password"
                            className="password"
                            type={visibility ? "text" : "password"}
                            placeholder="sua senha"
                            value={form.values.senha}
                            onChange={handleChange("senha")}
                        />

                        <button
                            type="button"
                            onClick={() => setVisibility(!visibility)}
                            className="buttonVisibility"
                        >
                            {visibility ? (
                                <VisibilityIcon />
                            ) : (
                                <VisibilityOffIcon />
                            )}
                        </button>
                    </div>
                    <button type="submit">
                        {loadingAuth ? "Acessando..." : "Acessar"}
                    </button>
                </form>

                <Link to="/register">Criar uma conta</Link>
            </div>
        </div>
    );
}
