import { e as createComponent, f as createAstro, h as addAttribute, k as renderHead, l as renderComponent, r as renderTemplate } from '../../chunks/astro/server_DGJ8zzG5.mjs';
import 'piccolore';
import { jsx, jsxs } from 'react/jsx-runtime';
import * as React from 'react';
import { lazy, Suspense } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import composeClasses from '@mui/utils/composeClasses';
import { unstable_createGetCssVar, createSpacing, useTheme as useTheme$1, ThemeProvider as ThemeProvider$1, unstable_createCssVarsProvider, GlobalStyles as GlobalStyles$2, unstable_memoTheme, keyframes, css, createBox, createStack } from '@mui/system';
import capitalize from '@mui/utils/capitalize';
import generateUtilityClasses from '@mui/utils/generateUtilityClasses';
import generateUtilityClass from '@mui/utils/generateUtilityClass';
import { useDefaultProps as useDefaultProps$1 } from '@mui/system/DefaultPropsProvider';
import createStyled from '@mui/system/createStyled';
import _formatErrorMessage from '@mui/utils/formatMuiErrorMessage';
import deepmerge, { isPlainObject } from '@mui/utils/deepmerge';
import { getContrastRatio, lighten, darken, alpha, private_safeDarken, private_safeLighten, private_safeAlpha, private_safeEmphasize, private_safeColorChannel, hslToRgb } from '@mui/system/colorManipulator';
import { createUnarySpacing } from '@mui/system/spacing';
import { prepareTypographyVars, prepareCssVars, createGetColorSchemeSelector } from '@mui/system/cssVars';
import styleFunctionSx, { unstable_defaultSxConfig, extendSxProp as extendSxProp$1 } from '@mui/system/styleFunctionSx';
import systemCreateTheme from '@mui/system/createTheme';
import integerPropType from '@mui/utils/integerPropType';
import chainPropTypes from '@mui/utils/chainPropTypes';
import ClassNameGenerator from '@mui/utils/ClassNameGenerator';
import resolveProps from '@mui/utils/resolveProps';
import useId from '@mui/utils/useId';
import refType from '@mui/utils/refType';
import elementTypeAcceptingRef from '@mui/utils/elementTypeAcceptingRef';
import isFocusVisible from '@mui/utils/isFocusVisible';
import useForkRef from '@mui/utils/useForkRef';
import useEventCallback from '@mui/utils/useEventCallback';
import { Transition, TransitionGroup } from 'react-transition-group';
import useTimeout from '@mui/utils/useTimeout';
import useLazyRef from '@mui/utils/useLazyRef';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import { getPath } from '@mui/system/style';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import EmailIcon from '@mui/icons-material/Email';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import 'dayjs';
import appendOwnerState from '@mui/utils/appendOwnerState';
import resolveComponentProps from '@mui/utils/resolveComponentProps';
import mergeSlotProps from '@mui/utils/mergeSlotProps';
import unsupportedProp from '@mui/utils/unsupportedProp';
import { isFragment } from 'react-is';
import useControlled from '@mui/utils/useControlled';
import axios from 'axios';
/* empty css                                     */
export { renderers } from '../../renderers.mjs';

const common = {
  black: '#000',
  white: '#fff'
};

const red = {
  300: '#e57373',
  400: '#ef5350',
  500: '#f44336',
  700: '#d32f2f',
  800: '#c62828'};

const purple = {
  50: '#f3e5f5',
  200: '#ce93d8',
  300: '#ba68c8',
  400: '#ab47bc',
  500: '#9c27b0',
  700: '#7b1fa2'};

const blue = {
  50: '#e3f2fd',
  200: '#90caf9',
  400: '#42a5f5',
  700: '#1976d2',
  800: '#1565c0'};

const lightBlue = {
  300: '#4fc3f7',
  400: '#29b6f6',
  500: '#03a9f4',
  700: '#0288d1',
  900: '#01579b'};

const green = {
  300: '#81c784',
  400: '#66bb6a',
  500: '#4caf50',
  700: '#388e3c',
  800: '#2e7d32',
  900: '#1b5e20'};

const orange = {
  300: '#ffb74d',
  400: '#ffa726',
  500: '#ff9800',
  700: '#f57c00',
  900: '#e65100'};

const grey = {
  50: '#fafafa',
  100: '#f5f5f5',
  200: '#eeeeee',
  300: '#e0e0e0',
  400: '#bdbdbd',
  500: '#9e9e9e',
  600: '#757575',
  700: '#616161',
  800: '#424242',
  900: '#212121',
  A100: '#f5f5f5',
  A200: '#eeeeee',
  A400: '#bdbdbd',
  A700: '#616161'
};

const THEME_ID = '$$material';

function getLight() {
  return {
    // The colors used to style the text.
    text: {
      // The most important text.
      primary: 'rgba(0, 0, 0, 0.87)',
      // Secondary text.
      secondary: 'rgba(0, 0, 0, 0.6)',
      // Disabled text have even lower visual prominence.
      disabled: 'rgba(0, 0, 0, 0.38)'
    },
    // The color used to divide different elements.
    divider: 'rgba(0, 0, 0, 0.12)',
    // The background colors used to style the surfaces.
    // Consistency between these values is important.
    background: {
      paper: common.white,
      default: common.white
    },
    // The colors used to style the action elements.
    action: {
      // The color of an active action like an icon button.
      active: 'rgba(0, 0, 0, 0.54)',
      // The color of an hovered action.
      hover: 'rgba(0, 0, 0, 0.04)',
      hoverOpacity: 0.04,
      // The color of a selected action.
      selected: 'rgba(0, 0, 0, 0.08)',
      selectedOpacity: 0.08,
      // The color of a disabled action.
      disabled: 'rgba(0, 0, 0, 0.26)',
      // The background color of a disabled action.
      disabledBackground: 'rgba(0, 0, 0, 0.12)',
      disabledOpacity: 0.38,
      focus: 'rgba(0, 0, 0, 0.12)',
      focusOpacity: 0.12,
      activatedOpacity: 0.12
    }
  };
}
const light = getLight();
function getDark() {
  return {
    text: {
      primary: common.white,
      secondary: 'rgba(255, 255, 255, 0.7)',
      disabled: 'rgba(255, 255, 255, 0.5)',
      icon: 'rgba(255, 255, 255, 0.5)'
    },
    divider: 'rgba(255, 255, 255, 0.12)',
    background: {
      paper: '#121212',
      default: '#121212'
    },
    action: {
      active: common.white,
      hover: 'rgba(255, 255, 255, 0.08)',
      hoverOpacity: 0.08,
      selected: 'rgba(255, 255, 255, 0.16)',
      selectedOpacity: 0.16,
      disabled: 'rgba(255, 255, 255, 0.3)',
      disabledBackground: 'rgba(255, 255, 255, 0.12)',
      disabledOpacity: 0.38,
      focus: 'rgba(255, 255, 255, 0.12)',
      focusOpacity: 0.12,
      activatedOpacity: 0.24
    }
  };
}
const dark = getDark();
function addLightOrDark(intent, direction, shade, tonalOffset) {
  const tonalOffsetLight = tonalOffset.light || tonalOffset;
  const tonalOffsetDark = tonalOffset.dark || tonalOffset * 1.5;
  if (!intent[direction]) {
    if (intent.hasOwnProperty(shade)) {
      intent[direction] = intent[shade];
    } else if (direction === 'light') {
      intent.light = lighten(intent.main, tonalOffsetLight);
    } else if (direction === 'dark') {
      intent.dark = darken(intent.main, tonalOffsetDark);
    }
  }
}
function mixLightOrDark(colorSpace, intent, direction, shade, tonalOffset) {
  const tonalOffsetLight = tonalOffset.light || tonalOffset;
  const tonalOffsetDark = tonalOffset.dark || tonalOffset * 1.5;
  if (!intent[direction]) {
    if (intent.hasOwnProperty(shade)) {
      intent[direction] = intent[shade];
    } else if (direction === 'light') {
      intent.light = `color-mix(in ${colorSpace}, ${intent.main}, #fff ${(tonalOffsetLight * 100).toFixed(0)}%)`;
    } else if (direction === 'dark') {
      intent.dark = `color-mix(in ${colorSpace}, ${intent.main}, #000 ${(tonalOffsetDark * 100).toFixed(0)}%)`;
    }
  }
}
function getDefaultPrimary(mode = 'light') {
  if (mode === 'dark') {
    return {
      main: blue[200],
      light: blue[50],
      dark: blue[400]
    };
  }
  return {
    main: blue[700],
    light: blue[400],
    dark: blue[800]
  };
}
function getDefaultSecondary(mode = 'light') {
  if (mode === 'dark') {
    return {
      main: purple[200],
      light: purple[50],
      dark: purple[400]
    };
  }
  return {
    main: purple[500],
    light: purple[300],
    dark: purple[700]
  };
}
function getDefaultError(mode = 'light') {
  if (mode === 'dark') {
    return {
      main: red[500],
      light: red[300],
      dark: red[700]
    };
  }
  return {
    main: red[700],
    light: red[400],
    dark: red[800]
  };
}
function getDefaultInfo(mode = 'light') {
  if (mode === 'dark') {
    return {
      main: lightBlue[400],
      light: lightBlue[300],
      dark: lightBlue[700]
    };
  }
  return {
    main: lightBlue[700],
    light: lightBlue[500],
    dark: lightBlue[900]
  };
}
function getDefaultSuccess(mode = 'light') {
  if (mode === 'dark') {
    return {
      main: green[400],
      light: green[300],
      dark: green[700]
    };
  }
  return {
    main: green[800],
    light: green[500],
    dark: green[900]
  };
}
function getDefaultWarning(mode = 'light') {
  if (mode === 'dark') {
    return {
      main: orange[400],
      light: orange[300],
      dark: orange[700]
    };
  }
  return {
    main: '#ed6c02',
    // closest to orange[800] that pass 3:1.
    light: orange[500],
    dark: orange[900]
  };
}

// Use the same name as the experimental CSS `contrast-color` function.
function contrastColor(background) {
  return `oklch(from ${background} var(--__l) 0 h / var(--__a))`;
}
function createPalette(palette) {
  const {
    mode = 'light',
    contrastThreshold = 3,
    tonalOffset = 0.2,
    colorSpace,
    ...other
  } = palette;
  const primary = palette.primary || getDefaultPrimary(mode);
  const secondary = palette.secondary || getDefaultSecondary(mode);
  const error = palette.error || getDefaultError(mode);
  const info = palette.info || getDefaultInfo(mode);
  const success = palette.success || getDefaultSuccess(mode);
  const warning = palette.warning || getDefaultWarning(mode);

  // Use the same logic as
  // Bootstrap: https://github.com/twbs/bootstrap/blob/1d6e3710dd447de1a200f29e8fa521f8a0908f70/scss/_functions.scss#L59
  // and material-components-web https://github.com/material-components/material-components-web/blob/ac46b8863c4dab9fc22c4c662dc6bd1b65dd652f/packages/mdc-theme/_functions.scss#L54
  function getContrastText(background) {
    if (colorSpace) {
      return contrastColor(background);
    }
    const contrastText = getContrastRatio(background, dark.text.primary) >= contrastThreshold ? dark.text.primary : light.text.primary;
    if (process.env.NODE_ENV !== 'production') {
      const contrast = getContrastRatio(background, contrastText);
      if (contrast < 3) {
        console.error([`MUI: The contrast ratio of ${contrast}:1 for ${contrastText} on ${background}`, 'falls below the WCAG recommended absolute minimum contrast ratio of 3:1.', 'https://www.w3.org/TR/2008/REC-WCAG20-20081211/#visual-audio-contrast-contrast'].join('\n'));
      }
    }
    return contrastText;
  }
  const augmentColor = ({
    color,
    name,
    mainShade = 500,
    lightShade = 300,
    darkShade = 700
  }) => {
    color = {
      ...color
    };
    if (!color.main && color[mainShade]) {
      color.main = color[mainShade];
    }
    if (!color.hasOwnProperty('main')) {
      throw new Error(process.env.NODE_ENV !== "production" ? `MUI: The color${name ? ` (${name})` : ''} provided to augmentColor(color) is invalid.\n` + `The color object needs to have a \`main\` property or a \`${mainShade}\` property.` : _formatErrorMessage(11, name ? ` (${name})` : '', mainShade));
    }
    if (typeof color.main !== 'string') {
      throw new Error(process.env.NODE_ENV !== "production" ? `MUI: The color${name ? ` (${name})` : ''} provided to augmentColor(color) is invalid.\n` + `\`color.main\` should be a string, but \`${JSON.stringify(color.main)}\` was provided instead.\n` + '\n' + 'Did you intend to use one of the following approaches?\n' + '\n' + 'import { green } from "@mui/material/colors";\n' + '\n' + 'const theme1 = createTheme({ palette: {\n' + '  primary: green,\n' + '} });\n' + '\n' + 'const theme2 = createTheme({ palette: {\n' + '  primary: { main: green[500] },\n' + '} });' : _formatErrorMessage(12, name ? ` (${name})` : '', JSON.stringify(color.main)));
    }
    if (colorSpace) {
      mixLightOrDark(colorSpace, color, 'light', lightShade, tonalOffset);
      mixLightOrDark(colorSpace, color, 'dark', darkShade, tonalOffset);
    } else {
      addLightOrDark(color, 'light', lightShade, tonalOffset);
      addLightOrDark(color, 'dark', darkShade, tonalOffset);
    }
    if (!color.contrastText) {
      color.contrastText = getContrastText(color.main);
    }
    return color;
  };
  let modeHydrated;
  if (mode === 'light') {
    modeHydrated = getLight();
  } else if (mode === 'dark') {
    modeHydrated = getDark();
  }
  if (process.env.NODE_ENV !== 'production') {
    if (!modeHydrated) {
      console.error(`MUI: The palette mode \`${mode}\` is not supported.`);
    }
  }
  const paletteOutput = deepmerge({
    // A collection of common colors.
    common: {
      ...common
    },
    // prevent mutable object.
    // The palette mode, can be light or dark.
    mode,
    // The colors used to represent primary interface elements for a user.
    primary: augmentColor({
      color: primary,
      name: 'primary'
    }),
    // The colors used to represent secondary interface elements for a user.
    secondary: augmentColor({
      color: secondary,
      name: 'secondary',
      mainShade: 'A400',
      lightShade: 'A200',
      darkShade: 'A700'
    }),
    // The colors used to represent interface elements that the user should be made aware of.
    error: augmentColor({
      color: error,
      name: 'error'
    }),
    // The colors used to represent potentially dangerous actions or important messages.
    warning: augmentColor({
      color: warning,
      name: 'warning'
    }),
    // The colors used to present information to the user that is neutral and not necessarily important.
    info: augmentColor({
      color: info,
      name: 'info'
    }),
    // The colors used to indicate the successful completion of an action that user triggered.
    success: augmentColor({
      color: success,
      name: 'success'
    }),
    // The grey colors.
    grey,
    // Used by `getContrastText()` to maximize the contrast between
    // the background and the text.
    contrastThreshold,
    // Takes a background color and returns the text color that maximizes the contrast.
    getContrastText,
    // Generate a rich color object.
    augmentColor,
    // Used by the functions below to shift a color's luminance by approximately
    // two indexes within its tonal palette.
    // E.g., shift from Red 500 to Red 300 or Red 700.
    tonalOffset,
    // The light and dark mode object.
    ...modeHydrated
  }, other);
  return paletteOutput;
}

function createMixins(breakpoints, mixins) {
  return {
    toolbar: {
      minHeight: 56,
      [breakpoints.up('xs')]: {
        '@media (orientation: landscape)': {
          minHeight: 48
        }
      },
      [breakpoints.up('sm')]: {
        minHeight: 64
      }
    },
    ...mixins
  };
}

function round(value) {
  return Math.round(value * 1e5) / 1e5;
}
const caseAllCaps = {
  textTransform: 'uppercase'
};
const defaultFontFamily = '"Roboto", "Helvetica", "Arial", sans-serif';

/**
 * @see @link{https://m2.material.io/design/typography/the-type-system.html}
 * @see @link{https://m2.material.io/design/typography/understanding-typography.html}
 */
function createTypography(palette, typography) {
  const {
    fontFamily = defaultFontFamily,
    // The default font size of the Material Specification.
    fontSize = 14,
    // px
    fontWeightLight = 300,
    fontWeightRegular = 400,
    fontWeightMedium = 500,
    fontWeightBold = 700,
    // Tell MUI what's the font-size on the html element.
    // 16px is the default font-size used by browsers.
    htmlFontSize = 16,
    // Apply the CSS properties to all the variants.
    allVariants,
    pxToRem: pxToRem2,
    ...other
  } = typeof typography === 'function' ? typography(palette) : typography;
  if (process.env.NODE_ENV !== 'production') {
    if (typeof fontSize !== 'number') {
      console.error('MUI: `fontSize` is required to be a number.');
    }
    if (typeof htmlFontSize !== 'number') {
      console.error('MUI: `htmlFontSize` is required to be a number.');
    }
  }
  const coef = fontSize / 14;
  const pxToRem = pxToRem2 || (size => `${size / htmlFontSize * coef}rem`);
  const buildVariant = (fontWeight, size, lineHeight, letterSpacing, casing) => ({
    fontFamily,
    fontWeight,
    fontSize: pxToRem(size),
    // Unitless following https://meyerweb.com/eric/thoughts/2006/02/08/unitless-line-heights/
    lineHeight,
    // The letter spacing was designed for the Roboto font-family. Using the same letter-spacing
    // across font-families can cause issues with the kerning.
    ...(fontFamily === defaultFontFamily ? {
      letterSpacing: `${round(letterSpacing / size)}em`
    } : {}),
    ...casing,
    ...allVariants
  });
  const variants = {
    h1: buildVariant(fontWeightLight, 96, 1.167, -1.5),
    h2: buildVariant(fontWeightLight, 60, 1.2, -0.5),
    h3: buildVariant(fontWeightRegular, 48, 1.167, 0),
    h4: buildVariant(fontWeightRegular, 34, 1.235, 0.25),
    h5: buildVariant(fontWeightRegular, 24, 1.334, 0),
    h6: buildVariant(fontWeightMedium, 20, 1.6, 0.15),
    subtitle1: buildVariant(fontWeightRegular, 16, 1.75, 0.15),
    subtitle2: buildVariant(fontWeightMedium, 14, 1.57, 0.1),
    body1: buildVariant(fontWeightRegular, 16, 1.5, 0.15),
    body2: buildVariant(fontWeightRegular, 14, 1.43, 0.15),
    button: buildVariant(fontWeightMedium, 14, 1.75, 0.4, caseAllCaps),
    caption: buildVariant(fontWeightRegular, 12, 1.66, 0.4),
    overline: buildVariant(fontWeightRegular, 12, 2.66, 1, caseAllCaps),
    // TODO v6: Remove handling of 'inherit' variant from the theme as it is already handled in Material UI's Typography component. Also, remember to remove the associated types.
    inherit: {
      fontFamily: 'inherit',
      fontWeight: 'inherit',
      fontSize: 'inherit',
      lineHeight: 'inherit',
      letterSpacing: 'inherit'
    }
  };
  return deepmerge({
    htmlFontSize,
    pxToRem,
    fontFamily,
    fontSize,
    fontWeightLight,
    fontWeightRegular,
    fontWeightMedium,
    fontWeightBold,
    ...variants
  }, other, {
    clone: false // No need to clone deep
  });
}

const shadowKeyUmbraOpacity = 0.2;
const shadowKeyPenumbraOpacity = 0.14;
const shadowAmbientShadowOpacity = 0.12;
function createShadow(...px) {
  return [`${px[0]}px ${px[1]}px ${px[2]}px ${px[3]}px rgba(0,0,0,${shadowKeyUmbraOpacity})`, `${px[4]}px ${px[5]}px ${px[6]}px ${px[7]}px rgba(0,0,0,${shadowKeyPenumbraOpacity})`, `${px[8]}px ${px[9]}px ${px[10]}px ${px[11]}px rgba(0,0,0,${shadowAmbientShadowOpacity})`].join(',');
}

// Values from https://github.com/material-components/material-components-web/blob/be8747f94574669cb5e7add1a7c54fa41a89cec7/packages/mdc-elevation/_variables.scss
const shadows = ['none', createShadow(0, 2, 1, -1, 0, 1, 1, 0, 0, 1, 3, 0), createShadow(0, 3, 1, -2, 0, 2, 2, 0, 0, 1, 5, 0), createShadow(0, 3, 3, -2, 0, 3, 4, 0, 0, 1, 8, 0), createShadow(0, 2, 4, -1, 0, 4, 5, 0, 0, 1, 10, 0), createShadow(0, 3, 5, -1, 0, 5, 8, 0, 0, 1, 14, 0), createShadow(0, 3, 5, -1, 0, 6, 10, 0, 0, 1, 18, 0), createShadow(0, 4, 5, -2, 0, 7, 10, 1, 0, 2, 16, 1), createShadow(0, 5, 5, -3, 0, 8, 10, 1, 0, 3, 14, 2), createShadow(0, 5, 6, -3, 0, 9, 12, 1, 0, 3, 16, 2), createShadow(0, 6, 6, -3, 0, 10, 14, 1, 0, 4, 18, 3), createShadow(0, 6, 7, -4, 0, 11, 15, 1, 0, 4, 20, 3), createShadow(0, 7, 8, -4, 0, 12, 17, 2, 0, 5, 22, 4), createShadow(0, 7, 8, -4, 0, 13, 19, 2, 0, 5, 24, 4), createShadow(0, 7, 9, -4, 0, 14, 21, 2, 0, 5, 26, 4), createShadow(0, 8, 9, -5, 0, 15, 22, 2, 0, 6, 28, 5), createShadow(0, 8, 10, -5, 0, 16, 24, 2, 0, 6, 30, 5), createShadow(0, 8, 11, -5, 0, 17, 26, 2, 0, 6, 32, 5), createShadow(0, 9, 11, -5, 0, 18, 28, 2, 0, 7, 34, 6), createShadow(0, 9, 12, -6, 0, 19, 29, 2, 0, 7, 36, 6), createShadow(0, 10, 13, -6, 0, 20, 31, 3, 0, 8, 38, 7), createShadow(0, 10, 13, -6, 0, 21, 33, 3, 0, 8, 40, 7), createShadow(0, 10, 14, -6, 0, 22, 35, 3, 0, 8, 42, 7), createShadow(0, 11, 14, -7, 0, 23, 36, 3, 0, 9, 44, 8), createShadow(0, 11, 15, -7, 0, 24, 38, 3, 0, 9, 46, 8)];

// Follow https://material.google.com/motion/duration-easing.html#duration-easing-natural-easing-curves
// to learn the context in which each easing should be used.
const easing = {
  // This is the most common easing curve.
  easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
  // Objects enter the screen at full velocity from off-screen and
  // slowly decelerate to a resting point.
  easeOut: 'cubic-bezier(0.0, 0, 0.2, 1)',
  // Objects leave the screen at full velocity. They do not decelerate when off-screen.
  easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
  // The sharp curve is used by objects that may return to the screen at any time.
  sharp: 'cubic-bezier(0.4, 0, 0.6, 1)'
};

// Follow https://m2.material.io/guidelines/motion/duration-easing.html#duration-easing-common-durations
// to learn when use what timing
const duration = {
  shortest: 150,
  shorter: 200,
  short: 250,
  // most basic recommended timing
  standard: 300,
  // this is to be used in complex animations
  complex: 375,
  // recommended when something is entering screen
  enteringScreen: 225,
  // recommended when something is leaving screen
  leavingScreen: 195
};
function formatMs(milliseconds) {
  return `${Math.round(milliseconds)}ms`;
}
function getAutoHeightDuration(height) {
  if (!height) {
    return 0;
  }
  const constant = height / 36;

  // https://www.desmos.com/calculator/vbrp3ggqet
  return Math.min(Math.round((4 + 15 * constant ** 0.25 + constant / 5) * 10), 3000);
}
function createTransitions(inputTransitions) {
  const mergedEasing = {
    ...easing,
    ...inputTransitions.easing
  };
  const mergedDuration = {
    ...duration,
    ...inputTransitions.duration
  };
  const create = (props = ['all'], options = {}) => {
    const {
      duration: durationOption = mergedDuration.standard,
      easing: easingOption = mergedEasing.easeInOut,
      delay = 0,
      ...other
    } = options;
    if (process.env.NODE_ENV !== 'production') {
      const isString = value => typeof value === 'string';
      const isNumber = value => !Number.isNaN(parseFloat(value));
      if (!isString(props) && !Array.isArray(props)) {
        console.error('MUI: Argument "props" must be a string or Array.');
      }
      if (!isNumber(durationOption) && !isString(durationOption)) {
        console.error(`MUI: Argument "duration" must be a number or a string but found ${durationOption}.`);
      }
      if (!isString(easingOption)) {
        console.error('MUI: Argument "easing" must be a string.');
      }
      if (!isNumber(delay) && !isString(delay)) {
        console.error('MUI: Argument "delay" must be a number or a string.');
      }
      if (typeof options !== 'object') {
        console.error(['MUI: Secong argument of transition.create must be an object.', "Arguments should be either `create('prop1', options)` or `create(['prop1', 'prop2'], options)`"].join('\n'));
      }
      if (Object.keys(other).length !== 0) {
        console.error(`MUI: Unrecognized argument(s) [${Object.keys(other).join(',')}].`);
      }
    }
    return (Array.isArray(props) ? props : [props]).map(animatedProp => `${animatedProp} ${typeof durationOption === 'string' ? durationOption : formatMs(durationOption)} ${easingOption} ${typeof delay === 'string' ? delay : formatMs(delay)}`).join(',');
  };
  return {
    getAutoHeightDuration,
    create,
    ...inputTransitions,
    easing: mergedEasing,
    duration: mergedDuration
  };
}

// We need to centralize the zIndex definitions as they work
// like global values in the browser.
const zIndex = {
  mobileStepper: 1000,
  fab: 1050,
  speedDial: 1050,
  appBar: 1100,
  drawer: 1200,
  modal: 1300,
  snackbar: 1400,
  tooltip: 1500
};

/* eslint-disable import/prefer-default-export */
function isSerializable(val) {
  return isPlainObject(val) || typeof val === 'undefined' || typeof val === 'string' || typeof val === 'boolean' || typeof val === 'number' || Array.isArray(val);
}

/**
 * `baseTheme` usually comes from `createTheme()` or `extendTheme()`.
 *
 * This function is intended to be used with zero-runtime CSS-in-JS like Pigment CSS
 * For example, in a Next.js project:
 *
 * ```js
 * // next.config.js
 * const { extendTheme } = require('@mui/material/styles');
 *
 * const theme = extendTheme();
 * // `.toRuntimeSource` is Pigment CSS specific to create a theme that is available at runtime.
 * theme.toRuntimeSource = stringifyTheme;
 *
 * module.exports = withPigment({
 *  theme,
 * });
 * ```
 */
function stringifyTheme(baseTheme = {}) {
  const serializableTheme = {
    ...baseTheme
  };
  function serializeTheme(object) {
    const array = Object.entries(object);
    // eslint-disable-next-line no-plusplus
    for (let index = 0; index < array.length; index++) {
      const [key, value] = array[index];
      if (!isSerializable(value) || key.startsWith('unstable_')) {
        delete object[key];
      } else if (isPlainObject(value)) {
        object[key] = {
          ...value
        };
        serializeTheme(object[key]);
      }
    }
  }
  serializeTheme(serializableTheme);
  return `import { unstable_createBreakpoints as createBreakpoints, createTransitions } from '@mui/material/styles';

const theme = ${JSON.stringify(serializableTheme, null, 2)};

theme.breakpoints = createBreakpoints(theme.breakpoints || {});
theme.transitions = createTransitions(theme.transitions || {});

export default theme;`;
}

function coefficientToPercentage(coefficient) {
  if (typeof coefficient === 'number') {
    return `${(coefficient * 100).toFixed(0)}%`;
  }
  return `calc((${coefficient}) * 100%)`;
}

// This can be removed when moved to `color-mix()` entirely.
const parseAddition = str => {
  if (!Number.isNaN(+str)) {
    return +str;
  }
  const numbers = str.match(/\d*\.?\d+/g);
  if (!numbers) {
    return 0;
  }
  let sum = 0;
  for (let i = 0; i < numbers.length; i += 1) {
    sum += +numbers[i];
  }
  return sum;
};
function attachColorManipulators(theme) {
  Object.assign(theme, {
    alpha(color, coefficient) {
      const obj = this || theme;
      if (obj.colorSpace) {
        return `oklch(from ${color} l c h / ${typeof coefficient === 'string' ? `calc(${coefficient})` : coefficient})`;
      }
      if (obj.vars) {
        // To preserve the behavior of the CSS theme variables
        // In the future, this could be replaced by `color-mix` (when https://caniuse.com/?search=color-mix reaches 95%).
        return `rgba(${color.replace(/var\(--([^,\s)]+)(?:,[^)]+)?\)+/g, 'var(--$1Channel)')} / ${typeof coefficient === 'string' ? `calc(${coefficient})` : coefficient})`;
      }
      return alpha(color, parseAddition(coefficient));
    },
    lighten(color, coefficient) {
      const obj = this || theme;
      if (obj.colorSpace) {
        return `color-mix(in ${obj.colorSpace}, ${color}, #fff ${coefficientToPercentage(coefficient)})`;
      }
      return lighten(color, coefficient);
    },
    darken(color, coefficient) {
      const obj = this || theme;
      if (obj.colorSpace) {
        return `color-mix(in ${obj.colorSpace}, ${color}, #000 ${coefficientToPercentage(coefficient)})`;
      }
      return darken(color, coefficient);
    }
  });
}
function createThemeNoVars(options = {}, ...args) {
  const {
    breakpoints: breakpointsInput,
    mixins: mixinsInput = {},
    spacing: spacingInput,
    palette: paletteInput = {},
    transitions: transitionsInput = {},
    typography: typographyInput = {},
    shape: shapeInput,
    colorSpace,
    ...other
  } = options;
  if (options.vars &&
  // The error should throw only for the root theme creation because user is not allowed to use a custom node `vars`.
  // `generateThemeVars` is the closest identifier for checking that the `options` is a result of `createTheme` with CSS variables so that user can create new theme for nested ThemeProvider.
  options.generateThemeVars === undefined) {
    throw new Error(process.env.NODE_ENV !== "production" ? 'MUI: `vars` is a private field used for CSS variables support.\n' +
    // #host-reference
    'Please use another name or follow the [docs](https://mui.com/material-ui/customization/css-theme-variables/usage/) to enable the feature.' : _formatErrorMessage(20));
  }
  const palette = createPalette({
    ...paletteInput,
    colorSpace
  });
  const systemTheme = systemCreateTheme(options);
  let muiTheme = deepmerge(systemTheme, {
    mixins: createMixins(systemTheme.breakpoints, mixinsInput),
    palette,
    // Don't use [...shadows] until you've verified its transpiled code is not invoking the iterator protocol.
    shadows: shadows.slice(),
    typography: createTypography(palette, typographyInput),
    transitions: createTransitions(transitionsInput),
    zIndex: {
      ...zIndex
    }
  });
  muiTheme = deepmerge(muiTheme, other);
  muiTheme = args.reduce((acc, argument) => deepmerge(acc, argument), muiTheme);
  if (process.env.NODE_ENV !== 'production') {
    // TODO v6: Refactor to use globalStateClassesMapping from @mui/utils once `readOnly` state class is used in Rating component.
    const stateClasses = ['active', 'checked', 'completed', 'disabled', 'error', 'expanded', 'focused', 'focusVisible', 'required', 'selected'];
    const traverse = (node, component) => {
      let key;

      // eslint-disable-next-line guard-for-in
      for (key in node) {
        const child = node[key];
        if (stateClasses.includes(key) && Object.keys(child).length > 0) {
          if (process.env.NODE_ENV !== 'production') {
            const stateClass = generateUtilityClass('', key);
            console.error([`MUI: The \`${component}\` component increases ` + `the CSS specificity of the \`${key}\` internal state.`, 'You can not override it like this: ', JSON.stringify(node, null, 2), '', `Instead, you need to use the '&.${stateClass}' syntax:`, JSON.stringify({
              root: {
                [`&.${stateClass}`]: child
              }
            }, null, 2), '', 'https://mui.com/r/state-classes-guide'].join('\n'));
          }
          // Remove the style to prevent global conflicts.
          node[key] = {};
        }
      }
    };
    Object.keys(muiTheme.components).forEach(component => {
      const styleOverrides = muiTheme.components[component].styleOverrides;
      if (styleOverrides && component.startsWith('Mui')) {
        traverse(styleOverrides, component);
      }
    });
  }
  muiTheme.unstable_sxConfig = {
    ...unstable_defaultSxConfig,
    ...other?.unstable_sxConfig
  };
  muiTheme.unstable_sx = function sx(props) {
    return styleFunctionSx({
      sx: props,
      theme: this
    });
  };
  muiTheme.toRuntimeSource = stringifyTheme; // for Pigment CSS integration

  attachColorManipulators(muiTheme);
  return muiTheme;
}

// Inspired by https://github.com/material-components/material-components-ios/blob/bca36107405594d5b7b16265a5b0ed698f85a5ee/components/Elevation/src/UIColor%2BMaterialElevation.m#L61
function getOverlayAlpha(elevation) {
  let alphaValue;
  if (elevation < 1) {
    alphaValue = 5.11916 * elevation ** 2;
  } else {
    alphaValue = 4.5 * Math.log(elevation + 1) + 2;
  }
  return Math.round(alphaValue * 10) / 1000;
}

