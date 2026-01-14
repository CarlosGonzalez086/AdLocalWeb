
import { Box } from "@mui/material";
import type { ReactNode } from "react";

interface BodyProps {
  children?: ReactNode;
}

const Body: React.FC<BodyProps> = ({ children }) => {
  return (
    <Box className="flex-grow-1 d-flex">
      <div className="container-lg py-4 d-flex flex-column flex-grow-1">
        {import.meta.env.MODE === "production" ? (
          <div className="mb-3 text-center">
            <span className="badge bg-warning text-dark">Ambiente de Prod</span>
          </div>
        ) : (
          <div className="mb-3 text-center">
            <span className="badge bg-warning text-dark">
              Ambiente de desarrollo
            </span>
          </div>
        )}
        {children}
      </div>
    </Box>
  );
};

export default Body;
