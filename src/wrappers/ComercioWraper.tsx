import React, { useEffect } from "react";
import App from "../components/App";
import Comercio from "../components/business/Comercio";
// Bootstrap y global CSS pueden ir aquí (ok para SSR)
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/global.css";

interface ComercioWraperProps {
  children?: React.ReactNode;
  id: number;
}

const ComercioWraper: React.FC<ComercioWraperProps> = ({ children, id }) => {
  return (
    <App>
      <div>
        {/* Comercio solo cliente */}
        <Comercio id={id} client:only="react" />
      </div>
    </App>
  );
};

export default ComercioWraper;
