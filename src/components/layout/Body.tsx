
import { Box } from "@mui/material";
import type { ReactNode } from "react";

interface BodyProps {
  children?: ReactNode;
}

const Body: React.FC<BodyProps> = ({ children }) => {
  return (
    <Box className="flex-grow-1 d-flex">
      <div className="container-lg py-4 d-flex flex-column flex-grow-1">
        {children}
      </div>
    </Box>
  );
};

export default Body;
