import {
  Button,
  FormControlLabel,
  MenuItem,
  Switch,
  TextField,
} from "@mui/material";

import { useEffect, useState, type FormEvent } from "react";
import type {
  DireccionUsuarioDto,
  DireccionUsuarioDtoCreate,
} from "../../../services/direccionesUsuarioApi";
import { GenericModal } from "../../UI/GenericModal";
import MaterialSymbol from "../../UI/MaterialSymbol/MaterialSymbol";
import { SelectEstadoAutocomplete } from "../../Locations/SelectEstadoAutocomplete";
import { SelectMunicipioAutocomplete } from "../../Locations/SelectMunicipioAutocomplete";

interface EstadoOption {
  id: number;
  nombre: string;
}

interface MunicipioOption {
  id: number;
  nombre: string;
}

interface Props {
  open: boolean;

  onClose: () => void;

  direccion?: DireccionUsuarioDto | null;

  loading?: boolean;

  onCrear: (dto: DireccionUsuarioDtoCreate) => Promise<boolean>;

  onActualizar: (
    uuid: string,
    dto: DireccionUsuarioDtoCreate,
  ) => Promise<boolean>;
}

interface FormState {
  alias: string;

  calle: string;

  numeroExterior: string;

  numeroInterior: string;

  colonia: string;

  codigoPostal: string;

  idEstado: number;

  idMunicipio: number;

  latitud: number | null;

  longitud: number | null;

  referencias: string;

  telefono: string;

  esPredeterminada: boolean;

  activo: boolean;
}

const initialForm: FormState = {
  alias: "",

  calle: "",

  numeroExterior: "",

  numeroInterior: "",

  colonia: "",

  codigoPostal: "",

  idEstado: 0,

  idMunicipio: 0,

  latitud: null,

  longitud: null,

  referencias: "",

  telefono: "",

  esPredeterminada: false,

  activo: true,
};

