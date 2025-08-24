// Design tokens for European Luxury furniture store
export const tokens = {
  colors: {
    // Primary Colors (Forest Green palette)
    primary: {
      900: '#1e3a1f',    // Dark forest green
      800: '#25462a',    // Darker medium
      700: '#2d5530',    // Medium forest green
      600: '#356238',    // Medium-light
      500: '#3d7c47',    // Main brand green
      400: '#579960',    // Light medium
      300: '#7cb083',    // Light green
      200: '#a8cfa8',    // Very light
      100: '#e8f4e9',    // Very light green
      50: '#f4f9f4',     // Ultra light
    },
    
    // Secondary Colors (Warm Brown palette)
    secondary: {
      800: '#5a4a3a',    // Warm brown
      700: '#6b5a47',    // Medium brown
      600: '#8b7355',    // Light brown
      500: '#a68b5b',    // Lighter brown
      400: '#c4a373',    // Very light brown
      300: '#d9c296',    // Cream brown
      200: '#f4f0e8',    // Cream
      100: '#faf8f2',    // Very light cream
    },
    
    // Accent Colors
    accent: {
      gold: '#d4af37',   // Luxury gold
      warm: '#f7931e',   // Warm orange
      copper: '#b87333', // Copper accent
    },
    
    // Neutrals (Enhanced gray scale)
    gray: {
      900: '#1a1a1a',    // Almost black
      800: '#262626',    // Very dark gray
      700: '#374151',    // Dark gray
      600: '#4b5563',    // Medium dark
      500: '#6b7280',    // Medium gray
      400: '#9ca3af',    // Light medium
      300: '#d1d5db',    // Light gray
      200: '#e5e7eb',    // Very light gray
      100: '#f9fafb',    // Ultra light gray
      50: '#fefefe',     // Near white
    },
    
    // State Colors
    states: {
      success: '#10b981', // Green success
      warning: '#f59e0b', // Amber warning
      error: '#ef4444',   // Red error
      info: '#3b82f6',    // Blue info
    },
  },
  
  // Typography Scale
  typography: {
    fontSizes: {
      xs: '0.75rem',      // 12px
      sm: '0.875rem',     // 14px
      base: '1rem',       // 16px
      lg: '1.125rem',     // 18px
      xl: '1.25rem',      // 20px
      '2xl': '1.5rem',    // 24px
      '3xl': '1.875rem',  // 30px
      '4xl': '2.25rem',   // 36px
      '5xl': '3rem',      // 48px
      '6xl': '3.75rem',   // 60px
    },
    
    fontWeights: {
      light: 300,
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
      extrabold: 800,
    },
    
    lineHeights: {
      none: 1,
      tight: 1.25,
      snug: 1.375,
      normal: 1.5,
      relaxed: 1.625,
      loose: 2,
    },
  },
  
  // Spacing System (8-point grid)
  spacing: {
    0: '0',
    px: '1px',
    0.5: '0.125rem',    // 2px
    1: '0.25rem',       // 4px
    1.5: '0.375rem',    // 6px
    2: '0.5rem',        // 8px
    2.5: '0.625rem',    // 10px
    3: '0.75rem',       // 12px
    3.5: '0.875rem',    // 14px
    4: '1rem',          // 16px
    5: '1.25rem',       // 20px
    6: '1.5rem',        // 24px
    7: '1.75rem',       // 28px
    8: '2rem',          // 32px
    9: '2.25rem',       // 36px
    10: '2.5rem',       // 40px
    11: '2.75rem',      // 44px
    12: '3rem',         // 48px
    14: '3.5rem',       // 56px
    16: '4rem',         // 64px
    20: '5rem',         // 80px
    24: '6rem',         // 96px
    28: '7rem',         // 112px
    32: '8rem',         // 128px
  },
  
  // Border Radius
  borderRadius: {
    none: '0',
    sm: '0.125rem',     // 2px
    DEFAULT: '0.25rem', // 4px
    md: '0.375rem',     // 6px
    lg: '0.5rem',       // 8px
    xl: '0.75rem',      // 12px
    '2xl': '1rem',      // 16px
    '3xl': '1.5rem',    // 24px
    full: '9999px',
  },
  
  // Shadows
  boxShadow: {
    sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    DEFAULT: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
    md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
    lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
    xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
    '2xl': '0 25px 50px -12px rgb(0 0 0 / 0.25)',
  },
  
  // Transitions
  transitions: {
    none: 'none',
    all: 'all 150ms cubic-bezier(0.4, 0, 0.2, 1)',
    DEFAULT: 'all 150ms cubic-bezier(0.4, 0, 0.2, 1)',
    colors: 'color, background-color, border-color, text-decoration-color, fill, stroke 150ms cubic-bezier(0.4, 0, 0.2, 1)',
    opacity: 'opacity 150ms cubic-bezier(0.4, 0, 0.2, 1)',
    shadow: 'box-shadow 150ms cubic-bezier(0.4, 0, 0.2, 1)',
    transform: 'transform 150ms cubic-bezier(0.4, 0, 0.2, 1)',
  },
};