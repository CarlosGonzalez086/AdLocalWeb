# Campaña ADLocal — registro y pertenencia

Tres flyers digitales de 1080 × 1350 px. Cada pieza tiene un PNG listo para revisión y un SVG editable con la fotografía incrustada. `generate.mjs` recompone los flyers desde las fotografías de `assets/` y el logo vectorial de `public/adlocal-logo-comunidad.svg`.

| Pieza | Público | Mensaje | CTA |
| --- | --- | --- | --- |
| `01-descubre` | Personas de la comunidad | Lo mejor de tu barrio está más cerca | Registro de clientes |
| `02-comercios` | Negocios locales | Tu negocio tiene un lugar aquí | Registro de comercios |
| `03-comunidad` | Comunidad general | Elegir cerca nos acerca más | Registro de clientes |

La paleta utiliza los colores de marca del proyecto: turquesa `#008989`, terracota `#E7692C`, marfil `#F8F6F2` y texto `#1C1D1F`. El encabezado incorpora el símbolo y el nombre del logo seleccionado.

## Prompts de las fotografías

Se generaron con la herramienta integrada `image_gen`, una imagen por pieza:

1. **Panadería:** fotografía editorial natural en una panadería independiente de un barrio mexicano contemporáneo; panadero entregando pan a una clienta, interacción cotidiana de confianza, luz de día, encuadre vertical, tonos cálidos con acentos terracota y turquesa; sin texto, marcas ni apariencia de fotografía de stock.
2. **Florería:** retrato editorial de la dueña de una florería independiente atendiendo a una clienta; orgullo por su negocio, trato cercano, luz natural, flores y acentos de marca discretos; sin texto, marcas ni poses publicitarias forzadas.
3. **Comunidad:** escena editorial de vecinos de distintas generaciones saludando al dueño de un comercio local en una calle caminable de una ciudad mexicana; pertenencia y familiaridad, luz matinal, realismo; sin texto, marcas ni clichés turísticos.

## Antes de publicar

- Comprobar manualmente que `adlocal.store/usuario/crear-cuenta` y `panel.adlocal.store/usuario/crear-cuenta` estén disponibles y completen el registro en producción. Las rutas provienen del código; no se logró verificar su disponibilidad en vivo durante el diseño.
- Las personas y negocios de las fotografías son generados por IA y **no representan usuarios ni comercios reales**. Para la campaña final, sustituirlas por fotografía de negocios participantes con su consentimiento fortalecería la credibilidad y el sentido de pertenencia.
- Estos PNG son piezas digitales, no artes finales de imprenta. Para impresión se requiere adaptación al tamaño, sangrado, perfil de color y resolución de la imprenta.
