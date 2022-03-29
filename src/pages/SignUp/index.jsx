import React, { useState } from "react";
import { Link } from "react-router-dom";
import VisibilityIcon from "@material-ui/icons/Visibility";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";
import { useContext } from "react";

import "./SignUp.css";
import { AuthContext } from "../../contexts/auth";

export default function SignUp() {
    const { signUp, loadingAuth } = useContext(AuthContext);

    const [form, setForm] = useState({
        values: {
            nome: "",
            email: "",
            senha: "",
            cpf: "",
            telefone: "",
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

        signUp(form.values);
    }

    return (
        <div className="container-center">
            <div className="cadastro">
                <div className="logo-area">
                    <img
                        src={"https://creb.com.br/images/agendamento-creb.png"}
                        alt="logo do sistema"
                    />
                </div>

                <form onSubmit={handleSubmit}>
                    <h1>Cadastrar</h1>
                    <input
                        type="text"
                        placeholder="Seu nome"
                        value={form.values.nome}
                        onChange={handleChange("nome")}
                    />
                    <input
                        type="text"
                        placeholder="CPF"
                        value={form.values.cpf}
                        onChange={handleChange("cpf")}
                    />
                    <input
                        type="text"
                        placeholder="telefone: (81) 99999-9999"
                        value={form.values.telefone}
                        onChange={handleChange("telefone")}
                    />
                    <input
                        type="text"
                        placeholder="email@email.com"
                        value={form.values.email}
                        onChange={handleChange("email")}
                    />
                    <div className="divInput">
                        <input
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
                        {loadingAuth ? "Cadastrando..." : "Cadastrar"}
                    </button>
                </form>

                <Link to="/">Já tenho uma conta</Link>
            </div>
        </div>
    );
}