const defaultDarkOverlays = [...Array(25)].map((_, index) => {
  if (index === 0) {
    return 'none';
  }
  const overlay = getOverlayAlpha(index);
  return `linear-gradient(rgba(255 255 255 / ${overlay}), rgba(255 255 255 / ${overlay}))`;
});
function getOpacity(mode) {
  return {
    inputPlaceholder: mode === 'dark' ? 0.5 : 0.42,
    inputUnderline: mode === 'dark' ? 0.7 : 0.42,
    switchTrackDisabled: mode === 'dark' ? 0.2 : 0.12,
    switchTrack: mode === 'dark' ? 0.3 : 0.38
  };
}
function getOverlays(mode) {
  return mode === 'dark' ? defaultDarkOverlays : [];
}
function createColorScheme(options) {
  const {
    palette: paletteInput = {
      mode: 'light'
    },
    // need to cast to avoid module augmentation test
    opacity,
    overlays,
    colorSpace,
    ...other
  } = options;
  // need to cast because `colorSpace` is considered internal at the moment.
  const palette = createPalette({
    ...paletteInput,
    colorSpace
  });
  return {
    palette,
    opacity: {
      ...getOpacity(palette.mode),
      ...opacity
    },
    overlays: overlays || getOverlays(palette.mode),
    ...other
  };
}

function shouldSkipGeneratingVar(keys) {
  return !!keys[0].match(/(cssVarPrefix|colorSchemeSelector|modularCssLayers|rootSelector|typography|mixins|breakpoints|direction|transitions)/) || !!keys[0].match(/sxConfig$/) ||
  // ends with sxConfig
  keys[0] === 'palette' && !!keys[1]?.match(/(mode|contrastThreshold|tonalOffset)/);
}

/**
 * @internal These variables should not appear in the :root stylesheet when the `defaultColorScheme="dark"`
 */
const excludeVariablesFromRoot = cssVarPrefix => [...[...Array(25)].map((_, index) => `--${cssVarPrefix ? `${cssVarPrefix}-` : ''}overlays-${index}`), `--${cssVarPrefix ? `${cssVarPrefix}-` : ''}palette-AppBar-darkBg`, `--${cssVarPrefix ? `${cssVarPrefix}-` : ''}palette-AppBar-darkColor`];

const defaultGetSelector = theme => (colorScheme, css) => {
  const root = theme.rootSelector || ':root';
  const selector = theme.colorSchemeSelector;
  let rule = selector;
  if (selector === 'class') {
    rule = '.%s';
  }
  if (selector === 'data') {
    rule = '[data-%s]';
  }
  if (selector?.startsWith('data-') && !selector.includes('%s')) {
    // 'data-mui-color-scheme' -> '[data-mui-color-scheme="%s"]'
    rule = `[${selector}="%s"]`;
  }
  if (theme.defaultColorScheme === colorScheme) {
    if (colorScheme === 'dark') {
      const excludedVariables = {};
      excludeVariablesFromRoot(theme.cssVarPrefix).forEach(cssVar => {
        excludedVariables[cssVar] = css[cssVar];
        delete css[cssVar];
      });
      if (rule === 'media') {
        return {
          [root]: css,
          [`@media (prefers-color-scheme: dark)`]: {
            [root]: excludedVariables
          }
        };
      }
      if (rule) {
        return {
          [rule.replace('%s', colorScheme)]: excludedVariables,
          [`${root}, ${rule.replace('%s', colorScheme)}`]: css
        };
      }
      return {
        [root]: {
          ...css,
          ...excludedVariables
        }
      };
    }
    if (rule && rule !== 'media') {
      return `${root}, ${rule.replace('%s', String(colorScheme))}`;
    }
  } else if (colorScheme) {
    if (rule === 'media') {
      return {
        [`@media (prefers-color-scheme: ${String(colorScheme)})`]: {
          [root]: css
        }
      };
    }
    if (rule) {
      return rule.replace('%s', String(colorScheme));
    }
  }
  return root;
};

function assignNode(obj, keys) {
  keys.forEach(k => {
    if (!obj[k]) {
      obj[k] = {};
    }
  });
}
function setColor(obj, key, defaultValue) {
  if (!obj[key] && defaultValue) {
    obj[key] = defaultValue;
  }
}
function toRgb(color) {
  if (typeof color !== 'string' || !color.startsWith('hsl')) {
    return color;
  }
  return hslToRgb(color);
}
function setColorChannel(obj, key) {
  if (!(`${key}Channel` in obj)) {
    // custom channel token is not provided, generate one.
    // if channel token can't be generated, show a warning.
    obj[`${key}Channel`] = private_safeColorChannel(toRgb(obj[key]), `MUI: Can't create \`palette.${key}Channel\` because \`palette.${key}\` is not one of these formats: #nnn, #nnnnnn, rgb(), rgba(), hsl(), hsla(), color().` + '\n' + `To suppress this warning, you need to explicitly provide the \`palette.${key}Channel\` as a string (in rgb format, for example "12 12 12") or undefined if you want to remove the channel token.`);
  }
}
function getSpacingVal(spacingInput) {
  if (typeof spacingInput === 'number') {
    return `${spacingInput}px`;
  }
  if (typeof spacingInput === 'string' || typeof spacingInput === 'function' || Array.isArray(spacingInput)) {
    return spacingInput;
  }
  return '8px';
}
const silent = fn => {
  try {
    return fn();
  } catch (error) {
    // ignore error
  }
  return undefined;
};
const createGetCssVar = (cssVarPrefix = 'mui') => unstable_createGetCssVar(cssVarPrefix);
function attachColorScheme$1(colorSpace, colorSchemes, scheme, restTheme, colorScheme) {
  if (!scheme) {
    return undefined;
  }
  scheme = scheme === true ? {} : scheme;
  const mode = colorScheme === 'dark' ? 'dark' : 'light';
  if (!restTheme) {
    colorSchemes[colorScheme] = createColorScheme({
      ...scheme,
      palette: {
        mode,
        ...scheme?.palette
      },
      colorSpace
    });
    return undefined;
  }
  const {
    palette,
    ...muiTheme
  } = createThemeNoVars({
    ...restTheme,
    palette: {
      mode,
      ...scheme?.palette
    },
    colorSpace
  });
  colorSchemes[colorScheme] = {
    ...scheme,
    palette,
    opacity: {
      ...getOpacity(mode),
      ...scheme?.opacity
    },
    overlays: scheme?.overlays || getOverlays(mode)
  };
  return muiTheme;
}

/**
 * A default `createThemeWithVars` comes with a single color scheme, either `light` or `dark` based on the `defaultColorScheme`.
 * This is better suited for apps that only need a single color scheme.
 *
 * To enable built-in `light` and `dark` color schemes, either:
 * 1. provide a `colorSchemeSelector` to define how the color schemes will change.
 * 2. provide `colorSchemes.dark` will set `colorSchemeSelector: 'media'` by default.
 */
function createThemeWithVars(options = {}, ...args) {
  const {
    colorSchemes: colorSchemesInput = {
      light: true
    },
    defaultColorScheme: defaultColorSchemeInput,
    disableCssColorScheme = false,
    cssVarPrefix = 'mui',
    nativeColor = false,
    shouldSkipGeneratingVar: shouldSkipGeneratingVar$1 = shouldSkipGeneratingVar,
    colorSchemeSelector: selector = colorSchemesInput.light && colorSchemesInput.dark ? 'media' : undefined,
    rootSelector = ':root',
    ...input
  } = options;
  const firstColorScheme = Object.keys(colorSchemesInput)[0];
  const defaultColorScheme = defaultColorSchemeInput || (colorSchemesInput.light && firstColorScheme !== 'light' ? 'light' : firstColorScheme);
  const getCssVar = createGetCssVar(cssVarPrefix);
  const {
    [defaultColorScheme]: defaultSchemeInput,
    light: builtInLight,
    dark: builtInDark,
    ...customColorSchemes
  } = colorSchemesInput;
  const colorSchemes = {
    ...customColorSchemes
  };
  let defaultScheme = defaultSchemeInput;

  // For built-in light and dark color schemes, ensure that the value is valid if they are the default color scheme.
  if (defaultColorScheme === 'dark' && !('dark' in colorSchemesInput) || defaultColorScheme === 'light' && !('light' in colorSchemesInput)) {
    defaultScheme = true;
  }
  if (!defaultScheme) {
    throw new Error(process.env.NODE_ENV !== "production" ? `MUI: The \`colorSchemes.${defaultColorScheme}\` option is either missing or invalid.` : _formatErrorMessage(21, defaultColorScheme));
  }

  // The reason to use `oklch` is that it is the most perceptually uniform color space and widely supported.
  let colorSpace;
  if (nativeColor) {
    colorSpace = 'oklch';
  }

  // Create the palette for the default color scheme, either `light`, `dark`, or custom color scheme.
  const muiTheme = attachColorScheme$1(colorSpace, colorSchemes, defaultScheme, input, defaultColorScheme);
  if (builtInLight && !colorSchemes.light) {
    attachColorScheme$1(colorSpace, colorSchemes, builtInLight, undefined, 'light');
  }
  if (builtInDark && !colorSchemes.dark) {
    attachColorScheme$1(colorSpace, colorSchemes, builtInDark, undefined, 'dark');
  }
  let theme = {
    defaultColorScheme,
    ...muiTheme,
    cssVarPrefix,
    colorSchemeSelector: selector,
    rootSelector,
    getCssVar,
    colorSchemes,
    font: {
      ...prepareTypographyVars(muiTheme.typography),
      ...muiTheme.font
    },
    spacing: getSpacingVal(input.spacing)
  };
  Object.keys(theme.colorSchemes).forEach(key => {
    const palette = theme.colorSchemes[key].palette;
    const setCssVarColor = cssVar => {
      const tokens = cssVar.split('-');
      const color = tokens[1];
      const colorToken = tokens[2];
      return getCssVar(cssVar, palette[color][colorToken]);
    };

    // attach black & white channels to common node
    if (palette.mode === 'light') {
      setColor(palette.common, 'background', '#fff');
      setColor(palette.common, 'onBackground', '#000');
    }
    if (palette.mode === 'dark') {
      setColor(palette.common, 'background', '#000');
      setColor(palette.common, 'onBackground', '#fff');
    }
    function colorMix(method, color, coefficient) {
      if (colorSpace) {
        let mixer;
        if (method === private_safeAlpha) {
          mixer = `transparent ${((1 - coefficient) * 100).toFixed(0)}%`;
        }
        if (method === private_safeDarken) {
          mixer = `#000 ${(coefficient * 100).toFixed(0)}%`;
        }
        if (method === private_safeLighten) {
          mixer = `#fff ${(coefficient * 100).toFixed(0)}%`;
        }
        return `color-mix(in ${colorSpace}, ${color}, ${mixer})`;
      }
      return method(color, coefficient);
    }

    // assign component variables
    assignNode(palette, ['Alert', 'AppBar', 'Avatar', 'Button', 'Chip', 'FilledInput', 'LinearProgress', 'Skeleton', 'Slider', 'SnackbarContent', 'SpeedDialAction', 'StepConnector', 'StepContent', 'Switch', 'TableCell', 'Tooltip']);
    if (palette.mode === 'light') {
      setColor(palette.Alert, 'errorColor', colorMix(private_safeDarken, palette.error.light, 0.6));
      setColor(palette.Alert, 'infoColor', colorMix(private_safeDarken, palette.info.light, 0.6));
      setColor(palette.Alert, 'successColor', colorMix(private_safeDarken, palette.success.light, 0.6));
      setColor(palette.Alert, 'warningColor', colorMix(private_safeDarken, palette.warning.light, 0.6));
      setColor(palette.Alert, 'errorFilledBg', setCssVarColor('palette-error-main'));
      setColor(palette.Alert, 'infoFilledBg', setCssVarColor('palette-info-main'));
      setColor(palette.Alert, 'successFilledBg', setCssVarColor('palette-success-main'));
      setColor(palette.Alert, 'warningFilledBg', setCssVarColor('palette-warning-main'));
      setColor(palette.Alert, 'errorFilledColor', silent(() => palette.getContrastText(palette.error.main)));
      setColor(palette.Alert, 'infoFilledColor', silent(() => palette.getContrastText(palette.info.main)));
      setColor(palette.Alert, 'successFilledColor', silent(() => palette.getContrastText(palette.success.main)));
      setColor(palette.Alert, 'warningFilledColor', silent(() => palette.getContrastText(palette.warning.main)));
      setColor(palette.Alert, 'errorStandardBg', colorMix(private_safeLighten, palette.error.light, 0.9));
      setColor(palette.Alert, 'infoStandardBg', colorMix(private_safeLighten, palette.info.light, 0.9));
      setColor(palette.Alert, 'successStandardBg', colorMix(private_safeLighten, palette.success.light, 0.9));
      setColor(palette.Alert, 'warningStandardBg', colorMix(private_safeLighten, palette.warning.light, 0.9));
      setColor(palette.Alert, 'errorIconColor', setCssVarColor('palette-error-main'));
      setColor(palette.Alert, 'infoIconColor', setCssVarColor('palette-info-main'));
      setColor(palette.Alert, 'successIconColor', setCssVarColor('palette-success-main'));
      setColor(palette.Alert, 'warningIconColor', setCssVarColor('palette-warning-main'));
      setColor(palette.AppBar, 'defaultBg', setCssVarColor('palette-grey-100'));
      setColor(palette.Avatar, 'defaultBg', setCssVarColor('palette-grey-400'));
      setColor(palette.Button, 'inheritContainedBg', setCssVarColor('palette-grey-300'));
      setColor(palette.Button, 'inheritContainedHoverBg', setCssVarColor('palette-grey-A100'));
      setColor(palette.Chip, 'defaultBorder', setCssVarColor('palette-grey-400'));
      setColor(palette.Chip, 'defaultAvatarColor', setCssVarColor('palette-grey-700'));
      setColor(palette.Chip, 'defaultIconColor', setCssVarColor('palette-grey-700'));
      setColor(palette.FilledInput, 'bg', 'rgba(0, 0, 0, 0.06)');
      setColor(palette.FilledInput, 'hoverBg', 'rgba(0, 0, 0, 0.09)');
      setColor(palette.FilledInput, 'disabledBg', 'rgba(0, 0, 0, 0.12)');
      setColor(palette.LinearProgress, 'primaryBg', colorMix(private_safeLighten, palette.primary.main, 0.62));
      setColor(palette.LinearProgress, 'secondaryBg', colorMix(private_safeLighten, palette.secondary.main, 0.62));
      setColor(palette.LinearProgress, 'errorBg', colorMix(private_safeLighten, palette.error.main, 0.62));
      setColor(palette.LinearProgress, 'infoBg', colorMix(private_safeLighten, palette.info.main, 0.62));
      setColor(palette.LinearProgress, 'successBg', colorMix(private_safeLighten, palette.success.main, 0.62));
      setColor(palette.LinearProgress, 'warningBg', colorMix(private_safeLighten, palette.warning.main, 0.62));
      setColor(palette.Skeleton, 'bg', colorSpace ? colorMix(private_safeAlpha, palette.text.primary, 0.11) : `rgba(${setCssVarColor('palette-text-primaryChannel')} / 0.11)`);
      setColor(palette.Slider, 'primaryTrack', colorMix(private_safeLighten, palette.primary.main, 0.62));
      setColor(palette.Slider, 'secondaryTrack', colorMix(private_safeLighten, palette.secondary.main, 0.62));
      setColor(palette.Slider, 'errorTrack', colorMix(private_safeLighten, palette.error.main, 0.62));
      setColor(palette.Slider, 'infoTrack', colorMix(private_safeLighten, palette.info.main, 0.62));
      setColor(palette.Slider, 'successTrack', colorMix(private_safeLighten, palette.success.main, 0.62));
      setColor(palette.Slider, 'warningTrack', colorMix(private_safeLighten, palette.warning.main, 0.62));
      const snackbarContentBackground = colorSpace ? colorMix(private_safeDarken, palette.background.default, 0.6825) // use `0.6825` instead of `0.8` to match the contrast ratio of JS implementation
      : private_safeEmphasize(palette.background.default, 0.8);
      setColor(palette.SnackbarContent, 'bg', snackbarContentBackground);
      setColor(palette.SnackbarContent, 'color', silent(() => colorSpace ? dark.text.primary : palette.getContrastText(snackbarContentBackground)));
      setColor(palette.SpeedDialAction, 'fabHoverBg', private_safeEmphasize(palette.background.paper, 0.15));
      setColor(palette.StepConnector, 'border', setCssVarColor('palette-grey-400'));
      setColor(palette.StepContent, 'border', setCssVarColor('palette-grey-400'));
      setColor(palette.Switch, 'defaultColor', setCssVarColor('palette-common-white'));
      setColor(palette.Switch, 'defaultDisabledColor', setCssVarColor('palette-grey-100'));
      setColor(palette.Switch, 'primaryDisabledColor', colorMix(private_safeLighten, palette.primary.main, 0.62));
      setColor(palette.Switch, 'secondaryDisabledColor', colorMix(private_safeLighten, palette.secondary.main, 0.62));
      setColor(palette.Switch, 'errorDisabledColor', colorMix(private_safeLighten, palette.error.main, 0.62));
      setColor(palette.Switch, 'infoDisabledColor', colorMix(private_safeLighten, palette.info.main, 0.62));
      setColor(palette.Switch, 'successDisabledColor', colorMix(private_safeLighten, palette.success.main, 0.62));
      setColor(palette.Switch, 'warningDisabledColor', colorMix(private_safeLighten, palette.warning.main, 0.62));
      setColor(palette.TableCell, 'border', colorMix(private_safeLighten, colorMix(private_safeAlpha, palette.divider, 1), 0.88));
      setColor(palette.Tooltip, 'bg', colorMix(private_safeAlpha, palette.grey[700], 0.92));
    }
    if (palette.mode === 'dark') {
      setColor(palette.Alert, 'errorColor', colorMix(private_safeLighten, palette.error.light, 0.6));
      setColor(palette.Alert, 'infoColor', colorMix(private_safeLighten, palette.info.light, 0.6));
      setColor(palette.Alert, 'successColor', colorMix(private_safeLighten, palette.success.light, 0.6));
      setColor(palette.Alert, 'warningColor', colorMix(private_safeLighten, palette.warning.light, 0.6));
      setColor(palette.Alert, 'errorFilledBg', setCssVarColor('palette-error-dark'));
      setColor(palette.Alert, 'infoFilledBg', setCssVarColor('palette-info-dark'));
      setColor(palette.Alert, 'successFilledBg', setCssVarColor('palette-success-dark'));
      setColor(palette.Alert, 'warningFilledBg', setCssVarColor('palette-warning-dark'));
      setColor(palette.Alert, 'errorFilledColor', silent(() => palette.getContrastText(palette.error.dark)));
      setColor(palette.Alert, 'infoFilledColor', silent(() => palette.getContrastText(palette.info.dark)));
      setColor(palette.Alert, 'successFilledColor', silent(() => palette.getContrastText(palette.success.dark)));
      setColor(palette.Alert, 'warningFilledColor', silent(() => palette.getContrastText(palette.warning.dark)));
      setColor(palette.Alert, 'errorStandardBg', colorMix(private_safeDarken, palette.error.light, 0.9));
      setColor(palette.Alert, 'infoStandardBg', colorMix(private_safeDarken, palette.info.light, 0.9));
      setColor(palette.Alert, 'successStandardBg', colorMix(private_safeDarken, palette.success.light, 0.9));
      setColor(palette.Alert, 'warningStandardBg', colorMix(private_safeDarken, palette.warning.light, 0.9));
      setColor(palette.Alert, 'errorIconColor', setCssVarColor('palette-error-main'));
      setColor(palette.Alert, 'infoIconColor', setCssVarColor('palette-info-main'));
      setColor(palette.Alert, 'successIconColor', setCssVarColor('palette-success-main'));
      setColor(palette.Alert, 'warningIconColor', setCssVarColor('palette-warning-main'));
      setColor(palette.AppBar, 'defaultBg', setCssVarColor('palette-grey-900'));
      setColor(palette.AppBar, 'darkBg', setCssVarColor('palette-background-paper')); // specific for dark mode
      setColor(palette.AppBar, 'darkColor', setCssVarColor('palette-text-primary')); // specific for dark mode
      setColor(palette.Avatar, 'defaultBg', setCssVarColor('palette-grey-600'));
      setColor(palette.Button, 'inheritContainedBg', setCssVarColor('palette-grey-800'));
      setColor(palette.Button, 'inheritContainedHoverBg', setCssVarColor('palette-grey-700'));
      setColor(palette.Chip, 'defaultBorder', setCssVarColor('palette-grey-700'));
      setColor(palette.Chip, 'defaultAvatarColor', setCssVarColor('palette-grey-300'));
      setColor(palette.Chip, 'defaultIconColor', setCssVarColor('palette-grey-300'));
      setColor(palette.FilledInput, 'bg', 'rgba(255, 255, 255, 0.09)');
      setColor(palette.FilledInput, 'hoverBg', 'rgba(255, 255, 255, 0.13)');
      setColor(palette.FilledInput, 'disabledBg', 'rgba(255, 255, 255, 0.12)');
      setColor(palette.LinearProgress, 'primaryBg', colorMix(private_safeDarken, palette.primary.main, 0.5));
      setColor(palette.LinearProgress, 'secondaryBg', colorMix(private_safeDarken, palette.secondary.main, 0.5));
      setColor(palette.LinearProgress, 'errorBg', colorMix(private_safeDarken, palette.error.main, 0.5));
      setColor(palette.LinearProgress, 'infoBg', colorMix(private_safeDarken, palette.info.main, 0.5));
      setColor(palette.LinearProgress, 'successBg', colorMix(private_safeDarken, palette.success.main, 0.5));
      setColor(palette.LinearProgress, 'warningBg', colorMix(private_safeDarken, palette.warning.main, 0.5));
      setColor(palette.Skeleton, 'bg', colorSpace ? colorMix(private_safeAlpha, palette.text.primary, 0.13) : `rgba(${setCssVarColor('palette-text-primaryChannel')} / 0.13)`);
      setColor(palette.Slider, 'primaryTrack', colorMix(private_safeDarken, palette.primary.main, 0.5));
      setColor(palette.Slider, 'secondaryTrack', colorMix(private_safeDarken, palette.secondary.main, 0.5));
      setColor(palette.Slider, 'errorTrack', colorMix(private_safeDarken, palette.error.main, 0.5));
      setColor(palette.Slider, 'infoTrack', colorMix(private_safeDarken, palette.info.main, 0.5));
      setColor(palette.Slider, 'successTrack', colorMix(private_safeDarken, palette.success.main, 0.5));
      setColor(palette.Slider, 'warningTrack', colorMix(private_safeDarken, palette.warning.main, 0.5));
      const snackbarContentBackground = colorSpace ? colorMix(private_safeLighten, palette.background.default, 0.985) // use `0.985` instead of `0.98` to match the contrast ratio of JS implementation
      : private_safeEmphasize(palette.background.default, 0.98);
      setColor(palette.SnackbarContent, 'bg', snackbarContentBackground);
      setColor(palette.SnackbarContent, 'color', silent(() => colorSpace ? light.text.primary : palette.getContrastText(snackbarContentBackground)));
      setColor(palette.SpeedDialAction, 'fabHoverBg', private_safeEmphasize(palette.background.paper, 0.15));
      setColor(palette.StepConnector, 'border', setCssVarColor('palette-grey-600'));
      setColor(palette.StepContent, 'border', setCssVarColor('palette-grey-600'));
      setColor(palette.Switch, 'defaultColor', setCssVarColor('palette-grey-300'));
      setColor(palette.Switch, 'defaultDisabledColor', setCssVarColor('palette-grey-600'));
      setColor(palette.Switch, 'primaryDisabledColor', colorMix(private_safeDarken, palette.primary.main, 0.55));
      setColor(palette.Switch, 'secondaryDisabledColor', colorMix(private_safeDarken, palette.secondary.main, 0.55));
      setColor(palette.Switch, 'errorDisabledColor', colorMix(private_safeDarken, palette.error.main, 0.55));
      setColor(palette.Switch, 'infoDisabledColor', colorMix(private_safeDarken, palette.info.main, 0.55));
      setColor(palette.Switch, 'successDisabledColor', colorMix(private_safeDarken, palette.success.main, 0.55));
      setColor(palette.Switch, 'warningDisabledColor', colorMix(private_safeDarken, palette.warning.main, 0.55));
      setColor(palette.TableCell, 'border', colorMix(private_safeDarken, colorMix(private_safeAlpha, palette.divider, 1), 0.68));
      setColor(palette.Tooltip, 'bg', colorMix(private_safeAlpha, palette.grey[700], 0.92));
    }

    // MUI X - DataGrid needs this token.
    setColorChannel(palette.background, 'default');

    // added for consistency with the `background.default` token
    setColorChannel(palette.background, 'paper');
    setColorChannel(palette.common, 'background');
    setColorChannel(palette.common, 'onBackground');
    setColorChannel(palette, 'divider');
    Object.keys(palette).forEach(color => {
      const colors = palette[color];

      // The default palettes (primary, secondary, error, info, success, and warning) errors are handled by the above `createTheme(...)`.

      if (color !== 'tonalOffset' && colors && typeof colors === 'object') {
        // Silent the error for custom palettes.
        if (colors.main) {
          setColor(palette[color], 'mainChannel', private_safeColorChannel(toRgb(colors.main)));
        }
        if (colors.light) {
          setColor(palette[color], 'lightChannel', private_safeColorChannel(toRgb(colors.light)));
        }
        if (colors.dark) {
          setColor(palette[color], 'darkChannel', private_safeColorChannel(toRgb(colors.dark)));
        }
        if (colors.contrastText) {
          setColor(palette[color], 'contrastTextChannel', private_safeColorChannel(toRgb(colors.contrastText)));
        }
        if (color === 'text') {
          // Text colors: text.primary, text.secondary
          setColorChannel(palette[color], 'primary');
          setColorChannel(palette[color], 'secondary');
        }
        if (color === 'action') {
          // Action colors: action.active, action.selected
          if (colors.active) {
            setColorChannel(palette[color], 'active');
          }
          if (colors.selected) {
            setColorChannel(palette[color], 'selected');
          }
        }
      }
    });
  });
  theme = args.reduce((acc, argument) => deepmerge(acc, argument), theme);
  const parserConfig = {
    prefix: cssVarPrefix,
    disableCssColorScheme,
    shouldSkipGeneratingVar: shouldSkipGeneratingVar$1,
    getSelector: defaultGetSelector(theme),
    enableContrastVars: nativeColor
  };
  const {
    vars,
    generateThemeVars,
    generateStyleSheets
  } = prepareCssVars(theme, parserConfig);
  theme.vars = vars;
  Object.entries(theme.colorSchemes[theme.defaultColorScheme]).forEach(([key, value]) => {
    theme[key] = value;
  });
  theme.generateThemeVars = generateThemeVars;
  theme.generateStyleSheets = generateStyleSheets;
  theme.generateSpacing = function generateSpacing() {
    return createSpacing(input.spacing, createUnarySpacing(this));
  };
  theme.getColorSchemeSelector = createGetColorSchemeSelector(selector);
  theme.spacing = theme.generateSpacing();
  theme.shouldSkipGeneratingVar = shouldSkipGeneratingVar$1;
  theme.unstable_sxConfig = {
    ...unstable_defaultSxConfig,
    ...input?.unstable_sxConfig
  };
  theme.unstable_sx = function sx(props) {
    return styleFunctionSx({
      sx: props,
      theme: this
    });
  };
  theme.toRuntimeSource = stringifyTheme; // for Pigment CSS integration

  return theme;
}

// eslint-disable-next-line consistent-return
function attachColorScheme(theme, scheme, colorScheme) {
  if (!theme.colorSchemes) {
    return undefined;
  }
  if (colorScheme) {
    theme.colorSchemes[scheme] = {
      ...(colorScheme !== true && colorScheme),
      palette: createPalette({
        ...(colorScheme === true ? {} : colorScheme.palette),
        mode: scheme
      }) // cast type to skip module augmentation test
    };
  }
}

/**
 * Generate a theme base on the options received.
 * @param options Takes an incomplete theme object and adds the missing parts.
 * @param args Deep merge the arguments with the about to be returned theme.
 * @returns A complete, ready-to-use theme object.
 */
function createTheme(options = {},
// cast type to skip module augmentation test
...args) {
  const {
    palette,
    cssVariables = false,
    colorSchemes: initialColorSchemes = !palette ? {
      light: true
    } : undefined,
    defaultColorScheme: initialDefaultColorScheme = palette?.mode,
    ...other
  } = options;
  const defaultColorSchemeInput = initialDefaultColorScheme || 'light';
  const defaultScheme = initialColorSchemes?.[defaultColorSchemeInput];
  const colorSchemesInput = {
    ...initialColorSchemes,
    ...(palette ? {
      [defaultColorSchemeInput]: {
        ...(typeof defaultScheme !== 'boolean' && defaultScheme),
        palette
      }
    } : undefined)
  };
  if (cssVariables === false) {
    if (!('colorSchemes' in options)) {
      // Behaves exactly as v5
      return createThemeNoVars(options, ...args);
    }
    let paletteOptions = palette;
    if (!('palette' in options)) {
      if (colorSchemesInput[defaultColorSchemeInput]) {
        if (colorSchemesInput[defaultColorSchemeInput] !== true) {
          paletteOptions = colorSchemesInput[defaultColorSchemeInput].palette;
        } else if (defaultColorSchemeInput === 'dark') {
          // @ts-ignore to prevent the module augmentation test from failing
          paletteOptions = {
            mode: 'dark'
          };
        }
      }
    }
    const theme = createThemeNoVars({
      ...options,
      palette: paletteOptions
    }, ...args);
    theme.defaultColorScheme = defaultColorSchemeInput;
    theme.colorSchemes = colorSchemesInput;
    if (theme.palette.mode === 'light') {
      theme.colorSchemes.light = {
        ...(colorSchemesInput.light !== true && colorSchemesInput.light),
        palette: theme.palette
      };
      attachColorScheme(theme, 'dark', colorSchemesInput.dark);
    }
    if (theme.palette.mode === 'dark') {
      theme.colorSchemes.dark = {
        ...(colorSchemesInput.dark !== true && colorSchemesInput.dark),
        palette: theme.palette
      };
      attachColorScheme(theme, 'light', colorSchemesInput.light);
    }
    return theme;
  }
  if (!palette && !('light' in colorSchemesInput) && defaultColorSchemeInput === 'light') {
    colorSchemesInput.light = true;
  }
  return createThemeWithVars({
    ...other,
    colorSchemes: colorSchemesInput,
    defaultColorScheme: defaultColorSchemeInput,
    ...(typeof cssVariables !== 'boolean' && cssVariables)
  }, ...args);
}

const defaultTheme$1 = createTheme();

function useTheme() {
  const theme = useTheme$1(defaultTheme$1);
  if (process.env.NODE_ENV !== 'production') {
    // TODO: uncomment once we enable eslint-plugin-react-compiler // eslint-disable-next-line react-compiler/react-compiler
    // eslint-disable-next-line react-hooks/rules-of-hooks
    React.useDebugValue(theme);
  }
  return theme[THEME_ID] || theme;
}

// copied from @mui/system/createStyled
function slotShouldForwardProp(prop) {
  return prop !== 'ownerState' && prop !== 'theme' && prop !== 'sx' && prop !== 'as';
}

const rootShouldForwardProp = prop => slotShouldForwardProp(prop) && prop !== 'classes';

const styled = createStyled({
  themeId: THEME_ID,
  defaultTheme: defaultTheme$1,
  rootShouldForwardProp
});

function ThemeProviderNoVars({
  theme: themeInput,
  ...props
}) {
  const scopedTheme = THEME_ID in themeInput ? themeInput[THEME_ID] : undefined;
  return /*#__PURE__*/jsx(ThemeProvider$1, {
    ...props,
    themeId: scopedTheme ? THEME_ID : undefined,
    theme: scopedTheme || themeInput
  });
}

const defaultConfig = {
  colorSchemeStorageKey: 'mui-color-scheme',
  defaultLightColorScheme: 'light',
  defaultDarkColorScheme: 'dark',
  modeStorageKey: 'mui-mode'
};
process.env.NODE_ENV !== "production" ? {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │ To update them, edit the TypeScript types and run `pnpm proptypes`. │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * DOM attribute for applying a color scheme.
   * @default 'data-mui-color-scheme'
   * @example '.mode-%s' // for class based color scheme
   * @example '[data-mode-%s]' // for data-attribute without '='
   */
  attribute: PropTypes.string,
  /**
   * The node (provided as string) used to attach the color-scheme attribute.
   * @default 'document.documentElement'
   */
  colorSchemeNode: PropTypes.string,
  /**
   * localStorage key used to store `colorScheme`.
   * @default 'mui-color-scheme'
   */
  colorSchemeStorageKey: PropTypes.string,
  /**
   * The default color scheme to be used in dark mode.
   * @default 'dark'
   */
  defaultDarkColorScheme: PropTypes.string,
  /**
   * The default color scheme to be used in light mode.
   * @default 'light'
   */
  defaultLightColorScheme: PropTypes.string,
  /**
   * The default mode when the storage is empty (user's first visit).
   * @default 'system'
   */
  defaultMode: PropTypes.oneOf(['dark', 'light', 'system']),
  /**
   * localStorage key used to store `mode`.
   * @default 'mui-mode'
   */
  modeStorageKey: PropTypes.string,
  /**
   * Nonce string to pass to the inline script for CSP headers.
   */
  nonce: PropTypes.string
} : void 0;

