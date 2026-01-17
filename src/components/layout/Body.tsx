import { Box } from "@mui/material";
import type { ReactNode } from "react";

interface BodyProps {
  children?: ReactNode;
}

const Body: React.FC<BodyProps> = ({ children }) => {
  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        overflowY: "auto",
        display: "flex",
        flexDirection: "column",
        width: "100%",
        px: { xs: 2, sm: 3 },
        py: { xs: 3, sm: 4 },
        backgroundColor: "#fdf6f0",
      }}
    >
      {children}
    </Box>
  );
};

export default Body;
