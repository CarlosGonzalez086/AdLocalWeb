
import App from "../components/App";
import React from "react";

// ⚡ Wrapper que solo carga Comercio en cliente
const ComercioWraper: React.FC<{ id: number }> = ({ id }) => {
  return (
    <App>
      <React.Suspense fallback={<div>Cargando comercio...</div>}>
        <ComercioLoader id={id} />
      </React.Suspense>
    </App>
  );
};

export default ComercioWraper;

// ----------------------
// Carga dinámica solo en cliente
// ----------------------
const ComercioLoader = ({ id }: { id: number }) => {
  const [ComercioComponent, setComercioComponent] = React.useState<React.FC<{ id: number }> | null>(null);

  React.useEffect(() => {
    import("../components/business/Comercio").then((mod) => {
      setComercioComponent(() => mod.default);
    });
  }, []);

  if (!ComercioComponent) return <div>Cargando...</div>;
  return <ComercioComponent id={id} />;
};
