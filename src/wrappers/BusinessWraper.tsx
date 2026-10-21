import React from "react";
import App from "../components/App";
import BusinessTabsWrapper from "./BusinessTabsWrapper";
import type { ComercioDtoListItem } from "../services/comercioPublicApi";

interface BusinessWraperProps {
  initialComercios?: ComercioDtoListItem[];
}

const BusinessWraper: React.FC<BusinessWraperProps> = ({ initialComercios }) => {
  return (
    <App>
      <BusinessTabsWrapper initialComercios={initialComercios} />
    </App>
  );
};

export default BusinessWraper;
