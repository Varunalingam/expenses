# Architecture Guide: Expenses Mobile App

## 1. Overview & Architectural Goals

The **Expenses** application is a cross-platform mobile application built with React Native and TypeScript. It is designed to be:

- **Modular & Feature-Driven**: Domain logic is grouped by feature slices to ensure high cohesion and loose coupling.
- **Offline-First & Responsive**: Local state and persistence drive the UI immediately, minimizing latency and supporting offline access.
- **Strictly Typed & Maintainable**: 100% TypeScript coverage with clear separation between presentation, state, and native infrastructure.
- **High Performance Tooling**: Rust-powered oxidation toolchain (**oxlint** + **oxfmt**) providing sub-second linting and formatting without legacy ESLint/Prettier overhead.
- **Curated Asset System**: All visual iconography and illustrations utilize downloaded asset files from [Icons8](https://icons8.com) to maintain consistent, cohesive visual language across platforms.

---

## 2. Directory Structure

```text
my-app/
├── ios/                          # Native iOS project (Xcode, CocoaPods, AppDelegate)
├── android/                      # Native Android project (Gradle, MainActivity, Manifest)
│
├── src/
│   ├── navigation/               # React Navigation setup, stacks, tabs, typed routes
│   ├── screens/                  # Top-level screen components mounted by navigators
│   ├── features/                 # Domain logic organized by feature slices
│   │   └── [feature-name]/       # e.g., expenses, budgets, analytics, categories
│   │       ├── components/       # Feature-specific UI components
│   │       ├── hooks/            # Feature-specific hooks and business logic
│   │       ├── services/         # Feature API/persistence calls
│   │       └── types/            # Feature-scoped type definitions
│   ├── components/               # Shared, domain-agnostic reusable UI
│   │   ├── ui/                   # Atoms/molecules: Button, Input, Card, Badge, Text, Icon
│   │   └── layout/               # ScreenWrapper, Container, Spacer, Row, Column
│   ├── hooks/                    # Global/shared custom React hooks
│   ├── lib/                      # Client setup (storage, API client, analytics, logger)
│   ├── native/                   # Native module bridges, turbo modules, platform wrappers
│   ├── store/                    # Global state management and stores
│   ├── theme/                    # Design tokens (colors, typography, spacing, shadows)
│   ├── types/                    # Shared TypeScript definitions (navigation, models)
│   ├── utils/                    # Pure utility functions (currency, date, math)
│   └── constants/                # Global static constants (storage keys, configs, icon mapping)
│
├── assets/
│   ├── images/                   # Static raster images and illustrations (downloaded from icons8.com)
│   ├── fonts/                    # Custom font families (otf, ttf)
│   └── icons/                    # Downloaded icon asset files from icons8.com (.png, .svg)
│
├── App.tsx                       # Root component: sets up providers & RootNavigator
├── index.js                      # Application entry point registered with AppRegistry
├── metro.config.js               # Metro bundler configuration
├── babel.config.js               # Babel compiler configuration
├── tsconfig.json                 # TypeScript compiler configuration
├── .oxlintrc.json                # Oxlint rules and React Native plugins
├── .oxfmtrc.json                 # Oxfmt configuration
└── package.json                  # Dependencies, scripts, and package metadata
```

---

## 3. Layer Responsibilities & Boundaries

### 3.1. Navigation (`src/navigation/`)

- Manages routing using React Navigation (Native Stack Navigator, Bottom Tab Navigator).
- Defines strongly typed navigation parameter lists (`RootStackParamList`, `MainTabParamList`).
- Encapsulates authentication routing vs. authenticated main application flows.
- Screens should not manage cross-stack transitions directly; they use typed navigation hooks (`useNavigation`, `useRoute`).

### 3.2. Screens (`src/screens/`)

- Screens are top-level containers mounted by navigators.
- **Responsibilities**:
  - Receive route params and unpack them.
  - Coordinate high-level feature components.
  - Handle screen-level wrappers (e.g. `ScreenWrapper`, status bar settings, screen analytics events).
- Keep screens lean; complex interaction and presentation logic belong inside `src/features/[feature]/` or `src/components/`.

### 3.3. Features (`src/features/`)

- Domain-driven slices that encapsulate everything needed for a distinct business capability.
- **Typical Feature Slices**:
  - `expenses`: Expense entry, expense list, receipt attachment, expense filtering.
  - `categories`: Category management, icon selection from Icons8 assets, color coding.
  - `budgets`: Budget goals, threshold alerts, spending limits.
  - `analytics`: Spending charts, monthly comparisons, export/reports.
- **Internal Feature Structure**:
  - `components/`: UI components exclusive to this feature.
  - `hooks/`: Business logic, calculations, query wrappers.
  - `services/`: Local database queries (e.g. SQLite / MMKV) or network calls.
  - `types/`: Types unique to this domain slice.

### 3.4. Shared Components (`src/components/`)

- **`ui/`**: Pure presentational building blocks without domain logic (Buttons, Inputs, Cards, Modals, Typography, and a generic `Icon` component rendering Icons8 assets).
- **`layout/`**: Structural layout helpers (`ScreenWrapper`, `Spacer`, `Row`, `KeyboardAvoidingWrapper`).
- Must strictly use design tokens from `src/theme/`.

### 3.5. Library / Infrastructure (`src/lib/`)

- Encapsulates third-party infrastructure and client initializations:
  - `storage.ts`: Key-value storage abstraction (MMKV or AsyncStorage).
  - `api.ts`: HTTP client / fetch wrapper with authentication interceptors.
  - `analytics.ts`: Event tracking and crash reporting abstractions.
  - `database.ts`: Local database connection and schema setup if using SQLite/WatermelonDB.

### 3.6. Native Bridges (`src/native/`)

- Isolates platform-specific native code and TurboModules.
- Provides TypeScript interfaces over native events, device hardware (biometrics, camera, haptics), or custom native modules.
- Ensures graceful fallbacks when running on unsupported platforms or test environments.

### 3.7. Global State (`src/store/`)

- Manages cross-cutting state: user profile, active currency, theme mode (light/dark/system), network status, and app configuration.
- Feature-specific state is kept inside its respective `src/features/` slice unless required across multiple disjoint features.

### 3.8. Theme & Design Tokens (`src/theme/`)

- Defines design primitives:
  - `colors`: Palette, semantic tokens (`background`, `surface`, `primary`, `danger`, `textPrimary`).
  - `typography`: Font families, font weights, scale sizes, line heights.
  - `spacing`: 4pt/8pt grid spacing constants (`xs`, `sm`, `md`, `lg`, `xl`).
  - `radii` & `shadows`: Elevation and border radius presets.
- Exposes theme hooks/providers for dynamic light and dark theme switching.

### 3.9. Utilities & Types (`src/utils/` & `src/types/`)

- `utils/`: Pure functions with zero side-effects (e.g. `formatCurrency(amount, currency)`, `formatDate(date)`, `validateAmount(val)`).
- `types/`: Common entities across features (e.g. `Currency`, `DateRange`, `ID`).

---

## 4. Visual Asset Management (Icons8)

All icons and graphical illustrations in the application are standardized on downloaded asset files from [Icons8](https://icons8.com).

### 4.1. Asset Storage & Naming

- Downloaded icon files are saved in `assets/icons/`.
- Downloaded illustrations or badges are saved in `assets/images/`.
- **Naming Standard**: Files must be named with a descriptive, lowercase kebab-case prefix `icons8-[name]-[size].[ext]` or `icons8-[name].[ext]`:
  - Examples:
    - `assets/icons/icons8-wallet-48.png`
    - `assets/icons/icons8-receipt-48.png`
    - `assets/icons/icons8-pie-chart-48.png`
    - `assets/icons/icons8-tag-48.png`
    - `assets/icons/icons8-settings-48.png`

### 4.2. Style Consistency

- Stick to a single cohesive Icons8 design style across the application (e.g. _Color_, _iOS Glyphs_, or _Material_).
- Provide density variants (`@2x`, `@3x`) for raster PNG assets to ensure sharpness on high-DPI retina displays.

### 4.3. Asset Registry & Consumption

- Avoid loose `require(...)` calls scattered through screen code. Register all Icons8 assets in a central catalog (e.g. `src/constants/icons.ts`) and consume them via a shared `Icon` component (`src/components/ui/Icon.tsx`):
  ```typescript
  // src/constants/icons.ts
  export const ICONS = {
    wallet: require('../../assets/icons/icons8-wallet-48.png'),
    receipt: require('../../assets/icons/icons8-receipt-48.png'),
    chart: require('../../assets/icons/icons8-pie-chart-48.png'),
    tag: require('../../assets/icons/icons8-tag-48.png'),
    settings: require('../../assets/icons/icons8-settings-48.png'),
  } as const;

  export type IconName = keyof typeof ICONS;
  ```

### 4.4. Attribution

- In accordance with Icons8 licensing, attribute Icons8 in the application settings / "About" screen with a link to [https://icons8.com](https://icons8.com) (unless a commercial license without attribution is active).

---

## 5. Architectural Patterns & Data Flow

```mermaid
flowchart TD
    User([User Action]) --> Screen[Screen Container]
    Screen --> FeatureComp[Feature Component]
    FeatureComp --> FeatureHook[Feature Hook / Logic]
    FeatureHook --> Store[Global / Slice Store]
    FeatureHook --> LibStorage[Storage / API Client]
    Store -.-> UIUpdate[State Update]
    LibStorage -.-> FeatureHook
    UIUpdate --> FeatureComp
```

1. **Unidirectional Data Flow**: State flows down via props and context/store selectors; events flow up via handlers.
2. **Separation of Concerns**: UI components render data and dispatch user intents; hooks contain business and data-fetching logic; services handle I/O.
3. **Immutability**: All state updates must treat state objects and collections as immutable.
4. **Offline First**: All expense mutations write to persistent local storage immediately, queuing remote sync if a backend is attached.

---

## 6. Tooling, Linting & Formatting Standards

- **Formatter**: **oxfmt** (`.oxfmtrc.json`)
  - Fast Prettier-compatible formatting.
  - Ignores native code directories (`ios/`, `android/`, `.bundle/`).
- **Linter**: **oxlint** (`.oxlintrc.json`)
  - High-performance Rust linter.
  - Configured with `react`, `typescript`, `jest`, `unicorn`, and `oxlint-plugin-react-native`.
  - Enforces `react-native/no-unused-styles`, `react-native/no-inline-styles`, and `react-native/no-single-element-style-arrays`.
- **Git Hooks**: **Husky** (`.husky/pre-commit`)
  - Automatically runs `npm run "format&lint"` on every commit.
