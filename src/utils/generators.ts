import type {
  IColorVariantsArgs,
  IGetTwColorsAndVars,
  ITwConvertOptions,
  Mixed,
  TwColors,
} from "../types";
import { TwMainColorVariants } from "../types";
import { getNestedKey, isNumber, isObject, isString } from "./general";

export const TW_MAIN_LIGHT_COLOR = TwMainColorVariants.gray;

export const TW_MAIN_DARK_COLOR = TwMainColorVariants.neutral;

/**
Generates color variants from a base color.
Extracts the main color value from a colors object using the provided key, then creates variants.
In dark mode, shades are shifted (e.g. '100' becomes the value of '50', '200' becomes '100', etc.).
Each variant also gets a DEFAULT property set to the '600' shade of the original.

@param {Object} params.colors - The color configuration object.
@param {boolean} params.isDark - Flag indicating if dark mode adjustments should be applied.
@param {TwMainColorVariants} params.mainColor - The key used to retrieve the main color from the config.
@returns {TwColors} An object mapping variant keys to color shade objects.

@example
const variants = generateColorVariants({ colors: colors, isDark: false, mainColor: 'neutral' });
*/
export const generateColorVariants = ({
  colors,
  isDark,
  mainColor,
}: IColorVariantsArgs): TwColors => {
  const mainColorValue = getNestedKey(colors, mainColor) as TwColors;
  if (!isObject(mainColorValue)) return {};

  const value = isDark
    ? {
        ...mainColorValue,
        "50": mainColorValue?.["200"],
        "100": mainColorValue?.["50"],
        "200": mainColorValue?.["100"],
        "300": mainColorValue?.["200"],
        "400": mainColorValue?.["300"],
        "500": mainColorValue?.["400"],
        "600": mainColorValue?.["500"],
        "700": mainColorValue?.["600"],
        "800": mainColorValue?.["700"],
        "950": mainColorValue?.["700"],
      }
    : mainColorValue;

  const colorKeys = [...Object.values(TwMainColorVariants), "mainColor"];

  return colorKeys.reduce(
    (result, colorKey) => ({
      ...result,
      [colorKey]: { ...value, DEFAULT: mainColorValue["600"] },
    }),
    {}
  ) as TwColors;
};

/**
 * Creates a CSS variable reference string with a fallback value
 *
 * @param {string} key - The CSS variable name (e.g., '--color-white')
 * @param {string} value - The fallback value to use if the CSS variable is not defined
 * @returns {string} A CSS variable reference with fallback value
 *
 * @example
 * getTwValue('--color-white', '#FFFFFF')
 * // Returns 'var(--color-white, #FFFFFF)'
 */

export const getTwValue = (key: string, value: string): string =>
  `var(${key}, ${value})`;

/**
 * Reverses the order of numeric color shades while preserving named color variants
 * Used primarily for creating dark mode color schemes
 *
 * @param {TwColors} value - The color object containing shade values
 * @returns {TwColors} A new color object with reversed numeric shade order
 *
 * @example
 * reverseColorOrder({
 *   50: '#fafafa',
 *   100: '#f5f5f5',
 *   DEFAULT: '#737373',
 *   light: '#e5e5e5'
 * })
 */
export const reverseColorOrder = (value: TwColors): TwColors => {
  const entries = Object.entries(value);

  const textEntries = entries.filter(([k]) => !isNumber(k));
  const numericEntries = entries.filter(([k]) => isNumber(k));

  const sorted = numericEntries.sort(([a], [b]) => +a - +b);
  const reversed = sorted.map(([k], i) => [
    k,
    sorted[sorted.length - 1 - i][1],
  ]);

  return {
    ...Object.fromEntries([...textEntries, ...reversed]),
    DEFAULT: value["300"],
  };
};

