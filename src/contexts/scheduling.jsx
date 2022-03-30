import React, { createContext, useState, useContext } from "react";
import api from "../utils/axios";
import AuthProvider, { AuthContext } from "./auth";

export const ShedulingContext = createContext({});

const ShedulingProvider = ({ children }) => {
    const { user } = useContext(AuthContext);
    const [shedList, setList] = useState([]);

    function saveShed(data) {
        api.post("/api/save-scheduling", data, {
            headers: { Authorization: `Bearer ${user.token}` },
        })
            .then((response) => console.log(response.data))
            .catch(() => {
                console.log("Error");
            });
    }

    function getAllShed() {
        api.get("/api/all-scheduling", {
            headers: { Authorization: `Bearer ${user.token}` },
        })
            .then((response) => {
                setList(response.data);
            })
            .catch(() => {
                console.log("Error");
            });
    }

    function getAllByCpf(cpf) {
        api.get(`/api/find-scheduling/cpf=${cpf}`, {
            headers: { Authorization: `Bearer ${user.token}` },
        })
            .then(async (response) => {
                setList(response.data);
            })
            .catch(() => {});
    }

    function updateShed(shed) {
        api.post("/api/update-scheduling", shed, {
            headers: { Authorization: `Bearer ${user.token}` },
        })
            .then(async (response) => {
                getAllShed();
            })
            .catch(() => {});
    }

    function deleteShed(shed) {
        api.post("/api/delete-scheduling", shed, {
            headers: { Authorization: `Bearer ${user.token}` },
        })
            .then(async (response) => {
                getAllShed();
            })
            .catch(() => {});
    }

    function clearList() {
        setList([]);
    }

    return (
        <ShedulingContext.Provider
            value={{
                saveShed,
                getAllShed,
                getAllByCpf,
                clearList,
                updateShed,
                deleteShed,
                shedList,
            }}
        >
            {children}
        </ShedulingContext.Provider>
    );
};

export default ShedulingProvider;