const {
  CssVarsProvider: InternalCssVarsProvider,
  useColorScheme,
  getInitColorSchemeScript: deprecatedGetInitColorSchemeScript
} = unstable_createCssVarsProvider({
  themeId: THEME_ID,
  // @ts-ignore ignore module augmentation tests
  theme: () => createTheme({
    cssVariables: true
  }),
  colorSchemeStorageKey: defaultConfig.colorSchemeStorageKey,
  modeStorageKey: defaultConfig.modeStorageKey,
  defaultColorScheme: {
    light: defaultConfig.defaultLightColorScheme,
    dark: defaultConfig.defaultDarkColorScheme
  },
  resolveTheme: theme => {
    const newTheme = {
      ...theme,
      typography: createTypography(theme.palette, theme.typography)
    };
    newTheme.unstable_sx = function sx(props) {
      return styleFunctionSx({
        sx: props,
        theme: this
      });
    };
    return newTheme;
  }
});

/**
 * TODO: remove this export in v7
 * @deprecated
 * The `CssVarsProvider` component has been deprecated and ported into `ThemeProvider`.
 *
 * You should use `ThemeProvider` and `createTheme()` instead:
 *
 * ```diff
 * - import { CssVarsProvider, extendTheme } from '@mui/material/styles';
 * + import { ThemeProvider, createTheme } from '@mui/material/styles';
 *
 * - const theme = extendTheme();
 * + const theme = createTheme({
 * +   cssVariables: true,
 * +   colorSchemes: { light: true, dark: true },
 * + });
 *
 * - <CssVarsProvider theme={theme}>
 * + <ThemeProvider theme={theme}>
 * ```
 *
 * To see the full documentation, check out https://mui.com/material-ui/customization/css-theme-variables/usage/.
 */
const CssVarsProvider = InternalCssVarsProvider;

function ThemeProvider({
  theme,
  ...props
}) {
  const noVarsTheme = React.useMemo(() => {
    if (typeof theme === 'function') {
      return theme;
    }
    const muiTheme = THEME_ID in theme ? theme[THEME_ID] : theme;
    if (!('colorSchemes' in muiTheme)) {
      if (!('vars' in muiTheme)) {
        // For non-CSS variables themes, set `vars` to null to prevent theme inheritance from the upper theme.
        // The example use case is the docs demo that uses ThemeProvider to customize the theme while the upper theme is using CSS variables.
        return {
          ...theme,
          vars: null
        };
      }
      return theme;
    }
    return null;
  }, [theme]);
  if (noVarsTheme) {
    return /*#__PURE__*/jsx(ThemeProviderNoVars, {
      theme: noVarsTheme,
      ...props
    });
  }
  return /*#__PURE__*/jsx(CssVarsProvider, {
    theme: theme,
    ...props
  });
}

function GlobalStyles$1(props) {
  return /*#__PURE__*/jsx(GlobalStyles$2, {
    ...props,
    defaultTheme: defaultTheme$1,
    themeId: THEME_ID
  });
}
process.env.NODE_ENV !== "production" ? GlobalStyles$1.propTypes /* remove-proptypes */ = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * The styles you want to apply globally.
   */
  styles: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([PropTypes.array, PropTypes.func, PropTypes.number, PropTypes.object, PropTypes.string, PropTypes.bool])
} : void 0;

function globalCss(styles) {
  return function GlobalStylesWrapper(props) {
    return (
      /*#__PURE__*/
      // Pigment CSS `globalCss` support callback with theme inside an object but `GlobalStyles` support theme as a callback value.
      jsx(GlobalStyles$1, {
        styles: typeof styles === 'function' ? theme => styles({
          theme,
          ...props
        }) : styles
      })
    );
  };
}

// eslint-disable-next-line @typescript-eslint/naming-convention
function internal_createExtendSxProp() {
  return extendSxProp$1;
}

const memoTheme = unstable_memoTheme;

process.env.NODE_ENV !== "production" ? {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │ To update them, edit the TypeScript types and run `pnpm proptypes`. │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * @ignore
   */
  children: PropTypes.node,
  /**
   * @ignore
   */
  value: PropTypes.object.isRequired
} : void 0;
function useDefaultProps(params) {
  return useDefaultProps$1(params);
}

function getSvgIconUtilityClass(slot) {
  return generateUtilityClass('MuiSvgIcon', slot);
}
generateUtilityClasses('MuiSvgIcon', ['root', 'colorPrimary', 'colorSecondary', 'colorAction', 'colorError', 'colorDisabled', 'fontSizeInherit', 'fontSizeSmall', 'fontSizeMedium', 'fontSizeLarge']);

const useUtilityClasses$g = ownerState => {
  const {
    color,
    fontSize,
    classes
  } = ownerState;
  const slots = {
    root: ['root', color !== 'inherit' && `color${capitalize(color)}`, `fontSize${capitalize(fontSize)}`]
  };
  return composeClasses(slots, getSvgIconUtilityClass, classes);
};
const SvgIconRoot = styled('svg', {
  name: 'MuiSvgIcon',
  slot: 'Root',
  overridesResolver: (props, styles) => {
    const {
      ownerState
    } = props;
    return [styles.root, ownerState.color !== 'inherit' && styles[`color${capitalize(ownerState.color)}`], styles[`fontSize${capitalize(ownerState.fontSize)}`]];
  }
})(memoTheme(({
  theme
}) => ({
  userSelect: 'none',
  width: '1em',
  height: '1em',
  display: 'inline-block',
  flexShrink: 0,
  transition: theme.transitions?.create?.('fill', {
    duration: (theme.vars ?? theme).transitions?.duration?.shorter
  }),
  variants: [{
    props: props => !props.hasSvgAsChild,
    style: {
      // the <svg> will define the property that has `currentColor`
      // for example heroicons uses fill="none" and stroke="currentColor"
      fill: 'currentColor'
    }
  }, {
    props: {
      fontSize: 'inherit'
    },
    style: {
      fontSize: 'inherit'
    }
  }, {
    props: {
      fontSize: 'small'
    },
    style: {
      fontSize: theme.typography?.pxToRem?.(20) || '1.25rem'
    }
  }, {
    props: {
      fontSize: 'medium'
    },
    style: {
      fontSize: theme.typography?.pxToRem?.(24) || '1.5rem'
    }
  }, {
    props: {
      fontSize: 'large'
    },
    style: {
      fontSize: theme.typography?.pxToRem?.(35) || '2.1875rem'
    }
  },
  // TODO v5 deprecate color prop, v6 remove for sx
  ...Object.entries((theme.vars ?? theme).palette).filter(([, value]) => value && value.main).map(([color]) => ({
    props: {
      color
    },
    style: {
      color: (theme.vars ?? theme).palette?.[color]?.main
    }
  })), {
    props: {
      color: 'action'
    },
    style: {
      color: (theme.vars ?? theme).palette?.action?.active
    }
  }, {
    props: {
      color: 'disabled'
    },
    style: {
      color: (theme.vars ?? theme).palette?.action?.disabled
    }
  }, {
    props: {
      color: 'inherit'
    },
    style: {
      color: undefined
    }
  }]
})));
const SvgIcon = /*#__PURE__*/React.forwardRef(function SvgIcon(inProps, ref) {
  const props = useDefaultProps({
    props: inProps,
    name: 'MuiSvgIcon'
  });
  const {
    children,
    className,
    color = 'inherit',
    component = 'svg',
    fontSize = 'medium',
    htmlColor,
    inheritViewBox = false,
    titleAccess,
    viewBox = '0 0 24 24',
    ...other
  } = props;
  const hasSvgAsChild = /*#__PURE__*/React.isValidElement(children) && children.type === 'svg';
  const ownerState = {
    ...props,
    color,
    component,
    fontSize,
    instanceFontSize: inProps.fontSize,
    inheritViewBox,
    viewBox,
    hasSvgAsChild
  };
  const more = {};
  if (!inheritViewBox) {
    more.viewBox = viewBox;
  }
  const classes = useUtilityClasses$g(ownerState);
  return /*#__PURE__*/jsxs(SvgIconRoot, {
    as: component,
    className: clsx(classes.root, className),
    focusable: "false",
    color: htmlColor,
    "aria-hidden": titleAccess ? undefined : true,
    role: titleAccess ? 'img' : undefined,
    ref: ref,
    ...more,
    ...other,
    ...(hasSvgAsChild && children.props),
    ownerState: ownerState,
    children: [hasSvgAsChild ? children.props.children : children, titleAccess ? /*#__PURE__*/jsx("title", {
      children: titleAccess
    }) : null]
  });
});
process.env.NODE_ENV !== "production" ? SvgIcon.propTypes /* remove-proptypes */ = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * Node passed into the SVG element.
   */
  children: PropTypes.node,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: PropTypes.object,
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * The color of the component.
   * It supports both default and custom theme colors, which can be added as shown in the
   * [palette customization guide](https://mui.com/material-ui/customization/palette/#custom-colors).
   * You can use the `htmlColor` prop to apply a color attribute to the SVG element.
   * @default 'inherit'
   */
  color: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([PropTypes.oneOf(['inherit', 'action', 'disabled', 'primary', 'secondary', 'error', 'info', 'success', 'warning']), PropTypes.string]),
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: PropTypes.elementType,
  /**
   * The fontSize applied to the icon. Defaults to 24px, but can be configure to inherit font size.
   * @default 'medium'
   */
  fontSize: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([PropTypes.oneOf(['inherit', 'large', 'medium', 'small']), PropTypes.string]),
  /**
   * Applies a color attribute to the SVG element.
   */
  htmlColor: PropTypes.string,
  /**
   * If `true`, the root node will inherit the custom `component`'s viewBox and the `viewBox`
   * prop will be ignored.
   * Useful when you want to reference a custom `component` and have `SvgIcon` pass that
   * `component`'s viewBox to the root node.
   * @default false
   */
  inheritViewBox: PropTypes.bool,
  /**
   * The shape-rendering attribute. The behavior of the different options is described on the
   * [MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/SVG/Reference/Attribute/shape-rendering).
   * If you are having issues with blurry icons you should investigate this prop.
   */
  shapeRendering: PropTypes.string,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])), PropTypes.func, PropTypes.object]),
  /**
   * Provides a human-readable title for the element that contains it.
   * https://www.w3.org/TR/SVG-access/#Equivalent
   */
  titleAccess: PropTypes.string,
  /**
   * Allows you to redefine what the coordinates without units mean inside an SVG element.
   * For example, if the SVG element is 500 (width) by 200 (height),
   * and you pass viewBox="0 0 50 20",
   * this means that the coordinates inside the SVG will go from the top left corner (0,0)
   * to bottom right (50,20) and each unit will be worth 10px.
   * @default '0 0 24 24'
   */
  viewBox: PropTypes.string
} : void 0;
SvgIcon.muiName = 'SvgIcon';

function createSvgIcon(path, displayName) {
  function Component(props, ref) {
    return /*#__PURE__*/jsx(SvgIcon, {
      "data-testid": process.env.NODE_ENV !== 'production' ? `${displayName}Icon` : undefined,
      ref: ref,
      ...props,
      children: path
    });
  }
  if (process.env.NODE_ENV !== 'production') {
    // Need to set `displayName` on the inner component for React.memo.
    // React prior to 16.14 ignores `displayName` on the wrapper.
    Component.displayName = `${displayName}Icon`;
  }
  Component.muiName = SvgIcon.muiName;
  return /*#__PURE__*/React.memo(/*#__PURE__*/React.forwardRef(Component));
}

function getTransitionProps(props, options) {
  const {
    timeout,
    easing,
    style = {}
  } = props;
  return {
    duration: style.transitionDuration ?? (typeof timeout === 'number' ? timeout : timeout[options.mode] || 0),
    easing: style.transitionTimingFunction ?? (typeof easing === 'object' ? easing[options.mode] : easing),
    delay: style.transitionDelay
  };
}

/**
 * An internal function to create a Material UI slot.
 *
 * This is an advanced version of Base UI `useSlotProps` because Material UI allows leaf component to be customized via `component` prop
 * while Base UI does not need to support leaf component customization.
 *
 * @param {string} name: name of the slot
 * @param {object} parameters
 * @returns {[Slot, slotProps]} The slot's React component and the slot's props
 *
 * Note: the returned slot's props
 * - will never contain `component` prop.
 * - might contain `as` prop.
 */
function useSlot(
/**
 * The slot's name. All Material UI components should have `root` slot.
 *
 * If the name is `root`, the logic behaves differently from other slots,
 * e.g. the `externalForwardedProps` are spread to `root` slot but not other slots.
 */
name, parameters) {
  const {
    className,
    elementType: initialElementType,
    ownerState,
    externalForwardedProps,
    internalForwardedProps,
    shouldForwardComponentProp = false,
    ...useSlotPropsParams
  } = parameters;
  const {
    component: rootComponent,
    slots = {
      [name]: undefined
    },
    slotProps = {
      [name]: undefined
    },
    ...other
  } = externalForwardedProps;
  const elementType = slots[name] || initialElementType;

  // `slotProps[name]` can be a callback that receives the component's ownerState.
  // `resolvedComponentsProps` is always a plain object.
  const resolvedComponentsProps = resolveComponentProps(slotProps[name], ownerState);
  const {
    props: {
      component: slotComponent,
      ...mergedProps
    },
    internalRef
  } = mergeSlotProps({
    className,
    ...useSlotPropsParams,
    externalForwardedProps: name === 'root' ? other : undefined,
    externalSlotProps: resolvedComponentsProps
  });
  const ref = useForkRef(internalRef, resolvedComponentsProps?.ref, parameters.ref);
  const LeafComponent = name === 'root' ? slotComponent || rootComponent : slotComponent;
  const props = appendOwnerState(elementType, {
    ...(name === 'root' && !rootComponent && !slots[name] && internalForwardedProps),
    ...(name !== 'root' && !slots[name] && internalForwardedProps),
    ...mergedProps,
    ...(LeafComponent && !shouldForwardComponentProp && {
      as: LeafComponent
    }),
    ...(LeafComponent && shouldForwardComponentProp && {
      component: LeafComponent
    }),
    ref
  }, ownerState);
  return [elementType, props];
}

function getCollapseUtilityClass(slot) {
  return generateUtilityClass('MuiCollapse', slot);
}
generateUtilityClasses('MuiCollapse', ['root', 'horizontal', 'vertical', 'entered', 'hidden', 'wrapper', 'wrapperInner']);

const useUtilityClasses$f = ownerState => {
  const {
    orientation,
    classes
  } = ownerState;
  const slots = {
    root: ['root', `${orientation}`],
    entered: ['entered'],
    hidden: ['hidden'],
    wrapper: ['wrapper', `${orientation}`],
    wrapperInner: ['wrapperInner', `${orientation}`]
  };
  return composeClasses(slots, getCollapseUtilityClass, classes);
};
const CollapseRoot = styled('div', {
  name: 'MuiCollapse',
  slot: 'Root',
  overridesResolver: (props, styles) => {
    const {
      ownerState
    } = props;
    return [styles.root, styles[ownerState.orientation], ownerState.state === 'entered' && styles.entered, ownerState.state === 'exited' && !ownerState.in && ownerState.collapsedSize === '0px' && styles.hidden];
  }
})(memoTheme(({
  theme
}) => ({
  height: 0,
  overflow: 'hidden',
  transition: theme.transitions.create('height'),
  variants: [{
    props: {
      orientation: 'horizontal'
    },
    style: {
      height: 'auto',
      width: 0,
      transition: theme.transitions.create('width')
    }
  }, {
    props: {
      state: 'entered'
    },
    style: {
      height: 'auto',
      overflow: 'visible'
    }
  }, {
    props: {
      state: 'entered',
      orientation: 'horizontal'
    },
    style: {
      width: 'auto'
    }
  }, {
    props: ({
      ownerState
    }) => ownerState.state === 'exited' && !ownerState.in && ownerState.collapsedSize === '0px',
    style: {
      visibility: 'hidden'
    }
  }]
})));
const CollapseWrapper = styled('div', {
  name: 'MuiCollapse',
  slot: 'Wrapper'
})({
  // Hack to get children with a negative margin to not falsify the height computation.
  display: 'flex',
  width: '100%',
  variants: [{
    props: {
      orientation: 'horizontal'
    },
    style: {
      width: 'auto',
      height: '100%'
    }
  }]
});
const CollapseWrapperInner = styled('div', {
  name: 'MuiCollapse',
  slot: 'WrapperInner'
})({
  width: '100%',
  variants: [{
    props: {
      orientation: 'horizontal'
    },
    style: {
      width: 'auto',
      height: '100%'
    }
  }]
});

/**
 * The Collapse transition is used by the
 * [Vertical Stepper](/material-ui/react-stepper/#vertical-stepper) StepContent component.
 * It uses [react-transition-group](https://github.com/reactjs/react-transition-group) internally.
 */
const Collapse = /*#__PURE__*/React.forwardRef(function Collapse(inProps, ref) {
  const props = useDefaultProps({
    props: inProps,
    name: 'MuiCollapse'
  });
  const {
    addEndListener,
    children,
    className,
    collapsedSize: collapsedSizeProp = '0px',
    component,
    easing,
    in: inProp,
    onEnter,
    onEntered,
    onEntering,
    onExit,
    onExited,
    onExiting,
    orientation = 'vertical',
    slots = {},
    slotProps = {},
    style,
    timeout = duration.standard,
    // eslint-disable-next-line react/prop-types
    TransitionComponent = Transition,
    ...other
  } = props;
  const ownerState = {
    ...props,
    orientation,
    collapsedSize: collapsedSizeProp
  };
  const classes = useUtilityClasses$f(ownerState);
  const theme = useTheme();
  const timer = useTimeout();
  const wrapperRef = React.useRef(null);
  const autoTransitionDuration = React.useRef();
  const collapsedSize = typeof collapsedSizeProp === 'number' ? `${collapsedSizeProp}px` : collapsedSizeProp;
  const isHorizontal = orientation === 'horizontal';
  const size = isHorizontal ? 'width' : 'height';
  const nodeRef = React.useRef(null);
  const handleRef = useForkRef(ref, nodeRef);
  const normalizedTransitionCallback = callback => maybeIsAppearing => {
    if (callback) {
      const node = nodeRef.current;

      // onEnterXxx and onExitXxx callbacks have a different arguments.length value.
      if (maybeIsAppearing === undefined) {
        callback(node);
      } else {
        callback(node, maybeIsAppearing);
      }
    }
  };
  const getWrapperSize = () => wrapperRef.current ? wrapperRef.current[isHorizontal ? 'clientWidth' : 'clientHeight'] : 0;
  const handleEnter = normalizedTransitionCallback((node, isAppearing) => {
    if (wrapperRef.current && isHorizontal) {
      // Set absolute position to get the size of collapsed content
      wrapperRef.current.style.position = 'absolute';
    }
    node.style[size] = collapsedSize;
    if (onEnter) {
      onEnter(node, isAppearing);
    }
  });
  const handleEntering = normalizedTransitionCallback((node, isAppearing) => {
    const wrapperSize = getWrapperSize();
    if (wrapperRef.current && isHorizontal) {
      // After the size is read reset the position back to default
      wrapperRef.current.style.position = '';
    }
    const {
      duration: transitionDuration,
      easing: transitionTimingFunction
    } = getTransitionProps({
      style,
      timeout,
      easing
    }, {
      mode: 'enter'
    });
    if (timeout === 'auto') {
      const duration2 = theme.transitions.getAutoHeightDuration(wrapperSize);
      node.style.transitionDuration = `${duration2}ms`;
      autoTransitionDuration.current = duration2;
    } else {
      node.style.transitionDuration = typeof transitionDuration === 'string' ? transitionDuration : `${transitionDuration}ms`;
    }
    node.style[size] = `${wrapperSize}px`;
    node.style.transitionTimingFunction = transitionTimingFunction;
    if (onEntering) {
      onEntering(node, isAppearing);
    }
  });
  const handleEntered = normalizedTransitionCallback((node, isAppearing) => {
    node.style[size] = 'auto';
    if (onEntered) {
      onEntered(node, isAppearing);
    }
  });
  const handleExit = normalizedTransitionCallback(node => {
    node.style[size] = `${getWrapperSize()}px`;
    if (onExit) {
      onExit(node);
    }
  });
  const handleExited = normalizedTransitionCallback(onExited);
  const handleExiting = normalizedTransitionCallback(node => {
    const wrapperSize = getWrapperSize();
    const {
      duration: transitionDuration,
      easing: transitionTimingFunction
    } = getTransitionProps({
      style,
      timeout,
      easing
    }, {
      mode: 'exit'
    });
    if (timeout === 'auto') {
      // TODO: rename getAutoHeightDuration to something more generic (width support)
      // Actually it just calculates animation duration based on size
      const duration2 = theme.transitions.getAutoHeightDuration(wrapperSize);
      node.style.transitionDuration = `${duration2}ms`;
      autoTransitionDuration.current = duration2;
    } else {
      node.style.transitionDuration = typeof transitionDuration === 'string' ? transitionDuration : `${transitionDuration}ms`;
    }
    node.style[size] = collapsedSize;
    node.style.transitionTimingFunction = transitionTimingFunction;
    if (onExiting) {
      onExiting(node);
    }
  });
  const handleAddEndListener = next => {
    if (timeout === 'auto') {
      timer.start(autoTransitionDuration.current || 0, next);
    }
    if (addEndListener) {
      // Old call signature before `react-transition-group` implemented `nodeRef`
      addEndListener(nodeRef.current, next);
    }
  };
  const externalForwardedProps = {
    slots,
    slotProps,
    component
  };
  const [RootSlot, rootSlotProps] = useSlot('root', {
    ref: handleRef,
    className: clsx(classes.root, className),
    elementType: CollapseRoot,
    externalForwardedProps,
    ownerState,
    additionalProps: {
      style: {
        [isHorizontal ? 'minWidth' : 'minHeight']: collapsedSize,
        ...style
      }
    }
  });
  const [WrapperSlot, wrapperSlotProps] = useSlot('wrapper', {
    ref: wrapperRef,
    className: classes.wrapper,
    elementType: CollapseWrapper,
    externalForwardedProps,
    ownerState
  });
  const [WrapperInnerSlot, wrapperInnerSlotProps] = useSlot('wrapperInner', {
    className: classes.wrapperInner,
    elementType: CollapseWrapperInner,
    externalForwardedProps,
    ownerState
  });
  return /*#__PURE__*/jsx(TransitionComponent, {
    in: inProp,
    onEnter: handleEnter,
    onEntered: handleEntered,
    onEntering: handleEntering,
    onExit: handleExit,
    onExited: handleExited,
    onExiting: handleExiting,
    addEndListener: handleAddEndListener,
    nodeRef: nodeRef,
    timeout: timeout === 'auto' ? null : timeout,
    ...other,
    children: (state, {
      ownerState: incomingOwnerState,
      ...restChildProps
    }) => {
      const stateOwnerState = {
        ...ownerState,
        state
      };
      return /*#__PURE__*/jsx(RootSlot, {
        ...rootSlotProps,
        className: clsx(rootSlotProps.className, {
          'entered': classes.entered,
          'exited': !inProp && collapsedSize === '0px' && classes.hidden
        }[state]),
        ownerState: stateOwnerState,
        ...restChildProps,
        children: /*#__PURE__*/jsx(WrapperSlot, {
          ...wrapperSlotProps,
          ownerState: stateOwnerState,
          children: /*#__PURE__*/jsx(WrapperInnerSlot, {
            ...wrapperInnerSlotProps,
            ownerState: stateOwnerState,
            children: children
          })
        })
      });
    }
  });
});
process.env.NODE_ENV !== "production" ? Collapse.propTypes /* remove-proptypes */ = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * Add a custom transition end trigger. Called with the transitioning DOM
   * node and a done callback. Allows for more fine grained transition end
   * logic. Note: Timeouts are still used as a fallback if provided.
   */
  addEndListener: PropTypes.func,
  /**
   * The content node to be collapsed.
   */
  children: PropTypes.node,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: PropTypes.object,
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * The width (horizontal) or height (vertical) of the container when collapsed.
   * @default '0px'
   */
  collapsedSize: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: elementTypeAcceptingRef,
  /**
   * The transition timing function.
   * You may specify a single easing or a object containing enter and exit values.
   */
  easing: PropTypes.oneOfType([PropTypes.shape({
    enter: PropTypes.string,
    exit: PropTypes.string
  }), PropTypes.string]),
  /**
   * If `true`, the component will transition in.
   */
  in: PropTypes.bool,
  /**
   * @ignore
   */
  onEnter: PropTypes.func,
  /**
   * @ignore
   */
  onEntered: PropTypes.func,
  /**
   * @ignore
   */
  onEntering: PropTypes.func,
  /**
   * @ignore
   */
  onExit: PropTypes.func,
  /**
   * @ignore
   */
  onExited: PropTypes.func,
  /**
   * @ignore
   */
  onExiting: PropTypes.func,
  /**
   * The transition orientation.
   * @default 'vertical'
   */
  orientation: PropTypes.oneOf(['horizontal', 'vertical']),
  /**
   * The props used for each slot inside.
   * @default {}
   */
  slotProps: PropTypes.shape({
    root: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    wrapper: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    wrapperInner: PropTypes.oneOfType([PropTypes.func, PropTypes.object])
  }),
  /**
   * The components used for each slot inside.
   * @default {}
   */
  slots: PropTypes.shape({
    root: PropTypes.elementType,
    wrapper: PropTypes.elementType,
    wrapperInner: PropTypes.elementType
  }),
  /**
   * @ignore
   */
  style: PropTypes.object,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])), PropTypes.func, PropTypes.object]),
  /**
   * The duration for the transition, in milliseconds.
   * You may specify a single timeout for all transitions, or individually with an object.
   *
   * Set to 'auto' to automatically calculate transition time based on height.
   * @default duration.standard
   */
  timeout: PropTypes.oneOfType([PropTypes.oneOf(['auto']), PropTypes.number, PropTypes.shape({
    appear: PropTypes.number,
    enter: PropTypes.number,
    exit: PropTypes.number
  })])
} : void 0;
if (Collapse) {
  Collapse.muiSupportAuto = true;
}

function getPaperUtilityClass(slot) {
  return generateUtilityClass('MuiPaper', slot);
}
generateUtilityClasses('MuiPaper', ['root', 'rounded', 'outlined', 'elevation', 'elevation0', 'elevation1', 'elevation2', 'elevation3', 'elevation4', 'elevation5', 'elevation6', 'elevation7', 'elevation8', 'elevation9', 'elevation10', 'elevation11', 'elevation12', 'elevation13', 'elevation14', 'elevation15', 'elevation16', 'elevation17', 'elevation18', 'elevation19', 'elevation20', 'elevation21', 'elevation22', 'elevation23', 'elevation24']);

const useUtilityClasses$e = ownerState => {
  const {
    square,
    elevation,
    variant,
    classes
  } = ownerState;
  const slots = {
    root: ['root', variant, !square && 'rounded', variant === 'elevation' && `elevation${elevation}`]
  };
  return composeClasses(slots, getPaperUtilityClass, classes);
};
const PaperRoot = styled('div', {
  name: 'MuiPaper',
  slot: 'Root',
  overridesResolver: (props, styles) => {
    const {
      ownerState
    } = props;
    return [styles.root, styles[ownerState.variant], !ownerState.square && styles.rounded, ownerState.variant === 'elevation' && styles[`elevation${ownerState.elevation}`]];
  }
})(memoTheme(({
  theme
}) => ({
  backgroundColor: (theme.vars || theme).palette.background.paper,
  color: (theme.vars || theme).palette.text.primary,
  transition: theme.transitions.create('box-shadow'),
  variants: [{
    props: ({
      ownerState
    }) => !ownerState.square,
    style: {
      borderRadius: theme.shape.borderRadius
    }
  }, {
    props: {
      variant: 'outlined'
    },
    style: {
      border: `1px solid ${(theme.vars || theme).palette.divider}`
    }
  }, {
    props: {
      variant: 'elevation'
    },
    style: {
      boxShadow: 'var(--Paper-shadow)',
      backgroundImage: 'var(--Paper-overlay)'
    }
  }]
})));
const Paper = /*#__PURE__*/React.forwardRef(function Paper(inProps, ref) {
  const props = useDefaultProps({
    props: inProps,
    name: 'MuiPaper'
  });
  const theme = useTheme();
  const {
    className,
    component = 'div',
    elevation = 1,
    square = false,
    variant = 'elevation',
    ...other
  } = props;
  const ownerState = {
    ...props,
    component,
    elevation,
    square,
    variant
  };
  const classes = useUtilityClasses$e(ownerState);
  if (process.env.NODE_ENV !== 'production') {
    if (theme.shadows[elevation] === undefined) {
      console.error([`MUI: The elevation provided <Paper elevation={${elevation}}> is not available in the theme.`, `Please make sure that \`theme.shadows[${elevation}]\` is defined.`].join('\n'));
    }
  }
  return /*#__PURE__*/jsx(PaperRoot, {
    as: component,
    ownerState: ownerState,
    className: clsx(classes.root, className),
    ref: ref,
    ...other,
    style: {
      ...(variant === 'elevation' && {
        '--Paper-shadow': (theme.vars || theme).shadows[elevation],
        ...(theme.vars && {
          '--Paper-overlay': theme.vars.overlays?.[elevation]
        }),
        ...(!theme.vars && theme.palette.mode === 'dark' && {
          '--Paper-overlay': `linear-gradient(${alpha('#fff', getOverlayAlpha(elevation))}, ${alpha('#fff', getOverlayAlpha(elevation))})`
        })
      }),
      ...other.style
    }
  });
});
process.env.NODE_ENV !== "production" ? Paper.propTypes /* remove-proptypes */ = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * The content of the component.
   */
  children: PropTypes.node,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: PropTypes.object,
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: PropTypes.elementType,
  /**
   * Shadow depth, corresponds to `dp` in the spec.
   * It accepts values between 0 and 24 inclusive.
   * @default 1
   */
  elevation: chainPropTypes(integerPropType, props => {
    const {
      elevation,
      variant
    } = props;
    if (elevation > 0 && variant === 'outlined') {
      return new Error(`MUI: Combining \`elevation={${elevation}}\` with \`variant="${variant}"\` has no effect. Either use \`elevation={0}\` or use a different \`variant\`.`);
    }
    return null;
  }),
  /**
   * If `true`, rounded corners are disabled.
   * @default false
   */
  square: PropTypes.bool,
  /**
   * @ignore
   */
  style: PropTypes.object,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])), PropTypes.func, PropTypes.object]),
  /**
   * The variant to use.
   * @default 'elevation'
   */
  variant: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([PropTypes.oneOf(['elevation', 'outlined']), PropTypes.string])
} : void 0;

/**
 * @ignore - internal component.
 * @type {React.Context<{} | {expanded: boolean, disabled: boolean, toggle: () => void}>}
 */
const AccordionContext = /*#__PURE__*/React.createContext({});
if (process.env.NODE_ENV !== 'production') {
  AccordionContext.displayName = 'AccordionContext';
}

function getAccordionUtilityClass(slot) {
  return generateUtilityClass('MuiAccordion', slot);
}
const accordionClasses = generateUtilityClasses('MuiAccordion', ['root', 'heading', 'rounded', 'expanded', 'disabled', 'gutters', 'region']);

