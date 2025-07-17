import merge from "lodash/merge";
import { Mixed } from "@payiano/ha-types";
import { PAYIANO_COLORS } from "./constants";
import { getTwDarkVars, getTwLightVars, getTwColors } from "./utils";
import { ITwExtendedType } from "@/types";
import { Config } from "tailwindcss";

// Identity colors
// Primary: #000066, Secondary: #1d6dee, Tertiary: #25ea8d

export const getTailwindConfig = (
  config?: Partial<Config>,
  extended?: ITwExtendedType
): Mixed => {
  const baseConfig = merge<Config, Partial<Config> | undefined | null>(
    {
      content: ["./src/**/*.{js,ts,vue}"],
      theme: {
        extend: {
          // Tailwind color variation generator
          // @see: https://uicolors.app/create
          colors: PAYIANO_COLORS,
          backgroundColor: PAYIANO_COLORS,
        },
      },
    },
    config
  );

  const { theme = {} } = baseConfig;
  const { extend = {} } = theme;

  const _config: Config = {
    ...baseConfig,
    theme: {
      ...theme,
      extend: {
        ...extend,
        colors: getTwColors({ colors: extend?.colors ?? {} }),
        backgroundColor: getTwColors({
          prefix: "bg",
          colors: extend?.backgroundColor ?? {},
        }),
      },
    },
    plugins: [
      {
        handler: ({ addBase }) =>
          addBase({
            // Use :root for global document-level variables,
            // and :host for Shadow DOM context to ensure Tailwind CSS variables (e.g., --tw-bg-opacity)
            // are available when styles are applied inside a ShadowRoot.
            // This allows components rendered in Shadow DOM to inherit the correct theme variables.

            // TW_THEME_DARKLESS_CLASS
            ":root, :host, .darkless": getTwLightVars({
              colors: { ...PAYIANO_COLORS, ...extend?.colors },
              extendedVars: extended?.lightVars,
              mainColor: extended?.lightMainColor,
            }),
            // TW_THEME_DARK_CLASS
            ".dark": getTwDarkVars({
              colors: { ...PAYIANO_COLORS, ...extend?.colors },
              extendedVars: extended?.darkVars,
              mainColor: extended?.darkMainColor,
            }),
          }),
      },
    ],
  };

  return _config;
};
