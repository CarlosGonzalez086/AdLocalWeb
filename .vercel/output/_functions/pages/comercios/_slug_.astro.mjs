import { e as createComponent, f as createAstro, h as addAttribute, k as renderHead, l as renderComponent, r as renderTemplate } from '../../chunks/astro/server_DGJ8zzG5.mjs';
import 'piccolore';
import { u as useDefaultProps, s as styled, m as memoTheme, d as duration, a as useTheme, P as Paper, B as ButtonBase, c as createSimplePaletteValueFilter, b as Box, T as Typography, e as Button, L as Link, A as App } from '../../chunks/App_rwJr5YN-.mjs';
import { jsxs, jsx } from 'react/jsx-runtime';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import EmailIcon from '@mui/icons-material/Email';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import * as React from 'react';
import { lazy, Suspense } from 'react';
import PropTypes from 'prop-types';
import { createStack } from '@mui/system';
import 'dayjs';
import clsx from 'clsx';
import composeClasses from '@mui/utils/composeClasses';
import capitalize from '@mui/utils/capitalize';
import generateUtilityClasses from '@mui/utils/generateUtilityClasses';
import generateUtilityClass from '@mui/utils/generateUtilityClass';
import useForkRef from '@mui/utils/useForkRef';
import appendOwnerState from '@mui/utils/appendOwnerState';
import resolveComponentProps from '@mui/utils/resolveComponentProps';
import mergeSlotProps from '@mui/utils/mergeSlotProps';
import unsupportedProp from '@mui/utils/unsupportedProp';
import { isFragment } from 'react-is';
import chainPropTypes from '@mui/utils/chainPropTypes';
import useControlled from '@mui/utils/useControlled';
import { Transition } from 'react-transition-group';
import useTimeout from '@mui/utils/useTimeout';
import elementTypeAcceptingRef from '@mui/utils/elementTypeAcceptingRef';
import axios from 'axios';
/* empty css                                     */
export { renderers } from '../../renderers.mjs';

function getSvgIconUtilityClass(slot) {
  return generateUtilityClass('MuiSvgIcon', slot);
}
generateUtilityClasses('MuiSvgIcon', ['root', 'colorPrimary', 'colorSecondary', 'colorAction', 'colorError', 'colorDisabled', 'fontSizeInherit', 'fontSizeSmall', 'fontSizeMedium', 'fontSizeLarge']);

