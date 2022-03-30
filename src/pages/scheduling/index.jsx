import { Button } from "@material-ui/core";
import React, { useContext, useState, useEffect } from "react";
import Header from "../../components/Header";
import Title from "../../components/Title";
import { AuthContext } from "../../contexts/auth";
import {
    Dashboard as DashboardIcon,
    ExitToApp,
    Search,
} from "@material-ui/icons";

import "./Scheduling.css";
import { ShedulingContext } from "../../contexts/scheduling";

const Scheduling = () => {
    const { signOut, user } = useContext(AuthContext);
    const { saveShed, getAllByCpf, shedList, clearList } =
        useContext(ShedulingContext);

    const [savingChanges, setSaving] = useState(false);
    const [dateInput, setDate] = useState("");

    const [form, setForm] = useState({
        data: {
            dataAgendamento: "",
            servico: "",
            user: {
                cpf: "",
            },
        },
    });

    useEffect(() => {
        return () => {
            clearList();
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        const { admin, cpf, email, id, nome, telefone } = user.userData;
        form.data.user = { admin, cpf, email, id, nome, telefone };
        setForm(form);
    }, [user, form]);

    function handleDate(e) {
        const date = dateInput.split("-");
        const time = e.target.value.split(":");

        const dateFull = `${date[0]}/${date[1]}/${date[2]} - ${time[0]}:${time[1]}`;
        form.data.dataAgendamento = dateFull;
        setForm(form);
    }

    const handleChange = (prop) => (event) => {
        console.log(event.target.value);
        setForm((form) => ({
            ...form,
            data: {
                ...form.data,
                [prop]: event.target.value,
            },
        }));
    };

    function handleSearch(param) {
        getAllByCpf(param);
    }

    function handleSubmit(e) {
        e.preventDefault();
        saveShed(form.data);
        e.target.reset();
    }

    return (
        <div style={{ height: "100vh" }}>
            <Header>
                <div className="container">
                    <Title name="Agendamento">
                        <DashboardIcon></DashboardIcon>
                    </Title>
                    <div
                        className="container"
                        style={{
                            backgroundColor: "#FFFFFF",
                            padding: "0px",
                            overflow: "auto",
                        }}
                    >
                        <Search style={{ marginLeft: "12px" }}></Search>
                        <input
                            style={{ width: "400px" }}
                            placeholder="Pesquisar agendamento, CPF ex: 123.432.123-12"
                            onChange={(e) => {
                                e.target.value === "" && clearList();
                            }}
                            onKeyDown={(e) => {
                                e.key === "Enter" &&
                                    handleSearch(e.target.value);
                            }}
                            className="search-input"
                            type={"search"}
                        ></input>
                    </div>
                </div>
                <div className="container">
                    <form
                        onSubmit={(e) => {
                            handleSubmit(e);
                        }}
                        className="form-scheduling"
                    >
                        <h1 style={{ alignSelf: "flex-start" }}>
                            Novo agendamento
                        </h1>
                        <label>Data do agendamento</label>
                        <input
                            required
                            type="date"
                            onBlur={(e) => setDate(e.target.value)}
                            // value={form.data.dataAgendamento}
                            // onChange={handleChange("date")}
                        />
                        <input
                            type={"time"}
                            onBlur={(e) => {
                                handleDate(e);
                            }}
                        ></input>

                        <label>Serviço</label>
                        <select
                            onChange={handleChange("servico")}
                            defaultValue={""}
                        >
                            <option disabled value="">
                                Selecione um serviço ...
                            </option>
                            <option value="Dentista">Dentista</option>
                            <option value="Vacina">Vacina</option>
                            <option value="Exame">Exame</option>
                        </select>

                        <button type="submit">
                            {" "}
                            {savingChanges ? "Salvando..." : "Agendar"}{" "}
                        </button>
                    </form>
                </div>

                {shedList.length > 0 && (
                    <div
                        style={{
                            flexDirection: "column",
                            alignItems: "flex-start",
                        }}
                        className="container"
                    >
                        <Title name="Agendamentos realizados">
                            <DashboardIcon></DashboardIcon>
                        </Title>
                        <div
                            style={{
                                width: "100%",
                                flexDirection: "column",
                                alignItems: "center",
                                padding: "30px",
                                margin: "0px",
                                gap: "12px",
                            }}
                            className="container"
                        >
                            {shedList.map((shed) => (
                                <div
                                    key={shed.id}
                                    className="container"
                                    style={{
                                        width: "100%",
                                        flexDirection: "column",
                                        alignItems: "flex-start",
                                        backgroundColor: "#FFFFFF",
                                        padding: "30px",
                                        margin: "0px",
                                    }}
                                >
                                    <h2>{shed.servico}</h2>
                                    <h3>Data: {shed.dataAgendamento}</h3>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                <div className="container">
                    <button
                        className="logout-btn"
                        onClick={() => {
                            signOut();
                        }}
                    >
                        <ExitToApp></ExitToApp>
                        <label> Sair </label>
                    </button>
                </div>
            </Header>
        </div>
    );
};

export default Scheduling;
