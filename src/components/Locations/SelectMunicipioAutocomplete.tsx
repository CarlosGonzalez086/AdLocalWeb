import { Autocomplete, TextField } from "@mui/material";
import { useEffect } from "react";
import { useLocations } from "../../hooks/useLocations";

interface Props {
  estadoId: number;
  value: number;
  onChange: (value: number) => void;
}

const fieldSx = {
  "& .MuiOutlinedInput-root": {
    borderRadius: "12px",
    bgcolor: "#fff",
    "& fieldset": { borderColor: "#E0E0E0" },
    "&:hover fieldset": { borderColor: "#BDBDBD" },
    "&.Mui-focused fieldset": { borderColor: "#5B3A29" },
  },
  "& .MuiInputLabel-root.Mui-focused": { color: "#5B3A29" },
};

export const SelectMunicipioAutocomplete = ({ estadoId, value, onChange }: Props) => {
  const { municipalities, loading, getMunicipalitiesByState } = useLocations();

  useEffect(() => {
    if (estadoId) getMunicipalitiesByState(estadoId);
  }, [estadoId]);

  const selected = municipalities.find((m) => m.id === value) ?? null;

  return (
    <Autocomplete
      fullWidth
      options={estadoId ? municipalities : []}
      value={selected}
      loading={loading}
      disabled={!estadoId}
      isOptionEqualToValue={(opt, val) => opt.id === val.id}
      getOptionLabel={(opt) => opt.name}
      onChange={(_, newValue) => onChange(newValue ? newValue.id : 0)}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Municipio"
          placeholder={!estadoId ? "Selecciona un estado primero" : ""}
          sx={fieldSx}
        />
      )}
    />
  );
};