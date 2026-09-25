# Contributing to Expenses Mobile App

Thank you for your interest in contributing to the **Expenses** mobile application! We welcome contributions from bug fixes and documentation improvements to new feature implementations.

Please read through this guide to understand our workflows for **Conventional Commits**, **GitHub Issues**, and **Pull Requests**.

---

## Table of Contents

1. [Development Environment Setup](#1-development-environment-setup)
2. [Code Standards & Tooling](#2-code-standards--tooling)
3. [Conventional Commits](#3-conventional-commits)
4. [GitHub Issues Guidelines](#4-github-issues-guidelines)
5. [Pull Request (PR) Workflow](#5-pull-request-pr-workflow)
6. [Code Review Etiquette](#6-code-review-etiquette)

---

## 1. Development Environment Setup

Ensure you have installed the required prerequisites:

- **Node.js**: `>= 22.11.0` (as defined in `package.json`)
- **Package Manager**: `npm`
- **Mobile SDKs**:
  - **macOS / iOS**: Xcode and CocoaPods (`bundle install && bundle exec pod install`)
  - **Android**: Android Studio with SDK Tools and Java (JDK 17+)

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd expenses

# Install dependencies (automatically sets up Husky git hooks)
npm install

# Start the Metro bundler
npm start

# Run on iOS or Android
npm run ios
npm run android
```

---

## 2. Code Standards & Tooling

We prioritize high-performance developer tooling powered by Rust:

- **Linter**: **Oxlint** (`oxlint` + `oxlint-plugin-react-native`). Do not use ESLint.
- **Formatter**: **Oxfmt** (`oxfmt`). Do not use Prettier.
- **Git Hooks**: **Husky** automatically runs the pre-commit script on every commit:
  ```bash
  npm run "format&lint"
  ```

Before committing your work or pushing a PR, always ensure:

```bash
# Verify linting and formatting
npm run "format&lint"

# Run tests
npm test
```

---

## 3. Conventional Commits

We follow the [Conventional Commits v1.0.0](https://www.conventionalcommits.org/) specification. Commit messages must be structured as follows:

```text
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

### 3.1. Commit Types

| Type       | When to Use                                                       |
| :--------- | :---------------------------------------------------------------- |
| `feat`     | A new feature or capability (e.g. adding receipt attachment)      |
| `fix`      | A bug fix (e.g. fixing currency calculation rounding error)       |
| `refactor` | Code restructuring without adding features or fixing bugs         |
| `perf`     | Performance optimizations (e.g. optimizing list rendering)        |
| `style`    | Formatting or white-space changes (no functional code changes)    |
| `test`     | Adding missing tests or correcting existing tests                 |
| `docs`     | Documentation-only changes (README, architecture, comments)       |
| `build`    | Changes to build systems, dependencies, or native project configs |
| `ci`       | Changes to CI configuration files and scripts                     |
| `chore`    | Routine maintenance tasks, tool configs, or repo housekeeping     |
| `revert`   | Reverts a previous commit                                         |

### 3.2. Common Project Scopes

Scopes help contextualize the change. Recommended scopes based on our [architecture](architecture.md):

- `expenses`: Changes in the expenses feature domain
- `budgets`: Budget calculations or screens
- `analytics`: Spending analytics and charts
- `categories`: Category management
- `navigation`: React Navigation stacks, tabs, or routes
- `ui`: Shared UI components (`src/components/ui/`)
- `layout`: Layout components (`src/components/layout/`)
- `store`: Global state management
- `storage`: Local persistence or database logic
- `theme`: Colors, typography, or theme providers
- `ios`: iOS-specific native code, Podfile, or Xcode configurations
- `android`: Android-specific native code, Gradle, or manifest
- `deps`: Dependency updates

### 3.3. Examples

#### Feature Commit

```text
feat(expenses): add multi-currency conversion support

Allow users to select foreign currencies during expense entry and fetch
live exchange rates with offline fallback.
```

#### Bug Fix Commit

```text
fix(navigation): prevent double tap crash on transaction details

Debounce screen navigation transitions to prevent duplicate screen pushes
on rapid taps.
```

#### Breaking Change

Append `!` after the type/scope or include a `BREAKING CHANGE:` footer:

```text
refactor(storage)!: migrate key-value store schema to v2

BREAKING CHANGE: The storage format for offline transactions has been restructured.
Existing persisted state will run an automatic migration step.
```

---

## 4. GitHub Issues Guidelines

Issues are used to track bugs, discuss feature proposals, and coordinate architectural changes.

### 4.1. Before Opening an Issue

1. **Search Existing Issues**: Search open and closed issues first to avoid duplicates.
2. **Reproduce on Clean State**: Confirm the issue reproduces on the latest `main` branch.

### 4.2. Bug Reports

When reporting a bug, provide:

- **Title**: Clear, descriptive summary (e.g. `[Bug]: Android back button closes app instead of dismissing modal`).
- **Platform & Environment**:
  - OS & Device: (e.g. iOS 18.2 Simulator, Pixel 8 Android 14)
  - React Native Version: `0.87.1`
  - Node Version: `v22.x`
- **Steps to Reproduce**: Minimal step-by-step reproduction instructions.
- **Expected Behavior**: What you expected to happen.
- **Actual Behavior**: What actually happened (include screenshots or videos if UI-related).
- **Stack Trace / Logs**: Clean logs from Metro or Logcat / Xcode console.

### 4.3. Feature Requests

When requesting a feature:

- Clearly state the problem or use case.
- Propose your desired solution or user flow.
- Discuss any technical considerations or trade-offs.

---

## 5. Pull Request (PR) Workflow

### 5.1. Branching Strategy

Branch off `main` using descriptive names:

- Features: `feat/expense-categories`
- Fixes: `fix/android-keyboard-overlap`
- Documentation: `docs/update-architecture`
- Chores / Refactor: `chore/update-oxlint`

### 5.2. Creating a Pull Request

1. **Keep PRs Focused**: Address one issue or feature per PR. Avoid bundling unrelated refactors.
2. **Follow PR Template / Description**:
   - **Summary**: Concise description of what changed and why.
   - **Linked Issue**: Reference related issues using GitHub keywords (`Closes #123`, `Fixes #456`).
   - **Visual Proof**: For UI changes, attach before/after screenshots or screen recordings (both iOS and Android when applicable).
   - **Testing Plan**: Describe manual test steps performed and any unit tests added.

### 5.3. Pre-flight Checklist

Ensure the following pass before requesting review:

- [ ] Code compiles and runs cleanly on targeted platforms.
- [ ] `npm run "format&lint"` succeeds with 0 errors.
- [ ] `npm test` passes.
- [ ] No extraneous console logs, commented-out debug code, or temporary files.
- [ ] New features or bug fixes include corresponding unit tests.
- [ ] Documentation updated if public interfaces or project conventions changed.

---

## 6. Code Review Etiquette

- **For Reviewers**:
  - Provide actionable, constructive feedback.
  - Distinguish between blocking issues and non-blocking suggestions (prefix nitpicks with `nit:`).
- **For Authors**:
  - Welcome feedback and address questions thoroughly.
  - Re-request review once revisions are pushed.
