
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router";
import App from "./App";
import "./index.css"
import StoreContextProvider from "./context/Storecontext";

const root = document.getElementById("root");

ReactDOM.createRoot(root).render(
  <BrowserRouter>
  <StoreContextProvider>
 <App />
  </StoreContextProvider>
  </BrowserRouter>
);
