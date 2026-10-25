# Agent Operating Guidelines: Expenses Mobile App

This document defines the instructions, conventions, and invariants for AI agents contributing to this codebase. All
agents must adhere to these rules.

---

## 1. Core Tooling Invariants

1. **Oxlint & Oxfmt ONLY**:
   - **Do NOT** install, re-introduce, or run `eslint`, `prettier`, or `@react-native/eslint-config`.
   - All linting is handled by **oxlint** (`npm run lint`, `npm run lint:fix`).
   - All formatting is handled by **oxfmt** (`npm run format`, `npm run format:check`).
2. **Pre-Commit Verification**:
   - Always run `npm run "format&lint"` and `npm test` prior to submitting changes.
   - Note the double quotes around `\"format&lint\"` to prevent shells from interpreting `&` as a background process
     separator.
3. **Respect Config Files**:
   - Do not edit `.oxlintrc.json` or `.oxfmtrc.json` unless explicitly asked to adjust linting/formatting rules.
   - Native folders (`ios/`, `android/`, `.bundle/`) must remain excluded from JS linting/formatting.

---

## 2. Visual Assets & Icons (Icons8 Standard)

All icons and graphical illustrations in the application must use downloaded asset files
from [Icons8](https://icons8.com).

1. **File Locations**:
   - Icons: Store in `assets/icons/`.
   - Illustrations & large graphics: Store in `assets/images/`.
2. **Naming Convention**:
   - Use lowercase kebab-case with the `icons8-` prefix:
     `assets/icons/icons8-[name]-[size].[ext]` (e.g. `icons8-wallet-48.png`, `icons8-tag-48.png`).
3. **No Heavy Icon Fonts**:
   - Do **NOT** install monolithic vector icon font packages (e.g., `react-native-vector-icons`) that bloat native
     bundles.
   - Always rely on local, downloaded Icons8 asset files.
4. **Centralized Registration**:
   - Never use direct inline relative `require('../../assets/icons/...')` across multiple screens.
   - Register all icons in `src/constants/icons.ts` and expose a typed `Icon` component (`src/components/ui/Icon.tsx`).
5. **Attribution**:
   - Ensure the app settings or About screen preserves attribution to Icons8 ([https://icons8.com](https://icons8.com))
     in compliance with Icons8 licensing.

---

## 3. Code Organization & Placement Rules

When adding new files, always place them in the correct directory as defined in architecture.md:

| Artifact                        | Location                          | Rules                                                                                                 |
| :------------------------------ | :-------------------------------- | :---------------------------------------------------------------------------------------------------- |
| **New Screen**                  | `src/screens/`                    | Must be a thin container component, unpack route params, and delegate UI/logic to feature components. |
| **Domain Feature**              | `src/features/[feature]/`         | Self-contained domain modules containing `components/`, `hooks/`, `services/`, and `types/`.          |
| **Reusable UI Component**       | `src/components/ui/`              | Generic primitives (Button, Card, Input, Icon) with no business domain logic.                         |
| **Layout Component**            | `src/components/layout/`          | Structural components (ScreenWrapper, Spacer, Container, Row).                                        |
| **Shared Hook**                 | `src/hooks/`                      | General hooks (`useDebounce`, `useAppState`, `useKeyboard`). Domain hooks belong in `src/features/`.  |
| **Infrastructure / Client**     | `src/lib/`                        | Storage wrappers, network clients, logger, database drivers.                                          |
| **Native Bridge**               | `src/native/`                     | Platform modules, native event emitters, TurboModule wrappers.                                        |
| **Global State**                | `src/store/`                      | Cross-app state (user profile, currency, theme, connectivity).                                        |
| **Theme / Design Tokens**       | `src/theme/`                      | Colors, typography scales, spacing tokens, elevations.                                                |
| **Pure Utilities**              | `src/utils/`                      | Deterministic helper functions (currency formatters, date helpers). Must be unit tested.              |
| **Icons & Visual Assets**       | `assets/icons/`, `assets/images/` | Downloaded asset files from [icons8.com](https://icons8.com).                                         |
| **Icon Registries & Constants** | `src/constants/`                  | Centralized icon registries (`icons.ts`), storage keys, app configs.                                  |
| **Test Suites**                 | `__tests__/`                      | Unit and integration tests (Jest + react-test-renderer).                                              |
| **Agent Skills**                | `skills/`                         | Custom or system agent execution skills and workflows.                                                |

---

## 4. TypeScript & React Native Standards

### 4.1. Strict Typing

- Do not use `any`. Use `unknown` or define specific TypeScript interfaces/types.
- All component props must be explicitly typed with an `interface` or `type`.
- Navigation parameters must use React Navigation's `NativeStackScreenProps` or `CompositeScreenProps`.

### 4.2. Component Design & Styling

- Use functional components with hooks.
- Use `StyleSheet.create` for all styles.
- **Avoid inline styles**: `oxlint` enforces `react-native/no-inline-styles`. Dynamic styles (e.g. animated values or
  dynamic theme colors) should be composed cleanly:
  ```tsx
  <View style={[styles.card, { backgroundColor: theme.colors.surface }]} />
  ```
- No unused styles: `oxlint` enforces `react-native/no-unused-styles`. Remove obsolete style definitions immediately.
- Use `react-native-safe-area-context` for handling safe area insets rather than hardcoding status bar or bottom bar
  paddings.

### 4.3. Performance & Memory

- Wrap callbacks passed to child components with `useCallback` when child components are memoized or in lists.
- Use `FlatList` or `FlashList` for scrollable lists of variable length; never map over large arrays inside a
  `ScrollView`.
- Always supply stable, unique `keyExtractor` values for lists.

---

## 5. Guidelines for Updating Architecture Documentation (`architecture.md`)

At the conclusion of any set of changes that affects the architecture, agents **MUST**
update [architecture.md](file:///Users/varun/Library/CloudStorage/GoogleDrive-varunalingam.v@gmail.com/Other computers/My Laptop/Dev/TypeScript/expenses/architecture.md)
before finishing the task.

### 5.1. Trigger Conditions for Architecture Updates

Update `architecture.md` whenever you:

- **Add or Remove a Feature Slice**: Created a new domain module under `src/features/[feature]/` or changed an existing
  feature's boundaries.
- **Modify Directory Structure**: Added new top-level directories, subdirectories, or altered organizational hierarchy.
- **Alter Navigation Structure**: Added new stacks, tabs, modals, or altered the top-level navigation flow.
- **Change State Management or Persistence**: Added or updated global stores (`src/store/`), database layers (SQLite,
  WatermelonDB), or caching strategies (`src/lib/storage.ts`).
- **Introduce Native Bridges**: Added or updated TurboModules, native modules, or platform-specific bridges in
  `src/native/`.
- **Change Infrastructure or Libraries**: Replaced or integrated core third-party libraries (e.g. networking clients,
  analytics, animation engines).
- **Update Visual or Design Token Systems**: Changed the theming model, typography/spacing scales, or icon asset
  conventions.

### 5.2. Architecture Update Checklist

When updating `architecture.md`:

1. **Directory Tree**: Keep the directory diagram in Section 2 accurately reflecting all active folders.
2. **Layer Responsibilities**: Document any new service, layer, or boundary contracts in Section 3.
3. **Data Flow**: If state flow, storage flow, or offline-sync mechanisms changed, update the Mermaid diagram or textual
   explanation in Section 5.
4. **Accuracy**: Ensure the document represents the exact ground truth of the current codebase without speculative or
   outdated entries.

---

## 6. Development Workflow Checklist for Agents

Before completing any task, execute the following checklist in sequence:

- [ ] **Code Implementation**: Cleanly implemented according to directory and coding conventions.
- [ ] **Asset Guidelines**: All icons and illustrations are downloaded asset files from [Icons8](https://icons8.com),
      registered in `src/constants/icons.ts`.
- [ ] **Architecture Documentation**: If architectural patterns, directory structure, navigation, features, state, or
      libraries were added, altered, or removed, update architecture.md.
- [ ] **Formatting**: Run `npm run format` (or `npm run \"format&lint\"`).
- [ ] **Linting**: Run `npm run lint` — verify 0 errors and 0 warnings.
- [ ] **Testing**: Run `npm test` — ensure existing and new Jest tests pass.
- [ ] **Preserve Comments & Docs**: Ensure unrelated documentation or comments remain intact.
- [ ] **Clickable Links**: In the final response, provide markdown links with the `file://` scheme for modified/created
      files.

---

## 7. Working with Native Directories (`ios/` and `android/`)

- Modifying native code should be done with care:
  - If changes are made to iOS pods or Podfile, inform the user to run `bundle exec pod install` inside `ios/`.
  - If Gradle configs are modified, ensure Android dependencies and Kotlin versions remain compatible with React
    Native 0.87+.
- Native files must never be reformatted with `oxfmt` or linted with `oxlint`.

---

## 8. Testing Standards & Mocking Patterns

1. **Test Runner & Environment**:
   - All tests use Jest configured via `jest.config.js` with `@react-native/jest-preset`.
   - Run tests with `npm test`.
2. **Native Dependency Mocking**:
   - Native modules such as `react-native-screens` must be mocked in `jest.setup.js` rather than repeatedly mocked across individual test files.
3. **Renderer & Timing Lifecycle**:
   - Use `react-test-renderer` wrapped inside `ReactTestRenderer.act(...)` for UI rendering assertions.
   - For components with asynchronous layout callbacks or timers, guard the test suite with `jest.useFakeTimers()`, `jest.runOnlyPendingTimers()`, and restore with `jest.useRealTimers()`.
4. **Coverage Expectations**:
   - Every pure utility in `src/utils/` must have 100% test coverage in `__tests__/utils.test.ts`.
   - New screens and feature components must have rendering tests verifying clean mount and initial state display.

---

## 9. Safe Area & Layout Conventions

1. **Top-Level Screens**:
   - Always wrap top-level screen containers in `ScreenWrapper` (`src/components/layout/ScreenWrapper.tsx`).
   - `ScreenWrapper` defaults to `edges={['top', 'left', 'right']}` to avoid duplicate padding on bottom tab bars.
2. **Dynamic Inset Calculations**:
   - Use `useSafeAreaInsets()` from `react-native-safe-area-context` when styling custom bars, footers, or bottom tab navigators to respect iOS Home Indicator and Android navigation bar insets.

---

## 10. Feature Slice & State Management Patterns

1. **Domain Feature Encapsulation**:
   - Encapsulate distinct features inside `src/features/[feature]/` with dedicated `components/`, `hooks/`, and `types/`.
   - Screens must remain thin orchestration views, passing typed callbacks and domain entities down to feature components.
2. **Hook Separation**:
   - Business calculations, summary aggregations, and data manipulations belong inside dedicated custom hooks (e.g. `useExpenses.ts`).
   - Expose strongly typed state structures (e.g. `Transaction`, `CategorySpending`, `ExpenseSummary`).

---

## 11. Agent Skills & Dynamic Workflows

1. **Skill Locations**:
   - System and project agent skills are defined under `skills/system/<skill-name>/SKILL.md`.
2. **Execution Conventions**:
   - Agents reading or executing workflow scripts must respect YAML frontmatter definitions and orchestrator primitives defined within `skills/system/run-workflow/SKILL.md`.
