import type { FC, ReactNode } from "react";
import { Box } from "@mui/material";

interface BodyProps {
  children?: ReactNode;
}

const Body: FC<BodyProps> = ({ children }) => {
  const data = import.meta.env;
  return (
    <Box className="flex-grow-1 d-flex">
      <div className="container-lg py-4 d-flex flex-column flex-grow-1">
        {data.PROD ? (
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
