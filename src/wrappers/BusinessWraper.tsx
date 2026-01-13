import React from "react";
import App from "../components/App";
// Bootstrap y global CSS pueden ir aquí (ok para SSR)
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/global.css";

import BusinessTabsWrapper from "./BusinessTabsWrapper";

const BusinessWraper: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  return (
    <App>
      <div>
        {/* BusinessTabsWrapper solo cliente */}
        <BusinessTabsWrapper client:only="react" />
      </div>
    </App>
  );
};

export default BusinessWraper;
