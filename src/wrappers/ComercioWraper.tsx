import App from "../components/App";
import React from "react";

const ComercioWraper: React.FC<{ id: number }> = ({ id }) => {
  return (
    <App>
      <React.Suspense fallback={<div>Cargando comercio...</div>}>
        <div className="w-100 h-100 p-3">
          <ComercioLoader id={id} />
        </div>
      </React.Suspense>
    </App>
  );
};

export default ComercioWraper;

const ComercioLoader = ({ id }: { id: number }) => {
  const [ComercioComponent, setComercioComponent] = React.useState<React.FC<{
    id: number;
  }> | null>(null);

  React.useEffect(() => {
    import("../components/business/Comercio").then((mod) => {
      setComercioComponent(() => mod.default);
    });
  }, []);

  if (!ComercioComponent) return <div>Cargando...</div>;
  return <ComercioComponent id={id} />;
};
