
import type { Business } from "../../types/business";
import type { FC } from "react";

interface Props {
  business: Business;
}

const BusinessCard: FC<Props> = ({ business }) => {
  const isPremium = business.plan === "PREMIUM";

  return (
    <div
      className={`card-adlocal card-adlocal-interactive h-100 position-relative ${
        isPremium ? "border-primary" : ""
      }`}
    >
      {isPremium && (
        <span
          className="badge-adlocal badge-adlocal-secondary position-absolute top-0 end-0 m-2 fw-semibold"
        >
          PREMIUM
        </span>
      )}

      {business.imageUrl && (
        <img
          src={business.imageUrl}
          alt={business.name}
          className="w-100 object-fit-cover"
          style={{
            height: "160px",
            borderTopLeftRadius: "var(--radius-md)",
            borderTopRightRadius: "var(--radius-md)",
          }}
        />
      )}

      <div className="card-adlocal-body">
        <h3 className="fz-h5 fw-bold mb-1">
          {business.name}
        </h3>

        {business.description && (
          <p className="fz-body-sm text-muted mt-2 mb-0">
            {business.description}
          </p>
        )}
      </div>
    </div>
  );
};

export default BusinessCard;
