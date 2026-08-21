import type { FC, ReactNode } from "react";

interface BodyProps {
  children?: ReactNode;
}

const Body: FC<BodyProps> = ({ children }) => {
  return (
    <main className="appBody">
      <div className="appBodyContainer">{children}</div>
    </main>
  );
};

export default Body;
