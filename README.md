# 🎨 Tailwind Dark Theme

[![License: MIT](https://img.shields.io/badge/License-MIT-blue)](LICENSE)

> **Powered by [Payiano Team](https://payiano.com) | [GitHub](https://github.com/payiano)**

A comprehensive dark theme implementation for Tailwind CSS that provides **elegant dark mode styling** for modern web applications. This theme package offers carefully crafted color palettes, components, and utilities designed specifically for dark mode interfaces.

⚡ **Modern Dark Design**: Thoughtfully designed color schemes that reduce eye strain and provide excellent readability in low-light environments.

⚡ **Seamless Integration**: Easy to integrate with existing Tailwind CSS projects with minimal configuration changes.

⚡ **Comprehensive Coverage**: Includes dark variants for all common UI components, forms, navigation elements, and interactive states.

⚡ **Accessibility Focused**: Maintains WCAG compliance with proper contrast ratios and accessibility standards for dark themes.

## Features

- 🌙 **Complete Dark Mode Support**: Full dark theme implementation with carefully selected color palettes
- 🎨 **Custom Color Schemes**: Extended color system optimized for dark backgrounds
- 📱 **Responsive Design**: Dark theme works seamlessly across all device sizes
- 🔧 **Easy Configuration**: Simple setup and customization options
- 🎯 **Component Ready**: Pre-styled dark variants for common UI components
- ♿ **Accessibility First**: WCAG compliant contrast ratios and accessibility features

## Installation

Install the theme package with your preferred package manager:

```bash
# NPM
npm install @payiano/tailwind-dark-theme

# Yarn
yarn add @payiano/tailwind-dark-theme

# PNPM
pnpm add @payiano/tailwind-dark-theme
```

## Usage

### Basic Setup

Add the dark theme to your Tailwind CSS configuration:

```js
// tailwind.config.js
module.exports = {
  darkMode: "class", // or 'media'
  theme: {
    extend: {
      // Your existing theme extensions
    },
  },
  plugins: [require("@payiano/tailwind-dark-theme")],
};
```

### Using Dark Mode Classes

Apply dark mode styles using Tailwind's dark variant:

```html
<!-- Background that adapts to dark mode -->
<div class="bg-white dark:bg-gray-900">
  <!-- Text that adapts to dark mode -->
  <h1 class="text-gray-900 dark:text-white">Hello, Dark Mode!</h1>

  <!-- Button with dark mode variants -->
  <button
    class="bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 text-white px-4 py-2 rounded"
  >
    Click me
  </button>
</div>
```

### Toggling Dark Mode

Enable dark mode by adding the `dark` class to your HTML element:

```js
// Toggle dark mode
function toggleDarkMode() {
  document.documentElement.classList.toggle("dark");
}

// Set dark mode based on user preference
if (
  localStorage.theme === "dark" ||
  (!("theme" in localStorage) &&
    window.matchMedia("(prefers-color-scheme: dark)").matches)
) {
  document.documentElement.classList.add("dark");
} else {
  document.documentElement.classList.remove("dark");
}
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

Here are some examples of how components look with the dark theme:

```html
<!-- Card Component -->
<div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
  <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-4">
    Card Title
  </h2>
  <p class="text-gray-600 dark:text-gray-300">
    Card content with proper contrast for both light and dark modes.
  </p>
</div>

<!-- Form Elements -->
<form class="space-y-4">
  <input
    type="text"
    placeholder="Enter your name"
    class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md 
           bg-white dark:bg-gray-700 text-gray-900 dark:text-white
           focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
  />

  <button
    type="submit"
    class="w-full bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 
           text-white font-medium py-2 px-4 rounded-md transition-colors"
  >
    Submit
  </button>
</form>
```

## Browser Support

- Chrome 76+
- Firefox 68+
- Safari 12.1+
- Edge 79+

## Contributing

Contributions are welcome! Please open issues or pull requests if you want to suggest improvements or fixes.

### Development Setup

```bash
# Clone the repository
git clone https://github.com/payiano/tailwind-dark-theme.git
cd tailwind-dark-theme

# Install dependencies
npm install

# Start development
npm run dev

# Build for production
npm run build

# Run tests
npm test
```

### Development Commands

```bash
npm run dev     # Start development server
npm run build   # Build production files
npm run test    # Run tests
npm run lint    # Run ESLint
npm run format  # Format code with Prettier
```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

If you encounter any issues or have questions:

- 📝 [Open an issue](https://github.com/payiano/tailwind-dark-theme/issues)
- 💬 [Join our Discord](https://discord.gg/payiano)
- 📧 [Contact us](mailto:support@payiano.com)

## Sponsoring

If you find this project helpful, please consider supporting the Payiano team! Your support helps us continue developing high-quality open-source tools.

[![Sponsor Payiano](https://img.shields.io/badge/Sponsor-Payiano-blue?style=for-the-badge&logo=github-sponsors)](https://github.com/sponsors/payiano)

---

Made with ❤️ by the [Payiano Team](https://payiano.com)
