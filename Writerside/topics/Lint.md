# Lint

## Prerequisites

- [Prettier](How-To-Install-Prettier.md)
- [ESLint](How-To-Install-ESLint.md)
- [CommitLint](How-To-Install-Commitlint.md)

## Consuming the workflow

```yaml
jobs:
  lint:
    uses: kurocado-studio/dev-ops/.github/workflows/workflow.lint.yml@main
    secrets:
      GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

## Overview

The following sequence diagram illustrates the interactions and steps involved in the **Code
Quality** workflow.

```mermaid
sequenceDiagram
    participant GitHubRepo as GitHub Repository
    participant Runner as GitHub Actions Runner
    participant Linter as Linting Tools
    participant GitHubAPI as GitHub API

    GitHubRepo ->> Runner: Trigger Code Quality Workflow
    Runner ->> Runner: Checkout Repository
    Runner ->> Runner: Install Dependencies
    Runner ->> Linter: Run Lint Checks
    Linter ->> Linter: Run Prettier Check
    Linter ->> Linter: Run ESLint
    Linter ->> Linter: Run CommitLint
    Linter ->> Linter: Build Project
    Linter ->> Runner: Linting Results

    alt Linting Successful
        Runner ->> GitHubAPI: Report Workflow Success
        GitHubAPI ->> GitHubRepo: Update Status as Successful
    else Linting Failed
        Runner ->> GitHubAPI: Report Workflow Failure
        GitHubAPI ->> GitHubRepo: Update Status with Errors
    end
```
