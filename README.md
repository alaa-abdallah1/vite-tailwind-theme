# 🎨 Vite Tailwind Theme

[![License: MIT](https://img.shields.io/badge/License-MIT-blue)](LICENSE)
[![npm version](https://img.shields.io/npm/v/vite-tailwind-theme.svg)](https://www.npmjs.com/package/vite-tailwind-theme)

> **Created by [Alaa Abdallah](https://github.com/alaa-abdallah1)**

A powerful Vite plugin for generating dynamic Tailwind CSS themes with **automatic light/dark mode support** and **CSS variables**. This package provides a complete theming solution that generates CSS variables, handles color variants, and manages theme switching seamlessly.

⚡ **Dynamic Theme Generation**: Automatically generates CSS variables and color variants for both light and dark modes.

⚡ **CSS Variables Integration**: Uses CSS variables for runtime theme switching without rebuilding your application.

⚡ **Color Variant Generation**: Automatically creates color variants and handles color order reversal for dark themes.

⚡ **TypeScript Support**: Full TypeScript support with comprehensive type definitions and IntelliSense.

## Features

- 🌙 **Automatic Light/Dark Mode**: Intelligent theme switching with CSS variables and dynamic color generation
- 🎨 **CSS Variables Integration**: Runtime theme switching without rebuilding your application
- 🔄 **Color Variant Generation**: Automatically generates color variants from base colors
- 📱 **Responsive Design**: Theme works seamlessly across all device sizes
- 🔧 **Easy Configuration**: Simple setup with powerful customization options
- 🎯 **TypeScript Ready**: Full TypeScript support with comprehensive type definitions
- ♿ **Accessibility First**: WCAG compliant contrast ratios and accessibility features
- 🚀 **Vite Integration**: Optimized for Vite build system with fast HMR support

## Installation

Install the package with your preferred package manager:

```bash
# NPM
npm install vite-tailwind-theme

# Yarn
yarn add vite-tailwind-theme

# PNPM
pnpm add vite-tailwind-theme
```

## Usage

### Basic Setup

Import and use the theme configuration in your Tailwind CSS configuration:

```js
// tailwind.config.js
import { getTailwindConfig } from 'vite-tailwind-theme';

export default getTailwindConfig({
  content: ['./src/**/*.{html,js,ts,jsx,tsx,vue}'],
  // Your existing Tailwind configuration
});
```

### Advanced Configuration

Customize theme colors and extend functionality:

```js
// tailwind.config.js
import { getTailwindConfig, TwMainColorVariants } from 'vite-tailwind-theme';

export default getTailwindConfig(
  {
    content: ['./src/**/*.{html,js,ts,jsx,tsx,vue}'],
    theme: {
      extend: {
        colors: {
          // Custom colors will be automatically processed
          primary: {
            50: '#eff6ff',
            100: '#dbeafe',
            500: '#3b82f6',
            900: '#1e3a8a',
          },
          secondary: '#64748b',
        },
      },
    },
  },
  {
    // Extended theme configuration
    lightMainColor: TwMainColorVariants.gray,
    darkMainColor: TwMainColorVariants.neutral,
    lightVars: {
      '--custom-bg': '#ffffff',
      '--custom-text': '#000000',
    },
    darkVars: {
      '--custom-bg': '#1f2937',
      '--custom-text': '#f9fafb',
    },
  }
);
```

### Using Theme Classes

The package automatically generates CSS variables that work with Tailwind's utility classes:

```html
<!-- Background colors using generated CSS variables -->
<div class="bg-white dark:bg-gray-900">
  <!-- Text colors with automatic dark mode support -->
  <h1 class="text-gray-900 dark:text-white">Dynamic Theme Title</h1>
  
  <!-- Custom colors are automatically processed -->
  <div class="bg-primary-500 text-white p-4 rounded">
    Primary colored element
  </div>
  
  <!-- CSS variables are available for custom styling -->
  <div style="background-color: var(--bg-primary-500); color: var(--color-white);">
    Using CSS variables directly
  </div>
</div>
```

### Main Color Variants

The package supports multiple main color variants for automatic theme generation:

```typescript
import { TwMainColorVariants } from 'vite-tailwind-theme';

// Available main color variants:
// - TwMainColorVariants.gray
// - TwMainColorVariants.slate  
// - TwMainColorVariants.zinc
// - TwMainColorVariants.neutral
// - TwMainColorVariants.stone
```

### Theme Switching

Enable dark mode by adding the `dark` class to your document:

```js
// Toggle dark mode
function toggleTheme() {
  document.documentElement.classList.toggle('dark');
  localStorage.setItem('theme', 
    document.documentElement.classList.contains('dark') ? 'dark' : 'light'
  );
}

// Initialize theme based on user preference
function initializeTheme() {
  const savedTheme = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
}

// Call on page load
initializeTheme();
```

## API Reference

### `getTailwindConfig(config?, extended?)`

The main function for generating Tailwind configuration with theme support.

**Parameters:**
- `config` (optional): Partial Tailwind configuration object
- `extended` (optional): Extended theme configuration object

**Returns:** Complete Tailwind configuration with theme support

### Extended Configuration Options

```typescript
interface ITwExtendedType {
  lightVars?: TwColors;           // Custom CSS variables for light mode
  darkVars?: TwColors;            // Custom CSS variables for dark mode  
  lightMainColor?: TwMainColorVariants;  // Main color variant for light theme
  darkMainColor?: TwMainColorVariants;   // Main color variant for dark theme
}
```

### Utility Functions

The package also exports utility functions for advanced use cases:

```typescript
import { 
  getTwColors,
  getTwLightVars, 
  getTwDarkVars,
  generateColorVariants,
  reverseColorOrder,
  getColors,
  getTwColorsAndVars
} from 'vite-tailwind-theme';

// Generate Tailwind-compatible colors with CSS variables
const colors = getTwColors({ 
  colors: { primary: '#3b82f6' },
  prefix: 'color' 
});

// Generate CSS variables for light mode
const lightVars = getTwLightVars({
  colors: { primary: '#3b82f6' },
  mainColor: TwMainColorVariants.gray
});

// Generate CSS variables for dark mode
const darkVars = getTwDarkVars({
  colors: { primary: '#3b82f6' },
  mainColor: TwMainColorVariants.neutral
});

// Generate color variants from a main color
const variants = generateColorVariants({
  colors: { neutral: { 50: '#fafafa', 900: '#171717' } },
  mainColor: TwMainColorVariants.neutral,
  isDark: false
});

// Reverse color order for dark mode
const reversedColors = reverseColorOrder({
  50: '#fafafa',
  100: '#f5f5f5', 
  900: '#171717',
  DEFAULT: '#737373'
});

// Advanced color processing
const processedColors = getColors({
  colors: { primary: { 50: '#eff6ff', 900: '#1e3a8a' } },
  isDark: true,
  isFlat: false,
  prefix: 'color',
  returnVars: true,
  hasValueVariables: true
});

// Generate both colors and variables in one call
const { colors, variables } = getTwColorsAndVars({
  colors: { primary: '#3b82f6' },
  isDark: false,
  mainColor: TwMainColorVariants.gray
});
```

## Detailed API Documentation

### Core Functions

#### `getTailwindConfig(config?, extended?)`

**Description:** Main function that generates a complete Tailwind CSS configuration with theme support.

**Parameters:**
- `config` (optional): Partial Tailwind configuration object
- `extended` (optional): Extended theme configuration

**Returns:** Complete Tailwind configuration with automatic CSS variable generation

**Example:**
```typescript
const config = getTailwindConfig({
  content: ['./src/**/*.{html,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: { primary: '#3b82f6' }
    }
  }
}, {
  lightMainColor: TwMainColorVariants.gray,
  darkMainColor: TwMainColorVariants.neutral
});
```

#### `generateColorVariants({ colors, isDark, mainColor })`

**Description:** Generates color variants from a base color configuration, with automatic dark mode adjustments.

**Parameters:**
- `colors`: Color configuration object
- `isDark` (optional): Whether to apply dark mode transformations
- `mainColor`: Main color variant to use as base

**Returns:** Object with generated color variants

**Example:**
```typescript
const variants = generateColorVariants({
  colors: { gray: { 50: '#f9fafb', 900: '#111827' } },
  isDark: true,
  mainColor: TwMainColorVariants.gray
});
```

#### `reverseColorOrder(colors)`

**Description:** Reverses the numeric order of color shades for dark mode theming.

**Parameters:**
- `colors`: Color object with numeric and named properties

**Returns:** Color object with reversed numeric order

**Example:**
```typescript
const reversed = reverseColorOrder({
  50: '#fafafa',
  100: '#f5f5f5',
  900: '#171717',
  DEFAULT: '#737373'
});
// Result: { 50: '#171717', 100: '#f5f5f5', 900: '#fafafa', DEFAULT: '#737373' }
```

#### `getColors(options)`

**Description:** Core function that recursively processes color configurations to generate CSS variables and color mappings.

**Parameters:**
- `options.colors`: Base colors to process
- `options.isDark` (optional): Enable dark mode processing
- `options.isFlat` (optional): Flatten nested objects
- `options.prefix` (optional): CSS variable prefix (default: 'color')
- `options.returnVars` (optional): Return CSS variables vs raw values
- `options.hasValueVariables` (optional): Use CSS variables in values
- `options.mainColor` (optional): Main color variant for generation

**Returns:** Processed color configuration

#### `getTwColorsAndVars({ colors, isDark, mainColor })`

**Description:** Generates both Tailwind colors and CSS variables in a single operation.

**Parameters:**
- `colors`: Color configuration
- `isDark` (optional): Dark mode flag
- `mainColor`: Main color variant

**Returns:** Object with `variables` and `colors` properties

### Type Definitions

#### `TwMainColorVariants`

Available main color variants:
```typescript
enum TwMainColorVariants {
  gray = "gray",
  zinc = "zinc", 
  stone = "stone",
  slate = "slate",
  neutral = "neutral"
}
```

#### `ITwExtendedType`

Extended configuration interface:
```typescript
interface ITwExtendedType {
  lightVars?: TwColors;           // Custom light mode CSS variables
  darkVars?: TwColors;            // Custom dark mode CSS variables
  lightMainColor?: TwMainColorVariants;  // Light theme main color
  darkMainColor?: TwMainColorVariants;   // Dark theme main color
}
```

#### `ITwConvertOptions`

Advanced color processing options:
```typescript
interface ITwConvertOptions {
  colors: TwColors;
  prefix?: string;                // CSS variable prefix
  isDark?: boolean;              // Dark mode flag
  isFlat?: boolean;              // Flatten nested objects
  parentKey?: string;            // Parent key for nesting
  returnVars?: boolean;          // Return CSS variables
  hasKeyVariables?: boolean;     // Use CSS variables as keys
  hasValueVariables?: boolean;   // Use CSS variables in values
  mainColor?: TwMainColorVariants; // Main color variant
}
```

## Troubleshooting

### Common Issues

#### CSS Variables Not Working

**Problem:** CSS variables are not being applied correctly.

**Solution:**
1. Ensure your HTML has the `dark` class when in dark mode
2. Check that CSS variables are being generated (inspect element to see `:root` styles)
3. Verify Tailwind CSS is properly configured and built

```html
<!-- Correct: -->
<html class="dark">
  <!-- Your content -->
</html>
```

#### Colors Not Changing in Dark Mode

**Problem:** Colors remain the same in both light and dark modes.

**Solution:**
1. Make sure you're using the `dark:` variant classes
2. Verify that `darkMode: 'class'` is set in your Tailwind config
3. Check that the dark theme CSS variables are generated

```css
/* Check for these in your generated CSS: */
:root { --color-gray-900: #111827; }
.dark { --color-gray-900: #f9fafb; }
```

#### Type Errors

**Problem:** TypeScript errors when importing types.

**Solution:**
Make sure you're importing from the correct path:
```typescript
// Correct:
import type { ITwExtendedType } from 'vite-tailwind-theme';

// Incorrect:
import type { ITwExtendedType } from 'vite-tailwind-theme/types';
```

### Migration Guide

#### From v1.0.x to v1.0.19+

No breaking changes. The API remains the same with improved TypeScript definitions.

#### From Other Theme Libraries

If migrating from other Tailwind theme libraries:

1. **Replace plugin imports:**
```typescript
// Old:
plugins: [require('some-other-theme')]

// New:
export default getTailwindConfig(config, extended);
```

2. **Update CSS variable usage:**
```css
/* Old approach: */
.my-class { color: theme('colors.primary.500'); }

/* New approach: */
.my-class { color: var(--color-primary-500); }
```

3. **Update theme configuration:**
```typescript
// Old structure:
module.exports = {
  theme: { colors: { /* colors */ } },
  plugins: [/* plugins */]
}

// New structure:
export default getTailwindConfig({
  theme: { extend: { colors: { /* colors */ } } }
}, {
  lightMainColor: TwMainColorVariants.gray
});
```

## Performance Considerations

### Build Time

- The package generates CSS variables at build time, not runtime
- Color processing happens during Tailwind CSS compilation
- Minimal impact on build performance

### Runtime Performance

- CSS variables enable instant theme switching without page reload
- No JavaScript required for theme application
- Leverages browser-native CSS variable support

### Bundle Size

- Zero runtime JavaScript dependencies
- Only adds CSS variables to your stylesheet
- TypeScript definitions don't affect bundle size

## Best Practices

### Theme Switching

```typescript
// ✅ Good: Persist user preference
function setTheme(theme: 'light' | 'dark') {
  document.documentElement.classList.toggle('dark', theme === 'dark');
  localStorage.setItem('theme', theme);
}

// ✅ Good: Respect system preference
function initTheme() {
  const saved = localStorage.getItem('theme');
  const systemPrefersDark = matchMedia('(prefers-color-scheme: dark)').matches;
  setTheme(saved as 'light' | 'dark' || (systemPrefersDark ? 'dark' : 'light'));
}
```

### Color Naming

```typescript
// ✅ Good: Semantic color names
const colors = {
  primary: '#3b82f6',
  secondary: '#64748b',
  success: '#10b981',
  warning: '#f59e0b',
  error: '#ef4444'
};

// ❌ Avoid: Generic color names only
const colors = {
  blue: '#3b82f6',
  gray: '#64748b'
};
```

### CSS Variable Usage

```html
<!-- ✅ Good: Use Tailwind classes when possible -->
<div class="bg-primary-500 text-white">Content</div>

<!-- ✅ Good: Use CSS variables for custom styling -->
<div style="background: linear-gradient(var(--bg-primary-500), var(--bg-primary-600))">
  Gradient background
</div>

<!-- ❌ Avoid: Hardcoded colors -->
<div style="background-color: #3b82f6">Content</div>
```

### Advanced Configuration

Customize the dark theme colors and components:

```js
// tailwind.config.js
module.exports = {
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        // Custom dark theme colors
        dark: {
          50: "#f8fafc",
          100: "#f1f5f9",
          // ... more shades
          900: "#0f172a",
        },
      },
    },
  },
  plugins: [
    require("@payiano/tailwind-dark-theme")({
      // Custom configuration options
      prefix: "dark",
      colors: {
        primary: "#3b82f6",
        secondary: "#64748b",
        // ... custom color overrides
      },
    }),
  ],
};
```

## Examples

### Component Examples

Here are examples using the generated CSS variables and automatic theme switching:

```html
<!-- Card Component with automatic theme support -->
<div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
  <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-4">
    Dynamic Theme Card
  </h2>
  <p class="text-gray-600 dark:text-gray-300">
    This card automatically adapts to light/dark themes using CSS variables.
  </p>
</div>

<!-- Form with CSS variables -->
<form class="space-y-4">
  <input
    type="text"
    placeholder="Enter your name"
    class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md 
           bg-white dark:bg-gray-700 text-gray-900 dark:text-white
           focus:ring-2 focus:ring-primary-500"
  />

  <button
    type="submit"
    class="w-full bg-primary-600 hover:bg-primary-700 text-white 
           font-medium py-2 px-4 rounded-md transition-colors"
    style="background-color: var(--bg-primary-600)"
  >
    Submit with CSS Variables
  </button>
</form>

<!-- Using generated color variants -->
<div class="grid grid-cols-1 md:grid-cols-3 gap-4">
  <div class="bg-primary-100 dark:bg-primary-900 p-4 rounded">Light variant</div>
  <div class="bg-primary-500 text-white p-4 rounded">Medium variant</div>
  <div class="bg-primary-900 dark:bg-primary-100 text-white dark:text-black p-4 rounded">
    Dark variant
  </div>
</div>
```

### React Integration Example

```tsx
import React, { useState, useEffect } from 'react';

const ThemeToggle: React.FC = () => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // Initialize theme
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const shouldBeDark = savedTheme === 'dark' || (!savedTheme && prefersDark);
    
    setIsDark(shouldBeDark);
    document.documentElement.classList.toggle('dark', shouldBeDark);
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    document.documentElement.classList.toggle('dark', newTheme);
    localStorage.setItem('theme', newTheme ? 'dark' : 'light');
  };

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700 
                 text-gray-800 dark:text-gray-200 transition-colors"
    >
      {isDark ? '🌞' : '🌙'} Toggle Theme
    </button>
  );
};
```

## Browser Support

- Chrome 76+ (CSS Variables support)
- Firefox 68+ (CSS Variables support)
- Safari 12.1+ (CSS Variables support)  
- Edge 79+ (CSS Variables support)

## TypeScript Support

The package includes comprehensive TypeScript definitions:

```typescript
import type { 
  ITwExtendedType, 
  TwMainColorVariants,
  TwColors,
  ITwConvertOptions 
} from 'vite-tailwind-theme';

// All types are exported for advanced usage
const extendedConfig: ITwExtendedType = {
  lightMainColor: TwMainColorVariants.gray,
  darkMainColor: TwMainColorVariants.neutral,
  lightVars: {
    '--custom-primary': '#3b82f6'
  },
  darkVars: {
    '--custom-primary': '#1d4ed8'
  }
};
```

## Contributing

Contributions are welcome! Please open issues or pull requests if you want to suggest improvements or fixes.

### Development Setup

```bash
# Clone the repository
git clone https://github.com/alaa-abdallah1/vite-tailwind-theme.git
cd vite-tailwind-theme

# Install dependencies
npm install

# Start development (TypeScript watch mode)
npm run dev

# Build for production
npm run build

# Run linting
npm run lint

# Fix linting issues
npm run lint:fix
```

### Development Commands

```bash
npm run dev         # Start TypeScript watch mode
npm run build       # Build production files
npm run lint        # Run ESLint
npm run lint:fix    # Fix ESLint issues automatically
npm run release     # Build and publish to npm
```

### Project Structure

```
src/
├── constants/      # Default color definitions
├── types/         # TypeScript type definitions  
├── utils/         # Core utility functions
│   ├── generators.ts  # Color generation and processing
│   ├── general.ts     # General utility functions
│   └── theme.ts       # Theme-specific utilities
├── config.ts      # Main configuration generator
└── index.ts       # Package exports
```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

If you encounter any issues or have questions:

- 📝 [Open an issue](https://github.com/alaa-abdallah1/vite-tailwind-theme/issues)
- 💬 [Start a discussion](https://github.com/alaa-abdallah1/vite-tailwind-theme/discussions)

## Changelog

### v1.0.19
- Improved TypeScript definitions
- Enhanced color variant generation
- Better CSS variable handling

---

**Created with ❤️ by [Alaa Abdallah](https://github.com/alaa-abdallah1)**
