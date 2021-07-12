import "./App.css";
import { CookiesProvider } from "react-cookie";
import { BrowserRouter as Router } from "react-router-dom";
import routes from "./routes";

function App() {
  return (
    <CookiesProvider>
      <Router>{routes}</Router>
    </CookiesProvider>
  );
}

export default App;
