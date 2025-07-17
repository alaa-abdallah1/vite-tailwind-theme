import {
  getColors,
  TW_MAIN_DARK_COLOR,
  TW_MAIN_LIGHT_COLOR,
  getTwColorsAndVars
} from './generators'
import { TwColors, IGetTwColorsArgs, IGetTwModeVarsArgs } from '@/types'

/**
 * Generates Tailwind-compatible color definitions with a custom prefix
 *
 * @param {IGetTwColorsArgs} options - Configuration options
 * @returns {TwColors} Tailwind-compatible color definitions
 */
export const getTwColors = ({ colors, prefix }: IGetTwColorsArgs): TwColors =>
  getColors({
    colors,
    prefix,
    returnVars: true,
    hasValueVariables: true
  })

/**
 * Generates CSS variables for light mode theme
 *
 * @param {TwColors} args.colors - Color definitions
 * @param {object} args.extendedVars - Additional CSS variables
 * @returns {object} CSS variables for light mode
 */
export const getTwLightVars = ({
  colors,
  extendedVars,
  mainColor
}: IGetTwModeVarsArgs): TwColors => {
  const { variables } = getTwColorsAndVars({
    colors,
    mainColor: mainColor || TW_MAIN_LIGHT_COLOR
  })

  return {
    ...variables,

    // use vars here

    ...extendedVars
  }
}

/**
 * Generates CSS variables for dark mode theme with specific color overrides
 *
 * @param {TwColors} colors - Color definitions
 * @returns {object} CSS variables for dark mode with specific color overrides
 */
export const getTwDarkVars = ({
  colors: colorsArg,
  extendedVars,
  mainColor
}: IGetTwModeVarsArgs): TwColors => {
  const { variables, colors } = getTwColorsAndVars({
    isDark: true,
    colors: colorsArg,
    mainColor: mainColor || TW_MAIN_DARK_COLOR
  })

  return {
    ...variables,

    '--bg-black': colors.white,
    '--bg-white': colors.mainColor['800'],

    '--bg-error-DEFAULT': colors.secondary['700'],
    '--bg-tertiary-DEFAULT': colors.tertiary['800'],

    '--bg-secondary-50': colors.secondary['800'],
    '--bg-secondary-DEFAULT': colors.secondary['700'],

    '--bg-warning-200': colors.warning['900'],

    // Text colors
    '--color-white': colors.black,
    '--color-black': colors.white,

    '--color-error-DEFAULT': colors.error['500'],
    '--color-primary-DEFAULT': colors.primary['50'],
    '--color-secondary-DEFAULT': colors.secondary['400'],

    ...extendedVars
  }
}
