# WakilniTest - React Native Project

A React Native mobile application built with TypeScript and modern architecture patterns.

## Project Structure

```
WakilniTest/
├── android/                 # Android-specific native code and configuration
│   ├── app/                # Main Android application module
│   ├── gradle/             # Gradle wrapper and configuration
│   └── build.gradle        # Project-level build configuration
├── ios/                    # iOS-specific native code and configuration
│   ├── WakilniTest/        # Main iOS application bundle
│   ├── Pods/               # CocoaPods dependencies
│   └── Podfile             # iOS dependency management
├── src/                    # Main source code directory
│   ├── assets/             # Static assets (icons, images, themes)
│   │   ├── icons/          # SVG and PNG icon files
│   │   └── themes/         # Color schemes and styling constants
│   ├── common/             # Shared utilities and common types
│   ├── components/         # Reusable UI components
│   │   ├── loader/         # Loading/spinner components
│   │   ├── skeleton/       # Skeleton loading components
│   │   └── textField/      # Input field components
│   ├── constants/          # Application constants and mock data
│   ├── organisms/          # Complex UI components (following atomic design)
│   │   ├── home/           # Home screen components
│   │   ├── logout/         # Logout functionality components
│   │   ├── myOrders/       # Order management components
│   │   └── scanner/        # QR code scanner components
│   ├── screens/            # Main application screens
│   │   ├── home/           # Home screen implementation
│   │   ├── login/          # Authentication screen
│   │   ├── logout/         # Logout screen
│   │   ├── myOrders/       # Orders management screen
│   │   ├── scanner/        # Scanner screen
│   │   └── settings/       # Settings screen
│   ├── store/              # State management (Redux Toolkit)
│   │   ├── navigator/      # Navigation configuration
│   │   └── slices/         # Redux slices for state management
│   └── types/              # TypeScript type definitions
├── App.tsx                 # Main application component
├── index.js                # Application entry point
├── package.json            # Node.js dependencies and scripts
├── tsconfig.json           # TypeScript configuration
└── metro.config.js         # Metro bundler configuration
```

## Key Directories Explained

### `/src/assets/`
Contains all static assets including SVG icons, PNG images, and theme configurations for consistent styling across the app.

### `/src/components/`
Reusable UI components following atomic design principles. Includes basic components like loaders, skeletons, and text fields that can be used throughout the application.

### `/src/organisms/`
Complex UI components that combine multiple smaller components. Organized by feature (home, orders, scanner, etc.) to maintain clear separation of concerns.

### `/src/screens/`
Main application screens that represent different views/pages in the app. Each screen is a complete view that may use multiple organisms and components.

### `/src/store/`
State management using Redux Toolkit. Includes navigation configuration and state slices for different parts of the application.

### `/src/types/`
TypeScript type definitions and interfaces used throughout the application for type safety and better development experience.

## Technology Stack

- **Framework**: React Native
- **Language**: TypeScript
- **State Management**: Redux Toolkit
- **Navigation**: React Navigation
- **Package Manager**: Yarn
- **Build Tools**: Metro bundler, Gradle (Android), CocoaPods (iOS)

## Getting Started

1. Install dependencies: `yarn install`
2. iOS setup: `cd ios && pod install`
3. Run on iOS: `yarn ios`
4. Run on Android: `yarn android`

## Project Architecture

This project follows a feature-based architecture with clear separation of concerns:
- **Components**: Reusable UI elements
- **Organisms**: Complex feature-specific components
- **Screens**: Complete application views
- **Store**: Centralized state management
- **Types**: Shared type definitions

The structure promotes maintainability, reusability, and clear organization of code by feature rather than by technical concerns.
