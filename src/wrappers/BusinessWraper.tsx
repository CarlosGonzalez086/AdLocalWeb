import React from "react";
import App from "../components/App";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/global.css";
import "../styles/leaflet.css";
import BusinessTabsWrapper from "./BusinessTabsWrapper";

const BusinessWraper: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <App>
      <div>
        <BusinessTabsWrapper />
      </div>
    </App>
  );
};

export default BusinessWraper;
