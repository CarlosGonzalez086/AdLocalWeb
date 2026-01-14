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
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          width: "100%",
          px: { xs: 2, sm: 3 },
          py: { xs: 3, sm: 4 },
          display: "flex",
          flexDirection: "column",
          gap: 3,
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default Body;