const useUtilityClasses$d = ownerState => {
  const {
    classes,
    square,
    expanded,
    disabled,
    disableGutters
  } = ownerState;
  const slots = {
    root: ['root', !square && 'rounded', expanded && 'expanded', disabled && 'disabled', !disableGutters && 'gutters'],
    heading: ['heading'],
    region: ['region']
  };
  return composeClasses(slots, getAccordionUtilityClass, classes);
};
const AccordionRoot = styled(Paper, {
  name: 'MuiAccordion',
  slot: 'Root',
  overridesResolver: (props, styles) => {
    const {
      ownerState
    } = props;
    return [{
      [`& .${accordionClasses.region}`]: styles.region
    }, styles.root, !ownerState.square && styles.rounded, !ownerState.disableGutters && styles.gutters];
  }
})(memoTheme(({
  theme
}) => {
  const transition = {
    duration: theme.transitions.duration.shortest
  };
  return {
    position: 'relative',
    transition: theme.transitions.create(['margin'], transition),
    overflowAnchor: 'none',
    // Keep the same scrolling position
    '&::before': {
      position: 'absolute',
      left: 0,
      top: -1,
      right: 0,
      height: 1,
      content: '""',
      opacity: 1,
      backgroundColor: (theme.vars || theme).palette.divider,
      transition: theme.transitions.create(['opacity', 'background-color'], transition)
    },
    '&:first-of-type': {
      '&::before': {
        display: 'none'
      }
    },
    [`&.${accordionClasses.expanded}`]: {
      '&::before': {
        opacity: 0
      },
      '&:first-of-type': {
        marginTop: 0
      },
      '&:last-of-type': {
        marginBottom: 0
      },
      '& + &': {
        '&::before': {
          display: 'none'
        }
      }
    },
    [`&.${accordionClasses.disabled}`]: {
      backgroundColor: (theme.vars || theme).palette.action.disabledBackground
    }
  };
}), memoTheme(({
  theme
}) => ({
  variants: [{
    props: props => !props.square,
    style: {
      borderRadius: 0,
      '&:first-of-type': {
        borderTopLeftRadius: (theme.vars || theme).shape.borderRadius,
        borderTopRightRadius: (theme.vars || theme).shape.borderRadius
      },
      '&:last-of-type': {
        borderBottomLeftRadius: (theme.vars || theme).shape.borderRadius,
        borderBottomRightRadius: (theme.vars || theme).shape.borderRadius,
        // Fix a rendering issue on Edge
        '@supports (-ms-ime-align: auto)': {
          borderBottomLeftRadius: 0,
          borderBottomRightRadius: 0
        }
      }
    }
  }, {
    props: props => !props.disableGutters,
    style: {
      [`&.${accordionClasses.expanded}`]: {
        margin: '16px 0'
      }
    }
  }]
})));
const AccordionHeading = styled('h3', {
  name: 'MuiAccordion',
  slot: 'Heading'
})({
  all: 'unset'
});
const AccordionRegion = styled('div', {
  name: 'MuiAccordion',
  slot: 'Region'
})({});
const Accordion = /*#__PURE__*/React.forwardRef(function Accordion(inProps, ref) {
  const props = useDefaultProps({
    props: inProps,
    name: 'MuiAccordion'
  });
  const {
    children: childrenProp,
    className,
    defaultExpanded = false,
    disabled = false,
    disableGutters = false,
    expanded: expandedProp,
    onChange,
    slots = {},
    slotProps = {},
    TransitionComponent: TransitionComponentProp,
    TransitionProps: TransitionPropsProp,
    ...other
  } = props;
  const [expanded, setExpandedState] = useControlled({
    controlled: expandedProp,
    default: defaultExpanded,
    name: 'Accordion',
    state: 'expanded'
  });
  const handleChange = React.useCallback(event => {
    setExpandedState(!expanded);
    if (onChange) {
      onChange(event, !expanded);
    }
  }, [expanded, onChange, setExpandedState]);
  const [summary, ...children] = React.Children.toArray(childrenProp);
  const contextValue = React.useMemo(() => ({
    expanded,
    disabled,
    disableGutters,
    toggle: handleChange
  }), [expanded, disabled, disableGutters, handleChange]);
  const ownerState = {
    ...props,
    disabled,
    disableGutters,
    expanded
  };
  const classes = useUtilityClasses$d(ownerState);
  const backwardCompatibleSlots = {
    transition: TransitionComponentProp,
    ...slots
  };
  const backwardCompatibleSlotProps = {
    transition: TransitionPropsProp,
    ...slotProps
  };
  const externalForwardedProps = {
    slots: backwardCompatibleSlots,
    slotProps: backwardCompatibleSlotProps
  };
  const [RootSlot, rootProps] = useSlot('root', {
    elementType: AccordionRoot,
    externalForwardedProps: {
      ...externalForwardedProps,
      ...other
    },
    className: clsx(classes.root, className),
    shouldForwardComponentProp: true,
    ownerState,
    ref
  });
  const [AccordionHeadingSlot, accordionProps] = useSlot('heading', {
    elementType: AccordionHeading,
    externalForwardedProps,
    className: classes.heading,
    ownerState
  });
  const [TransitionSlot, transitionProps] = useSlot('transition', {
    elementType: Collapse,
    externalForwardedProps,
    ownerState
  });
  const [AccordionRegionSlot, accordionRegionProps] = useSlot('region', {
    elementType: AccordionRegion,
    externalForwardedProps,
    ownerState,
    className: classes.region,
    additionalProps: {
      'aria-labelledby': summary.props.id,
      id: summary.props['aria-controls'],
      role: 'region'
    }
  });
  return /*#__PURE__*/jsxs(RootSlot, {
    ...rootProps,
    children: [/*#__PURE__*/jsx(AccordionHeadingSlot, {
      ...accordionProps,
      children: /*#__PURE__*/jsx(AccordionContext.Provider, {
        value: contextValue,
        children: summary
      })
    }), /*#__PURE__*/jsx(TransitionSlot, {
      in: expanded,
      timeout: "auto",
      ...transitionProps,
      children: /*#__PURE__*/jsx(AccordionRegionSlot, {
        ...accordionRegionProps,
        children: children
      })
    })]
  });
});
process.env.NODE_ENV !== "production" ? Accordion.propTypes /* remove-proptypes */ = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * The content of the component.
   */
  children: chainPropTypes(PropTypes.node.isRequired, props => {
    const summary = React.Children.toArray(props.children)[0];
    if (isFragment(summary)) {
      return new Error("MUI: The Accordion doesn't accept a Fragment as a child. " + 'Consider providing an array instead.');
    }
    if (! /*#__PURE__*/React.isValidElement(summary)) {
      return new Error('MUI: Expected the first child of Accordion to be a valid element.');
    }
    return null;
  }),
  /**
   * Override or extend the styles applied to the component.
   */
  classes: PropTypes.object,
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * If `true`, expands the accordion by default.
   * @default false
   */
  defaultExpanded: PropTypes.bool,
  /**
   * If `true`, the component is disabled.
   * @default false
   */
  disabled: PropTypes.bool,
  /**
   * If `true`, it removes the margin between two expanded accordion items and prevents the increased height when expanded.
   * @default false
   */
  disableGutters: PropTypes.bool,
  /**
   * If `true`, expands the accordion, otherwise collapses it.
   * Setting this prop enables control over the accordion.
   */
  expanded: PropTypes.bool,
  /**
   * Callback fired when the expand/collapse state is changed.
   *
   * @param {React.SyntheticEvent} event The event source of the callback. **Warning**: This is a generic event not a change event.
   * @param {boolean} expanded The `expanded` state of the accordion.
   */
  onChange: PropTypes.func,
  /**
   * The props used for each slot inside.
   * @default {}
   */
  slotProps: PropTypes.shape({
    heading: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    region: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    root: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    transition: PropTypes.oneOfType([PropTypes.func, PropTypes.object])
  }),
  /**
   * The components used for each slot inside.
   * @default {}
   */
  slots: PropTypes.shape({
    heading: PropTypes.elementType,
    region: PropTypes.elementType,
    root: PropTypes.elementType,
    transition: PropTypes.elementType
  }),
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])), PropTypes.func, PropTypes.object]),
  /**
   * The component used for the transition.
   * [Follow this guide](https://mui.com/material-ui/transitions/#transitioncomponent-prop) to learn more about the requirements for this component.
   * @deprecated Use `slots.transition` instead. This prop will be removed in a future major release. See [Migrating from deprecated APIs](/material-ui/migration/migrating-from-deprecated-apis/) for more details.
   */
  TransitionComponent: PropTypes.elementType,
  /**
   * Props applied to the transition element.
   * By default, the element is based on this [`Transition`](https://reactcommunity.org/react-transition-group/transition/) component.
   * @deprecated Use `slotProps.transition` instead. This prop will be removed in a future major release. See [Migrating from deprecated APIs](/material-ui/migration/migrating-from-deprecated-apis/) for more details.
   */
  TransitionProps: PropTypes.object
} : void 0;

function getAccordionDetailsUtilityClass(slot) {
  return generateUtilityClass('MuiAccordionDetails', slot);
}
generateUtilityClasses('MuiAccordionDetails', ['root']);

const useUtilityClasses$c = ownerState => {
  const {
    classes
  } = ownerState;
  const slots = {
    root: ['root']
  };
  return composeClasses(slots, getAccordionDetailsUtilityClass, classes);
};
const AccordionDetailsRoot = styled('div', {
  name: 'MuiAccordionDetails',
  slot: 'Root'
})(memoTheme(({
  theme
}) => ({
  padding: theme.spacing(1, 2, 2)
})));
const AccordionDetails = /*#__PURE__*/React.forwardRef(function AccordionDetails(inProps, ref) {
  const props = useDefaultProps({
    props: inProps,
    name: 'MuiAccordionDetails'
  });
  const {
    className,
    ...other
  } = props;
  const ownerState = props;
  const classes = useUtilityClasses$c(ownerState);
  return /*#__PURE__*/jsx(AccordionDetailsRoot, {
    className: clsx(classes.root, className),
    ref: ref,
    ownerState: ownerState,
    ...other
  });
});
process.env.NODE_ENV !== "production" ? AccordionDetails.propTypes /* remove-proptypes */ = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * The content of the component.
   */
  children: PropTypes.node,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: PropTypes.object,
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])), PropTypes.func, PropTypes.object])
} : void 0;

/**
 * Lazy initialization container for the Ripple instance. This improves
 * performance by delaying mounting the ripple until it's needed.
 */
class LazyRipple {
  /** React ref to the ripple instance */

  /** If the ripple component should be mounted */

  /** Promise that resolves when the ripple component is mounted */

  /** If the ripple component has been mounted */

  /** React state hook setter */

  static create() {
    return new LazyRipple();
  }
  static use() {
    /* eslint-disable */
    const ripple = useLazyRef(LazyRipple.create).current;
    const [shouldMount, setShouldMount] = React.useState(false);
    ripple.shouldMount = shouldMount;
    ripple.setShouldMount = setShouldMount;
    React.useEffect(ripple.mountEffect, [shouldMount]);
    /* eslint-enable */

    return ripple;
  }
  constructor() {
    this.ref = {
      current: null
    };
    this.mounted = null;
    this.didMount = false;
    this.shouldMount = false;
    this.setShouldMount = null;
  }
  mount() {
    if (!this.mounted) {
      this.mounted = createControlledPromise();
      this.shouldMount = true;
      this.setShouldMount(this.shouldMount);
    }
    return this.mounted;
  }
  mountEffect = () => {
    if (this.shouldMount && !this.didMount) {
      if (this.ref.current !== null) {
        this.didMount = true;
        this.mounted.resolve();
      }
    }
  };

  /* Ripple API */

  start(...args) {
    this.mount().then(() => this.ref.current?.start(...args));
  }
  stop(...args) {
    this.mount().then(() => this.ref.current?.stop(...args));
  }
  pulsate(...args) {
    this.mount().then(() => this.ref.current?.pulsate(...args));
  }
}
function useLazyRipple() {
  return LazyRipple.use();
}
function createControlledPromise() {
  let resolve;
  let reject;
  const p = new Promise((resolveFn, rejectFn) => {
    resolve = resolveFn;
    reject = rejectFn;
  });
  p.resolve = resolve;
  p.reject = reject;
  return p;
}

function Ripple(props) {
  const {
    className,
    classes,
    pulsate = false,
    rippleX,
    rippleY,
    rippleSize,
    in: inProp,
    onExited,
    timeout
  } = props;
  const [leaving, setLeaving] = React.useState(false);
  const rippleClassName = clsx(className, classes.ripple, classes.rippleVisible, pulsate && classes.ripplePulsate);
  const rippleStyles = {
    width: rippleSize,
    height: rippleSize,
    top: -(rippleSize / 2) + rippleY,
    left: -(rippleSize / 2) + rippleX
  };
  const childClassName = clsx(classes.child, leaving && classes.childLeaving, pulsate && classes.childPulsate);
  if (!inProp && !leaving) {
    setLeaving(true);
  }
  React.useEffect(() => {
    if (!inProp && onExited != null) {
      // react-transition-group#onExited
      const timeoutId = setTimeout(onExited, timeout);
      return () => {
        clearTimeout(timeoutId);
      };
    }
    return undefined;
  }, [onExited, inProp, timeout]);
  return /*#__PURE__*/jsx("span", {
    className: rippleClassName,
    style: rippleStyles,
    children: /*#__PURE__*/jsx("span", {
      className: childClassName
    })
  });
}
process.env.NODE_ENV !== "production" ? Ripple.propTypes /* remove-proptypes */ = {
  /**
   * Override or extend the styles applied to the component.
   */
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
  /**
   * @ignore - injected from TransitionGroup
   */
  in: PropTypes.bool,
  /**
   * @ignore - injected from TransitionGroup
   */
  onExited: PropTypes.func,
  /**
   * If `true`, the ripple pulsates, typically indicating the keyboard focus state of an element.
   */
  pulsate: PropTypes.bool,
  /**
   * Diameter of the ripple.
   */
  rippleSize: PropTypes.number,
  /**
   * Horizontal position of the ripple center.
   */
  rippleX: PropTypes.number,
  /**
   * Vertical position of the ripple center.
   */
  rippleY: PropTypes.number,
  /**
   * exit delay
   */
  timeout: PropTypes.number.isRequired
} : void 0;

const touchRippleClasses = generateUtilityClasses('MuiTouchRipple', ['root', 'ripple', 'rippleVisible', 'ripplePulsate', 'child', 'childLeaving', 'childPulsate']);

const DURATION = 550;
const DELAY_RIPPLE = 80;
const enterKeyframe = keyframes`
  0% {
    transform: scale(0);
    opacity: 0.1;
  }

  100% {
    transform: scale(1);
    opacity: 0.3;
  }
`;
const exitKeyframe = keyframes`
  0% {
    opacity: 1;
  }

  100% {
    opacity: 0;
  }
`;
const pulsateKeyframe = keyframes`
  0% {
    transform: scale(1);
  }

  50% {
    transform: scale(0.92);
  }

  100% {
    transform: scale(1);
  }
`;
const TouchRippleRoot = styled('span', {
  name: 'MuiTouchRipple',
  slot: 'Root'
})({
  overflow: 'hidden',
  pointerEvents: 'none',
  position: 'absolute',
  zIndex: 0,
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
  borderRadius: 'inherit'
});

// This `styled()` function invokes keyframes. `styled-components` only supports keyframes
// in string templates. Do not convert these styles in JS object as it will break.
const TouchRippleRipple = styled(Ripple, {
  name: 'MuiTouchRipple',
  slot: 'Ripple'
})`
  opacity: 0;
  position: absolute;

  &.${touchRippleClasses.rippleVisible} {
    opacity: 0.3;
    transform: scale(1);
    animation-name: ${enterKeyframe};
    animation-duration: ${DURATION}ms;
    animation-timing-function: ${({
  theme
}) => theme.transitions.easing.easeInOut};
  }

  &.${touchRippleClasses.ripplePulsate} {
    animation-duration: ${({
  theme
}) => theme.transitions.duration.shorter}ms;
  }

  & .${touchRippleClasses.child} {
    opacity: 1;
    display: block;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background-color: currentColor;
  }

  & .${touchRippleClasses.childLeaving} {
    opacity: 0;
    animation-name: ${exitKeyframe};
    animation-duration: ${DURATION}ms;
    animation-timing-function: ${({
  theme
}) => theme.transitions.easing.easeInOut};
  }

  & .${touchRippleClasses.childPulsate} {
    position: absolute;
    /* @noflip */
    left: 0px;
    top: 0;
    animation-name: ${pulsateKeyframe};
    animation-duration: 2500ms;
    animation-timing-function: ${({
  theme
}) => theme.transitions.easing.easeInOut};
    animation-iteration-count: infinite;
    animation-delay: 200ms;
  }
`;

/**
 * @ignore - internal component.
 *
 * TODO v5: Make private
 */
const TouchRipple = /*#__PURE__*/React.forwardRef(function TouchRipple(inProps, ref) {
  const props = useDefaultProps({
    props: inProps,
    name: 'MuiTouchRipple'
  });
  const {
    center: centerProp = false,
    classes = {},
    className,
    ...other
  } = props;
  const [ripples, setRipples] = React.useState([]);
  const nextKey = React.useRef(0);
  const rippleCallback = React.useRef(null);
  React.useEffect(() => {
    if (rippleCallback.current) {
      rippleCallback.current();
      rippleCallback.current = null;
    }
  }, [ripples]);

  // Used to filter out mouse emulated events on mobile.
  const ignoringMouseDown = React.useRef(false);
  // We use a timer in order to only show the ripples for touch "click" like events.
  // We don't want to display the ripple for touch scroll events.
  const startTimer = useTimeout();

  // This is the hook called once the previous timeout is ready.
  const startTimerCommit = React.useRef(null);
  const container = React.useRef(null);
  const startCommit = React.useCallback(params => {
    const {
      pulsate,
      rippleX,
      rippleY,
      rippleSize,
      cb
    } = params;
    setRipples(oldRipples => [...oldRipples, /*#__PURE__*/jsx(TouchRippleRipple, {
      classes: {
        ripple: clsx(classes.ripple, touchRippleClasses.ripple),
        rippleVisible: clsx(classes.rippleVisible, touchRippleClasses.rippleVisible),
        ripplePulsate: clsx(classes.ripplePulsate, touchRippleClasses.ripplePulsate),
        child: clsx(classes.child, touchRippleClasses.child),
        childLeaving: clsx(classes.childLeaving, touchRippleClasses.childLeaving),
        childPulsate: clsx(classes.childPulsate, touchRippleClasses.childPulsate)
      },
      timeout: DURATION,
      pulsate: pulsate,
      rippleX: rippleX,
      rippleY: rippleY,
      rippleSize: rippleSize
    }, nextKey.current)]);
    nextKey.current += 1;
    rippleCallback.current = cb;
  }, [classes]);
  const start = React.useCallback((event = {}, options = {}, cb = () => {}) => {
    const {
      pulsate = false,
      center = centerProp || options.pulsate,
      fakeElement = false // For test purposes
    } = options;
    if (event?.type === 'mousedown' && ignoringMouseDown.current) {
      ignoringMouseDown.current = false;
      return;
    }
    if (event?.type === 'touchstart') {
      ignoringMouseDown.current = true;
    }
    const element = fakeElement ? null : container.current;
    const rect = element ? element.getBoundingClientRect() : {
      width: 0,
      height: 0,
      left: 0,
      top: 0
    };

    // Get the size of the ripple
    let rippleX;
    let rippleY;
    let rippleSize;
    if (center || event === undefined || event.clientX === 0 && event.clientY === 0 || !event.clientX && !event.touches) {
      rippleX = Math.round(rect.width / 2);
      rippleY = Math.round(rect.height / 2);
    } else {
      const {
        clientX,
        clientY
      } = event.touches && event.touches.length > 0 ? event.touches[0] : event;
      rippleX = Math.round(clientX - rect.left);
      rippleY = Math.round(clientY - rect.top);
    }
    if (center) {
      rippleSize = Math.sqrt((2 * rect.width ** 2 + rect.height ** 2) / 3);

      // For some reason the animation is broken on Mobile Chrome if the size is even.
      if (rippleSize % 2 === 0) {
        rippleSize += 1;
      }
    } else {
      const sizeX = Math.max(Math.abs((element ? element.clientWidth : 0) - rippleX), rippleX) * 2 + 2;
      const sizeY = Math.max(Math.abs((element ? element.clientHeight : 0) - rippleY), rippleY) * 2 + 2;
      rippleSize = Math.sqrt(sizeX ** 2 + sizeY ** 2);
    }

    // Touch devices
    if (event?.touches) {
      // check that this isn't another touchstart due to multitouch
      // otherwise we will only clear a single timer when unmounting while two
      // are running
      if (startTimerCommit.current === null) {
        // Prepare the ripple effect.
        startTimerCommit.current = () => {
          startCommit({
            pulsate,
            rippleX,
            rippleY,
            rippleSize,
            cb
          });
        };
        // Delay the execution of the ripple effect.
        // We have to make a tradeoff with this delay value.
        startTimer.start(DELAY_RIPPLE, () => {
          if (startTimerCommit.current) {
            startTimerCommit.current();
            startTimerCommit.current = null;
          }
        });
      }
    } else {
      startCommit({
        pulsate,
        rippleX,
        rippleY,
        rippleSize,
        cb
      });
    }
  }, [centerProp, startCommit, startTimer]);
  const pulsate = React.useCallback(() => {
    start({}, {
      pulsate: true
    });
  }, [start]);
  const stop = React.useCallback((event, cb) => {
    startTimer.clear();

    // The touch interaction occurs too quickly.
    // We still want to show ripple effect.
    if (event?.type === 'touchend' && startTimerCommit.current) {
      startTimerCommit.current();
      startTimerCommit.current = null;
      startTimer.start(0, () => {
        stop(event, cb);
      });
      return;
    }
    startTimerCommit.current = null;
    setRipples(oldRipples => {
      if (oldRipples.length > 0) {
        return oldRipples.slice(1);
      }
      return oldRipples;
    });
    rippleCallback.current = cb;
  }, [startTimer]);
  React.useImperativeHandle(ref, () => ({
    pulsate,
    start,
    stop
  }), [pulsate, start, stop]);
  return /*#__PURE__*/jsx(TouchRippleRoot, {
    className: clsx(touchRippleClasses.root, classes.root, className),
    ref: container,
    ...other,
    children: /*#__PURE__*/jsx(TransitionGroup, {
      component: null,
      exit: true,
      children: ripples
    })
  });
});
process.env.NODE_ENV !== "production" ? TouchRipple.propTypes /* remove-proptypes */ = {
  /**
   * If `true`, the ripple starts at the center of the component
   * rather than at the point of interaction.
   */
  center: PropTypes.bool,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: PropTypes.object,
  /**
   * @ignore
   */
  className: PropTypes.string
} : void 0;

function getButtonBaseUtilityClass(slot) {
  return generateUtilityClass('MuiButtonBase', slot);
}
const buttonBaseClasses = generateUtilityClasses('MuiButtonBase', ['root', 'disabled', 'focusVisible']);

const useUtilityClasses$b = ownerState => {
  const {
    disabled,
    focusVisible,
    focusVisibleClassName,
    classes
  } = ownerState;
  const slots = {
    root: ['root', disabled && 'disabled', focusVisible && 'focusVisible']
  };
  const composedClasses = composeClasses(slots, getButtonBaseUtilityClass, classes);
  if (focusVisible && focusVisibleClassName) {
    composedClasses.root += ` ${focusVisibleClassName}`;
  }
  return composedClasses;
};
const ButtonBaseRoot = styled('button', {
  name: 'MuiButtonBase',
  slot: 'Root'
})({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  position: 'relative',
  boxSizing: 'border-box',
  WebkitTapHighlightColor: 'transparent',
  backgroundColor: 'transparent',
  // Reset default value
  // We disable the focus ring for mouse, touch and keyboard users.
  outline: 0,
  border: 0,
  margin: 0,
  // Remove the margin in Safari
  borderRadius: 0,
  padding: 0,
  // Remove the padding in Firefox
  cursor: 'pointer',
  userSelect: 'none',
  verticalAlign: 'middle',
  MozAppearance: 'none',
  // Reset
  WebkitAppearance: 'none',
  // Reset
  textDecoration: 'none',
  // So we take precedent over the style of a native <a /> element.
  color: 'inherit',
  '&::-moz-focus-inner': {
    borderStyle: 'none' // Remove Firefox dotted outline.
  },
  [`&.${buttonBaseClasses.disabled}`]: {
    pointerEvents: 'none',
    // Disable link interactions
    cursor: 'default'
  },
  '@media print': {
    colorAdjust: 'exact'
  }
});

/**
 * `ButtonBase` contains as few styles as possible.
 * It aims to be a simple building block for creating a button.
 * It contains a load of style reset and some focus/ripple logic.
 */
const ButtonBase = /*#__PURE__*/React.forwardRef(function ButtonBase(inProps, ref) {
  const props = useDefaultProps({
    props: inProps,
    name: 'MuiButtonBase'
  });
  const {
    action,
    centerRipple = false,
    children,
    className,
    component = 'button',
    disabled = false,
    disableRipple = false,
    disableTouchRipple = false,
    focusRipple = false,
    focusVisibleClassName,
    LinkComponent = 'a',
    onBlur,
    onClick,
    onContextMenu,
    onDragLeave,
    onFocus,
    onFocusVisible,
    onKeyDown,
    onKeyUp,
    onMouseDown,
    onMouseLeave,
    onMouseUp,
    onTouchEnd,
    onTouchMove,
    onTouchStart,
    tabIndex = 0,
    TouchRippleProps,
    touchRippleRef,
    type,
    ...other
  } = props;
  const buttonRef = React.useRef(null);
  const ripple = useLazyRipple();
  const handleRippleRef = useForkRef(ripple.ref, touchRippleRef);
  const [focusVisible, setFocusVisible] = React.useState(false);
  if (disabled && focusVisible) {
    setFocusVisible(false);
  }
  React.useImperativeHandle(action, () => ({
    focusVisible: () => {
      setFocusVisible(true);
      buttonRef.current.focus();
    }
  }), []);
  const enableTouchRipple = ripple.shouldMount && !disableRipple && !disabled;
  React.useEffect(() => {
    if (focusVisible && focusRipple && !disableRipple) {
      ripple.pulsate();
    }
  }, [disableRipple, focusRipple, focusVisible, ripple]);
  const handleMouseDown = useRippleHandler(ripple, 'start', onMouseDown, disableTouchRipple);
  const handleContextMenu = useRippleHandler(ripple, 'stop', onContextMenu, disableTouchRipple);
  const handleDragLeave = useRippleHandler(ripple, 'stop', onDragLeave, disableTouchRipple);
  const handleMouseUp = useRippleHandler(ripple, 'stop', onMouseUp, disableTouchRipple);
  const handleMouseLeave = useRippleHandler(ripple, 'stop', event => {
    if (focusVisible) {
      event.preventDefault();
    }
    if (onMouseLeave) {
      onMouseLeave(event);
    }
  }, disableTouchRipple);
  const handleTouchStart = useRippleHandler(ripple, 'start', onTouchStart, disableTouchRipple);
  const handleTouchEnd = useRippleHandler(ripple, 'stop', onTouchEnd, disableTouchRipple);
  const handleTouchMove = useRippleHandler(ripple, 'stop', onTouchMove, disableTouchRipple);
  const handleBlur = useRippleHandler(ripple, 'stop', event => {
    if (!isFocusVisible(event.target)) {
      setFocusVisible(false);
    }
    if (onBlur) {
      onBlur(event);
    }
  }, false);
  const handleFocus = useEventCallback(event => {
    // Fix for https://github.com/facebook/react/issues/7769
    if (!buttonRef.current) {
      buttonRef.current = event.currentTarget;
    }
    if (isFocusVisible(event.target)) {
      setFocusVisible(true);
      if (onFocusVisible) {
        onFocusVisible(event);
      }
    }
    if (onFocus) {
      onFocus(event);
    }
  });
  const isNonNativeButton = () => {
    const button = buttonRef.current;
    return component && component !== 'button' && !(button.tagName === 'A' && button.href);
  };
  const handleKeyDown = useEventCallback(event => {
    // Check if key is already down to avoid repeats being counted as multiple activations
    if (focusRipple && !event.repeat && focusVisible && event.key === ' ') {
      ripple.stop(event, () => {
        ripple.start(event);
      });
    }
    if (event.target === event.currentTarget && isNonNativeButton() && event.key === ' ') {
      event.preventDefault();
    }
    if (onKeyDown) {
      onKeyDown(event);
    }

    // Keyboard accessibility for non interactive elements
    if (event.target === event.currentTarget && isNonNativeButton() && event.key === 'Enter' && !disabled) {
      event.preventDefault();
      if (onClick) {
        onClick(event);
      }
    }
  });
  const handleKeyUp = useEventCallback(event => {
    // calling preventDefault in keyUp on a <button> will not dispatch a click event if Space is pressed
    // https://codesandbox.io/p/sandbox/button-keyup-preventdefault-dn7f0
    if (focusRipple && event.key === ' ' && focusVisible && !event.defaultPrevented) {
      ripple.stop(event, () => {
        ripple.pulsate(event);
      });
    }
    if (onKeyUp) {
      onKeyUp(event);
    }

    // Keyboard accessibility for non interactive elements
    if (onClick && event.target === event.currentTarget && isNonNativeButton() && event.key === ' ' && !event.defaultPrevented) {
      onClick(event);
    }
  });
  let ComponentProp = component;
  if (ComponentProp === 'button' && (other.href || other.to)) {
    ComponentProp = LinkComponent;
  }
  const buttonProps = {};
  if (ComponentProp === 'button') {
    const hasFormAttributes = !!other.formAction;
    // ButtonBase was defaulting to type="button" when no type prop was provided, which prevented form submission and broke formAction functionality.
    // The fix checks for form-related attributes and skips the default type to allow the browser's natural submit behavior (type="submit").
    buttonProps.type = type === undefined && !hasFormAttributes ? 'button' : type;
    buttonProps.disabled = disabled;
  } else {
    if (!other.href && !other.to) {
      buttonProps.role = 'button';
    }
    if (disabled) {
      buttonProps['aria-disabled'] = disabled;
    }
  }
  const handleRef = useForkRef(ref, buttonRef);
  const ownerState = {
    ...props,
    centerRipple,
    component,
    disabled,
    disableRipple,
    disableTouchRipple,
    focusRipple,
    tabIndex,
    focusVisible
  };
  const classes = useUtilityClasses$b(ownerState);
  return /*#__PURE__*/jsxs(ButtonBaseRoot, {
    as: ComponentProp,
    className: clsx(classes.root, className),
    ownerState: ownerState,
    onBlur: handleBlur,
    onClick: onClick,
    onContextMenu: handleContextMenu,
    onFocus: handleFocus,
    onKeyDown: handleKeyDown,
    onKeyUp: handleKeyUp,
    onMouseDown: handleMouseDown,
    onMouseLeave: handleMouseLeave,
    onMouseUp: handleMouseUp,
    onDragLeave: handleDragLeave,
    onTouchEnd: handleTouchEnd,
    onTouchMove: handleTouchMove,
    onTouchStart: handleTouchStart,
    ref: handleRef,
    tabIndex: disabled ? -1 : tabIndex,
    type: type,
    ...buttonProps,
    ...other,
    children: [children, enableTouchRipple ? /*#__PURE__*/jsx(TouchRipple, {
      ref: handleRippleRef,
      center: centerRipple,
      ...TouchRippleProps
    }) : null]
  });
});
function useRippleHandler(ripple, rippleAction, eventCallback, skipRippleAction = false) {
  return useEventCallback(event => {
    if (eventCallback) {
      eventCallback(event);
    }
    if (!skipRippleAction) {
      ripple[rippleAction](event);
    }
    return true;
  });
}
process.env.NODE_ENV !== "production" ? ButtonBase.propTypes /* remove-proptypes */ = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * A ref for imperative actions.
   * It currently only supports `focusVisible()` action.
   */
  action: refType,
  /**
   * If `true`, the ripples are centered.
   * They won't start at the cursor interaction position.
   * @default false
   */
  centerRipple: PropTypes.bool,
  /**
   * The content of the component.
   */
  children: PropTypes.node,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: PropTypes.object,
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: elementTypeAcceptingRef,
  /**
   * If `true`, the component is disabled.
   * @default false
   */
  disabled: PropTypes.bool,
  /**
   * If `true`, the ripple effect is disabled.
   *
   * ⚠️ Without a ripple there is no styling for :focus-visible by default. Be sure
   * to highlight the element by applying separate styles with the `.Mui-focusVisible` class.
   * @default false
   */
  disableRipple: PropTypes.bool,
  /**
   * If `true`, the touch ripple effect is disabled.
   * @default false
   */
  disableTouchRipple: PropTypes.bool,
  /**
   * If `true`, the base button will have a keyboard focus ripple.
   * @default false
   */
  focusRipple: PropTypes.bool,
  /**
   * This prop can help identify which element has keyboard focus.
   * The class name will be applied when the element gains the focus through keyboard interaction.
   * It's a polyfill for the [CSS :focus-visible selector](https://drafts.csswg.org/selectors-4/#the-focus-visible-pseudo).
   * The rationale for using this feature [is explained here](https://github.com/WICG/focus-visible/blob/HEAD/explainer.md).
   * A [polyfill can be used](https://github.com/WICG/focus-visible) to apply a `focus-visible` class to other components
   * if needed.
   */
  focusVisibleClassName: PropTypes.string,
  /**
   * @ignore
   */
  formAction: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
  /**
   * @ignore
   */
  href: PropTypes /* @typescript-to-proptypes-ignore */.any,
  /**
   * The component used to render a link when the `href` prop is provided.
   * @default 'a'
   */
  LinkComponent: PropTypes.elementType,
  /**
   * @ignore
   */
  onBlur: PropTypes.func,
  /**
   * @ignore
   */
  onClick: PropTypes.func,
  /**
   * @ignore
   */
  onContextMenu: PropTypes.func,
  /**
   * @ignore
   */
  onDragLeave: PropTypes.func,
  /**
   * @ignore
   */
  onFocus: PropTypes.func,
  /**
   * Callback fired when the component is focused with a keyboard.
   * We trigger a `onFocus` callback too.
   */
  onFocusVisible: PropTypes.func,
  /**
   * @ignore
   */
  onKeyDown: PropTypes.func,
  /**
   * @ignore
   */
  onKeyUp: PropTypes.func,
  /**
   * @ignore
   */
  onMouseDown: PropTypes.func,
  /**
   * @ignore
   */
  onMouseLeave: PropTypes.func,
  /**
   * @ignore
   */
  onMouseUp: PropTypes.func,
  /**
   * @ignore
   */
  onTouchEnd: PropTypes.func,
  /**
   * @ignore
   */
  onTouchMove: PropTypes.func,
  /**
   * @ignore
   */
  onTouchStart: PropTypes.func,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])), PropTypes.func, PropTypes.object]),
  /**
   * @default 0
   */
  tabIndex: PropTypes.number,
  /**
   * Props applied to the `TouchRipple` element.
   */
  TouchRippleProps: PropTypes.object,
  /**
   * A ref that points to the `TouchRipple` element.
   */
  touchRippleRef: PropTypes.oneOfType([PropTypes.func, PropTypes.shape({
    current: PropTypes.shape({
      pulsate: PropTypes.func.isRequired,
      start: PropTypes.func.isRequired,
      stop: PropTypes.func.isRequired
    })
  })]),
  /**
   * @ignore
   */
  type: PropTypes.oneOfType([PropTypes.oneOf(['button', 'reset', 'submit']), PropTypes.string])
} : void 0;

