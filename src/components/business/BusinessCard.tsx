
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Chip,
  Box,
} from "@mui/material";
import type { Business } from "../../types/business";
import type { FC } from "react";

interface Props {
  business: Business;
}

const BusinessCard: FC<Props> = ({ business }) => {
  const isPremium = business.plan === "PREMIUM";

  return (
    <Card
      sx={{
        height: "100%",
        position: "relative",
        border:
          isPremium ? "2px solid" : "1px solid",
        borderColor:
          isPremium ? "secondary.main" : "divider",
      }}
    >
      {isPremium && (
        <Chip
          label="PREMIUM"
          color="secondary"
          size="small"
          sx={{
            position: "absolute",
            top: 8,
            right: 8,
            fontWeight: 600,
          }}
        />
      )}

      {business.imageUrl && (
        <CardMedia
          component="img"
          height="160"
          image={business.imageUrl}
          alt={business.name}
        />
      )}

      <CardContent>
        <Typography variant="h6">
          {business.name}
        </Typography>

        {business.description && (
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ mt: 1 }}
          >
            {business.description}
          </Typography>
        )}
      </CardContent>
    </Card>
  );
};

export default BusinessCard;