const useUtilityClasses$7 = ownerState => {
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
  const classes = useUtilityClasses$7(ownerState);
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

const useUtilityClasses$6 = ownerState => {
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
  const classes = useUtilityClasses$6(ownerState);
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

const useUtilityClasses$5 = ownerState => {
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
  const classes = useUtilityClasses$5(ownerState);
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

const useUtilityClasses$4 = ownerState => {
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
  const classes = useUtilityClasses$4(ownerState);
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

function getAccordionSummaryUtilityClass(slot) {
  return generateUtilityClass('MuiAccordionSummary', slot);
}
const accordionSummaryClasses = generateUtilityClasses('MuiAccordionSummary', ['root', 'expanded', 'focusVisible', 'disabled', 'gutters', 'contentGutters', 'content', 'expandIconWrapper']);

const useUtilityClasses$3 = ownerState => {
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
  const classes = useUtilityClasses$3(ownerState);
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

const CancelIcon = createSvgIcon(/*#__PURE__*/jsx("path", {
  d: "M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z"
}), 'Cancel');

function getChipUtilityClass(slot) {
  return generateUtilityClass('MuiChip', slot);
}
const chipClasses = generateUtilityClasses('MuiChip', ['root', 'sizeSmall', 'sizeMedium', 'colorDefault', 'colorError', 'colorInfo', 'colorPrimary', 'colorSecondary', 'colorSuccess', 'colorWarning', 'disabled', 'clickable', 'clickableColorPrimary', 'clickableColorSecondary', 'deletable', 'deletableColorPrimary', 'deletableColorSecondary', 'outlined', 'filled', 'outlinedPrimary', 'outlinedSecondary', 'filledPrimary', 'filledSecondary', 'avatar', 'avatarSmall', 'avatarMedium', 'avatarColorPrimary', 'avatarColorSecondary', 'icon', 'iconSmall', 'iconMedium', 'iconColorPrimary', 'iconColorSecondary', 'label', 'labelSmall', 'labelMedium', 'deleteIcon', 'deleteIconSmall', 'deleteIconMedium', 'deleteIconColorPrimary', 'deleteIconColorSecondary', 'deleteIconOutlinedColorPrimary', 'deleteIconOutlinedColorSecondary', 'deleteIconFilledColorPrimary', 'deleteIconFilledColorSecondary', 'focusVisible']);

const useUtilityClasses$2 = ownerState => {
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
  const classes = useUtilityClasses$2(ownerState);
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

const useUtilityClasses$1 = ownerState => {
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
  const classes = useUtilityClasses$1(ownerState);
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

function getDividerUtilityClass(slot) {
  return generateUtilityClass('MuiDivider', slot);
}
generateUtilityClasses('MuiDivider', ['root', 'absolute', 'fullWidth', 'inset', 'middle', 'flexItem', 'light', 'vertical', 'withChildren', 'withChildrenVertical', 'textAlignRight', 'textAlignLeft', 'wrapper', 'wrapperVertical']);

const useUtilityClasses = ownerState => {
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
  const classes = useUtilityClasses(ownerState);
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
            onClick: () => window.location.href = "/",
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

const BACKEND_URL = process.env.NODE_ENV === "production" ? "https://adlocalapi.onrender.com/api" : "http://localhost:8080/api";
process.env.NODE_ENV === "production" ? "http://localhost:5173/registro" : "https://ad-local-gamma.vercel.app/registro";

const BASE_URL = `${BACKEND_URL}/comercios`;
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
const prerender = false;
const $$slug = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$slug;
  const { slug } = Astro2.params;
  const parts = slug?.split("_");
  const id = Number(parts?.[0]);
  const nombre = parts?.slice(1).join("_").replace(/_/g, " ");
  if (isNaN(id)) {
    return Astro2.redirect("/");
  }
  let comercio;
  try {
    const response = await comercioPublicApi.getById(id);
    comercio = response.data.respuesta;
    if (!comercio) {
      throw new Error("Comercio no encontrado");
    }
  } catch (err) {
    console.error("ERROR ASTRO:", err);
    throw err instanceof Error ? err : new Error("Error cargando comercio");
  }
  return renderTemplate`<html lang="es"> <head><meta charset="utf-8"><link rel="icon" type="image/jpeg" sizes="32x32"${addAttribute(comercio.logoBase64 ? comercio.logoBase64 : "https://uzgnfwbztoizcctyfdiv.supabase.co/storage/v1/object/public/Imagenes/AZuAXHqalTLlz8th7NMdBA-AZuAXHqaHD92HliWBxJzdA.jpg", "href")}><title>${nombre}</title>${renderHead()}</head> <body> ${renderComponent($$result, "App", App, { "client:load": true, "client:component-hydration": "load", "client:component-path": "C:/Users/USER/source/repos/AdLocalWeb/src/components/App", "client:component-export": "default" }, { "default": async ($$result2) => renderTemplate` ${renderComponent($$result2, "ComercioDetalle", ComercioDetalle, { "client:load": true, "comercio": comercio, "productos": comercio.productos || [], "loadingProducts": false, "client:component-hydration": "load", "client:component-path": "C:/Users/USER/source/repos/AdLocalWeb/src/components/business/ComercioDetalle", "client:component-export": "default" })} ` })} </body></html>`;
}, "C:/Users/USER/source/repos/AdLocalWeb/src/pages/comercios/[slug].astro", void 0);

const $$file = "C:/Users/USER/source/repos/AdLocalWeb/src/pages/comercios/[slug].astro";
const $$url = "/comercios/[slug]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$slug,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