function getAccordionSummaryUtilityClass(slot) {
  return generateUtilityClass('MuiAccordionSummary', slot);
}
const accordionSummaryClasses = generateUtilityClasses('MuiAccordionSummary', ['root', 'expanded', 'focusVisible', 'disabled', 'gutters', 'contentGutters', 'content', 'expandIconWrapper']);

const useUtilityClasses$a = ownerState => {
  const {
    classes,
    expanded,
    disabled,
    disableGutters
  } = ownerState;
  const slots = {
    root: ['root', expanded && 'expanded', disabled && 'disabled', !disableGutters && 'gutters'],
    focusVisible: ['focusVisible'],
    content: ['content', expanded && 'expanded', !disableGutters && 'contentGutters'],
    expandIconWrapper: ['expandIconWrapper', expanded && 'expanded']
  };
  return composeClasses(slots, getAccordionSummaryUtilityClass, classes);
};
const AccordionSummaryRoot = styled(ButtonBase, {
  name: 'MuiAccordionSummary',
  slot: 'Root'
})(memoTheme(({
  theme
}) => {
  const transition = {
    duration: theme.transitions.duration.shortest
  };
  return {
    display: 'flex',
    width: '100%',
    minHeight: 48,
    padding: theme.spacing(0, 2),
    transition: theme.transitions.create(['min-height', 'background-color'], transition),
    [`&.${accordionSummaryClasses.focusVisible}`]: {
      backgroundColor: (theme.vars || theme).palette.action.focus
    },
    [`&.${accordionSummaryClasses.disabled}`]: {
      opacity: (theme.vars || theme).palette.action.disabledOpacity
    },
    [`&:hover:not(.${accordionSummaryClasses.disabled})`]: {
      cursor: 'pointer'
    },
    variants: [{
      props: props => !props.disableGutters,
      style: {
        [`&.${accordionSummaryClasses.expanded}`]: {
          minHeight: 64
        }
      }
    }]
  };
}));
const AccordionSummaryContent = styled('span', {
  name: 'MuiAccordionSummary',
  slot: 'Content'
})(memoTheme(({
  theme
}) => ({
  display: 'flex',
  textAlign: 'start',
  flexGrow: 1,
  margin: '12px 0',
  variants: [{
    props: props => !props.disableGutters,
    style: {
      transition: theme.transitions.create(['margin'], {
        duration: theme.transitions.duration.shortest
      }),
      [`&.${accordionSummaryClasses.expanded}`]: {
        margin: '20px 0'
      }
    }
  }]
})));
const AccordionSummaryExpandIconWrapper = styled('span', {
  name: 'MuiAccordionSummary',
  slot: 'ExpandIconWrapper'
})(memoTheme(({
  theme
}) => ({
  display: 'flex',
  color: (theme.vars || theme).palette.action.active,
  transform: 'rotate(0deg)',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest
  }),
  [`&.${accordionSummaryClasses.expanded}`]: {
    transform: 'rotate(180deg)'
  }
})));
const AccordionSummary = /*#__PURE__*/React.forwardRef(function AccordionSummary(inProps, ref) {
  const props = useDefaultProps({
    props: inProps,
    name: 'MuiAccordionSummary'
  });
  const {
    children,
    className,
    expandIcon,
    focusVisibleClassName,
    onClick,
    slots,
    slotProps,
    ...other
  } = props;
  const {
    disabled = false,
    disableGutters,
    expanded,
    toggle
  } = React.useContext(AccordionContext);
  const handleChange = event => {
    if (toggle) {
      toggle(event);
    }
    if (onClick) {
      onClick(event);
    }
  };
  const ownerState = {
    ...props,
    expanded,
    disabled,
    disableGutters
  };
  const classes = useUtilityClasses$a(ownerState);
  const externalForwardedProps = {
    slots,
    slotProps
  };
  const [RootSlot, rootSlotProps] = useSlot('root', {
    ref,
    shouldForwardComponentProp: true,
    className: clsx(classes.root, className),
    elementType: AccordionSummaryRoot,
    externalForwardedProps: {
      ...externalForwardedProps,
      ...other
    },
    ownerState,
    additionalProps: {
      focusRipple: false,
      disableRipple: true,
      disabled,
      'aria-expanded': expanded,
      focusVisibleClassName: clsx(classes.focusVisible, focusVisibleClassName)
    },
    getSlotProps: handlers => ({
      ...handlers,
      onClick: event => {
        handlers.onClick?.(event);
        handleChange(event);
      }
    })
  });
  const [ContentSlot, contentSlotProps] = useSlot('content', {
    className: classes.content,
    elementType: AccordionSummaryContent,
    externalForwardedProps,
    ownerState
  });
  const [ExpandIconWrapperSlot, expandIconWrapperSlotProps] = useSlot('expandIconWrapper', {
    className: classes.expandIconWrapper,
    elementType: AccordionSummaryExpandIconWrapper,
    externalForwardedProps,
    ownerState
  });
  return /*#__PURE__*/jsxs(RootSlot, {
    ...rootSlotProps,
    children: [/*#__PURE__*/jsx(ContentSlot, {
      ...contentSlotProps,
      children: children
    }), expandIcon && /*#__PURE__*/jsx(ExpandIconWrapperSlot, {
      ...expandIconWrapperSlotProps,
      children: expandIcon
    })]
  });
});
process.env.NODE_ENV !== "production" ? AccordionSummary.propTypes /* remove-proptypes */ = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * The content of the component.
   */
  children: PropTypes.node,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: PropTypes.object,
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * The icon to display as the expand indicator.
   */
  expandIcon: PropTypes.node,
  /**
   * This prop can help identify which element has keyboard focus.
   * The class name will be applied when the element gains the focus through keyboard interaction.
   * It's a polyfill for the [CSS :focus-visible selector](https://drafts.csswg.org/selectors-4/#the-focus-visible-pseudo).
   * The rationale for using this feature [is explained here](https://github.com/WICG/focus-visible/blob/HEAD/explainer.md).
   * A [polyfill can be used](https://github.com/WICG/focus-visible) to apply a `focus-visible` class to other components
   * if needed.
   */
  focusVisibleClassName: PropTypes.string,
  /**
   * @ignore
   */
  onClick: PropTypes.func,
  /**
   * The props used for each slot inside.
   * @default {}
   */
  slotProps: PropTypes.shape({
    content: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    expandIconWrapper: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    root: PropTypes.oneOfType([PropTypes.func, PropTypes.object])
  }),
  /**
   * The components used for each slot inside.
   * @default {}
   */
  slots: PropTypes.shape({
    content: PropTypes.elementType,
    expandIconWrapper: PropTypes.elementType,
    root: PropTypes.elementType
  }),
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])), PropTypes.func, PropTypes.object])
} : void 0;

/**
 * Type guard to check if the object has a "main" property of type string.
 *
 * @param obj - the object to check
 * @returns boolean
 */
function hasCorrectMainProperty(obj) {
  return typeof obj.main === 'string';
}
/**
 * Checks if the object conforms to the SimplePaletteColorOptions type.
 * The minimum requirement is that the object has a "main" property of type string, this is always checked.
 * Optionally, you can pass additional properties to check.
 *
 * @param obj - The object to check
 * @param additionalPropertiesToCheck - Array containing "light", "dark", and/or "contrastText"
 * @returns boolean
 */
function checkSimplePaletteColorValues(obj, additionalPropertiesToCheck = []) {
  if (!hasCorrectMainProperty(obj)) {
    return false;
  }
  for (const value of additionalPropertiesToCheck) {
    if (!obj.hasOwnProperty(value) || typeof obj[value] !== 'string') {
      return false;
    }
  }
  return true;
}

/**
 * Creates a filter function used to filter simple palette color options.
 * The minimum requirement is that the object has a "main" property of type string, this is always checked.
 * Optionally, you can pass additional properties to check.
 *
 * @param additionalPropertiesToCheck - Array containing "light", "dark", and/or "contrastText"
 * @returns ([, value]: [any, PaletteColorOptions]) => boolean
 */
function createSimplePaletteValueFilter(additionalPropertiesToCheck = []) {
  return ([, value]) => value && checkSimplePaletteColorValues(value, additionalPropertiesToCheck);
}

function getCircularProgressUtilityClass(slot) {
  return generateUtilityClass('MuiCircularProgress', slot);
}
generateUtilityClasses('MuiCircularProgress', ['root', 'determinate', 'indeterminate', 'colorPrimary', 'colorSecondary', 'svg', 'track', 'circle', 'circleDeterminate', 'circleIndeterminate', 'circleDisableShrink']);

const SIZE = 44;
const circularRotateKeyframe = keyframes`
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
`;
const circularDashKeyframe = keyframes`
  0% {
    stroke-dasharray: 1px, 200px;
    stroke-dashoffset: 0;
  }

  50% {
    stroke-dasharray: 100px, 200px;
    stroke-dashoffset: -15px;
  }

  100% {
    stroke-dasharray: 1px, 200px;
    stroke-dashoffset: -126px;
  }
`;

// This implementation is for supporting both Styled-components v4+ and Pigment CSS.
// A global animation has to be created here for Styled-components v4+ (https://github.com/styled-components/styled-components/blob/main/packages/styled-components/src/utils/errors.md#12).
// which can be done by checking typeof indeterminate1Keyframe !== 'string' (at runtime, Pigment CSS transform keyframes`` to a string).
const rotateAnimation = typeof circularRotateKeyframe !== 'string' ? css`
        animation: ${circularRotateKeyframe} 1.4s linear infinite;
      ` : null;
const dashAnimation = typeof circularDashKeyframe !== 'string' ? css`
        animation: ${circularDashKeyframe} 1.4s ease-in-out infinite;
      ` : null;
const useUtilityClasses$9 = ownerState => {
  const {
    classes,
    variant,
    color,
    disableShrink
  } = ownerState;
  const slots = {
    root: ['root', variant, `color${capitalize(color)}`],
    svg: ['svg'],
    track: ['track'],
    circle: ['circle', `circle${capitalize(variant)}`, disableShrink && 'circleDisableShrink']
  };
  return composeClasses(slots, getCircularProgressUtilityClass, classes);
};
const CircularProgressRoot = styled('span', {
  name: 'MuiCircularProgress',
  slot: 'Root',
  overridesResolver: (props, styles) => {
    const {
      ownerState
    } = props;
    return [styles.root, styles[ownerState.variant], styles[`color${capitalize(ownerState.color)}`]];
  }
})(memoTheme(({
  theme
}) => ({
  display: 'inline-block',
  variants: [{
    props: {
      variant: 'determinate'
    },
    style: {
      transition: theme.transitions.create('transform')
    }
  }, {
    props: {
      variant: 'indeterminate'
    },
    style: rotateAnimation || {
      animation: `${circularRotateKeyframe} 1.4s linear infinite`
    }
  }, ...Object.entries(theme.palette).filter(createSimplePaletteValueFilter()).map(([color]) => ({
    props: {
      color
    },
    style: {
      color: (theme.vars || theme).palette[color].main
    }
  }))]
})));
const CircularProgressSVG = styled('svg', {
  name: 'MuiCircularProgress',
  slot: 'Svg'
})({
  display: 'block' // Keeps the progress centered
});
const CircularProgressCircle = styled('circle', {
  name: 'MuiCircularProgress',
  slot: 'Circle',
  overridesResolver: (props, styles) => {
    const {
      ownerState
    } = props;
    return [styles.circle, styles[`circle${capitalize(ownerState.variant)}`], ownerState.disableShrink && styles.circleDisableShrink];
  }
})(memoTheme(({
  theme
}) => ({
  stroke: 'currentColor',
  variants: [{
    props: {
      variant: 'determinate'
    },
    style: {
      transition: theme.transitions.create('stroke-dashoffset')
    }
  }, {
    props: {
      variant: 'indeterminate'
    },
    style: {
      // Some default value that looks fine waiting for the animation to kicks in.
      strokeDasharray: '80px, 200px',
      strokeDashoffset: 0 // Add the unit to fix a Edge 16 and below bug.
    }
  }, {
    props: ({
      ownerState
    }) => ownerState.variant === 'indeterminate' && !ownerState.disableShrink,
    style: dashAnimation || {
      // At runtime for Pigment CSS, `bufferAnimation` will be null and the generated keyframe will be used.
      animation: `${circularDashKeyframe} 1.4s ease-in-out infinite`
    }
  }]
})));
const CircularProgressTrack = styled('circle', {
  name: 'MuiCircularProgress',
  slot: 'Track'
})(memoTheme(({
  theme
}) => ({
  stroke: 'currentColor',
  opacity: (theme.vars || theme).palette.action.activatedOpacity
})));

/**
 * ## ARIA
 *
 * If the progress bar is describing the loading progress of a particular region of a page,
 * you should use `aria-describedby` to point to the progress bar, and set the `aria-busy`
 * attribute to `true` on that region until it has finished loading.
 */
const CircularProgress = /*#__PURE__*/React.forwardRef(function CircularProgress(inProps, ref) {
  const props = useDefaultProps({
    props: inProps,
    name: 'MuiCircularProgress'
  });
  const {
    className,
    color = 'primary',
    disableShrink = false,
    enableTrackSlot = false,
    size = 40,
    style,
    thickness = 3.6,
    value = 0,
    variant = 'indeterminate',
    ...other
  } = props;
  const ownerState = {
    ...props,
    color,
    disableShrink,
    size,
    thickness,
    value,
    variant,
    enableTrackSlot
  };
  const classes = useUtilityClasses$9(ownerState);
  const circleStyle = {};
  const rootStyle = {};
  const rootProps = {};
  if (variant === 'determinate') {
    const circumference = 2 * Math.PI * ((SIZE - thickness) / 2);
    circleStyle.strokeDasharray = circumference.toFixed(3);
    rootProps['aria-valuenow'] = Math.round(value);
    circleStyle.strokeDashoffset = `${((100 - value) / 100 * circumference).toFixed(3)}px`;
    rootStyle.transform = 'rotate(-90deg)';
  }
  return /*#__PURE__*/jsx(CircularProgressRoot, {
    className: clsx(classes.root, className),
    style: {
      width: size,
      height: size,
      ...rootStyle,
      ...style
    },
    ownerState: ownerState,
    ref: ref,
    role: "progressbar",
    ...rootProps,
    ...other,
    children: /*#__PURE__*/jsxs(CircularProgressSVG, {
      className: classes.svg,
      ownerState: ownerState,
      viewBox: `${SIZE / 2} ${SIZE / 2} ${SIZE} ${SIZE}`,
      children: [enableTrackSlot ? /*#__PURE__*/jsx(CircularProgressTrack, {
        className: classes.track,
        ownerState: ownerState,
        cx: SIZE,
        cy: SIZE,
        r: (SIZE - thickness) / 2,
        fill: "none",
        strokeWidth: thickness,
        "aria-hidden": "true"
      }) : null, /*#__PURE__*/jsx(CircularProgressCircle, {
        className: classes.circle,
        style: circleStyle,
        ownerState: ownerState,
        cx: SIZE,
        cy: SIZE,
        r: (SIZE - thickness) / 2,
        fill: "none",
        strokeWidth: thickness
      })]
    })
  });
});
process.env.NODE_ENV !== "production" ? CircularProgress.propTypes /* remove-proptypes */ = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * Override or extend the styles applied to the component.
   */
  classes: PropTypes.object,
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * The color of the component.
   * It supports both default and custom theme colors, which can be added as shown in the
   * [palette customization guide](https://mui.com/material-ui/customization/palette/#custom-colors).
   * @default 'primary'
   */
  color: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([PropTypes.oneOf(['inherit', 'primary', 'secondary', 'error', 'info', 'success', 'warning']), PropTypes.string]),
  /**
   * If `true`, the shrink animation is disabled.
   * This only works if variant is `indeterminate`.
   * @default false
   */
  disableShrink: chainPropTypes(PropTypes.bool, props => {
    if (props.disableShrink && props.variant && props.variant !== 'indeterminate') {
      return new Error('MUI: You have provided the `disableShrink` prop ' + 'with a variant other than `indeterminate`. This will have no effect.');
    }
    return null;
  }),
  /**
   * If `true`, a track circle slot is mounted to show a subtle background for the progress.
   * The `size` and `thickness` apply to the track slot to be consistent with the progress circle.
   * @default false
   */
  enableTrackSlot: PropTypes.bool,
  /**
   * The size of the component.
   * If using a number, the pixel unit is assumed.
   * If using a string, you need to provide the CSS unit, for example '3rem'.
   * @default 40
   */
  size: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  /**
   * @ignore
   */
  style: PropTypes.object,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])), PropTypes.func, PropTypes.object]),
  /**
   * The thickness of the circle.
   * @default 3.6
   */
  thickness: PropTypes.number,
  /**
   * The value of the progress indicator for the determinate variant.
   * Value between 0 and 100.
   * @default 0
   */
  value: PropTypes.number,
  /**
   * The variant to use.
   * Use indeterminate when there is no progress value.
   * @default 'indeterminate'
   */
  variant: PropTypes.oneOf(['determinate', 'indeterminate'])
} : void 0;

function getIconButtonUtilityClass(slot) {
  return generateUtilityClass('MuiIconButton', slot);
}
const iconButtonClasses = generateUtilityClasses('MuiIconButton', ['root', 'disabled', 'colorInherit', 'colorPrimary', 'colorSecondary', 'colorError', 'colorInfo', 'colorSuccess', 'colorWarning', 'edgeStart', 'edgeEnd', 'sizeSmall', 'sizeMedium', 'sizeLarge', 'loading', 'loadingIndicator', 'loadingWrapper']);

const useUtilityClasses$8 = ownerState => {
  const {
    classes,
    disabled,
    color,
    edge,
    size,
    loading
  } = ownerState;
  const slots = {
    root: ['root', loading && 'loading', disabled && 'disabled', color !== 'default' && `color${capitalize(color)}`, edge && `edge${capitalize(edge)}`, `size${capitalize(size)}`],
    loadingIndicator: ['loadingIndicator'],
    loadingWrapper: ['loadingWrapper']
  };
  return composeClasses(slots, getIconButtonUtilityClass, classes);
};
const IconButtonRoot = styled(ButtonBase, {
  name: 'MuiIconButton',
  slot: 'Root',
  overridesResolver: (props, styles) => {
    const {
      ownerState
    } = props;
    return [styles.root, ownerState.loading && styles.loading, ownerState.color !== 'default' && styles[`color${capitalize(ownerState.color)}`], ownerState.edge && styles[`edge${capitalize(ownerState.edge)}`], styles[`size${capitalize(ownerState.size)}`]];
  }
})(memoTheme(({
  theme
}) => ({
  textAlign: 'center',
  flex: '0 0 auto',
  fontSize: theme.typography.pxToRem(24),
  padding: 8,
  borderRadius: '50%',
  color: (theme.vars || theme).palette.action.active,
  transition: theme.transitions.create('background-color', {
    duration: theme.transitions.duration.shortest
  }),
  variants: [{
    props: props => !props.disableRipple,
    style: {
      '--IconButton-hoverBg': theme.alpha((theme.vars || theme).palette.action.active, (theme.vars || theme).palette.action.hoverOpacity),
      '&:hover': {
        backgroundColor: 'var(--IconButton-hoverBg)',
        // Reset on touch devices, it doesn't add specificity
        '@media (hover: none)': {
          backgroundColor: 'transparent'
        }
      }
    }
  }, {
    props: {
      edge: 'start'
    },
    style: {
      marginLeft: -12
    }
  }, {
    props: {
      edge: 'start',
      size: 'small'
    },
    style: {
      marginLeft: -3
    }
  }, {
    props: {
      edge: 'end'
    },
    style: {
      marginRight: -12
    }
  }, {
    props: {
      edge: 'end',
      size: 'small'
    },
    style: {
      marginRight: -3
    }
  }]
})), memoTheme(({
  theme
}) => ({
  variants: [{
    props: {
      color: 'inherit'
    },
    style: {
      color: 'inherit'
    }
  }, ...Object.entries(theme.palette).filter(createSimplePaletteValueFilter()) // check all the used fields in the style below
  .map(([color]) => ({
    props: {
      color
    },
    style: {
      color: (theme.vars || theme).palette[color].main
    }
  })), ...Object.entries(theme.palette).filter(createSimplePaletteValueFilter()) // check all the used fields in the style below
  .map(([color]) => ({
    props: {
      color
    },
    style: {
      '--IconButton-hoverBg': theme.alpha((theme.vars || theme).palette[color].main, (theme.vars || theme).palette.action.hoverOpacity)
    }
  })), {
    props: {
      size: 'small'
    },
    style: {
      padding: 5,
      fontSize: theme.typography.pxToRem(18)
    }
  }, {
    props: {
      size: 'large'
    },
    style: {
      padding: 12,
      fontSize: theme.typography.pxToRem(28)
    }
  }],
  [`&.${iconButtonClasses.disabled}`]: {
    backgroundColor: 'transparent',
    color: (theme.vars || theme).palette.action.disabled
  },
  [`&.${iconButtonClasses.loading}`]: {
    color: 'transparent'
  }
})));
const IconButtonLoadingIndicator = styled('span', {
  name: 'MuiIconButton',
  slot: 'LoadingIndicator'
})(({
  theme
}) => ({
  display: 'none',
  position: 'absolute',
  visibility: 'visible',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  color: (theme.vars || theme).palette.action.disabled,
  variants: [{
    props: {
      loading: true
    },
    style: {
      display: 'flex'
    }
  }]
}));

/**
 * Refer to the [Icons](/material-ui/icons/) section of the documentation
 * regarding the available icon options.
 */
const IconButton = /*#__PURE__*/React.forwardRef(function IconButton(inProps, ref) {
  const props = useDefaultProps({
    props: inProps,
    name: 'MuiIconButton'
  });
  const {
    edge = false,
    children,
    className,
    color = 'default',
    disabled = false,
    disableFocusRipple = false,
    size = 'medium',
    id: idProp,
    loading = null,
    loadingIndicator: loadingIndicatorProp,
    ...other
  } = props;
  const loadingId = useId(idProp);
  const loadingIndicator = loadingIndicatorProp ?? /*#__PURE__*/jsx(CircularProgress, {
    "aria-labelledby": loadingId,
    color: "inherit",
    size: 16
  });
  const ownerState = {
    ...props,
    edge,
    color,
    disabled,
    disableFocusRipple,
    loading,
    loadingIndicator,
    size
  };
  const classes = useUtilityClasses$8(ownerState);
  return /*#__PURE__*/jsxs(IconButtonRoot, {
    id: loading ? loadingId : idProp,
    className: clsx(classes.root, className),
    centerRipple: true,
    focusRipple: !disableFocusRipple,
    disabled: disabled || loading,
    ref: ref,
    ...other,
    ownerState: ownerState,
    children: [typeof loading === 'boolean' &&
    /*#__PURE__*/
    // use plain HTML span to minimize the runtime overhead
    jsx("span", {
      className: classes.loadingWrapper,
      style: {
        display: 'contents'
      },
      children: /*#__PURE__*/jsx(IconButtonLoadingIndicator, {
        className: classes.loadingIndicator,
        ownerState: ownerState,
        children: loading && loadingIndicator
      })
    }), children]
  });
});
process.env.NODE_ENV !== "production" ? IconButton.propTypes /* remove-proptypes */ = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * The icon to display.
   */
  children: chainPropTypes(PropTypes.node, props => {
    const found = React.Children.toArray(props.children).some(child => /*#__PURE__*/React.isValidElement(child) && child.props.onClick);
    if (found) {
      return new Error(['MUI: You are providing an onClick event listener to a child of a button element.', 'Prefer applying it to the IconButton directly.', 'This guarantees that the whole <button> will be responsive to click events.'].join('\n'));
    }
    return null;
  }),
  /**
   * Override or extend the styles applied to the component.
   */
  classes: PropTypes.object,
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * The color of the component.
   * It supports both default and custom theme colors, which can be added as shown in the
   * [palette customization guide](https://mui.com/material-ui/customization/palette/#custom-colors).
   * @default 'default'
   */
  color: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([PropTypes.oneOf(['inherit', 'default', 'primary', 'secondary', 'error', 'info', 'success', 'warning']), PropTypes.string]),
  /**
   * If `true`, the component is disabled.
   * @default false
   */
  disabled: PropTypes.bool,
  /**
   * If `true`, the  keyboard focus ripple is disabled.
   * @default false
   */
  disableFocusRipple: PropTypes.bool,
  /**
   * If `true`, the ripple effect is disabled.
   *
   * ⚠️ Without a ripple there is no styling for :focus-visible by default. Be sure
   * to highlight the element by applying separate styles with the `.Mui-focusVisible` class.
   * @default false
   */
  disableRipple: PropTypes.bool,
  /**
   * If given, uses a negative margin to counteract the padding on one
   * side (this is often helpful for aligning the left or right
   * side of the icon with content above or below, without ruining the border
   * size and shape).
   * @default false
   */
  edge: PropTypes.oneOf(['end', 'start', false]),
  /**
   * @ignore
   */
  id: PropTypes.string,
  /**
   * If `true`, the loading indicator is visible and the button is disabled.
   * If `true | false`, the loading wrapper is always rendered before the children to prevent [Google Translation Crash](https://github.com/mui/material-ui/issues/27853).
   * @default null
   */
  loading: PropTypes.bool,
  /**
   * Element placed before the children if the button is in loading state.
   * The node should contain an element with `role="progressbar"` with an accessible name.
   * By default, it renders a `CircularProgress` that is labeled by the button itself.
   * @default <CircularProgress color="inherit" size={16} />
   */
  loadingIndicator: PropTypes.node,
  /**
   * The size of the component.
   * `small` is equivalent to the dense button styling.
   * @default 'medium'
   */
  size: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([PropTypes.oneOf(['small', 'medium', 'large']), PropTypes.string]),
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])), PropTypes.func, PropTypes.object])
} : void 0;

function getTypographyUtilityClass(slot) {
  return generateUtilityClass('MuiTypography', slot);
}
generateUtilityClasses('MuiTypography', ['root', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'subtitle1', 'subtitle2', 'body1', 'body2', 'inherit', 'button', 'caption', 'overline', 'alignLeft', 'alignRight', 'alignCenter', 'alignJustify', 'noWrap', 'gutterBottom', 'paragraph']);

const v6Colors$1 = {
  primary: true,
  secondary: true,
  error: true,
  info: true,
  success: true,
  warning: true,
  textPrimary: true,
  textSecondary: true,
  textDisabled: true
};
const extendSxProp = internal_createExtendSxProp();
const useUtilityClasses$7 = ownerState => {
  const {
    align,
    gutterBottom,
    noWrap,
    paragraph,
    variant,
    classes
  } = ownerState;
  const slots = {
    root: ['root', variant, ownerState.align !== 'inherit' && `align${capitalize(align)}`, gutterBottom && 'gutterBottom', noWrap && 'noWrap', paragraph && 'paragraph']
  };
  return composeClasses(slots, getTypographyUtilityClass, classes);
};
const TypographyRoot = styled('span', {
  name: 'MuiTypography',
  slot: 'Root',
  overridesResolver: (props, styles) => {
    const {
      ownerState
    } = props;
    return [styles.root, ownerState.variant && styles[ownerState.variant], ownerState.align !== 'inherit' && styles[`align${capitalize(ownerState.align)}`], ownerState.noWrap && styles.noWrap, ownerState.gutterBottom && styles.gutterBottom, ownerState.paragraph && styles.paragraph];
  }
})(memoTheme(({
  theme
}) => ({
  margin: 0,
  variants: [{
    props: {
      variant: 'inherit'
    },
    style: {
      // Some elements, like <button> on Chrome have default font that doesn't inherit, reset this.
      font: 'inherit',
      lineHeight: 'inherit',
      letterSpacing: 'inherit'
    }
  }, ...Object.entries(theme.typography).filter(([variant, value]) => variant !== 'inherit' && value && typeof value === 'object').map(([variant, value]) => ({
    props: {
      variant
    },
    style: value
  })), ...Object.entries(theme.palette).filter(createSimplePaletteValueFilter()).map(([color]) => ({
    props: {
      color
    },
    style: {
      color: (theme.vars || theme).palette[color].main
    }
  })), ...Object.entries(theme.palette?.text || {}).filter(([, value]) => typeof value === 'string').map(([color]) => ({
    props: {
      color: `text${capitalize(color)}`
    },
    style: {
      color: (theme.vars || theme).palette.text[color]
    }
  })), {
    props: ({
      ownerState
    }) => ownerState.align !== 'inherit',
    style: {
      textAlign: 'var(--Typography-textAlign)'
    }
  }, {
    props: ({
      ownerState
    }) => ownerState.noWrap,
    style: {
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap'
    }
  }, {
    props: ({
      ownerState
    }) => ownerState.gutterBottom,
    style: {
      marginBottom: '0.35em'
    }
  }, {
    props: ({
      ownerState
    }) => ownerState.paragraph,
    style: {
      marginBottom: 16
    }
  }]
})));
const defaultVariantMapping = {
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  h4: 'h4',
  h5: 'h5',
  h6: 'h6',
  subtitle1: 'h6',
  subtitle2: 'h6',
  body1: 'p',
  body2: 'p',
  inherit: 'p'
};
const Typography = /*#__PURE__*/React.forwardRef(function Typography(inProps, ref) {
  const {
    color,
    ...themeProps
  } = useDefaultProps({
    props: inProps,
    name: 'MuiTypography'
  });
  const isSxColor = !v6Colors$1[color];
  // TODO: Remove `extendSxProp` in v7
  const props = extendSxProp({
    ...themeProps,
    ...(isSxColor && {
      color
    })
  });
  const {
    align = 'inherit',
    className,
    component,
    gutterBottom = false,
    noWrap = false,
    paragraph = false,
    variant = 'body1',
    variantMapping = defaultVariantMapping,
    ...other
  } = props;
  const ownerState = {
    ...props,
    align,
    color,
    className,
    component,
    gutterBottom,
    noWrap,
    paragraph,
    variant,
    variantMapping
  };
  const Component = component || (paragraph ? 'p' : variantMapping[variant] || defaultVariantMapping[variant]) || 'span';
  const classes = useUtilityClasses$7(ownerState);
  return /*#__PURE__*/jsx(TypographyRoot, {
    as: Component,
    ref: ref,
    className: clsx(classes.root, className),
    ...other,
    ownerState: ownerState,
    style: {
      ...(align !== 'inherit' && {
        '--Typography-textAlign': align
      }),
      ...other.style
    }
  });
});
process.env.NODE_ENV !== "production" ? Typography.propTypes /* remove-proptypes */ = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * Set the text-align on the component.
   * @default 'inherit'
   */
  align: PropTypes.oneOf(['center', 'inherit', 'justify', 'left', 'right']),
  /**
   * The content of the component.
   */
  children: PropTypes.node,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: PropTypes.object,
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * The color of the component.
   * It supports both default and custom theme colors, which can be added as shown in the
   * [palette customization guide](https://mui.com/material-ui/customization/palette/#custom-colors).
   */
  color: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([PropTypes.oneOf(['primary', 'secondary', 'success', 'error', 'info', 'warning', 'textPrimary', 'textSecondary', 'textDisabled']), PropTypes.string]),
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: PropTypes.elementType,
  /**
   * If `true`, the text will have a bottom margin.
   * @default false
   */
  gutterBottom: PropTypes.bool,
  /**
   * If `true`, the text will not wrap, but instead will truncate with a text overflow ellipsis.
   *
   * Note that text overflow can only happen with block or inline-block level elements
   * (the element needs to have a width in order to overflow).
   * @default false
   */
  noWrap: PropTypes.bool,
  /**
   * If `true`, the element will be a paragraph element.
   * @default false
   * @deprecated Use the `component` prop instead. This prop will be removed in a future major release. See [Migrating from deprecated APIs](https://mui.com/material-ui/migration/migrating-from-deprecated-apis/) for more details.
   */
  paragraph: PropTypes.bool,
  /**
   * @ignore
   */
  style: PropTypes.object,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])), PropTypes.func, PropTypes.object]),
  /**
   * Applies the theme typography styles.
   * @default 'body1'
   */
  variant: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([PropTypes.oneOf(['body1', 'body2', 'button', 'caption', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'inherit', 'overline', 'subtitle1', 'subtitle2']), PropTypes.string]),
  /**
   * The component maps the variant prop to a range of different HTML element types.
   * For instance, subtitle1 to `<h6>`.
   * If you wish to change that mapping, you can provide your own.
   * Alternatively, you can use the `component` prop.
   * @default {
   *   h1: 'h1',
   *   h2: 'h2',
   *   h3: 'h3',
   *   h4: 'h4',
   *   h5: 'h5',
   *   h6: 'h6',
   *   subtitle1: 'h6',
   *   subtitle2: 'h6',
   *   body1: 'p',
   *   body2: 'p',
   *   inherit: 'p',
   * }
   */
  variantMapping: PropTypes /* @typescript-to-proptypes-ignore */.object
} : void 0;

function getAppBarUtilityClass(slot) {
  return generateUtilityClass('MuiAppBar', slot);
}
generateUtilityClasses('MuiAppBar', ['root', 'positionFixed', 'positionAbsolute', 'positionSticky', 'positionStatic', 'positionRelative', 'colorDefault', 'colorPrimary', 'colorSecondary', 'colorInherit', 'colorTransparent', 'colorError', 'colorInfo', 'colorSuccess', 'colorWarning']);

