import App from "../components/App";
import React from "react";
import Comercio from "../components/business/Comercio";
import type { ComercioDto } from "../services/comercioPublicApi";

interface ComercioWraperProps {
  id: number;
  initialData?: ComercioDto | null;
}

const ComercioWraper: React.FC<ComercioWraperProps> = ({ id, initialData }) => {
  return (
    <App>
      <div className="w-100 h-100 p-3">
        <Comercio id={id} initialData={initialData} />
      </div>
    </App>
  );
};

export default ComercioWraper;
