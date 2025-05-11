# Tarot Cards Monorepo

This is a monorepo managed with Turborepo containing two packages:

- `@tarot-cards/mobile`: A React Native / Expo mobile application
- `@tarot-cards/backend`: A Node.js Express backend API

## Setup

```bash
# Install dependencies for all packages
yarn install
```

## Using Turborepo

This project uses Turborepo to manage the build system. See [TURBOREPO.md](./TURBOREPO.md) for detailed documentation.

```bash
# Build all packages
yarn build

# Start all packages in development mode
yarn dev

# Run all packages
yarn start

# Build or run a specific package
yarn turbo build --filter=@tarot-cards/backend
yarn turbo dev --filter=@tarot-cards/mobile
```

## Mobile App

```bash
# Start the Expo development server
yarn turbo dev --filter=@tarot-cards/mobile

# Run on iOS
yarn workspace @tarot-cards/mobile ios

# Run on Android
yarn workspace @tarot-cards/mobile android
```

## Backend

```bash
# Start the backend in development mode
yarn turbo dev --filter=@tarot-cards/backend

# Build the backend
yarn turbo build --filter=@tarot-cards/backend

# Start the backend in production mode
yarn turbo start --filter=@tarot-cards/backend
```

## Development

```bash
# Lint all code
yarn lint

# Format all code
yarn format

# Clean all build artifacts and node_modules
yarn clean
``` 