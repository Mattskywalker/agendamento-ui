import React, { useContext, useEffect, useState } from "react";
import { Button } from "@material-ui/core";
import Header from "../../components/Header";
import { AuthContext } from "../../contexts/auth";
import { ShedulingContext } from "../../contexts/scheduling";
import Title from "../../components/Title";
import { Collapse } from "@material-ui/core";

import { Dashboard as DashboardIcon, Search } from "@material-ui/icons";
import CardCollapse from "../../components/CardCollapse";
import "./Home.css";

const Home = () => {
    const { user } = useContext(AuthContext);
    const {
        saveShed,
        getAllByCpf,
        shedList,
        clearList,
        getAllShed,
        updateShed,
        deleteShed,
    } = useContext(ShedulingContext);

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
        //onInit
        getAllShed();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        //unMount
        return () => {
            clearList();
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    function handleDate(e) {
        const date = dateInput.split("-");
        const time = e.target.value.split(":");

        const dateFull = `${date[0]}/${date[1]}/${date[2]} - ${time[0]}:${time[1]}`;
        form.data.dataAgendamento = dateFull;
        setForm(form);
    }

    function handleDelete(id) {
        const shed = shedList.filter((shed) => shed.id === id).shift();
        deleteShed(shed);
    }

    function handleSubmit(e, id) {
        e.preventDefault();
        form.data.id = id;
        updateShed(form.data);
        e.target.reset();
    }

    function handleStatus(id, status) {
        const shed = shedList.filter((shed) => shed.id === id).shift();
        shed.status = status;
        updateShed(shed);
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
                        {/* <input
                            style={{ width: "400px" }}
                            placeholder="Pesquisar agendamento, CPF ex: 123.432.123-12"
                            onChange={(e) => {
                                // e.target.value === "" && clearList();
                            }}
                            onKeyDown={(e) => {
                                // e.key === "Enter" &&
                                //     handleSearch(e.target.value);
                            }}
                            className="search-input"
                            type={"search"}
                        ></input> */}
                    </div>
                </div>

                {shedList.length > 0 && (
                    <div
                        style={{
                            flexDirection: "column",
                            alignItems: "flex-start",
                        }}
                        className="container"
                    >
                        <Title name="Agendamentos Solicitados">
                            <DashboardIcon></DashboardIcon>
                        </Title>
                        <div
                            style={{
                                width: "100%",
                                // height: "500px",
                                flexDirection: "column",
                                alignItems: "center",
                                padding: "30px",
                                margin: "0px",
                                gap: "12px",
                            }}
                            className="container"
                        >
                            {shedList.map((shed) => {
                                return (
                                    <CardCollapse
                                        key={shed.id}
                                        cardChildren={
                                            <>
                                                <h3>{shed.user.nome}</h3>
                                                <h2>{shed.servico}</h2>
                                                <h3>
                                                    Data: {shed.dataAgendamento}
                                                </h3>
                                            </>
                                        }
                                        areaButton={
                                            <>
                                                <Button
                                                    style={
                                                        shed.status === "ACEITO"
                                                            ? {
                                                                  color: "white",
                                                                  backgroundColor:
                                                                      "green",
                                                              }
                                                            : {}
                                                    }
                                                    onClick={(e) => {
                                                        handleStatus(
                                                            shed.id,
                                                            0
                                                        );
                                                    }}
                                                >
                                                    {shed.status === "ACEITO"
                                                        ? "Aceito"
                                                        : "Aceitar"}
                                                </Button>
                                                <Button
                                                    style={
                                                        shed.status ===
                                                        "RECUSADO"
                                                            ? {
                                                                  color: "white",
                                                                  backgroundColor:
                                                                      "red",
                                                              }
                                                            : {}
                                                    }
                                                    onClick={(e) => {
                                                        handleStatus(
                                                            shed.id,
                                                            1
                                                        );
                                                    }}
                                                >
                                                    {shed.status === "RECUSADO"
                                                        ? "Recusado"
                                                        : "Recusar"}
                                                </Button>
                                                <Button
                                                    onClick={() => {
                                                        handleDelete(shed.id);
                                                    }}
                                                >
                                                    Excluir
                                                </Button>
                                            </>
                                        }
                                        collapseChildren={
                                            <>
                                                <form
                                                    onSubmit={(e) => {
                                                        handleSubmit(
                                                            e,
                                                            shed.id
                                                        );
                                                    }}
                                                    className="form-scheduling"
                                                >
                                                    <label>
                                                        Data do agendamento
                                                    </label>
                                                    <input
                                                        required
                                                        type="date"
                                                        onBlur={(e) =>
                                                            setDate(
                                                                e.target.value
                                                            )
                                                        }
                                                    />
                                                    <input
                                                        required
                                                        type={"time"}
                                                        onBlur={(e) => {
                                                            handleDate(e);
                                                        }}
                                                    ></input>

                                                    <label>Serviço</label>
                                                    <select
                                                        onChange={(e) => {
                                                            form.data.servico =
                                                                e.target.value;
                                                            setForm(form);
                                                        }}
                                                        required
                                                        defaultValue={""}
                                                    >
                                                        <option
                                                            disabled
                                                            value=""
                                                        >
                                                            Selecione um serviço
                                                            ...
                                                        </option>
                                                        <option value="Dentista">
                                                            Dentista
                                                        </option>
                                                        <option value="Vacina">
                                                            Vacina
                                                        </option>
                                                        <option value="Exame">
                                                            Exame
                                                        </option>
                                                    </select>

                                                    <button type="submit">
                                                        {" "}
                                                        {savingChanges
                                                            ? "Salvando..."
                                                            : "Salvar Alterações"}{" "}
                                                    </button>
                                                </form>
                                            </>
                                        }
                                    />
                                );
                            })}
                        </div>
                    </div>
                )}
            </Header>
        </div>
    );
};

export default Home;