const useUtilityClasses$6 = ownerState => {
  const {
    color,
    position,
    classes
  } = ownerState;
  const slots = {
    root: ['root', `color${capitalize(color)}`, `position${capitalize(position)}`]
  };
  return composeClasses(slots, getAppBarUtilityClass, classes);
};

// var2 is the fallback.
// Ex. var1: 'var(--a)', var2: 'var(--b)'; return: 'var(--a, var(--b))'
const joinVars = (var1, var2) => var1 ? `${var1?.replace(')', '')}, ${var2})` : var2;
const AppBarRoot = styled(Paper, {
  name: 'MuiAppBar',
  slot: 'Root',
  overridesResolver: (props, styles) => {
    const {
      ownerState
    } = props;
    return [styles.root, styles[`position${capitalize(ownerState.position)}`], styles[`color${capitalize(ownerState.color)}`]];
  }
})(memoTheme(({
  theme
}) => ({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  boxSizing: 'border-box',
  // Prevent padding issue with the Modal and fixed positioned AppBar.
  flexShrink: 0,
  variants: [{
    props: {
      position: 'fixed'
    },
    style: {
      position: 'fixed',
      zIndex: (theme.vars || theme).zIndex.appBar,
      top: 0,
      left: 'auto',
      right: 0,
      '@media print': {
        // Prevent the app bar to be visible on each printed page.
        position: 'absolute'
      }
    }
  }, {
    props: {
      position: 'absolute'
    },
    style: {
      position: 'absolute',
      zIndex: (theme.vars || theme).zIndex.appBar,
      top: 0,
      left: 'auto',
      right: 0
    }
  }, {
    props: {
      position: 'sticky'
    },
    style: {
      position: 'sticky',
      zIndex: (theme.vars || theme).zIndex.appBar,
      top: 0,
      left: 'auto',
      right: 0
    }
  }, {
    props: {
      position: 'static'
    },
    style: {
      position: 'static'
    }
  }, {
    props: {
      position: 'relative'
    },
    style: {
      position: 'relative'
    }
  }, {
    props: {
      color: 'inherit'
    },
    style: {
      '--AppBar-color': 'inherit',
      color: 'var(--AppBar-color)'
    }
  }, {
    props: {
      color: 'default'
    },
    style: {
      '--AppBar-background': theme.vars ? theme.vars.palette.AppBar.defaultBg : theme.palette.grey[100],
      '--AppBar-color': theme.vars ? theme.vars.palette.text.primary : theme.palette.getContrastText(theme.palette.grey[100]),
      ...theme.applyStyles('dark', {
        '--AppBar-background': theme.vars ? theme.vars.palette.AppBar.defaultBg : theme.palette.grey[900],
        '--AppBar-color': theme.vars ? theme.vars.palette.text.primary : theme.palette.getContrastText(theme.palette.grey[900])
      })
    }
  }, ...Object.entries(theme.palette).filter(createSimplePaletteValueFilter(['contrastText'])).map(([color]) => ({
    props: {
      color
    },
    style: {
      '--AppBar-background': (theme.vars ?? theme).palette[color].main,
      '--AppBar-color': (theme.vars ?? theme).palette[color].contrastText
    }
  })), {
    props: props => props.enableColorOnDark === true && !['inherit', 'transparent'].includes(props.color),
    style: {
      backgroundColor: 'var(--AppBar-background)',
      color: 'var(--AppBar-color)'
    }
  }, {
    props: props => props.enableColorOnDark === false && !['inherit', 'transparent'].includes(props.color),
    style: {
      backgroundColor: 'var(--AppBar-background)',
      color: 'var(--AppBar-color)',
      ...theme.applyStyles('dark', {
        backgroundColor: theme.vars ? joinVars(theme.vars.palette.AppBar.darkBg, 'var(--AppBar-background)') : null,
        color: theme.vars ? joinVars(theme.vars.palette.AppBar.darkColor, 'var(--AppBar-color)') : null
      })
    }
  }, {
    props: {
      color: 'transparent'
    },
    style: {
      '--AppBar-background': 'transparent',
      '--AppBar-color': 'inherit',
      backgroundColor: 'var(--AppBar-background)',
      color: 'var(--AppBar-color)',
      ...theme.applyStyles('dark', {
        backgroundImage: 'none'
      })
    }
  }]
})));
const AppBar = /*#__PURE__*/React.forwardRef(function AppBar(inProps, ref) {
  const props = useDefaultProps({
    props: inProps,
    name: 'MuiAppBar'
  });
  const {
    className,
    color = 'primary',
    enableColorOnDark = false,
    position = 'fixed',
    ...other
  } = props;
  const ownerState = {
    ...props,
    color,
    position,
    enableColorOnDark
  };
  const classes = useUtilityClasses$6(ownerState);
  return /*#__PURE__*/jsx(AppBarRoot, {
    square: true,
    component: "header",
    ownerState: ownerState,
    elevation: 4,
    className: clsx(classes.root, className, position === 'fixed' && 'mui-fixed'),
    ref: ref,
    ...other
  });
});
process.env.NODE_ENV !== "production" ? AppBar.propTypes /* remove-proptypes */ = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * The content of the component.
   */
  children: PropTypes.node,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: PropTypes.object,
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * The color of the component.
   * It supports both default and custom theme colors, which can be added as shown in the
   * [palette customization guide](https://mui.com/material-ui/customization/palette/#custom-colors).
   * @default 'primary'
   */
  color: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([PropTypes.oneOf(['default', 'inherit', 'primary', 'secondary', 'transparent', 'error', 'info', 'success', 'warning']), PropTypes.string]),
  /**
   * Shadow depth, corresponds to `dp` in the spec.
   * It accepts values between 0 and 24 inclusive.
   * @default 4
   */
  elevation: PropTypes.number,
  /**
   * If true, the `color` prop is applied in dark mode.
   * @default false
   */
  enableColorOnDark: PropTypes.bool,
  /**
   * The positioning type. The behavior of the different options is described
   * [in the MDN web docs](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/position).
   * Note: `sticky` is not universally supported and will fall back to `static` when unavailable.
   * @default 'fixed'
   */
  position: PropTypes.oneOf(['absolute', 'fixed', 'relative', 'static', 'sticky']),
  /**
   * If `false`, rounded corners are enabled.
   * @default true
   */
  square: PropTypes.bool,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])), PropTypes.func, PropTypes.object])
} : void 0;

const CancelIcon = createSvgIcon(/*#__PURE__*/jsx("path", {
  d: "M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z"
}), 'Cancel');

function getChipUtilityClass(slot) {
  return generateUtilityClass('MuiChip', slot);
}
const chipClasses = generateUtilityClasses('MuiChip', ['root', 'sizeSmall', 'sizeMedium', 'colorDefault', 'colorError', 'colorInfo', 'colorPrimary', 'colorSecondary', 'colorSuccess', 'colorWarning', 'disabled', 'clickable', 'clickableColorPrimary', 'clickableColorSecondary', 'deletable', 'deletableColorPrimary', 'deletableColorSecondary', 'outlined', 'filled', 'outlinedPrimary', 'outlinedSecondary', 'filledPrimary', 'filledSecondary', 'avatar', 'avatarSmall', 'avatarMedium', 'avatarColorPrimary', 'avatarColorSecondary', 'icon', 'iconSmall', 'iconMedium', 'iconColorPrimary', 'iconColorSecondary', 'label', 'labelSmall', 'labelMedium', 'deleteIcon', 'deleteIconSmall', 'deleteIconMedium', 'deleteIconColorPrimary', 'deleteIconColorSecondary', 'deleteIconOutlinedColorPrimary', 'deleteIconOutlinedColorSecondary', 'deleteIconFilledColorPrimary', 'deleteIconFilledColorSecondary', 'focusVisible']);

const useUtilityClasses$5 = ownerState => {
  const {
    classes,
    disabled,
    size,
    color,
    iconColor,
    onDelete,
    clickable,
    variant
  } = ownerState;
  const slots = {
    root: ['root', variant, disabled && 'disabled', `size${capitalize(size)}`, `color${capitalize(color)}`, clickable && 'clickable', clickable && `clickableColor${capitalize(color)}`, onDelete && 'deletable', onDelete && `deletableColor${capitalize(color)}`, `${variant}${capitalize(color)}`],
    label: ['label', `label${capitalize(size)}`],
    avatar: ['avatar', `avatar${capitalize(size)}`, `avatarColor${capitalize(color)}`],
    icon: ['icon', `icon${capitalize(size)}`, `iconColor${capitalize(iconColor)}`],
    deleteIcon: ['deleteIcon', `deleteIcon${capitalize(size)}`, `deleteIconColor${capitalize(color)}`, `deleteIcon${capitalize(variant)}Color${capitalize(color)}`]
  };
  return composeClasses(slots, getChipUtilityClass, classes);
};
const ChipRoot = styled('div', {
  name: 'MuiChip',
  slot: 'Root',
  overridesResolver: (props, styles) => {
    const {
      ownerState
    } = props;
    const {
      color,
      iconColor,
      clickable,
      onDelete,
      size,
      variant
    } = ownerState;
    return [{
      [`& .${chipClasses.avatar}`]: styles.avatar
    }, {
      [`& .${chipClasses.avatar}`]: styles[`avatar${capitalize(size)}`]
    }, {
      [`& .${chipClasses.avatar}`]: styles[`avatarColor${capitalize(color)}`]
    }, {
      [`& .${chipClasses.icon}`]: styles.icon
    }, {
      [`& .${chipClasses.icon}`]: styles[`icon${capitalize(size)}`]
    }, {
      [`& .${chipClasses.icon}`]: styles[`iconColor${capitalize(iconColor)}`]
    }, {
      [`& .${chipClasses.deleteIcon}`]: styles.deleteIcon
    }, {
      [`& .${chipClasses.deleteIcon}`]: styles[`deleteIcon${capitalize(size)}`]
    }, {
      [`& .${chipClasses.deleteIcon}`]: styles[`deleteIconColor${capitalize(color)}`]
    }, {
      [`& .${chipClasses.deleteIcon}`]: styles[`deleteIcon${capitalize(variant)}Color${capitalize(color)}`]
    }, styles.root, styles[`size${capitalize(size)}`], styles[`color${capitalize(color)}`], clickable && styles.clickable, clickable && color !== 'default' && styles[`clickableColor${capitalize(color)}`], onDelete && styles.deletable, onDelete && color !== 'default' && styles[`deletableColor${capitalize(color)}`], styles[variant], styles[`${variant}${capitalize(color)}`]];
  }
})(memoTheme(({
  theme
}) => {
  const textColor = theme.palette.mode === 'light' ? theme.palette.grey[700] : theme.palette.grey[300];
  return {
    maxWidth: '100%',
    fontFamily: theme.typography.fontFamily,
    fontSize: theme.typography.pxToRem(13),
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: 32,
    lineHeight: 1.5,
    color: (theme.vars || theme).palette.text.primary,
    backgroundColor: (theme.vars || theme).palette.action.selected,
    borderRadius: 32 / 2,
    whiteSpace: 'nowrap',
    transition: theme.transitions.create(['background-color', 'box-shadow']),
    // reset cursor explicitly in case ButtonBase is used
    cursor: 'unset',
    // We disable the focus ring for mouse, touch and keyboard users.
    outline: 0,
    textDecoration: 'none',
    border: 0,
    // Remove `button` border
    padding: 0,
    // Remove `button` padding
    verticalAlign: 'middle',
    boxSizing: 'border-box',
    [`&.${chipClasses.disabled}`]: {
      opacity: (theme.vars || theme).palette.action.disabledOpacity,
      pointerEvents: 'none'
    },
    [`& .${chipClasses.avatar}`]: {
      marginLeft: 5,
      marginRight: -6,
      width: 24,
      height: 24,
      color: theme.vars ? theme.vars.palette.Chip.defaultAvatarColor : textColor,
      fontSize: theme.typography.pxToRem(12)
    },
    [`& .${chipClasses.avatarColorPrimary}`]: {
      color: (theme.vars || theme).palette.primary.contrastText,
      backgroundColor: (theme.vars || theme).palette.primary.dark
    },
    [`& .${chipClasses.avatarColorSecondary}`]: {
      color: (theme.vars || theme).palette.secondary.contrastText,
      backgroundColor: (theme.vars || theme).palette.secondary.dark
    },
    [`& .${chipClasses.avatarSmall}`]: {
      marginLeft: 4,
      marginRight: -4,
      width: 18,
      height: 18,
      fontSize: theme.typography.pxToRem(10)
    },
    [`& .${chipClasses.icon}`]: {
      marginLeft: 5,
      marginRight: -6
    },
    [`& .${chipClasses.deleteIcon}`]: {
      WebkitTapHighlightColor: 'transparent',
      color: theme.alpha((theme.vars || theme).palette.text.primary, 0.26),
      fontSize: 22,
      cursor: 'pointer',
      margin: '0 5px 0 -6px',
      '&:hover': {
        color: theme.alpha((theme.vars || theme).palette.text.primary, 0.4)
      }
    },
    variants: [{
      props: {
        size: 'small'
      },
      style: {
        height: 24,
        [`& .${chipClasses.icon}`]: {
          fontSize: 18,
          marginLeft: 4,
          marginRight: -4
        },
        [`& .${chipClasses.deleteIcon}`]: {
          fontSize: 16,
          marginRight: 4,
          marginLeft: -4
        }
      }
    }, ...Object.entries(theme.palette).filter(createSimplePaletteValueFilter(['contrastText'])).map(([color]) => {
      return {
        props: {
          color
        },
        style: {
          backgroundColor: (theme.vars || theme).palette[color].main,
          color: (theme.vars || theme).palette[color].contrastText,
          [`& .${chipClasses.deleteIcon}`]: {
            color: theme.alpha((theme.vars || theme).palette[color].contrastText, 0.7),
            '&:hover, &:active': {
              color: (theme.vars || theme).palette[color].contrastText
            }
          }
        }
      };
    }), {
      props: props => props.iconColor === props.color,
      style: {
        [`& .${chipClasses.icon}`]: {
          color: theme.vars ? theme.vars.palette.Chip.defaultIconColor : textColor
        }
      }
    }, {
      props: props => props.iconColor === props.color && props.color !== 'default',
      style: {
        [`& .${chipClasses.icon}`]: {
          color: 'inherit'
        }
      }
    }, {
      props: {
        onDelete: true
      },
      style: {
        [`&.${chipClasses.focusVisible}`]: {
          backgroundColor: theme.alpha((theme.vars || theme).palette.action.selected, `${(theme.vars || theme).palette.action.selectedOpacity} + ${(theme.vars || theme).palette.action.focusOpacity}`)
        }
      }
    }, ...Object.entries(theme.palette).filter(createSimplePaletteValueFilter(['dark'])).map(([color]) => {
      return {
        props: {
          color,
          onDelete: true
        },
        style: {
          [`&.${chipClasses.focusVisible}`]: {
            background: (theme.vars || theme).palette[color].dark
          }
        }
      };
    }), {
      props: {
        clickable: true
      },
      style: {
        userSelect: 'none',
        WebkitTapHighlightColor: 'transparent',
        cursor: 'pointer',
        '&:hover': {
          backgroundColor: theme.alpha((theme.vars || theme).palette.action.selected, `${(theme.vars || theme).palette.action.selectedOpacity} + ${(theme.vars || theme).palette.action.hoverOpacity}`)
        },
        [`&.${chipClasses.focusVisible}`]: {
          backgroundColor: theme.alpha((theme.vars || theme).palette.action.selected, `${(theme.vars || theme).palette.action.selectedOpacity} + ${(theme.vars || theme).palette.action.focusOpacity}`)
        },
        '&:active': {
          boxShadow: (theme.vars || theme).shadows[1]
        }
      }
    }, ...Object.entries(theme.palette).filter(createSimplePaletteValueFilter(['dark'])).map(([color]) => ({
      props: {
        color,
        clickable: true
      },
      style: {
        [`&:hover, &.${chipClasses.focusVisible}`]: {
          backgroundColor: (theme.vars || theme).palette[color].dark
        }
      }
    })), {
      props: {
        variant: 'outlined'
      },
      style: {
        backgroundColor: 'transparent',
        border: theme.vars ? `1px solid ${theme.vars.palette.Chip.defaultBorder}` : `1px solid ${theme.palette.mode === 'light' ? theme.palette.grey[400] : theme.palette.grey[700]}`,
        [`&.${chipClasses.clickable}:hover`]: {
          backgroundColor: (theme.vars || theme).palette.action.hover
        },
        [`&.${chipClasses.focusVisible}`]: {
          backgroundColor: (theme.vars || theme).palette.action.focus
        },
        [`& .${chipClasses.avatar}`]: {
          marginLeft: 4
        },
        [`& .${chipClasses.avatarSmall}`]: {
          marginLeft: 2
        },
        [`& .${chipClasses.icon}`]: {
          marginLeft: 4
        },
        [`& .${chipClasses.iconSmall}`]: {
          marginLeft: 2
        },
        [`& .${chipClasses.deleteIcon}`]: {
          marginRight: 5
        },
        [`& .${chipClasses.deleteIconSmall}`]: {
          marginRight: 3
        }
      }
    }, ...Object.entries(theme.palette).filter(createSimplePaletteValueFilter()) // no need to check for mainChannel as it's calculated from main
    .map(([color]) => ({
      props: {
        variant: 'outlined',
        color
      },
      style: {
        color: (theme.vars || theme).palette[color].main,
        border: `1px solid ${theme.alpha((theme.vars || theme).palette[color].main, 0.7)}`,
        [`&.${chipClasses.clickable}:hover`]: {
          backgroundColor: theme.alpha((theme.vars || theme).palette[color].main, (theme.vars || theme).palette.action.hoverOpacity)
        },
        [`&.${chipClasses.focusVisible}`]: {
          backgroundColor: theme.alpha((theme.vars || theme).palette[color].main, (theme.vars || theme).palette.action.focusOpacity)
        },
        [`& .${chipClasses.deleteIcon}`]: {
          color: theme.alpha((theme.vars || theme).palette[color].main, 0.7),
          '&:hover, &:active': {
            color: (theme.vars || theme).palette[color].main
          }
        }
      }
    }))]
  };
}));
const ChipLabel = styled('span', {
  name: 'MuiChip',
  slot: 'Label',
  overridesResolver: (props, styles) => {
    const {
      ownerState
    } = props;
    const {
      size
    } = ownerState;
    return [styles.label, styles[`label${capitalize(size)}`]];
  }
})({
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  paddingLeft: 12,
  paddingRight: 12,
  whiteSpace: 'nowrap',
  variants: [{
    props: {
      variant: 'outlined'
    },
    style: {
      paddingLeft: 11,
      paddingRight: 11
    }
  }, {
    props: {
      size: 'small'
    },
    style: {
      paddingLeft: 8,
      paddingRight: 8
    }
  }, {
    props: {
      size: 'small',
      variant: 'outlined'
    },
    style: {
      paddingLeft: 7,
      paddingRight: 7
    }
  }]
});
function isDeleteKeyboardEvent(keyboardEvent) {
  return keyboardEvent.key === 'Backspace' || keyboardEvent.key === 'Delete';
}

/**
 * Chips represent complex entities in small blocks, such as a contact.
 */
const Chip = /*#__PURE__*/React.forwardRef(function Chip(inProps, ref) {
  const props = useDefaultProps({
    props: inProps,
    name: 'MuiChip'
  });
  const {
    avatar: avatarProp,
    className,
    clickable: clickableProp,
    color = 'default',
    component: ComponentProp,
    deleteIcon: deleteIconProp,
    disabled = false,
    icon: iconProp,
    label,
    onClick,
    onDelete,
    onKeyDown,
    onKeyUp,
    size = 'medium',
    variant = 'filled',
    tabIndex,
    skipFocusWhenDisabled = false,
    // TODO v6: Rename to `focusableWhenDisabled`.
    slots = {},
    slotProps = {},
    ...other
  } = props;
  const chipRef = React.useRef(null);
  const handleRef = useForkRef(chipRef, ref);
  const handleDeleteIconClick = event => {
    // Stop the event from bubbling up to the `Chip`
    event.stopPropagation();
    if (onDelete) {
      onDelete(event);
    }
  };
  const handleKeyDown = event => {
    // Ignore events from children of `Chip`.
    if (event.currentTarget === event.target && isDeleteKeyboardEvent(event)) {
      // Will be handled in keyUp, otherwise some browsers
      // might init navigation
      event.preventDefault();
    }
    if (onKeyDown) {
      onKeyDown(event);
    }
  };
  const handleKeyUp = event => {
    // Ignore events from children of `Chip`.
    if (event.currentTarget === event.target) {
      if (onDelete && isDeleteKeyboardEvent(event)) {
        onDelete(event);
      }
    }
    if (onKeyUp) {
      onKeyUp(event);
    }
  };
  const clickable = clickableProp !== false && onClick ? true : clickableProp;
  const component = clickable || onDelete ? ButtonBase : ComponentProp || 'div';
  const ownerState = {
    ...props,
    component,
    disabled,
    size,
    color,
    iconColor: /*#__PURE__*/React.isValidElement(iconProp) ? iconProp.props.color || color : color,
    onDelete: !!onDelete,
    clickable,
    variant
  };
  const classes = useUtilityClasses$5(ownerState);
  const moreProps = component === ButtonBase ? {
    component: ComponentProp || 'div',
    focusVisibleClassName: classes.focusVisible,
    ...(onDelete && {
      disableRipple: true
    })
  } : {};
  let deleteIcon = null;
  if (onDelete) {
    deleteIcon = deleteIconProp && /*#__PURE__*/React.isValidElement(deleteIconProp) ? (/*#__PURE__*/React.cloneElement(deleteIconProp, {
      className: clsx(deleteIconProp.props.className, classes.deleteIcon),
      onClick: handleDeleteIconClick
    })) : /*#__PURE__*/jsx(CancelIcon, {
      className: classes.deleteIcon,
      onClick: handleDeleteIconClick
    });
  }
  let avatar = null;
  if (avatarProp && /*#__PURE__*/React.isValidElement(avatarProp)) {
    avatar = /*#__PURE__*/React.cloneElement(avatarProp, {
      className: clsx(classes.avatar, avatarProp.props.className)
    });
  }
  let icon = null;
  if (iconProp && /*#__PURE__*/React.isValidElement(iconProp)) {
    icon = /*#__PURE__*/React.cloneElement(iconProp, {
      className: clsx(classes.icon, iconProp.props.className)
    });
  }
  if (process.env.NODE_ENV !== 'production') {
    if (avatar && icon) {
      console.error('MUI: The Chip component can not handle the avatar ' + 'and the icon prop at the same time. Pick one.');
    }
  }
  const externalForwardedProps = {
    slots,
    slotProps
  };
  const [RootSlot, rootProps] = useSlot('root', {
    elementType: ChipRoot,
    externalForwardedProps: {
      ...externalForwardedProps,
      ...other
    },
    ownerState,
    // The `component` prop is preserved because `Chip` relies on it for internal logic. If `shouldForwardComponentProp` were `false`, `useSlot` would remove the `component` prop, potentially breaking the component's behavior.
    shouldForwardComponentProp: true,
    ref: handleRef,
    className: clsx(classes.root, className),
    additionalProps: {
      disabled: clickable && disabled ? true : undefined,
      tabIndex: skipFocusWhenDisabled && disabled ? -1 : tabIndex,
      ...moreProps
    },
    getSlotProps: handlers => ({
      ...handlers,
      onClick: event => {
        handlers.onClick?.(event);
        onClick?.(event);
      },
      onKeyDown: event => {
        handlers.onKeyDown?.(event);
        handleKeyDown(event);
      },
      onKeyUp: event => {
        handlers.onKeyUp?.(event);
        handleKeyUp(event);
      }
    })
  });
  const [LabelSlot, labelProps] = useSlot('label', {
    elementType: ChipLabel,
    externalForwardedProps,
    ownerState,
    className: classes.label
  });
  return /*#__PURE__*/jsxs(RootSlot, {
    as: component,
    ...rootProps,
    children: [avatar || icon, /*#__PURE__*/jsx(LabelSlot, {
      ...labelProps,
      children: label
    }), deleteIcon]
  });
});
process.env.NODE_ENV !== "production" ? Chip.propTypes /* remove-proptypes */ = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * The Avatar element to display.
   */
  avatar: PropTypes.element,
  /**
   * This prop isn't supported.
   * Use the `component` prop if you need to change the children structure.
   */
  children: unsupportedProp,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: PropTypes.object,
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * If `true`, the chip will appear clickable, and will raise when pressed,
   * even if the onClick prop is not defined.
   * If `false`, the chip will not appear clickable, even if onClick prop is defined.
   * This can be used, for example,
   * along with the component prop to indicate an anchor Chip is clickable.
   * Note: this controls the UI and does not affect the onClick event.
   */
  clickable: PropTypes.bool,
  /**
   * The color of the component.
   * It supports both default and custom theme colors, which can be added as shown in the
   * [palette customization guide](https://mui.com/material-ui/customization/palette/#custom-colors).
   * @default 'default'
   */
  color: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([PropTypes.oneOf(['default', 'primary', 'secondary', 'error', 'info', 'success', 'warning']), PropTypes.string]),
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: PropTypes.elementType,
  /**
   * Override the default delete icon element. Shown only if `onDelete` is set.
   */
  deleteIcon: PropTypes.element,
  /**
   * If `true`, the component is disabled.
   * @default false
   */
  disabled: PropTypes.bool,
  /**
   * Icon element.
   */
  icon: PropTypes.element,
  /**
   * The content of the component.
   */
  label: PropTypes.node,
  /**
   * @ignore
   */
  onClick: PropTypes.func,
  /**
   * Callback fired when the delete icon is clicked.
   * If set, the delete icon will be shown.
   */
  onDelete: PropTypes.func,
  /**
   * @ignore
   */
  onKeyDown: PropTypes.func,
  /**
   * @ignore
   */
  onKeyUp: PropTypes.func,
  /**
   * The size of the component.
   * @default 'medium'
   */
  size: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([PropTypes.oneOf(['medium', 'small']), PropTypes.string]),
  /**
   * If `true`, allows the disabled chip to escape focus.
   * If `false`, allows the disabled chip to receive focus.
   * @default false
   */
  skipFocusWhenDisabled: PropTypes.bool,
  /**
   * The props used for each slot inside.
   * @default {}
   */
  slotProps: PropTypes.shape({
    label: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    root: PropTypes.oneOfType([PropTypes.func, PropTypes.object])
  }),
  /**
   * The components used for each slot inside.
   * @default {}
   */
  slots: PropTypes.shape({
    label: PropTypes.elementType,
    root: PropTypes.elementType
  }),
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])), PropTypes.func, PropTypes.object]),
  /**
   * @ignore
   */
  tabIndex: PropTypes.number,
  /**
   * The variant to use.
   * @default 'filled'
   */
  variant: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([PropTypes.oneOf(['filled', 'outlined']), PropTypes.string])
} : void 0;

const Person = createSvgIcon(/*#__PURE__*/jsx("path", {
  d: "M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"
}), 'Person');

function getAvatarUtilityClass(slot) {
  return generateUtilityClass('MuiAvatar', slot);
}
generateUtilityClasses('MuiAvatar', ['root', 'colorDefault', 'circular', 'rounded', 'square', 'img', 'fallback']);

const useUtilityClasses$4 = ownerState => {
  const {
    classes,
    variant,
    colorDefault
  } = ownerState;
  const slots = {
    root: ['root', variant, colorDefault && 'colorDefault'],
    img: ['img'],
    fallback: ['fallback']
  };
  return composeClasses(slots, getAvatarUtilityClass, classes);
};
const AvatarRoot = styled('div', {
  name: 'MuiAvatar',
  slot: 'Root',
  overridesResolver: (props, styles) => {
    const {
      ownerState
    } = props;
    return [styles.root, styles[ownerState.variant], ownerState.colorDefault && styles.colorDefault];
  }
})(memoTheme(({
  theme
}) => ({
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexShrink: 0,
  width: 40,
  height: 40,
  fontFamily: theme.typography.fontFamily,
  fontSize: theme.typography.pxToRem(20),
  lineHeight: 1,
  borderRadius: '50%',
  overflow: 'hidden',
  userSelect: 'none',
  variants: [{
    props: {
      variant: 'rounded'
    },
    style: {
      borderRadius: (theme.vars || theme).shape.borderRadius
    }
  }, {
    props: {
      variant: 'square'
    },
    style: {
      borderRadius: 0
    }
  }, {
    props: {
      colorDefault: true
    },
    style: {
      color: (theme.vars || theme).palette.background.default,
      ...(theme.vars ? {
        backgroundColor: theme.vars.palette.Avatar.defaultBg
      } : {
        backgroundColor: theme.palette.grey[400],
        ...theme.applyStyles('dark', {
          backgroundColor: theme.palette.grey[600]
        })
      })
    }
  }]
})));
const AvatarImg = styled('img', {
  name: 'MuiAvatar',
  slot: 'Img'
})({
  width: '100%',
  height: '100%',
  textAlign: 'center',
  // Handle non-square image.
  objectFit: 'cover',
  // Hide alt text.
  color: 'transparent',
  // Hide the image broken icon, only works on Chrome.
  textIndent: 10000
});
const AvatarFallback = styled(Person, {
  name: 'MuiAvatar',
  slot: 'Fallback'
})({
  width: '75%',
  height: '75%'
});
function useLoaded({
  crossOrigin,
  referrerPolicy,
  src,
  srcSet
}) {
  const [loaded, setLoaded] = React.useState(false);
  React.useEffect(() => {
    if (!src && !srcSet) {
      return undefined;
    }
    setLoaded(false);
    let active = true;
    const image = new Image();
    image.onload = () => {
      if (!active) {
        return;
      }
      setLoaded('loaded');
    };
    image.onerror = () => {
      if (!active) {
        return;
      }
      setLoaded('error');
    };
    image.crossOrigin = crossOrigin;
    image.referrerPolicy = referrerPolicy;
    image.src = src;
    if (srcSet) {
      image.srcset = srcSet;
    }
    return () => {
      active = false;
    };
  }, [crossOrigin, referrerPolicy, src, srcSet]);
  return loaded;
}
const Avatar = /*#__PURE__*/React.forwardRef(function Avatar(inProps, ref) {
  const props = useDefaultProps({
    props: inProps,
    name: 'MuiAvatar'
  });
  const {
    alt,
    children: childrenProp,
    className,
    component = 'div',
    slots = {},
    slotProps = {},
    imgProps,
    sizes,
    src,
    srcSet,
    variant = 'circular',
    ...other
  } = props;
  let children = null;
  const ownerState = {
    ...props,
    component,
    variant
  };

  // Use a hook instead of onError on the img element to support server-side rendering.
  const loaded = useLoaded({
    ...imgProps,
    ...(typeof slotProps.img === 'function' ? slotProps.img(ownerState) : slotProps.img),
    src,
    srcSet
  });
  const hasImg = src || srcSet;
  const hasImgNotFailing = hasImg && loaded !== 'error';
  ownerState.colorDefault = !hasImgNotFailing;
  // This issue explains why this is required: https://github.com/mui/material-ui/issues/42184
  delete ownerState.ownerState;
  const classes = useUtilityClasses$4(ownerState);
  const [RootSlot, rootSlotProps] = useSlot('root', {
    ref,
    className: clsx(classes.root, className),
    elementType: AvatarRoot,
    externalForwardedProps: {
      slots,
      slotProps,
      component,
      ...other
    },
    ownerState
  });
  const [ImgSlot, imgSlotProps] = useSlot('img', {
    className: classes.img,
    elementType: AvatarImg,
    externalForwardedProps: {
      slots,
      slotProps: {
        img: {
          ...imgProps,
          ...slotProps.img
        }
      }
    },
    additionalProps: {
      alt,
      src,
      srcSet,
      sizes
    },
    ownerState
  });
  const [FallbackSlot, fallbackSlotProps] = useSlot('fallback', {
    className: classes.fallback,
    elementType: AvatarFallback,
    externalForwardedProps: {
      slots,
      slotProps
    },
    shouldForwardComponentProp: true,
    ownerState
  });
  if (hasImgNotFailing) {
    children = /*#__PURE__*/jsx(ImgSlot, {
      ...imgSlotProps
    });
    // We only render valid children, non valid children are rendered with a fallback
    // We consider that invalid children are all falsy values, except 0, which is valid.
  } else if (!!childrenProp || childrenProp === 0) {
    children = childrenProp;
  } else if (hasImg && alt) {
    children = alt[0];
  } else {
    children = /*#__PURE__*/jsx(FallbackSlot, {
      ...fallbackSlotProps
    });
  }
  return /*#__PURE__*/jsx(RootSlot, {
    ...rootSlotProps,
    children: children
  });
});
process.env.NODE_ENV !== "production" ? Avatar.propTypes /* remove-proptypes */ = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * Used in combination with `src` or `srcSet` to
   * provide an alt attribute for the rendered `img` element.
   */
  alt: PropTypes.string,
  /**
   * Used to render icon or text elements inside the Avatar if `src` is not set.
   * This can be an element, or just a string.
   */
  children: PropTypes.node,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: PropTypes.object,
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: PropTypes.elementType,
  /**
   * [Attributes](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/img#attributes) applied to the `img` element if the component is used to display an image.
   * It can be used to listen for the loading error event.
   * @deprecated Use `slotProps.img` instead. This prop will be removed in a future major release. See [Migrating from deprecated APIs](/material-ui/migration/migrating-from-deprecated-apis/) for more details.
   */
  imgProps: PropTypes.object,
  /**
   * The `sizes` attribute for the `img` element.
   */
  sizes: PropTypes.string,
  /**
   * The props used for each slot inside.
   * @default {}
   */
  slotProps: PropTypes.shape({
    fallback: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    img: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    root: PropTypes.oneOfType([PropTypes.func, PropTypes.object])
  }),
  /**
   * The components used for each slot inside.
   * @default {}
   */
  slots: PropTypes.shape({
    fallback: PropTypes.elementType,
    img: PropTypes.elementType,
    root: PropTypes.elementType
  }),
  /**
   * The `src` attribute for the `img` element.
   */
  src: PropTypes.string,
  /**
   * The `srcSet` attribute for the `img` element.
   * Use this attribute for responsive image display.
   */
  srcSet: PropTypes.string,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])), PropTypes.func, PropTypes.object]),
  /**
   * The shape of the avatar.
   * @default 'circular'
   */
  variant: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([PropTypes.oneOf(['circular', 'rounded', 'square']), PropTypes.string])
} : void 0;

