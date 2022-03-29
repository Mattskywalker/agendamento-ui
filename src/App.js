import "./App.css";
import { Router } from "react-router";
import { createBrowserHistory } from "history";
import AuthProvider from "./contexts/auth";

import Routes from "./Routes";
import Header from "./components/Header";

const history = createBrowserHistory();

function App() {
    return (
        <div className="App">
            <AuthProvider>
                <Router history={history}>
                    <Routes />
                </Router>
            </AuthProvider>
        </div>
    );
}

export default App;
