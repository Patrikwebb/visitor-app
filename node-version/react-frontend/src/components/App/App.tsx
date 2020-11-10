import * as React from "react";

import { ToastContainer, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import SystemProvider from "context/SystemContext";
import Application from "./Application/Application";

function App() {
  return (
    <>
      <SystemProvider>
        <ToastContainer
          position="bottom-right"
          autoClose={5000}
          hideProgressBar
          newestOnTop={false}
          draggablePercent={20}
          closeOnClick
          draggable
          pauseOnHover
          transition={Slide}
        />
        <Application />
      </SystemProvider>
    </>
  );
}

export default App;