const boxClasses = generateUtilityClasses('MuiBox', ['root']);

const defaultTheme = createTheme();
const Box = createBox({
  themeId: THEME_ID,
  defaultTheme,
  defaultClassName: boxClasses.root,
  generateClassName: ClassNameGenerator.generate
});
process.env.NODE_ENV !== "production" ? Box.propTypes /* remove-proptypes */ = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * @ignore
   */
  children: PropTypes.node,
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: PropTypes.elementType,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])), PropTypes.func, PropTypes.object])
} : void 0;

function getButtonUtilityClass(slot) {
  return generateUtilityClass('MuiButton', slot);
}
const buttonClasses = generateUtilityClasses('MuiButton', ['root', 'text', 'textInherit', 'textPrimary', 'textSecondary', 'textSuccess', 'textError', 'textInfo', 'textWarning', 'outlined', 'outlinedInherit', 'outlinedPrimary', 'outlinedSecondary', 'outlinedSuccess', 'outlinedError', 'outlinedInfo', 'outlinedWarning', 'contained', 'containedInherit', 'containedPrimary', 'containedSecondary', 'containedSuccess', 'containedError', 'containedInfo', 'containedWarning', 'disableElevation', 'focusVisible', 'disabled', 'colorInherit', 'colorPrimary', 'colorSecondary', 'colorSuccess', 'colorError', 'colorInfo', 'colorWarning', 'textSizeSmall', 'textSizeMedium', 'textSizeLarge', 'outlinedSizeSmall', 'outlinedSizeMedium', 'outlinedSizeLarge', 'containedSizeSmall', 'containedSizeMedium', 'containedSizeLarge', 'sizeMedium', 'sizeSmall', 'sizeLarge', 'fullWidth', 'startIcon', 'endIcon', 'icon', 'iconSizeSmall', 'iconSizeMedium', 'iconSizeLarge', 'loading', 'loadingWrapper', 'loadingIconPlaceholder', 'loadingIndicator', 'loadingPositionCenter', 'loadingPositionStart', 'loadingPositionEnd']);

/**
 * @ignore - internal component.
 */
const ButtonGroupContext = /*#__PURE__*/React.createContext({});
if (process.env.NODE_ENV !== 'production') {
  ButtonGroupContext.displayName = 'ButtonGroupContext';
}

/**
 * @ignore - internal component.
 */
const ButtonGroupButtonContext = /*#__PURE__*/React.createContext(undefined);
if (process.env.NODE_ENV !== 'production') {
  ButtonGroupButtonContext.displayName = 'ButtonGroupButtonContext';
}

const useUtilityClasses$3 = ownerState => {
  const {
    color,
    disableElevation,
    fullWidth,
    size,
    variant,
    loading,
    loadingPosition,
    classes
  } = ownerState;
  const slots = {
    root: ['root', loading && 'loading', variant, `${variant}${capitalize(color)}`, `size${capitalize(size)}`, `${variant}Size${capitalize(size)}`, `color${capitalize(color)}`, disableElevation && 'disableElevation', fullWidth && 'fullWidth', loading && `loadingPosition${capitalize(loadingPosition)}`],
    startIcon: ['icon', 'startIcon', `iconSize${capitalize(size)}`],
    endIcon: ['icon', 'endIcon', `iconSize${capitalize(size)}`],
    loadingIndicator: ['loadingIndicator'],
    loadingWrapper: ['loadingWrapper']
  };
  const composedClasses = composeClasses(slots, getButtonUtilityClass, classes);
  return {
    ...classes,
    // forward the focused, disabled, etc. classes to the ButtonBase
    ...composedClasses
  };
};
const commonIconStyles = [{
  props: {
    size: 'small'
  },
  style: {
    '& > *:nth-of-type(1)': {
      fontSize: 18
    }
  }
}, {
  props: {
    size: 'medium'
  },
  style: {
    '& > *:nth-of-type(1)': {
      fontSize: 20
    }
  }
}, {
  props: {
    size: 'large'
  },
  style: {
    '& > *:nth-of-type(1)': {
      fontSize: 22
    }
  }
}];
const ButtonRoot = styled(ButtonBase, {
  shouldForwardProp: prop => rootShouldForwardProp(prop) || prop === 'classes',
  name: 'MuiButton',
  slot: 'Root',
  overridesResolver: (props, styles) => {
    const {
      ownerState
    } = props;
    return [styles.root, styles[ownerState.variant], styles[`${ownerState.variant}${capitalize(ownerState.color)}`], styles[`size${capitalize(ownerState.size)}`], styles[`${ownerState.variant}Size${capitalize(ownerState.size)}`], ownerState.color === 'inherit' && styles.colorInherit, ownerState.disableElevation && styles.disableElevation, ownerState.fullWidth && styles.fullWidth, ownerState.loading && styles.loading];
  }
})(memoTheme(({
  theme
}) => {
  const inheritContainedBackgroundColor = theme.palette.mode === 'light' ? theme.palette.grey[300] : theme.palette.grey[800];
  const inheritContainedHoverBackgroundColor = theme.palette.mode === 'light' ? theme.palette.grey.A100 : theme.palette.grey[700];
  return {
    ...theme.typography.button,
    minWidth: 64,
    padding: '6px 16px',
    border: 0,
    borderRadius: (theme.vars || theme).shape.borderRadius,
    transition: theme.transitions.create(['background-color', 'box-shadow', 'border-color', 'color'], {
      duration: theme.transitions.duration.short
    }),
    '&:hover': {
      textDecoration: 'none'
    },
    [`&.${buttonClasses.disabled}`]: {
      color: (theme.vars || theme).palette.action.disabled
    },
    variants: [{
      props: {
        variant: 'contained'
      },
      style: {
        color: `var(--variant-containedColor)`,
        backgroundColor: `var(--variant-containedBg)`,
        boxShadow: (theme.vars || theme).shadows[2],
        '&:hover': {
          boxShadow: (theme.vars || theme).shadows[4],
          // Reset on touch devices, it doesn't add specificity
          '@media (hover: none)': {
            boxShadow: (theme.vars || theme).shadows[2]
          }
        },
        '&:active': {
          boxShadow: (theme.vars || theme).shadows[8]
        },
        [`&.${buttonClasses.focusVisible}`]: {
          boxShadow: (theme.vars || theme).shadows[6]
        },
        [`&.${buttonClasses.disabled}`]: {
          color: (theme.vars || theme).palette.action.disabled,
          boxShadow: (theme.vars || theme).shadows[0],
          backgroundColor: (theme.vars || theme).palette.action.disabledBackground
        }
      }
    }, {
      props: {
        variant: 'outlined'
      },
      style: {
        padding: '5px 15px',
        border: '1px solid currentColor',
        borderColor: `var(--variant-outlinedBorder, currentColor)`,
        backgroundColor: `var(--variant-outlinedBg)`,
        color: `var(--variant-outlinedColor)`,
        [`&.${buttonClasses.disabled}`]: {
          border: `1px solid ${(theme.vars || theme).palette.action.disabledBackground}`
        }
      }
    }, {
      props: {
        variant: 'text'
      },
      style: {
        padding: '6px 8px',
        color: `var(--variant-textColor)`,
        backgroundColor: `var(--variant-textBg)`
      }
    }, ...Object.entries(theme.palette).filter(createSimplePaletteValueFilter()).map(([color]) => ({
      props: {
        color
      },
      style: {
        '--variant-textColor': (theme.vars || theme).palette[color].main,
        '--variant-outlinedColor': (theme.vars || theme).palette[color].main,
        '--variant-outlinedBorder': theme.alpha((theme.vars || theme).palette[color].main, 0.5),
        '--variant-containedColor': (theme.vars || theme).palette[color].contrastText,
        '--variant-containedBg': (theme.vars || theme).palette[color].main,
        '@media (hover: hover)': {
          '&:hover': {
            '--variant-containedBg': (theme.vars || theme).palette[color].dark,
            '--variant-textBg': theme.alpha((theme.vars || theme).palette[color].main, (theme.vars || theme).palette.action.hoverOpacity),
            '--variant-outlinedBorder': (theme.vars || theme).palette[color].main,
            '--variant-outlinedBg': theme.alpha((theme.vars || theme).palette[color].main, (theme.vars || theme).palette.action.hoverOpacity)
          }
        }
      }
    })), {
      props: {
        color: 'inherit'
      },
      style: {
        color: 'inherit',
        borderColor: 'currentColor',
        '--variant-containedBg': theme.vars ? theme.vars.palette.Button.inheritContainedBg : inheritContainedBackgroundColor,
        '@media (hover: hover)': {
          '&:hover': {
            '--variant-containedBg': theme.vars ? theme.vars.palette.Button.inheritContainedHoverBg : inheritContainedHoverBackgroundColor,
            '--variant-textBg': theme.alpha((theme.vars || theme).palette.text.primary, (theme.vars || theme).palette.action.hoverOpacity),
            '--variant-outlinedBg': theme.alpha((theme.vars || theme).palette.text.primary, (theme.vars || theme).palette.action.hoverOpacity)
          }
        }
      }
    }, {
      props: {
        size: 'small',
        variant: 'text'
      },
      style: {
        padding: '4px 5px',
        fontSize: theme.typography.pxToRem(13)
      }
    }, {
      props: {
        size: 'large',
        variant: 'text'
      },
      style: {
        padding: '8px 11px',
        fontSize: theme.typography.pxToRem(15)
      }
    }, {
      props: {
        size: 'small',
        variant: 'outlined'
      },
      style: {
        padding: '3px 9px',
        fontSize: theme.typography.pxToRem(13)
      }
    }, {
      props: {
        size: 'large',
        variant: 'outlined'
      },
      style: {
        padding: '7px 21px',
        fontSize: theme.typography.pxToRem(15)
      }
    }, {
      props: {
        size: 'small',
        variant: 'contained'
      },
      style: {
        padding: '4px 10px',
        fontSize: theme.typography.pxToRem(13)
      }
    }, {
      props: {
        size: 'large',
        variant: 'contained'
      },
      style: {
        padding: '8px 22px',
        fontSize: theme.typography.pxToRem(15)
      }
    }, {
      props: {
        disableElevation: true
      },
      style: {
        boxShadow: 'none',
        '&:hover': {
          boxShadow: 'none'
        },
        [`&.${buttonClasses.focusVisible}`]: {
          boxShadow: 'none'
        },
        '&:active': {
          boxShadow: 'none'
        },
        [`&.${buttonClasses.disabled}`]: {
          boxShadow: 'none'
        }
      }
    }, {
      props: {
        fullWidth: true
      },
      style: {
        width: '100%'
      }
    }, {
      props: {
        loadingPosition: 'center'
      },
      style: {
        transition: theme.transitions.create(['background-color', 'box-shadow', 'border-color'], {
          duration: theme.transitions.duration.short
        }),
        [`&.${buttonClasses.loading}`]: {
          color: 'transparent'
        }
      }
    }]
  };
}));
const ButtonStartIcon = styled('span', {
  name: 'MuiButton',
  slot: 'StartIcon',
  overridesResolver: (props, styles) => {
    const {
      ownerState
    } = props;
    return [styles.startIcon, ownerState.loading && styles.startIconLoadingStart, styles[`iconSize${capitalize(ownerState.size)}`]];
  }
})(({
  theme
}) => ({
  display: 'inherit',
  marginRight: 8,
  marginLeft: -4,
  variants: [{
    props: {
      size: 'small'
    },
    style: {
      marginLeft: -2
    }
  }, {
    props: {
      loadingPosition: 'start',
      loading: true
    },
    style: {
      transition: theme.transitions.create(['opacity'], {
        duration: theme.transitions.duration.short
      }),
      opacity: 0
    }
  }, {
    props: {
      loadingPosition: 'start',
      loading: true,
      fullWidth: true
    },
    style: {
      marginRight: -8
    }
  }, ...commonIconStyles]
}));
const ButtonEndIcon = styled('span', {
  name: 'MuiButton',
  slot: 'EndIcon',
  overridesResolver: (props, styles) => {
    const {
      ownerState
    } = props;
    return [styles.endIcon, ownerState.loading && styles.endIconLoadingEnd, styles[`iconSize${capitalize(ownerState.size)}`]];
  }
})(({
  theme
}) => ({
  display: 'inherit',
  marginRight: -4,
  marginLeft: 8,
  variants: [{
    props: {
      size: 'small'
    },
    style: {
      marginRight: -2
    }
  }, {
    props: {
      loadingPosition: 'end',
      loading: true
    },
    style: {
      transition: theme.transitions.create(['opacity'], {
        duration: theme.transitions.duration.short
      }),
      opacity: 0
    }
  }, {
    props: {
      loadingPosition: 'end',
      loading: true,
      fullWidth: true
    },
    style: {
      marginLeft: -8
    }
  }, ...commonIconStyles]
}));
const ButtonLoadingIndicator = styled('span', {
  name: 'MuiButton',
  slot: 'LoadingIndicator'
})(({
  theme
}) => ({
  display: 'none',
  position: 'absolute',
  visibility: 'visible',
  variants: [{
    props: {
      loading: true
    },
    style: {
      display: 'flex'
    }
  }, {
    props: {
      loadingPosition: 'start'
    },
    style: {
      left: 14
    }
  }, {
    props: {
      loadingPosition: 'start',
      size: 'small'
    },
    style: {
      left: 10
    }
  }, {
    props: {
      variant: 'text',
      loadingPosition: 'start'
    },
    style: {
      left: 6
    }
  }, {
    props: {
      loadingPosition: 'center'
    },
    style: {
      left: '50%',
      transform: 'translate(-50%)',
      color: (theme.vars || theme).palette.action.disabled
    }
  }, {
    props: {
      loadingPosition: 'end'
    },
    style: {
      right: 14
    }
  }, {
    props: {
      loadingPosition: 'end',
      size: 'small'
    },
    style: {
      right: 10
    }
  }, {
    props: {
      variant: 'text',
      loadingPosition: 'end'
    },
    style: {
      right: 6
    }
  }, {
    props: {
      loadingPosition: 'start',
      fullWidth: true
    },
    style: {
      position: 'relative',
      left: -10
    }
  }, {
    props: {
      loadingPosition: 'end',
      fullWidth: true
    },
    style: {
      position: 'relative',
      right: -10
    }
  }]
}));
const ButtonLoadingIconPlaceholder = styled('span', {
  name: 'MuiButton',
  slot: 'LoadingIconPlaceholder'
})({
  display: 'inline-block',
  width: '1em',
  height: '1em'
});
const Button = /*#__PURE__*/React.forwardRef(function Button(inProps, ref) {
  // props priority: `inProps` > `contextProps` > `themeDefaultProps`
  const contextProps = React.useContext(ButtonGroupContext);
  const buttonGroupButtonContextPositionClassName = React.useContext(ButtonGroupButtonContext);
  const resolvedProps = resolveProps(contextProps, inProps);
  const props = useDefaultProps({
    props: resolvedProps,
    name: 'MuiButton'
  });
  const {
    children,
    color = 'primary',
    component = 'button',
    className,
    disabled = false,
    disableElevation = false,
    disableFocusRipple = false,
    endIcon: endIconProp,
    focusVisibleClassName,
    fullWidth = false,
    id: idProp,
    loading = null,
    loadingIndicator: loadingIndicatorProp,
    loadingPosition = 'center',
    size = 'medium',
    startIcon: startIconProp,
    type,
    variant = 'text',
    ...other
  } = props;
  const loadingId = useId(idProp);
  const loadingIndicator = loadingIndicatorProp ?? /*#__PURE__*/jsx(CircularProgress, {
    "aria-labelledby": loadingId,
    color: "inherit",
    size: 16
  });
  const ownerState = {
    ...props,
    color,
    component,
    disabled,
    disableElevation,
    disableFocusRipple,
    fullWidth,
    loading,
    loadingIndicator,
    loadingPosition,
    size,
    type,
    variant
  };
  const classes = useUtilityClasses$3(ownerState);
  const startIcon = (startIconProp || loading && loadingPosition === 'start') && /*#__PURE__*/jsx(ButtonStartIcon, {
    className: classes.startIcon,
    ownerState: ownerState,
    children: startIconProp || /*#__PURE__*/jsx(ButtonLoadingIconPlaceholder, {
      className: classes.loadingIconPlaceholder,
      ownerState: ownerState
    })
  });
  const endIcon = (endIconProp || loading && loadingPosition === 'end') && /*#__PURE__*/jsx(ButtonEndIcon, {
    className: classes.endIcon,
    ownerState: ownerState,
    children: endIconProp || /*#__PURE__*/jsx(ButtonLoadingIconPlaceholder, {
      className: classes.loadingIconPlaceholder,
      ownerState: ownerState
    })
  });
  const positionClassName = buttonGroupButtonContextPositionClassName || '';
  const loader = typeof loading === 'boolean' ?
  /*#__PURE__*/
  // use plain HTML span to minimize the runtime overhead
  jsx("span", {
    className: classes.loadingWrapper,
    style: {
      display: 'contents'
    },
    children: loading && /*#__PURE__*/jsx(ButtonLoadingIndicator, {
      className: classes.loadingIndicator,
      ownerState: ownerState,
      children: loadingIndicator
    })
  }) : null;
  return /*#__PURE__*/jsxs(ButtonRoot, {
    ownerState: ownerState,
    className: clsx(contextProps.className, classes.root, className, positionClassName),
    component: component,
    disabled: disabled || loading,
    focusRipple: !disableFocusRipple,
    focusVisibleClassName: clsx(classes.focusVisible, focusVisibleClassName),
    ref: ref,
    type: type,
    id: loading ? loadingId : idProp,
    ...other,
    classes: classes,
    children: [startIcon, loadingPosition !== 'end' && loader, children, loadingPosition === 'end' && loader, endIcon]
  });
});
process.env.NODE_ENV !== "production" ? Button.propTypes /* remove-proptypes */ = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * The content of the component.
   */
  children: PropTypes.node,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: PropTypes.object,
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * The color of the component.
   * It supports both default and custom theme colors, which can be added as shown in the
   * [palette customization guide](https://mui.com/material-ui/customization/palette/#custom-colors).
   * @default 'primary'
   */
  color: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([PropTypes.oneOf(['inherit', 'primary', 'secondary', 'success', 'error', 'info', 'warning']), PropTypes.string]),
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: PropTypes.elementType,
  /**
   * If `true`, the component is disabled.
   * @default false
   */
  disabled: PropTypes.bool,
  /**
   * If `true`, no elevation is used.
   * @default false
   */
  disableElevation: PropTypes.bool,
  /**
   * If `true`, the  keyboard focus ripple is disabled.
   * @default false
   */
  disableFocusRipple: PropTypes.bool,
  /**
   * If `true`, the ripple effect is disabled.
   *
   * ⚠️ Without a ripple there is no styling for :focus-visible by default. Be sure
   * to highlight the element by applying separate styles with the `.Mui-focusVisible` class.
   * @default false
   */
  disableRipple: PropTypes.bool,
  /**
   * Element placed after the children.
   */
  endIcon: PropTypes.node,
  /**
   * @ignore
   */
  focusVisibleClassName: PropTypes.string,
  /**
   * If `true`, the button will take up the full width of its container.
   * @default false
   */
  fullWidth: PropTypes.bool,
  /**
   * The URL to link to when the button is clicked.
   * If defined, an `a` element will be used as the root node.
   */
  href: PropTypes.string,
  /**
   * @ignore
   */
  id: PropTypes.string,
  /**
   * If `true`, the loading indicator is visible and the button is disabled.
   * If `true | false`, the loading wrapper is always rendered before the children to prevent [Google Translation Crash](https://github.com/mui/material-ui/issues/27853).
   * @default null
   */
  loading: PropTypes.bool,
  /**
   * Element placed before the children if the button is in loading state.
   * The node should contain an element with `role="progressbar"` with an accessible name.
   * By default, it renders a `CircularProgress` that is labeled by the button itself.
   * @default <CircularProgress color="inherit" size={16} />
   */
  loadingIndicator: PropTypes.node,
  /**
   * The loading indicator can be positioned on the start, end, or the center of the button.
   * @default 'center'
   */
  loadingPosition: PropTypes.oneOf(['center', 'end', 'start']),
  /**
   * The size of the component.
   * `small` is equivalent to the dense button styling.
   * @default 'medium'
   */
  size: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([PropTypes.oneOf(['small', 'medium', 'large']), PropTypes.string]),
  /**
   * Element placed before the children.
   */
  startIcon: PropTypes.node,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])), PropTypes.func, PropTypes.object]),
  /**
   * @ignore
   */
  type: PropTypes.oneOfType([PropTypes.oneOf(['button', 'reset', 'submit']), PropTypes.string]),
  /**
   * The variant to use.
   * @default 'text'
   */
  variant: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([PropTypes.oneOf(['contained', 'outlined', 'text']), PropTypes.string])
} : void 0;

const isDynamicSupport = typeof globalCss({}) === 'function';
const html = (theme, enableColorScheme) => ({
  WebkitFontSmoothing: 'antialiased',
  // Antialiasing.
  MozOsxFontSmoothing: 'grayscale',
  // Antialiasing.
  // Change from `box-sizing: content-box` so that `width`
  // is not affected by `padding` or `border`.
  boxSizing: 'border-box',
  // Fix font resize problem in iOS
  WebkitTextSizeAdjust: '100%',
  // When used under CssVarsProvider, colorScheme should not be applied dynamically because it will generate the stylesheet twice for server-rendered applications.
  ...(enableColorScheme && !theme.vars && {
    colorScheme: theme.palette.mode
  })
});
const body = theme => ({
  color: (theme.vars || theme).palette.text.primary,
  ...theme.typography.body1,
  backgroundColor: (theme.vars || theme).palette.background.default,
  '@media print': {
    // Save printer ink.
    backgroundColor: (theme.vars || theme).palette.common.white
  }
});
const styles = (theme, enableColorScheme = false) => {
  const colorSchemeStyles = {};
  if (enableColorScheme && theme.colorSchemes && typeof theme.getColorSchemeSelector === 'function') {
    Object.entries(theme.colorSchemes).forEach(([key, scheme]) => {
      const selector = theme.getColorSchemeSelector(key);
      if (selector.startsWith('@')) {
        // for @media (prefers-color-scheme), we need to target :root
        colorSchemeStyles[selector] = {
          ':root': {
            colorScheme: scheme.palette?.mode
          }
        };
      } else {
        // else, it's likely that the selector already target an element with a class or data attribute
        colorSchemeStyles[selector.replace(/\s*&/, '')] = {
          colorScheme: scheme.palette?.mode
        };
      }
    });
  }
  let defaultStyles = {
    html: html(theme, enableColorScheme),
    '*, *::before, *::after': {
      boxSizing: 'inherit'
    },
    'strong, b': {
      fontWeight: theme.typography.fontWeightBold
    },
    body: {
      margin: 0,
      // Remove the margin in all browsers.
      ...body(theme),
      // Add support for document.body.requestFullScreen().
      // Other elements, if background transparent, are not supported.
      '&::backdrop': {
        backgroundColor: (theme.vars || theme).palette.background.default
      }
    },
    ...colorSchemeStyles
  };
  const themeOverrides = theme.components?.MuiCssBaseline?.styleOverrides;
  if (themeOverrides) {
    defaultStyles = [defaultStyles, themeOverrides];
  }
  return defaultStyles;
};

// `ecs` stands for enableColorScheme. This is internal logic to make it work with Pigment CSS, so shorter is better.
const SELECTOR = 'mui-ecs';
const staticStyles = theme => {
  const result = styles(theme, false);
  const baseStyles = Array.isArray(result) ? result[0] : result;
  if (!theme.vars && baseStyles) {
    baseStyles.html[`:root:has(${SELECTOR})`] = {
      colorScheme: theme.palette.mode
    };
  }
  if (theme.colorSchemes) {
    Object.entries(theme.colorSchemes).forEach(([key, scheme]) => {
      const selector = theme.getColorSchemeSelector(key);
      if (selector.startsWith('@')) {
        // for @media (prefers-color-scheme), we need to target :root
        baseStyles[selector] = {
          [`:root:not(:has(.${SELECTOR}))`]: {
            colorScheme: scheme.palette?.mode
          }
        };
      } else {
        // else, it's likely that the selector already target an element with a class or data attribute
        baseStyles[selector.replace(/\s*&/, '')] = {
          [`&:not(:has(.${SELECTOR}))`]: {
            colorScheme: scheme.palette?.mode
          }
        };
      }
    });
  }
  return result;
};
const GlobalStyles = globalCss(isDynamicSupport ? ({
  theme,
  enableColorScheme
}) => styles(theme, enableColorScheme) : ({
  theme
}) => staticStyles(theme));

/**
 * Kickstart an elegant, consistent, and simple baseline to build upon.
 */
function CssBaseline(inProps) {
  const props = useDefaultProps({
    props: inProps,
    name: 'MuiCssBaseline'
  });
  const {
    children,
    enableColorScheme = false
  } = props;
  return /*#__PURE__*/jsxs(React.Fragment, {
    children: [isDynamicSupport && /*#__PURE__*/jsx(GlobalStyles, {
      enableColorScheme: enableColorScheme
    }), !isDynamicSupport && !enableColorScheme && /*#__PURE__*/jsx("span", {
      className: SELECTOR,
      style: {
        display: 'none'
      }
    }), children]
  });
}
process.env.NODE_ENV !== "production" ? CssBaseline.propTypes /* remove-proptypes */ = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * You can wrap a node.
   */
  children: PropTypes.node,
  /**
   * Enable `color-scheme` CSS property to use `theme.palette.mode`.
   * For more details, check out https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/color-scheme
   * For browser support, check out https://caniuse.com/?search=color-scheme
   * @default false
   */
  enableColorScheme: PropTypes.bool
} : void 0;

function getDividerUtilityClass(slot) {
  return generateUtilityClass('MuiDivider', slot);
}
generateUtilityClasses('MuiDivider', ['root', 'absolute', 'fullWidth', 'inset', 'middle', 'flexItem', 'light', 'vertical', 'withChildren', 'withChildrenVertical', 'textAlignRight', 'textAlignLeft', 'wrapper', 'wrapperVertical']);

const useUtilityClasses$2 = ownerState => {
  const {
    absolute,
    children,
    classes,
    flexItem,
    light,
    orientation,
    textAlign,
    variant
  } = ownerState;
  const slots = {
    root: ['root', absolute && 'absolute', variant, light && 'light', orientation === 'vertical' && 'vertical', flexItem && 'flexItem', children && 'withChildren', children && orientation === 'vertical' && 'withChildrenVertical', textAlign === 'right' && orientation !== 'vertical' && 'textAlignRight', textAlign === 'left' && orientation !== 'vertical' && 'textAlignLeft'],
    wrapper: ['wrapper', orientation === 'vertical' && 'wrapperVertical']
  };
  return composeClasses(slots, getDividerUtilityClass, classes);
};
const DividerRoot = styled('div', {
  name: 'MuiDivider',
  slot: 'Root',
  overridesResolver: (props, styles) => {
    const {
      ownerState
    } = props;
    return [styles.root, ownerState.absolute && styles.absolute, styles[ownerState.variant], ownerState.light && styles.light, ownerState.orientation === 'vertical' && styles.vertical, ownerState.flexItem && styles.flexItem, ownerState.children && styles.withChildren, ownerState.children && ownerState.orientation === 'vertical' && styles.withChildrenVertical, ownerState.textAlign === 'right' && ownerState.orientation !== 'vertical' && styles.textAlignRight, ownerState.textAlign === 'left' && ownerState.orientation !== 'vertical' && styles.textAlignLeft];
  }
})(memoTheme(({
  theme
}) => ({
  margin: 0,
  // Reset browser default style.
  flexShrink: 0,
  borderWidth: 0,
  borderStyle: 'solid',
  borderColor: (theme.vars || theme).palette.divider,
  borderBottomWidth: 'thin',
  variants: [{
    props: {
      absolute: true
    },
    style: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      width: '100%'
    }
  }, {
    props: {
      light: true
    },
    style: {
      borderColor: theme.alpha((theme.vars || theme).palette.divider, 0.08)
    }
  }, {
    props: {
      variant: 'inset'
    },
    style: {
      marginLeft: 72
    }
  }, {
    props: {
      variant: 'middle',
      orientation: 'horizontal'
    },
    style: {
      marginLeft: theme.spacing(2),
      marginRight: theme.spacing(2)
    }
  }, {
    props: {
      variant: 'middle',
      orientation: 'vertical'
    },
    style: {
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1)
    }
  }, {
    props: {
      orientation: 'vertical'
    },
    style: {
      height: '100%',
      borderBottomWidth: 0,
      borderRightWidth: 'thin'
    }
  }, {
    props: {
      flexItem: true
    },
    style: {
      alignSelf: 'stretch',
      height: 'auto'
    }
  }, {
    props: ({
      ownerState
    }) => !!ownerState.children,
    style: {
      display: 'flex',
      textAlign: 'center',
      border: 0,
      borderTopStyle: 'solid',
      borderLeftStyle: 'solid',
      '&::before, &::after': {
        content: '""',
        alignSelf: 'center'
      }
    }
  }, {
    props: ({
      ownerState
    }) => ownerState.children && ownerState.orientation !== 'vertical',
    style: {
      '&::before, &::after': {
        width: '100%',
        borderTop: `thin solid ${(theme.vars || theme).palette.divider}`,
        borderTopStyle: 'inherit'
      }
    }
  }, {
    props: ({
      ownerState
    }) => ownerState.orientation === 'vertical' && ownerState.children,
    style: {
      flexDirection: 'column',
      '&::before, &::after': {
        height: '100%',
        borderLeft: `thin solid ${(theme.vars || theme).palette.divider}`,
        borderLeftStyle: 'inherit'
      }
    }
  }, {
    props: ({
      ownerState
    }) => ownerState.textAlign === 'right' && ownerState.orientation !== 'vertical',
    style: {
      '&::before': {
        width: '90%'
      },
      '&::after': {
        width: '10%'
      }
    }
  }, {
    props: ({
      ownerState
    }) => ownerState.textAlign === 'left' && ownerState.orientation !== 'vertical',
    style: {
      '&::before': {
        width: '10%'
      },
      '&::after': {
        width: '90%'
      }
    }
  }]
})));
const DividerWrapper = styled('span', {
  name: 'MuiDivider',
  slot: 'Wrapper',
  overridesResolver: (props, styles) => {
    const {
      ownerState
    } = props;
    return [styles.wrapper, ownerState.orientation === 'vertical' && styles.wrapperVertical];
  }
})(memoTheme(({
  theme
}) => ({
  display: 'inline-block',
  paddingLeft: `calc(${theme.spacing(1)} * 1.2)`,
  paddingRight: `calc(${theme.spacing(1)} * 1.2)`,
  whiteSpace: 'nowrap',
  variants: [{
    props: {
      orientation: 'vertical'
    },
    style: {
      paddingTop: `calc(${theme.spacing(1)} * 1.2)`,
      paddingBottom: `calc(${theme.spacing(1)} * 1.2)`
    }
  }]
})));
const Divider = /*#__PURE__*/React.forwardRef(function Divider(inProps, ref) {
  const props = useDefaultProps({
    props: inProps,
    name: 'MuiDivider'
  });
  const {
    absolute = false,
    children,
    className,
    orientation = 'horizontal',
    component = children || orientation === 'vertical' ? 'div' : 'hr',
    flexItem = false,
    light = false,
    role = component !== 'hr' ? 'separator' : undefined,
    textAlign = 'center',
    variant = 'fullWidth',
    ...other
  } = props;
  const ownerState = {
    ...props,
    absolute,
    component,
    flexItem,
    light,
    orientation,
    role,
    textAlign,
    variant
  };
  const classes = useUtilityClasses$2(ownerState);
  return /*#__PURE__*/jsx(DividerRoot, {
    as: component,
    className: clsx(classes.root, className),
    role: role,
    ref: ref,
    ownerState: ownerState,
    "aria-orientation": role === 'separator' && (component !== 'hr' || orientation === 'vertical') ? orientation : undefined,
    ...other,
    children: children ? /*#__PURE__*/jsx(DividerWrapper, {
      className: classes.wrapper,
      ownerState: ownerState,
      children: children
    }) : null
  });
});

/**
 * The following flag is used to ensure that this component isn't tabbable i.e.
 * does not get highlight/focus inside of MUI List.
 */
