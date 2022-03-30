import "./App.css";
import { Router } from "react-router";
import { createBrowserHistory } from "history";
import AuthProvider from "./contexts/auth";

import Routes from "./Routes";
import ShedulingProvider from "./contexts/scheduling";

const history = createBrowserHistory();

function App() {
    return (
        <div className="App">
            <AuthProvider>
                <ShedulingProvider>
                    <Router history={history}>
                        <Routes />
                    </Router>
                </ShedulingProvider>
            </AuthProvider>
        </div>
    );
}

export default App;
