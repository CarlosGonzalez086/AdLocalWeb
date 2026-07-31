import React from "react";
import App from "../components/App";
import BusquedaAvanzada from "../components/search/BusquedaAvanzada";

const BusquedaAvanzadaWrapper: React.FC = () => {
  return (
    <App>
      <div className="w-100 h-100">
        <BusquedaAvanzada />
      </div>
    </App>
  );
};

export default BusquedaAvanzadaWrapper;
