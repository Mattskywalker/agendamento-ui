import "./Header.css";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../contexts/auth";
import { Link } from "react-router-dom";

import { ExitToApp, Home, Person, Settings } from "@material-ui/icons";
import { Button } from "@material-ui/core";

export default function Header({ children }) {
    const { user, updateUser, signOut, isAdmin } = useContext(AuthContext);

    const [userData, setUserData] = useState(user);

    console.log(
        userData.userDetails.authorities.filter(
            (role) => role.role === "ROLE_ADMIN"
        )
    );

    console.log(isAdmin());

    return (
        <div className="page">
            <div className="sidebar">
                <Link
                    style={{ flexDirection: "column" }}
                    className="image-link"
                    to={"/profile"}
                >
                    <img src={user.userData.avatar} alt="Imagem de perfil" />
                    <h3 style={{ color: "#FFFFFF", width: "fit-content" }}>
                        {user.userData.nome}
                    </h3>
                </Link>
                {isAdmin() && (
                    <>
                        <Link key={"dash"} to="/chamados">
                            <Home></Home>
                            Chamados
                        </Link>
                        <Link key={"customers"} to="/customers">
                            <Person></Person>
                            Clientes
                        </Link>
                    </>
                )}
                <Link to="">
                    <Settings></Settings>
                    Configurações
                </Link>
                <Link
                    to={""}
                    style={{ color: "#FFFFFF" }}
                    onClick={() => signOut()}
                >
                    <ExitToApp /> Sair
                </Link>
            </div>
            <div className="children">{children}</div>
        </div>
    );
}
