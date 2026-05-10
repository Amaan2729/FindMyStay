# Testing Guide for FindMyStay

This project now includes unit and integration test support for both frontend and backend.

## Frontend Testing

### Frameworks used
- `Vitest` for test runner
- `@testing-library/react` for React component behavior
- `@testing-library/jest-dom` for DOM assertions

### How to run
1. `cd frontend`
2. `npm install`
3. `npm test`
4. `npm run test:run`
5. `npm run test:coverage`

### What to test
- Unit tests: helper functions, small UI behavior, route helper logic.
- Component tests: render a component, assert visible text, simulate user events.
- Mocking network calls in tests using `fetch` or `mockServiceWorker` when needed.

## Backend Testing

### Frameworks used
- `Jest` for unit/integration tests
- `supertest` for HTTP endpoint integration tests

### How to run
1. `cd backend`
2. `npm install`
3. `npm test`
4. `npm run test:watch`

### What to test
- Unit tests: pure functions, email helper logic, validation helpers.
- Integration tests: API endpoints, route wiring, middleware chain.
- Debugging: run tests with `--runInBand` and inspect console output.

## Debugging test failures

- Use `console.log` or `console.error` inside your code or tests.
- For frontend Vitest, run `npm test -- --run` to execute once.
- For backend Jest, use `npm run test:watch` or `npm test`.
- If a database-backed integration test fails, confirm your `.env` settings and local MySQL availability.

## Example tests included

- `frontend/src/App.test.jsx` validates route selection logic.
- `backend/__tests__/emailService.test.js` validates SMTP helper configuration.
- `backend/__tests__/appIntegration.test.js` verifies the backend `/` endpoint responds.

## Notes

- Frontend tests run in `jsdom` environment.
- Backend tests run in `node` environment.
- Keep pure logic separate from side effects for easier unit testing.
