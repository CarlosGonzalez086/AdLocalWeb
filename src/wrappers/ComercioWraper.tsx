import React from "react";
import App from "../components/App";
import Comercio from "../components/business/Comercio";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/global.css";
import "../styles/leaflet.css";

interface ComercioWraperProps {
  children: React.ReactNode;
  id: number;
}

const ComercioWraper: React.FC<ComercioWraperProps> = ({ children, id }) => {
  return (
    <App>
      <div>
        <Comercio id={id} />
      </div>
    </App>
  );
};

export default ComercioWraper;
