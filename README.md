# Video Capture Web Application

A single page web application that captures photos from the user's camera using the WebRTC API.

## Description

This application demonstrates the use of the WebRTC API to access the user's camera. It displays a live video preview, and automatically captures a snapshot after a 5 second countdown.

## Tech Stack

- React
- TypeScript
- Vite

## Prerequisites

- Node.js, LTS version [Download Node.js](https://nodejs.org/en/download)
- pnpm [Download pnpm](https://pnpm.io/)
- A device with a webcam

## Installation

1. Install dependencies:

```bash
pnpm install
```

2. Start the development server:

```bash
pnpm run dev
```

This will start the Vite dev server and print the local development URL.

## Development

### Prettier

This project uses [Prettier](https://prettier.io/) for code formatting to ensure consistent code style across the codebase.

### ESLint

This project uses [ESLint](https://eslint.org/) for code linting to maintain code quality.

## Testing

This project uses [Vitest](https://vitest.dev/) with [React Testing Library](https://testing-library.com/react) for unit and integration testing.

End-to-end tests are written using [Playwright](https://playwright.dev/) and are located in the `tests-e2e/` directory.

### Running Tests

```bash
# Run unit tests in watch mode
pnpm test

# Run unit tests with coverage report
pnpm run test:coverage

# Run E2E tests
pnpm run test:e2e

# Run E2E tests with UI mode
pnpm run test:e2e:ui

# Run E2E tests in debug mode
pnpm run test:e2e:debug
```