if (Divider) {
  Divider.muiSkipListHighlight = true;
}
process.env.NODE_ENV !== "production" ? Divider.propTypes /* remove-proptypes */ = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * Absolutely position the element.
   * @default false
   */
  absolute: PropTypes.bool,
  /**
   * The content of the component.
   */
  children: PropTypes.node,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: PropTypes.object,
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: PropTypes.elementType,
  /**
   * If `true`, a vertical divider will have the correct height when used in flex container.
   * (By default, a vertical divider will have a calculated height of `0px` if it is the child of a flex container.)
   * @default false
   */
  flexItem: PropTypes.bool,
  /**
   * If `true`, the divider will have a lighter color.
   * @default false
   * @deprecated Use <Divider sx={{ opacity: 0.6 }} /> (or any opacity or color) instead. See [Migrating from deprecated APIs](https://mui.com/material-ui/migration/migrating-from-deprecated-apis/) for more details.
   */
  light: PropTypes.bool,
  /**
   * The component orientation.
   * @default 'horizontal'
   */
  orientation: PropTypes.oneOf(['horizontal', 'vertical']),
  /**
   * @ignore
   */
  role: PropTypes.string,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])), PropTypes.func, PropTypes.object]),
  /**
   * The text alignment.
   * @default 'center'
   */
  textAlign: PropTypes.oneOf(['center', 'left', 'right']),
  /**
   * The variant to use.
   * @default 'fullWidth'
   */
  variant: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([PropTypes.oneOf(['fullWidth', 'inset', 'middle']), PropTypes.string])
} : void 0;

function getLinkUtilityClass(slot) {
  return generateUtilityClass('MuiLink', slot);
}
const linkClasses = generateUtilityClasses('MuiLink', ['root', 'underlineNone', 'underlineHover', 'underlineAlways', 'button', 'focusVisible']);

const getTextDecoration = ({
  theme,
  ownerState
}) => {
  const transformedColor = ownerState.color;
  if ('colorSpace' in theme && theme.colorSpace) {
    const color = getPath(theme, `palette.${transformedColor}.main`) || getPath(theme, `palette.${transformedColor}`) || ownerState.color;
    return theme.alpha(color, 0.4);
  }

  // check the `main` color first for a custom palette, then fallback to the color itself
  const color = getPath(theme, `palette.${transformedColor}.main`, false) || getPath(theme, `palette.${transformedColor}`, false) || ownerState.color;
  const channelColor = getPath(theme, `palette.${transformedColor}.mainChannel`) || getPath(theme, `palette.${transformedColor}Channel`);
  if ('vars' in theme && channelColor) {
    return `rgba(${channelColor} / 0.4)`;
  }
  return alpha(color, 0.4);
};

const v6Colors = {
  primary: true,
  secondary: true,
  error: true,
  info: true,
  success: true,
  warning: true,
  textPrimary: true,
  textSecondary: true,
  textDisabled: true
};
const useUtilityClasses$1 = ownerState => {
  const {
    classes,
    component,
    focusVisible,
    underline
  } = ownerState;
  const slots = {
    root: ['root', `underline${capitalize(underline)}`, component === 'button' && 'button', focusVisible && 'focusVisible']
  };
  return composeClasses(slots, getLinkUtilityClass, classes);
};
const LinkRoot = styled(Typography, {
  name: 'MuiLink',
  slot: 'Root',
  overridesResolver: (props, styles) => {
    const {
      ownerState
    } = props;
    return [styles.root, styles[`underline${capitalize(ownerState.underline)}`], ownerState.component === 'button' && styles.button];
  }
})(memoTheme(({
  theme
}) => {
  return {
    variants: [{
      props: {
        underline: 'none'
      },
      style: {
        textDecoration: 'none'
      }
    }, {
      props: {
        underline: 'hover'
      },
      style: {
        textDecoration: 'none',
        '&:hover': {
          textDecoration: 'underline'
        }
      }
    }, {
      props: {
        underline: 'always'
      },
      style: {
        textDecoration: 'underline',
        '&:hover': {
          textDecorationColor: 'inherit'
        }
      }
    }, {
      props: ({
        underline,
        ownerState
      }) => underline === 'always' && ownerState.color !== 'inherit',
      style: {
        textDecorationColor: 'var(--Link-underlineColor)'
      }
    }, {
      props: ({
        underline,
        ownerState
      }) => underline === 'always' && ownerState.color === 'inherit',
      style: theme.colorSpace ? {
        textDecorationColor: theme.alpha('currentColor', 0.4)
      } : null
    }, ...Object.entries(theme.palette).filter(createSimplePaletteValueFilter()).map(([color]) => ({
      props: {
        underline: 'always',
        color
      },
      style: {
        '--Link-underlineColor': theme.alpha((theme.vars || theme).palette[color].main, 0.4)
      }
    })), {
      props: {
        underline: 'always',
        color: 'textPrimary'
      },
      style: {
        '--Link-underlineColor': theme.alpha((theme.vars || theme).palette.text.primary, 0.4)
      }
    }, {
      props: {
        underline: 'always',
        color: 'textSecondary'
      },
      style: {
        '--Link-underlineColor': theme.alpha((theme.vars || theme).palette.text.secondary, 0.4)
      }
    }, {
      props: {
        underline: 'always',
        color: 'textDisabled'
      },
      style: {
        '--Link-underlineColor': (theme.vars || theme).palette.text.disabled
      }
    }, {
      props: {
        component: 'button'
      },
      style: {
        position: 'relative',
        WebkitTapHighlightColor: 'transparent',
        backgroundColor: 'transparent',
        // Reset default value
        // We disable the focus ring for mouse, touch and keyboard users.
        outline: 0,
        border: 0,
        margin: 0,
        // Remove the margin in Safari
        borderRadius: 0,
        padding: 0,
        // Remove the padding in Firefox
        cursor: 'pointer',
        userSelect: 'none',
        verticalAlign: 'middle',
        MozAppearance: 'none',
        // Reset
        WebkitAppearance: 'none',
        // Reset
        '&::-moz-focus-inner': {
          borderStyle: 'none' // Remove Firefox dotted outline.
        },
        [`&.${linkClasses.focusVisible}`]: {
          outline: 'auto'
        }
      }
    }]
  };
}));
const Link = /*#__PURE__*/React.forwardRef(function Link(inProps, ref) {
  const props = useDefaultProps({
    props: inProps,
    name: 'MuiLink'
  });
  const theme = useTheme();
  const {
    className,
    color = 'primary',
    component = 'a',
    onBlur,
    onFocus,
    TypographyClasses,
    underline = 'always',
    variant = 'inherit',
    sx,
    ...other
  } = props;
  const [focusVisible, setFocusVisible] = React.useState(false);
  const handleBlur = event => {
    if (!isFocusVisible(event.target)) {
      setFocusVisible(false);
    }
    if (onBlur) {
      onBlur(event);
    }
  };
  const handleFocus = event => {
    if (isFocusVisible(event.target)) {
      setFocusVisible(true);
    }
    if (onFocus) {
      onFocus(event);
    }
  };
  const ownerState = {
    ...props,
    color,
    component,
    focusVisible,
    underline,
    variant
  };
  const classes = useUtilityClasses$1(ownerState);
  return /*#__PURE__*/jsx(LinkRoot, {
    color: color,
    className: clsx(classes.root, className),
    classes: TypographyClasses,
    component: component,
    onBlur: handleBlur,
    onFocus: handleFocus,
    ref: ref,
    ownerState: ownerState,
    variant: variant,
    ...other,
    sx: [...(v6Colors[color] === undefined ? [{
      color
    }] : []), ...(Array.isArray(sx) ? sx : [sx])],
    style: {
      ...other.style,
      ...(underline === 'always' && color !== 'inherit' && !v6Colors[color] && {
        '--Link-underlineColor': getTextDecoration({
          theme,
          ownerState
        })
      })
    }
  });
});
process.env.NODE_ENV !== "production" ? Link.propTypes /* remove-proptypes */ = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * The content of the component.
   */
  children: PropTypes.node,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: PropTypes.object,
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * The color of the link.
   * @default 'primary'
   */
  color: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([PropTypes.oneOf(['primary', 'secondary', 'success', 'error', 'info', 'warning', 'textPrimary', 'textSecondary', 'textDisabled']), PropTypes.string]),
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: elementTypeAcceptingRef,
  /**
   * @ignore
   */
  onBlur: PropTypes.func,
  /**
   * @ignore
   */
  onFocus: PropTypes.func,
  /**
   * @ignore
   */
  style: PropTypes.object,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])), PropTypes.func, PropTypes.object]),
  /**
   * `classes` prop applied to the [`Typography`](https://mui.com/material-ui/api/typography/) element.
   */
  TypographyClasses: PropTypes.object,
  /**
   * Controls when the link should have an underline.
   * @default 'always'
   */
  underline: PropTypes.oneOf(['always', 'hover', 'none']),
  /**
   * Applies the theme typography styles.
   * @default 'inherit'
   */
  variant: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([PropTypes.oneOf(['body1', 'body2', 'button', 'caption', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'inherit', 'overline', 'subtitle1', 'subtitle2']), PropTypes.string])
} : void 0;

const Stack = createStack({
  createStyledComponent: styled('div', {
    name: 'MuiStack',
    slot: 'Root'
  }),
  useThemeProps: inProps => useDefaultProps({
    props: inProps,
    name: 'MuiStack'
  })
});
process.env.NODE_ENV !== "production" ? Stack.propTypes /* remove-proptypes */ = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * The content of the component.
   */
  children: PropTypes.node,
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: PropTypes.elementType,
  /**
   * Defines the `flex-direction` style property.
   * It is applied for all screen sizes.
   * @default 'column'
   */
  direction: PropTypes.oneOfType([PropTypes.oneOf(['column-reverse', 'column', 'row-reverse', 'row']), PropTypes.arrayOf(PropTypes.oneOf(['column-reverse', 'column', 'row-reverse', 'row'])), PropTypes.object]),
  /**
   * Add an element between each child.
   */
  divider: PropTypes.node,
  /**
   * Defines the space between immediate children.
   * @default 0
   */
  spacing: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.number, PropTypes.string])), PropTypes.number, PropTypes.object, PropTypes.string]),
  /**
   * The system prop, which allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])), PropTypes.func, PropTypes.object]),
  /**
   * If `true`, the CSS flexbox `gap` is used instead of applying `margin` to children.
   *
   * While CSS `gap` removes the [known limitations](https://mui.com/joy-ui/react-stack/#limitations),
   * it is not fully supported in some browsers. We recommend checking https://caniuse.com/?search=flex%20gap before using this flag.
   *
   * To enable this flag globally, follow the [theme's default props](https://mui.com/material-ui/customization/theme-components/#default-props) configuration.
   * @default false
   */
  useFlexGap: PropTypes.bool
} : void 0;

function getToolbarUtilityClass(slot) {
  return generateUtilityClass('MuiToolbar', slot);
}
generateUtilityClasses('MuiToolbar', ['root', 'gutters', 'regular', 'dense']);

const useUtilityClasses = ownerState => {
  const {
    classes,
    disableGutters,
    variant
  } = ownerState;
  const slots = {
    root: ['root', !disableGutters && 'gutters', variant]
  };
  return composeClasses(slots, getToolbarUtilityClass, classes);
};
const ToolbarRoot = styled('div', {
  name: 'MuiToolbar',
  slot: 'Root',
  overridesResolver: (props, styles) => {
    const {
      ownerState
    } = props;
    return [styles.root, !ownerState.disableGutters && styles.gutters, styles[ownerState.variant]];
  }
})(memoTheme(({
  theme
}) => ({
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  variants: [{
    props: ({
      ownerState
    }) => !ownerState.disableGutters,
    style: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2),
      [theme.breakpoints.up('sm')]: {
        paddingLeft: theme.spacing(3),
        paddingRight: theme.spacing(3)
      }
    }
  }, {
    props: {
      variant: 'dense'
    },
    style: {
      minHeight: 48
    }
  }, {
    props: {
      variant: 'regular'
    },
    style: theme.mixins.toolbar
  }]
})));
const Toolbar = /*#__PURE__*/React.forwardRef(function Toolbar(inProps, ref) {
  const props = useDefaultProps({
    props: inProps,
    name: 'MuiToolbar'
  });
  const {
    className,
    component = 'div',
    disableGutters = false,
    variant = 'regular',
    ...other
  } = props;
  const ownerState = {
    ...props,
    component,
    disableGutters,
    variant
  };
  const classes = useUtilityClasses(ownerState);
  return /*#__PURE__*/jsx(ToolbarRoot, {
    as: component,
    className: clsx(classes.root, className),
    ref: ref,
    ownerState: ownerState,
    ...other
  });
});
process.env.NODE_ENV !== "production" ? Toolbar.propTypes /* remove-proptypes */ = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * The Toolbar children, usually a mixture of `IconButton`, `Button` and `Typography`.
   * The Toolbar is a flex container, allowing flex item properties to be used to lay out the children.
   */
  children: PropTypes.node,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: PropTypes.object,
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: PropTypes.elementType,
  /**
   * If `true`, disables gutter padding.
   * @default false
   */
  disableGutters: PropTypes.bool,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])), PropTypes.func, PropTypes.object]),
  /**
   * The variant to use.
   * @default 'regular'
   */
  variant: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([PropTypes.oneOf(['dense', 'regular']), PropTypes.string])
} : void 0;

const LOGO_URL = "https://uzgnfwbztoizcctyfdiv.supabase.co/storage/v1/object/public/Imagenes/AZuAXHqalTLlz8th7NMdBA-AZuAXHqaHD92HliWBxJzdA.jpg";
const Header = () => {
  const handleClick = () => {
    window.location.href = process.env.NODE_ENV === "production" ? "https://ad-local-gamma.vercel.app/registro" : "http://localhost:5173/registro";
  };
  return /* @__PURE__ */ jsxs(AppBar, { position: "static", color: "primary", elevation: 1, children: [
    /* @__PURE__ */ jsxs(Toolbar, { className: "container-lg px-3", children: [
      /* @__PURE__ */ jsxs(Box, { className: "d-flex align-items-center gap-2 flex-grow-1", children: [
        /* @__PURE__ */ jsx(
          Box,
          {
            component: "img",
            src: LOGO_URL,
            alt: "ADLocal",
            sx: { height: 36 }
          }
        ),
        /* @__PURE__ */ jsx(Typography, { variant: "h6", fontWeight: 600, children: "ADLocal" })
      ] }),
      /* @__PURE__ */ jsxs(Box, { className: "d-none d-lg-flex gap-2", children: [
        /* @__PURE__ */ jsx(Button, { color: "inherit", onClick: () => location.assign("/"), children: "Inicio" }),
        /* @__PURE__ */ jsx(Button, { variant: "contained", color: "secondary", onClick: handleClick, children: "Unirme como negocio" })
      ] })
    ] }),
    /* @__PURE__ */ jsxs(Box, { className: "d-flex d-lg-none px-3 pb-2 gap-2", children: [
      /* @__PURE__ */ jsx(Button, { fullWidth: true, color: "inherit", variant: "outlined", onClick: () => location.assign("/"), children: "Inicio" }),
      /* @__PURE__ */ jsx(Button, { fullWidth: true, variant: "contained", color: "secondary", onClick: handleClick, children: "Unirme como negocio" })
    ] })
  ] });
};

const Footer = () => {
  const year = (/* @__PURE__ */ new Date()).getFullYear();
  const handleClick = () => {
    window.location.href = process.env.NODE_ENV === "production" ? "https://ad-local-gamma.vercel.app/registro" : "http://localhost:5173/registro";
  };
  return /* @__PURE__ */ jsx(
    Box,
    {
      component: "footer",
      sx: { bgcolor: "primary.main", color: "primary.contrastText" },
      children: /* @__PURE__ */ jsx("div", { className: "container-lg py-4", children: /* @__PURE__ */ jsxs("div", { className: "row gy-3 align-items-center text-center text-lg-start", children: [
        /* @__PURE__ */ jsx("div", { className: "col-12 col-lg-6", children: /* @__PURE__ */ jsxs(Typography, { variant: "body1", children: [
          "¿Quieres unirte como negocio?",
          /* @__PURE__ */ jsx(
            Link,
            {
              onClick: handleClick,
              underline: "hover",
              sx: { ml: 1, color: "white", fontWeight: 500, cursor: "pointer" },
              children: "Da clic aquí"
            }
          )
        ] }) }),
        /* @__PURE__ */ jsxs("div", { className: "col-12 col-lg-3 d-flex justify-content-center justify-content-lg-start gap-2", children: [
          /* @__PURE__ */ jsx(IconButton, { sx: { color: "primary.contrastText" }, children: /* @__PURE__ */ jsx(FacebookIcon, {}) }),
          /* @__PURE__ */ jsx(IconButton, { sx: { color: "primary.contrastText" }, children: /* @__PURE__ */ jsx(InstagramIcon, {}) })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "col-12 col-lg-3 text-center text-lg-end", children: /* @__PURE__ */ jsxs(Typography, { variant: "subtitle2", sx: { opacity: 0.8 }, children: [
          "© ",
          year,
          " Da VinciX Code Labs. ",
          /* @__PURE__ */ jsx("br", {}),
          " Todos los derechos reservados."
        ] }) })
      ] }) })
    }
  );
};

const Body = ({ children }) => {
  return /* @__PURE__ */ jsx(Box, { className: "flex-grow-1 d-flex", children: /* @__PURE__ */ jsxs("div", { className: "container-lg py-4 d-flex flex-column flex-grow-1", children: [
    /* @__PURE__ */ jsx("div", { className: "mb-3 text-center", children: /* @__PURE__ */ jsx("span", { className: "badge bg-warning text-dark", children: "Ambiente de Prod" }) }) ,
    children
  ] }) });
};

const coffee = {
  main: "#5B3A29",
  // Café profundo (marca)
  dark: "#3A2419",
  // Espresso
  light: "#E8D8C8"
  // Latte claro
};

const muiTheme = createTheme({
  palette: {
    primary: {
      main: coffee.main,
      dark: coffee.dark,
      light: coffee.light,
      contrastText: "#ffffff"
    },
    secondary: {
      main: coffee.dark
    },
    background: {
      default: coffee.light,
      paper: "#ffffff"
    }
  },
  typography: {
    fontFamily: [
      "Inter",
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      "Helvetica",
      "Arial",
      "sans-serif"
    ].join(","),
    h1: { fontWeight: 700 },
    h2: { fontWeight: 700 },
    h3: { fontWeight: 600 },
    h4: { fontWeight: 600 },
    h5: { fontWeight: 600 },
    h6: { fontWeight: 600 },
    subtitle1: { fontWeight: 500 },
    subtitle2: { fontWeight: 500 },
    body1: { fontWeight: 400 },
    body2: { fontWeight: 400 },
    button: {
      fontWeight: 600,
      textTransform: "none"
    }
  }
});

const App = ({ children }) => {
  return /* @__PURE__ */ jsxs(ThemeProvider, { theme: muiTheme, children: [
    /* @__PURE__ */ jsx(CssBaseline, {}),
    /* @__PURE__ */ jsxs(
      Box,
      {
        sx: {
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column"
        },
        children: [
          /* @__PURE__ */ jsx(Header, {}),
          /* @__PURE__ */ jsx(Body, { children }),
          /* @__PURE__ */ jsx(Footer, {})
        ]
      }
    )
  ] });
};

function ProductoCard({ producto }) {
  return /* @__PURE__ */ jsxs(
    Box,
    {
      sx: {
        display: "flex",
        alignItems: "center",
        width: "100%",
        borderRadius: 3,
        overflow: "hidden",
        boxShadow: "0 4px 18px rgba(0,0,0,0.08)",
        backgroundColor: "#fff",
        cursor: "pointer",
        transition: "all 0.3s ease",
        "&:hover": {
          transform: "translateY(-3px)",
          boxShadow: "0 10px 28px rgba(0,0,0,0.15)"
        }
      },
      children: [
        producto.logoUrl && /* @__PURE__ */ jsx(
          Box,
          {
            component: "img",
            src: producto.logoUrl,
            alt: producto.nombre,
            sx: {
              width: { xs: 100, sm: 120 },
              height: { xs: 100, sm: 120 },
              objectFit: "cover",
              flexShrink: 0
            }
          }
        ),
        /* @__PURE__ */ jsxs(Stack, { spacing: 0.5, sx: { p: 2, flex: 1 }, children: [
          /* @__PURE__ */ jsx(
            Typography,
            {
              fontWeight: 700,
              variant: "subtitle1",
              sx: { lineHeight: 1.2 },
              children: producto.nombre
            }
          ),
          /* @__PURE__ */ jsx(
            Typography,
            {
              variant: "body2",
              color: "text.secondary",
              sx: {
                lineHeight: 1.3,
                overflow: "hidden",
                textOverflow: "ellipsis",
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical"
              },
              children: producto.descripcion
            }
          ),
          producto.precio != null && /* @__PURE__ */ jsxs(Typography, { fontWeight: 700, color: "primary", children: [
            "$",
            producto.precio.toFixed(2)
          ] })
        ] })
      ]
    }
  );
}

const DIAS_SEMANA_MAP = {
  0: "Domingo",
  1: "Lunes",
  2: "Martes",
  3: "Miércoles",
  4: "Jueves",
  5: "Viernes",
  6: "Sábado"
};
const estaAbiertoAhora = (horarios) => {
  if (!horarios) return false;
  const ahora = /* @__PURE__ */ new Date();
  const diaHoy = ahora.getDay();
  const horaActual = ahora.toTimeString().slice(0, 5);
  const horarioHoy = horarios.find((h) => h.dia === diaHoy);
  if (!horarioHoy || !horarioHoy.abierto) return false;
  return horarioHoy.horaApertura <= horaActual && horaActual <= horarioHoy.horaCierre;
};

const MapaComercio = lazy(() => import('../../chunks/MapaComercio.client_kusaR3ST.mjs'));
function ComercioDetalle({
  comercio,
  productos,
  loadingProducts
}) {
  const abiertoAhora = comercio.horarios ? estaAbiertoAhora(comercio.horarios) : false;
  const colorPrimario = comercio.colorPrimario ?? "#6f4e37";
  const colorSecundario = comercio.colorSecundario ?? "#3e2723";
  const horarios = comercio.horarios || [];
  return /* @__PURE__ */ jsxs(
    Box,
    {
      sx: {
        position: "relative",
        maxWidth: { xs: "100%", sm: 600, md: 900 },
        width: "100%",
        mx: "auto",
        borderRadius: { xs: 2, sm: 3, md: 4 },
        boxShadow: {
          xs: "0 4px 12px rgba(0,0,0,0.1)",
          sm: "0 6px 20px rgba(0,0,0,0.15)"
        },
        backgroundColor: "#fff",
        overflow: "hidden"
      },
      children: [
        /* @__PURE__ */ jsx(
          Button,
          {
            startIcon: /* @__PURE__ */ jsx(ArrowBackIcon, {}),
            onClick: () => location.assign("/"),
            sx: {
              position: "absolute",
              top: 16,
              left: 16,
              zIndex: 10,
              backgroundColor: "rgba(255,255,255,0.9)",
              color: "#333",
              fontWeight: "bold",
              "&:hover": {
                backgroundColor: "#fff"
              }
            },
            children: "Volver"
          }
        ),
        /* @__PURE__ */ jsxs(
          Box,
          {
            sx: {
              background: `linear-gradient(135deg, ${colorPrimario}, ${colorSecundario})`,
              width: "100%",
              px: { xs: 2, sm: 4, md: 6 },
              py: { xs: 4, sm: 5, md: 6 },
              textAlign: "center",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center"
            },
            children: [
              /* @__PURE__ */ jsx(
                Avatar,
                {
                  src: comercio.logoBase64,
                  sx: {
                    width: 120,
                    height: 120,
                    mx: "auto",
                    mb: 2,
                    border: "3px solid #fff"
                  }
                }
              ),
              /* @__PURE__ */ jsx(Typography, { variant: "h4", fontWeight: "bold", color: "#fff", children: comercio.nombre }),
              comercio.descripcion && /* @__PURE__ */ jsx(Typography, { color: "#eee", mt: 1, children: comercio.descripcion }),
              comercio.horarios && /* @__PURE__ */ jsx(
                Chip,
                {
                  icon: /* @__PURE__ */ jsx(AccessTimeIcon, {}),
                  label: abiertoAhora ? "Abierto ahora" : "Cerrado ahora",
                  sx: {
                    mt: 2,
                    backgroundColor: abiertoAhora ? "#4caf50" : "#f44336",
                    color: "#fff"
                  }
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ jsxs(Stack, { spacing: 2, px: 4, py: 4, children: [
          /* @__PURE__ */ jsxs(Stack, { direction: "row", spacing: 1, children: [
            /* @__PURE__ */ jsx(LocationOnIcon, {}),
            /* @__PURE__ */ jsx(Typography, { children: comercio.direccion })
          ] }),
          comercio.telefono && /* @__PURE__ */ jsxs(Stack, { direction: "row", spacing: 1, children: [
            /* @__PURE__ */ jsx(WhatsAppIcon, { sx: { color: "#25D366" } }),
            /* @__PURE__ */ jsx(
              Link,
              {
                href: `https://wa.me/${comercio.telefono}`,
                target: "_blank",
                underline: "none",
                children: comercio.telefono
              }
            )
          ] }),
          comercio.email && /* @__PURE__ */ jsxs(Stack, { direction: "row", spacing: 1, children: [
            /* @__PURE__ */ jsx(EmailIcon, {}),
            /* @__PURE__ */ jsx(Link, { href: `mailto:${comercio.email}`, underline: "none", children: comercio.email })
          ] }),
          /* @__PURE__ */ jsx(Divider, {}),
          horarios?.length > 0 && /* @__PURE__ */ jsxs(
            Accordion,
            {
              sx: {
                borderRadius: 3,
                mb: 3,
                boxShadow: "0 6px 18px rgba(0,0,0,0.06)",
                background: "rgba(255,255,255,0.9)",
                backdropFilter: "blur(12px)",
                "&:before": { display: "none" },
                transition: "all 0.3s ease",
                "&:hover": {
                  boxShadow: "0 12px 24px rgba(0,0,0,0.12)"
                }
              },
              children: [
                /* @__PURE__ */ jsx(
                  AccordionSummary,
                  {
                    expandIcon: /* @__PURE__ */ jsx(ExpandMoreIcon, {}),
                    sx: {
                      px: 3,
                      py: 1.5,
                      minHeight: 56,
                      "& .MuiAccordionSummary-content": {
                        alignItems: "center",
                        gap: 1
                      }
                    },
                    children: /* @__PURE__ */ jsx(Typography, { fontWeight: 600, fontSize: "1.1rem", children: "Horarios de atención" })
                  }
                ),
                /* @__PURE__ */ jsx(AccordionDetails, { sx: { px: 3, pb: 2 }, children: /* @__PURE__ */ jsx(Stack, { spacing: 1, children: horarios.sort((a, b) => a.dia - b.dia).map((h) => /* @__PURE__ */ jsxs(
                  Box,
                  {
                    sx: {
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      px: 2,
                      py: 1,
                      borderRadius: 2,
                      backgroundColor: h.abierto ? "#fef7f0" : "#fafafa"
                    },
                    children: [
                      /* @__PURE__ */ jsx(Typography, { fontWeight: 500, children: DIAS_SEMANA_MAP[h.dia] }),
                      h.abierto ? /* @__PURE__ */ jsxs(Typography, { variant: "body2", children: [
                        h.horaAperturaFormateada,
                        " – ",
                        h.horaCierreFormateada
                      ] }) : /* @__PURE__ */ jsx(
                        Chip,
                        {
                          label: "Cerrado",
                          size: "small",
                          color: "default",
                          variant: "outlined",
                          sx: { fontWeight: 500 }
                        }
                      )
                    ]
                  },
                  h.dia
                )) }) })
              ]
            }
          ),
          /* @__PURE__ */ jsxs(
            Accordion,
            {
              sx: {
                borderRadius: 3,
                mb: 2,
                boxShadow: "0 6px 18px rgba(0,0,0,0.06)",
                background: "rgba(255,255,255,0.9)",
                backdropFilter: "blur(12px)",
                "&:before": { display: "none" },
                transition: "all 0.3s ease",
                "&:hover": {
                  boxShadow: "0 12px 24px rgba(0,0,0,0.12)"
                }
              },
              children: [
                /* @__PURE__ */ jsx(
                  AccordionSummary,
                  {
                    expandIcon: /* @__PURE__ */ jsx(ExpandMoreIcon, {}),
                    sx: {
                      px: 3,
                      py: 1.5,
                      minHeight: 56,
                      "& .MuiAccordionSummary-content": {
                        alignItems: "center",
                        gap: 1
                      }
                    },
                    children: /* @__PURE__ */ jsx(Typography, { fontWeight: 600, fontSize: "1rem", children: "Productos" })
                  }
                ),
                /* @__PURE__ */ jsx(AccordionDetails, { sx: { px: 3, pb: 2 }, children: loadingProducts ? /* @__PURE__ */ jsx(Typography, { children: "Cargando…" }) : productos.length === 0 ? /* @__PURE__ */ jsx(Typography, { children: "No hay productos." }) : /* @__PURE__ */ jsx(Stack, { spacing: 2, children: productos.map((p) => /* @__PURE__ */ jsx(ProductoCard, { producto: p }, p.id)) }) })
              ]
            }
          ),
          comercio.lat && comercio.lng && /* @__PURE__ */ jsx(
            Box,
            {
              sx: {
                mt: 3,
                p: 1,
                borderRadius: 3,
                background: "rgba(255,255,255,0.85)",
                backdropFilter: "blur(12px)",
                boxShadow: "0 8px 24px rgba(0,0,0,0.08)"
              },
              children: /* @__PURE__ */ jsx(Suspense, { fallback: /* @__PURE__ */ jsx(Typography, { children: "Cargando mapa…" }), children: /* @__PURE__ */ jsx(MapaComercio, { lat: comercio.lat, lng: comercio.lng }) })
            }
          ),
          /* @__PURE__ */ jsx(
            Button,
            {
              fullWidth: true,
              sx: {
                mt: 3,
                borderRadius: 3,
                background: `linear-gradient(135deg, ${colorPrimario}, ${colorSecundario})`,
                color: "#fff",
                boxShadow: "0 8px 24px rgba(0,0,0,0.08)"
              },
              onClick: () => window.open(
                `https://www.google.com/maps?q=${comercio.lat},${comercio.lng}`,
                "_blank"
              ),
              children: "Ver ubicación"
            }
          )
        ] })
      ]
    }
  );
}

const BACKEND_URL = "https://adlocalapi.onrender.com/api";
const BASE_URL = `${BACKEND_URL}/comercios`;
console.log("BACKEND_URL:", BACKEND_URL);
console.log("BASE_URL:", BASE_URL);

console.log("BACKEND_URL:", BACKEND_URL);
console.log("BASE_URL:", BASE_URL);
const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json"
  }
});
api.interceptors.response.use(
  (r) => r,
  (e) => {
    const message = e.response?.data?.mensaje || e.response?.data?.message || "Error en la petición";
    throw new Error(message);
  }
);
const comercioPublicApi = {
  getPopulares: () => api.get("", {
    params: { tipo: "populares" }
  }),
  getRecientes: () => api.get("", {
    params: { tipo: "recientes" }
  }),
  getCercanos: (lat, lng) => api.get("", {
    params: { tipo: "cercanos", lat, lng }
  }),
  getById: (id) => api.get(`/${id}`)
};

const $$Astro = createAstro();
const $$slug = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$slug;
  const { slug } = Astro2.params;
  const parts = slug?.split("_");
  const id = Number(parts?.[0]);
  let comercio = null;
  try {
    const response = await comercioPublicApi.getById(id);
    comercio = response.data.respuesta ?? null;
  } catch (err) {
    console.error("ERROR AL OBTENER COMERCIO:", err);
  }
  if (!comercio) {
    return Astro2.redirect("/");
  }
  return renderTemplate`<html lang="es"> <head><meta charset="utf-8"><link rel="icon" type="image/jpeg" sizes="32x32"${addAttribute(comercio.logoBase64 ?? "https://uzgnfwbztoizcctyfdiv.supabase.co/storage/v1/object/public/Imagenes/AZuAXHqalTLlz8th7NMdBA-AZuAXHqaHD92HliWBxJzdA.jpg", "href")}><link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" integrity="sha256-sA+1E9IYJrySAB8GkuPxHohDpC3Lx2F0YlGOCq4SvYg=" crossorigin=""><title>${comercio.nombre}</title>${renderHead()}</head> <body> ${renderComponent($$result, "App", App, { "client:load": true, "client:component-hydration": "load", "client:component-path": "C:/Users/USER/source/repos/AdLocalWeb/src/components/App", "client:component-export": "default" }, { "default": async ($$result2) => renderTemplate` ${renderComponent($$result2, "ComercioDetalle", ComercioDetalle, { "client:load": true, "comercio": comercio, "productos": comercio.productos ?? [], "loadingProducts": false, "client:component-hydration": "load", "client:component-path": "C:/Users/USER/source/repos/AdLocalWeb/src/components/business/ComercioDetalle", "client:component-export": "default" })} ` })} </body></html>`;
}, "C:/Users/USER/source/repos/AdLocalWeb/src/pages/comercios/[slug].astro", void 0);

const $$file = "C:/Users/USER/source/repos/AdLocalWeb/src/pages/comercios/[slug].astro";
const $$url = "/comercios/[slug]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$slug,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