export default function DireccionUsuarioModal({
  open,
  onClose,
  direccion = null,
  loading = false,

  onCrear,
  onActualizar,
}: Props) {
  const [form, setForm] = useState<FormState>(initialForm);

  const [errors, setErrors] = useState<
    Partial<Record<keyof FormState, string>>
  >({});

  const editando = Boolean(direccion);

  useEffect(() => {
    if (!open) {
      return;
    }

    if (!direccion) {
      setForm(initialForm);
      setErrors({});

      return;
    }

    setForm({
      alias: direccion.alias ?? "",

      calle: direccion.calle ?? "",

      numeroExterior: direccion.numeroExterior ?? "",

      numeroInterior: direccion.numeroInterior ?? "",

      colonia: direccion.colonia ?? "",

      codigoPostal: direccion.codigoPostal ?? "",

      idEstado: direccion.idEstado ?? 0,

      idMunicipio: direccion.idMunicipio ?? 0,

      latitud: direccion.latitud ?? null,

      longitud: direccion.longitud ?? null,

      referencias: direccion.referencias ?? "",

      telefono: direccion.telefono ?? "",

      esPredeterminada: direccion.esPredeterminada ?? false,

      activo: direccion.activo ?? true,
    });

    // onEstadoChange(direccion.idEstado);

    setErrors({});
  }, [direccion, open]);

  const validar = () => {
    const nuevosErrores: typeof errors = {};

    if (!form.alias.trim()) {
      nuevosErrores.alias = "El alias es obligatorio";
    }

    if (!form.calle.trim()) {
      nuevosErrores.calle = "La calle es obligatoria";
    }

    if (!form.numeroExterior.trim()) {
      nuevosErrores.numeroExterior = "El número exterior es obligatorio";
    }

    if (!form.colonia.trim()) {
      nuevosErrores.colonia = "La colonia es obligatoria";
    }

    if (!form.codigoPostal.trim()) {
      nuevosErrores.codigoPostal = "El código postal es obligatorio";
    }

    if (form.idEstado <= 0) {
      nuevosErrores.idEstado = "Selecciona un estado";
    }

    if (form.idMunicipio <= 0) {
      nuevosErrores.idMunicipio = "Selecciona un municipio";
    }

    setErrors(nuevosErrores);

    return Object.keys(nuevosErrores).length === 0;
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!validar()) {
      return;
    }

    if (editando && direccion) {
      const success = await onActualizar(direccion.uuid, {
        alias: form.alias.trim(),

        calle: form.calle.trim(),

        numeroExterior: form.numeroExterior.trim(),

        numeroInterior: form.numeroInterior.trim() || null,

        colonia: form.colonia.trim(),

        codigoPostal: form.codigoPostal.trim(),

        idEstado: form.idEstado,

        idMunicipio: form.idMunicipio,

        latitud: form.latitud,

        longitud: form.longitud,

        referencias: form.referencias.trim() || null,

        telefono: form.telefono.trim() || null,

        esPredeterminada: form.esPredeterminada,
      });

      if (success) {
        onClose();
      }

      return;
    }

    const success = await onCrear({
      alias: form.alias.trim(),

      calle: form.calle.trim(),

      numeroExterior: form.numeroExterior.trim(),

      numeroInterior: form.numeroInterior.trim() || null,

      colonia: form.colonia.trim(),

      codigoPostal: form.codigoPostal.trim(),

      idEstado: form.idEstado,

      idMunicipio: form.idMunicipio,

      latitud: form.latitud,

      longitud: form.longitud,

      referencias: form.referencias.trim() || null,

      telefono: form.telefono.trim() || null,

      esPredeterminada: form.esPredeterminada,
    });

    if (success) {
      onClose();
    }
  };

  const obtenerUbicacion = () => {
    if (!navigator.geolocation) {
      return;
    }

    navigator.geolocation.getCurrentPosition((position) => {
      setForm((current) => ({
        ...current,

        latitud: position.coords.latitude,

        longitud: position.coords.longitude,
      }));
    });
  };

  return (
    <GenericModal
      open={open}
      onClose={onClose}
      title={editando ? "Editar dirección" : "Nueva dirección"}
      subtitle={
        editando
          ? "Actualiza la información de tu dirección."
          : "Agrega una dirección para recibir tus pedidos."
      }
      icon="location_on"
      maxWidth="md"
      loading={loading}
      onSubmit={handleSubmit}
      primaryAction={{
        label: editando ? "Guardar cambios" : "Guardar dirección",

        loadingLabel: "Guardando...",

        icon: "save",

        type: "submit",
      }}
    >
      <div className="direccionModalContent mt-4">
        <div className="direccionModalIntro">
          <div className="direccionModalIntroIcon">
            <MaterialSymbol icon="home_pin" size="medium" />
          </div>

          <div>
            <h3 className="direccionModalIntroTitle fz-h4 fw-bold">
              Datos de entrega
            </h3>

            <p className="direccionModalIntroDescription fz-h5 fw-regular mb-0">
              Ingresa la ubicación con el mayor detalle posible.
            </p>
          </div>
        </div>
        <div className="row g-3">
          <div className="col-12">
            <TextField
              label="Alias"
              placeholder="Ej. Casa, Trabajo"
              value={form.alias}
              fullWidth
              error={Boolean(errors.alias)}
              helperText={errors.alias}
              slotProps={{
                htmlInput: {
                  maxLength: 50,
                },
              }}
              onChange={(event) =>
                setForm((current) => ({
                  ...current,
                  alias: event.target.value,
                }))
              }
            />
          </div>

          <div className="col-12 col-md-6">
            <TextField
              label="Calle"
              value={form.calle}
              fullWidth
              error={Boolean(errors.calle)}
              helperText={errors.calle}
              onChange={(event) =>
                setForm((current) => ({
                  ...current,
                  calle: event.target.value,
                }))
              }
            />
          </div>

          <div className="col-6 col-md-3">
            <TextField
              label="Número exterior"
              value={form.numeroExterior}
              fullWidth
              error={Boolean(errors.numeroExterior)}
              helperText={errors.numeroExterior}
              onChange={(event) =>
                setForm((current) => ({
                  ...current,
                  numeroExterior: event.target.value,
                }))
              }
            />
          </div>

          <div className="col-6 col-md-3">
            <TextField
              label="Número interior"
              value={form.numeroInterior}
              fullWidth
              onChange={(event) =>
                setForm((current) => ({
                  ...current,
                  numeroInterior: event.target.value,
                }))
              }
            />
          </div>

          <div className="col-12 col-md-8">
            <TextField
              label="Colonia"
              value={form.colonia}
              fullWidth
              error={Boolean(errors.colonia)}
              helperText={errors.colonia}
              onChange={(event) =>
                setForm((current) => ({
                  ...current,
                  colonia: event.target.value,
                }))
              }
            />
          </div>

          <div className="col-12 col-md-4">
            <TextField
              label="Código postal"
              value={form.codigoPostal}
              fullWidth
              error={Boolean(errors.codigoPostal)}
              helperText={errors.codigoPostal}
              slotProps={{
                htmlInput: {
                  maxLength: 10,
                },
              }}
              onChange={(event) =>
                setForm((current) => ({
                  ...current,
                  codigoPostal: event.target.value,
                }))
              }
            />
          </div>

          <div className="col-12 col-md-6">
            <SelectEstadoAutocomplete
              value={form.idEstado}
              onChange={(idEstado) => {
                setForm((current) => ({
                  ...current,
                  idEstado,
                  idMunicipio: 0,
                }));
              }}
            />

            {errors.idEstado && (
              <span className="direccionModalFieldError fz-h6 fw-medium">
                {errors.idEstado}
              </span>
            )}
          </div>

          <div className="col-12 col-md-6">
            <SelectMunicipioAutocomplete
              estadoId={form.idEstado}
              value={form.idMunicipio}
              onChange={(idMunicipio) => {
                setForm((current) => ({
                  ...current,
                  idMunicipio,
                }));
              }}
            />

            {errors.idMunicipio && (
              <span className="direccionModalFieldError fz-h6 fw-medium">
                {errors.idMunicipio}
              </span>
            )}
          </div>

          <div className="col-12 col-md-6">
            <TextField
              label="Teléfono de contacto"
              value={form.telefono}
              fullWidth
              slotProps={{
                htmlInput: {
                  maxLength: 20,
                },
              }}
              onChange={(event) =>
                setForm((current) => ({
                  ...current,
                  telefono: event.target.value,
                }))
              }
            />
          </div>

          <div className="col-12">
            <TextField
              label="Referencias"
              placeholder="Ej. Casa color azul, frente a la farmacia..."
              value={form.referencias}
              multiline
              minRows={3}
              fullWidth
              slotProps={{
                htmlInput: {
                  maxLength: 500,
                },
              }}
              onChange={(event) =>
                setForm((current) => ({
                  ...current,
                  referencias: event.target.value,
                }))
              }
            />
          </div>

          {form.latitud !== null && form.longitud !== null && (
            <div className="col-12">
              <div className="direccionCoordinates">
                <MaterialSymbol icon="check_circle" size="small" />

                <span>Ubicación registrada</span>
              </div>
            </div>
          )}

          <div className="col-12">
            <div className="direccionModalOptions">
              <FormControlLabel
                control={
                  <Switch
                    checked={form.esPredeterminada}
                    onChange={(event) =>
                      setForm((current) => ({
                        ...current,
                        esPredeterminada: event.target.checked,
                      }))
                    }
                  />
                }
                label="Usar como dirección predeterminada"
              />

              {editando && (
                <FormControlLabel
                  control={
                    <Switch
                      checked={form.activo}
                      onChange={(event) =>
                        setForm((current) => ({
                          ...current,
                          activo: event.target.checked,
                        }))
                      }
                    />
                  }
                  label="Dirección activa"
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </GenericModal>
  );
}
