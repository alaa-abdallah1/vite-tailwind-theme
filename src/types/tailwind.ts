import { Mixed } from '@payiano/ha-types'

export type TwColors = Record<string | number, Mixed>

export enum TwMainColorVariants {
  gray = 'gray',
  zinc = 'zinc',
  stone = 'stone',
  slate = 'slate',
  neutral = 'neutral'
}

export interface ITwConvertOptions {
  colors: TwColors
  prefix?: string
  isDark?: boolean
  isFlat?: boolean
  parentKey?: string
  returnVars?: boolean
  hasKeyVariables?: boolean
  hasValueVariables?: boolean
  mainColor?: TwMainColorVariants
}

export interface IColorVariantsArgs {
  colors: TwColors
  isDark?: boolean
  mainColor: TwMainColorVariants
}

export interface IGetTwColorsAndVars {
  colors: TwColors
  isDark?: boolean
  mainColor: TwMainColorVariants
}

export interface IGetTwColorsArgs {
  colors: TwColors
  prefix?: string
}

export interface IGetTwModeVarsArgs {
  colors: TwColors
  extendedVars?: TwColors
  mainColor?: TwMainColorVariants
}

/**
 * Represents the extended configuration options for theming in a Tailwind CSS setup.
 *
 * This type allows customization of theme variables for both light and dark modes.
 * The values for these variables can be any valid color format (e.g., "#ffffff", "white", "hsl(0, 0%, 100%)")
 * or CSS variable references.
 *
 * @property lightMainColor - An optional property representing the main color variant
 *                            used in the light theme. This can be customized based on the
 *                            `TwMainColorVariants` type.
 *
 * @property darkMainColor - An optional property representing the main color variant
 *                           used in the dark theme. This can be customized based on the
 *                           `TwMainColorVariants` type.
 *
 * @property lightVars - An optional TwColors containing custom variables for the light theme.
 *                       These variables can be any valid color format or CSS variable references.
 *
 * @property darkVars - An optional TwColors containing custom variables for the dark theme.
 *                      Similar to `lightVars`, these variables can be any valid color format
 *                      or CSS variable references.
 */
export interface ITwExtendedType {
  lightVars?: TwColors
  darkVars?: TwColors
  lightMainColor?: TwMainColorVariants
  darkMainColor?: TwMainColorVariants
}
