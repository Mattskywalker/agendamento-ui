import React, { useContext } from "react";
import { Button } from "@material-ui/core";
import Header from "../../components/Header";
import { AuthContext } from "../../contexts/auth";

const Home = () => {
    const { user } = useContext(AuthContext);

    return (
        <div style={{ height: "100vh" }}>
            <Header>
                <h1>Chamados</h1>
                <p>Bem vindo de volta {user.userData.nome}</p>
            </Header>
        </div>
    );
};

export default Home;
