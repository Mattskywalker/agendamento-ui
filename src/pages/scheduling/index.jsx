import { Button } from "@material-ui/core";
import React, { useContext } from "react";
import Header from "../../components/Header";
import { AuthContext } from "../../contexts/auth";

const Scheduling = () => {
    const { signOut, user } = useContext(AuthContext);

    return (
        <div style={{ height: "100vh" }}>
            <Header>
                <h1>Agendamento</h1>
                <p>Bem vindo de volta {user.userData.nome}</p>
                <Button
                    style={{ backgroundColor: "#707070" }}
                    onClick={() => {
                        signOut();
                    }}
                >
                    SignOut
                </Button>
            </Header>
        </div>
    );
};

export default Scheduling;
