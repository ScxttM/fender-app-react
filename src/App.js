import "./App.css";
import React from "react";
import AuthProvider from "./provider/authProvider";
import Routes from "./routes/Routes";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <>
      <AuthProvider>
        <Routes />
      </AuthProvider>
      <ToastContainer autoClose={1500} />
    </>
  );
}

export default App;
