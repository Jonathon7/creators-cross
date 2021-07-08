import "./App.css";
import { CookiesProvider } from "react-cookie";
import { BrowserRouter as Router } from "react-router-dom";
import { EasybaseProvider, useEasybase } from "easybase-react";
import ebconfig from "./ebconfig";
import routes from "./routes";

function App() {
  return (
    <CookiesProvider>
      <EasybaseProvider ebconfig={ebconfig}>
        <Router>{routes}</Router>
      </EasybaseProvider>
    </CookiesProvider>
  );
}

export default App;
