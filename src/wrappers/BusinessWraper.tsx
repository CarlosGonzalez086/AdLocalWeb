import React from "react";
import App from "../components/App";
import Comercio from "../components/business/Comercio";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/global.css";
import "../styles/leaflet.css";
import BusinessTabsWrapper from "./BusinessTabsWrapper";

interface BusinessWraperProps {}

const BusinessWraper: React.FC<BusinessWraperProps> = () => {
  return (
    <App>
      <div>
        <BusinessTabsWrapper />
      </div>
    </App>
  );
};

export default BusinessWraper;
