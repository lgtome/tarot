# Tarot Cards App

A React Native mobile application for tarot card readings with internationalization support using Expo.

## Features

- Beautiful, mystical UI design with green and gold color scheme
- Tarot card reading functionality
- Daily card readings
- Past, present, and future spread
- Card interpretations
- Multi-language support with i18n
- Smooth animations and transitions

## Design Implementation

The app has been implemented according to the provided design mockup:

- Dark background with mystical feel
- Gold text and accents
- Beautiful tarot card designs with decorative elements
- Clean, intuitive user interface

## Tech Stack

- React Native
- Expo
- TypeScript
- React Navigation
- i18next for internationalization
- React Native Safe Area Context

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- Yarn package manager
- Expo CLI
- iOS Simulator (for Mac) or Android Emulator

### Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/tarot-cards.git
cd tarot-cards
```

2. Install dependencies:

```bash
yarn install
```

3. Start the development server:

```bash
yarn start
```

4. Run on iOS or Android:

```bash
yarn ios
# or
yarn android
```

## Project Structure

```
tarot-cards/
├── src/
│   ├── assets/            # Images, fonts, and other static assets
│   ├── components/        # Reusable UI components
│   ├── i18n/              # Internationalization setup
│   │   └── locales/       # Translation files by language
│   ├── navigation/        # Navigation setup and routing
│   ├── screens/           # App screens
│   ├── hooks/             # Custom React hooks
│   └── styles/            # Theme and global styles
├── App.tsx                # Main app component
└── ...config files
```

## Path Aliases

This project uses TypeScript path aliases to make imports cleaner and more maintainable. The following aliases are available:

```
@/*              -> src/*
@components/*    -> src/components/*
@screens/*       -> src/screens/*
@navigation/*    -> src/navigation/*
@hooks/*         -> src/hooks/*
@styles/*        -> src/styles/*
@assets/*        -> src/assets/*
@i18n/*          -> src/i18n/*
@types/*         -> src/types/*
```

Example usage:

```typescript
// Instead of this:
import Button from '../../../components/Button';
import { theme } from '../../../styles/theme';

// You can use this:
import Button from '@components/Button';
import { theme } from '@styles/theme';
```

## Adding New Languages

1. Create a new file in `src/i18n/locales/` with the language code (e.g., `fr.ts` for French)
2. Add translations following the same structure as the English file
3. Import and add the new language in `src/i18n/index.ts`

## Notes on Images

For the app to work properly, you need to add the following image assets:

- `src/assets/images/background.png` - Dark green/black background
- `src/assets/images/card-back.png` - Tarot card back design
- `assets/icon.png` - App icon
- `assets/splash.png` - Splash screen

## License

MIT
