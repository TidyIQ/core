import React from "react";
import Router from "next/router";
import { decomposeColor } from "@material-ui/core/styles/colorManipulator";
import SvgIcon, { SvgIconProps } from "@material-ui/core/SvgIcon";
import { NextFunctionComponent } from "next";

// ::::::::::::::::::::::::::::::::::::::::::::::::
// Convert icon name to component
// ::::::::::::::::::::::::::::::::::::::::::::::::

// Typescript
interface IconComponentProps {
  variant: typeof SvgIcon;
  props?: SvgIconProps;
}

// Function
export const IconComponent: NextFunctionComponent<IconComponentProps> = ({
  variant,
  props
}) => {
  const Component = variant;
  return <Component {...props} />;
};

// ::::::::::::::::::::::::::::::::::::::::::::::::
// Redirect to target URL
// Works in both client and server
// ::::::::::::::::::::::::::::::::::::::::::::::::

// Typescript
interface Redirect {
  (ctx: any | {}, target: string): void;
}

// Function
export const redirect: Redirect = (ctx, target) => {
  if (ctx.res) {
    ctx.res.writeHead(303, { Location: target });
    ctx.res.end();
  } else {
    Router.replace(target);
  }
};

// ::::::::::::::::::::::::::::::::::::::::::::::::
// Convert color to HSL
// ::::::::::::::::::::::::::::::::::::::::::::::::

interface ColorToHSL {
  (color: string): { h: number; s: number; l: number };
}

export const colorToHSL: ColorToHSL = color => {
  const { values } = decomposeColor(color);
  let r: number = values[0];
  let g: number = values[1];
  let b: number = values[2];
  r /= 255;
  g /= 255;
  b /= 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  let s = 0;
  let l = (max + min) / 2;
  if (max === min) {
    h = 0;
    s = 0;
  } else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
      default:
        h = 0;
    }
    h /= 6;
  }
  h = Math.round(h * 360);
  s = Math.round(s * 100);
  l = Math.round(l * 100);
  return { h, s, l };
};

// ::::::::::::::::::::::::::::::::::::::::::::::::
// Create vibrant background gradient
// ::::::::::::::::::::::::::::::::::::::::::::::::

interface CreateVibrantBackground {
  (color: string): string;
}

export const createVibrantBackground: CreateVibrantBackground = color => {
  // Get HSL values from color
  const { h, s, l } = colorToHSL(color);
  // Increase bottom hue by 14
  const bottomHSL = h > 346 ? h - 346 : h + 14;
  return `linear-gradient(hsl(${h}, ${s}%, ${l}%), hsl(${bottomHSL}, ${s}%, ${l}%))`;
};

// ::::::::::::::::::::::::::::::::::::::::::::::::
// Create background gradient
// ::::::::::::::::::::::::::::::::::::::::::::::::

interface CreateBackgroundGradient {
  (color: string): string;
}

export const createBackgroundGradient: CreateBackgroundGradient = color => {
  // Get HSL values from color
  const { h, s, l } = colorToHSL(color);
  // Create starting color
  const startColor = {
    h: h > 357 ? h - 357 : h + 3,
    s: Math.min(100, s + 5),
    l: l - 18
  };
  // Create ending color
  const endColor = {
    h: h < 10 ? h + 350 : h - 10,
    s: Math.min(100, s + 11),
    l: Math.min(100, l + 15)
  };
  return `linear-gradient(45deg, hsl(${startColor.h}, ${startColor.s}%, ${startColor.l}%) 1%, hsl(${h}, ${s}%, ${l}%) 64%, hsl(${endColor.h}, ${endColor.s}%, ${endColor.l}%) 97%)`;
};
