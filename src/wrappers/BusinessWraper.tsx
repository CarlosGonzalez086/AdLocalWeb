import React from "react";
import App from "../components/App";


import BusinessTabsWrapper from "./BusinessTabsWrapper";

const BusinessWraper: React.FC = () => {
  return (
    <App>
      <div>
        {/* Solo se ejecuta en cliente */}
        <BusinessTabsWrapper client:only="react" />
      </div>
    </App>
  );
};

export default BusinessWraper;
