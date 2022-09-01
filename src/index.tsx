import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Web3ContextProvider } from "./contexts/klaytn-provider";
import { NftContextProvider } from "./contexts/nft-provider";
import { CssVarsProvider } from "@mui/joy/styles";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <Web3ContextProvider>
      <NftContextProvider>
        <CssVarsProvider>
          <App />
        </CssVarsProvider>
      </NftContextProvider>
    </Web3ContextProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
