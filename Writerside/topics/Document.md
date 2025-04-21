# Document

## Prerequisites

- [Download Writerside Jetbrains Plugin](https://plugins.jetbrains.com/plugin/20158-writerside)
  - [See how to add a Writerside instance](https://www.jetbrains.com/help/writerside/instances.html)
- **GitHub Pages**
  - Scroll down to the **Pages** section in the left sidebar.
  - Under **Build and deployment**, select **GitHub Actions** as the source.

## Consuming the workflow

```yaml
name: Writerside Documentation Pipeline

permissions:
  contents: write
  id-token: write
  pages: write
  pull-requests: write

jobs:
  document:
    uses: kurocado-studio/dev-ops/.github/workflows/workflow.document.yml@main
    secrets:
      GH_TOKEN: ${{ secrets.GITHUB_TOKEN }}
    with:
      instance_id: dcs
```

## Overview

Builds and deploys project documentation using Docker-based builders.

```mermaid
sequenceDiagram
   participant GitHubRepo as GitHub Repository
   participant Runner as GitHub Actions Runner
   participant Builders as Documentation Builders
   participant GitHubAPI as GitHub API

   GitHubRepo->>Runner: Trigger Writerside Documentation Workflow
   Runner->>Runner: Install Dependencies
   Runner->>Builders: Build Docs using Writerside Docker Builder
   Builders-->>Runner: Build Results (Artifact, report.json)
   Runner->>Runner: Save Artifact with Build Results
   Runner->>Runner: Unzip Artifact
   Runner->>GitHubRepo: Configure GitHub Pages
   Runner->>GitHubRepo: Upload Artifact to GitHub Pages
   Runner->>GitHubRepo: Deploy to GitHub Pages

   alt Workflow Successful
        Runner ->> GitHubAPI: Report Workflow Success
        GitHubAPI ->> GitHubRepo: Update Status as Successful
   else Workflow Failed
        Runner ->> GitHubAPI: Report Workflow Failure
        GitHubAPI ->> GitHubRepo: Update Status with Errors
    end
```
