# Playwright MCP Cursor

This repository demonstrates how to use Playwright with the **Model Context Protocol (MCP)**. MCP is a standard that exposes browser automation capabilities as structured tool calls so that large‑language models can interact with websites and APIs. The included example shows how to perform cursor‑based pagination against the GitHub GraphQL API, but you can adapt the test to any site with pagination (for example, Amazon product listings).

## Project structure

- **package.json** – defines the npm dependencies and test scripts.
- **playwright.config.ts** – Playwright configuration (baseURL, test directory, reporter, etc.).
- **tsconfig.json** – TypeScript configuration for the project.
- **tests/mcp-cursor.spec.ts** – automated test demonstrating how to page through API results using cursors.

## Prerequisites

- Node.js (version 16 or higher).
- npm or yarn.
- A GitHub personal access token set as the environment variable `GITHUB_TOKEN` (only required when running the GraphQL API test).

## Installation

Clone this repository and install dependencies:

```bash
npm install
```

## Running the tests

Execute the tests locally:

```bash
npx playwright test
```

Playwright will run in headless mode by default and produce an HTML report. To open the report after the run:

```bash
npx playwright show-report
```

## Running with MCP

To expose this project to an MCP client, you'll need to start an MCP server. For instructions on installing and running the MCP server, refer to the official Playwright MCP documentation. Once the server is running, point your client to the configured endpoint to send tool calls and drive Playwright under the hood.

## Customizing the pagination example

The test in `tests/mcp-cursor.spec.ts` fetches repositories from the GitHub GraphQL API and paginates over the results using the `endCursor` and `hasNextPage` properties. If you prefer to test pagination on a web page such as Amazon, you can modify the test to navigate a search results page, click the "Next" button and assert that the correct items are loaded. Playwright's rich locator and browser APIs make it straightforward to adapt the pattern to any paginated data source.

## Continuous integration

A GitHub Actions workflow is included in `.github/workflows/playwright.yml` to run the tests automatically on each push or pull request. The workflow installs dependencies, downloads the necessary browsers, and executes `npm test` on Ubuntu. It also passes through the `GITHUB_TOKEN` secret so the GraphQL test can authenticate against the GitHub API.

Feel free to fork this repository and experiment with other targets and protocols to expand your test coverage.