/**
 * Recursively processes Tailwind CSS color configurations to generate
 * a mapping of keys to either raw color values or CSS variable based strings.
 *
 * The function supports both flat and nested structures, optional usage of CSS variable names for keys or values,
 * and dark mode adjustments via reversing the color order for objects.
 *
 * How the function works:
 * It first extracts the necessary options from its input arguments.
 * It generates additional color variants based on the main color (via generateColorVariants) and merges them with the base colors.
 * It iterates over all keys/values in the merged object:
 * If the value is a string (representing a color value in hex or other format), it:
 *
 *     a. Constructs a CSS variable name based on the optional parent key and prefix.
 *
 *     b. Depending on the flags, uses the CSS variable name for the key and/or value.
 *
 *     c. Assigns to the result either the raw color value or a CSS variable reference string.
 *        If the value is an object, it recursively calls getColors to perform the same processing for nested colors.
 *
 *     a. For dark mode, the object may be processed with reverseColorOrder to reverse the numeric order.
 *
 *     b. If a flat structure is desired (isFlat === true), the nested object properties are merged into the parent result.
 * @param {ITwConvertOptions} args - The conversion options.
 * @param {boolean} [args.isDark] - Whether dark mode is enabled. If true and the color value is an object, it reverses the numeric order.
 * @param {boolean} [args.isFlat] - Determines if the nested color object should be flattened into a single-level object.
 * @param {string} [args.parentKey=''] - The key of the parent color. Used when constructing CSS variable names for nested colors.
 * @param {boolean} [args.hasKeyVariables] - If true, the result will use CSS variable names as object keys instead of raw keys.
 * @param {boolean} [args.returnVars=true] - Specifies whether to return CSS variable strings (true) or raw color values (false).
 * @param {string} [args.prefix='color'] - A prefix to be used when constructing the CSS variable name.
 * @param {boolean} [args.hasValueVariables] - If true, the CSS variable name will be used for generating the CSS value string.
 * @param {TwColors} [args.colors=defaultColors] - The base colors to process. Defaults to Tailwind's default colors.
 * @param {TwMainColorVariants} [args.mainColor=TW_MAIN_LIGHT_COLOR] - The main color variant to be used for generating additional color variants.
 * @returns {TwColors} A mapping of color keys to either raw color values or CSS variable-based strings.
 */
export const getColors = (args: ITwConvertOptions): TwColors => {
  const {
    isDark,
    isFlat,
    colors,
    returnVars,
    parentKey = "",
    hasKeyVariables,
    prefix = "color",
    hasValueVariables,
    mainColor = TW_MAIN_LIGHT_COLOR,
  } = args;

  const mainColors = generateColorVariants({
    colors,
    isDark,
    mainColor,
  });

  return Object.entries({ ...colors, ...mainColors }).reduce(
    (result: Record<string, Mixed>, [key, value]) => {
      if (isString(value)) {
        const constantValues = ["inherit", "current", "transparent"];

        if (constantValues.includes(value)) {
          return { ...result, [key]: value };
        }

        const variableName = parentKey
          ? `--${prefix}-${parentKey}-${key}`
          : `--${prefix}-${key}`;

        const keyVariableName = hasKeyVariables ? variableName : key;
        const valueVariableName = hasValueVariables ? variableName : key;

        result[keyVariableName] = returnVars
          ? getTwValue(valueVariableName, value)
          : value;
      } else if (isObject(value)) {
        const processedColors = isDark ? reverseColorOrder(value) : value;

        const objValue = getColors({
          ...args,
          parentKey: parentKey ? `${parentKey}-${key}` : key,
          colors: processedColors,
        });

        if (isFlat) {
          return { ...result, ...objValue };
        }
        result[key] = objValue;
      }
      return result;
    },
    {}
  );
};

/**
 * Generates both Tailwind colors and CSS variables in a single operation
 *
 * @param {IGetTwColorsAndVars} options - Configuration options
 * @returns {{ variables: object, colors: TwColors }} Generated variables and colors
 */
export const getTwColorsAndVars = ({
  isDark,
  colors,
  mainColor,
}: IGetTwColorsAndVars): { variables: TwColors; colors: TwColors } => {
  const fetchedColors = getColors({ colors, mainColor });

  const variablesOptions = {
    colors,
    isDark,
    mainColor,
    isFlat: true,
    hasKeyVariables: true,
  };

  const bgVariablesColors = getColors({
    ...variablesOptions,
    prefix: "bg",
  });

  const textVariablesColors = getColors({
    ...variablesOptions,
    prefix: "color",
  });

  const variables = {
    ...bgVariablesColors,
    ...textVariablesColors,
  };

  return {
    variables,
    colors: fetchedColors,
  };
};
