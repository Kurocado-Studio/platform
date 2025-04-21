# Release

## Prerequisites

- [Semantic Release](https://kurocado-studio.github.io/styleguide/how-to-install-semantic-release.html)

## **Consuming the workflow**

```yaml
jobs:
  release:
    uses: kurocado-studio/dev-ops/.github/workflows/workflow.release.yml@main
    secrets:
      GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
      NPM_TOKEN: ${{ secrets.NPM_TOKEN }}
    with:
      branch_name: ${{ github.ref_name }}
```

## Overview

Automates the release process, including versioning, changelog generation, and release notes.

```mermaid
sequenceDiagram
%% Participants
   participant GitHubRepo as GitHub Repository
   participant Runner as GitHub Actions Runner
   participant SemanticRelease as Semantic Release
   participant SemanticReleasePlugins as Semantic Release Plugins
   participant GitHubAPI as GitHub API
   participant NPMRegistry as NPM Registry

%% Workflow Triggered from Repository
   GitHubRepo ->> Runner: Trigger Release Workflow

%% Runner prepares the environment
   Runner ->> Runner: Checkout Repository
   Runner ->> Runner: Install Dependencies

%% Runner initiates Semantic Release
   Runner ->> SemanticRelease: Run Semantic Release

%% Semantic Release Initialization
   SemanticRelease ->> SemanticReleasePlugins: Load "@semantic-release/changelog"
   SemanticRelease ->> SemanticReleasePlugins: Load "@semantic-release/github"
   SemanticRelease ->> SemanticReleasePlugins: Load "@semantic-release/npm"
   SemanticRelease ->> SemanticReleasePlugins: Load "@semantic-release/commit-analyzer"
   SemanticRelease ->> SemanticReleasePlugins: Load "@semantic-release/release-notes-generator"

%% Analyze Commits
   SemanticRelease ->> SemanticReleasePlugins: analyzeCommits ("@semantic-release/commit-analyzer")
   SemanticReleasePlugins -->> SemanticRelease: Determine release type

%% Determine Release Necessity
   alt Release Needed
      SemanticReleasePlugins ->> SemanticReleasePlugins: generateNotes ("@semantic-release/release-notes-generator")
      SemanticReleasePlugins -->> SemanticRelease: Release notes generated

      SemanticReleasePlugins ->> SemanticReleasePlugins: prepare changelog ("@semantic-release/changelog")
      SemanticReleasePlugins -->> SemanticRelease: CHANGELOG.md updated

      %% Create Tag
      SemanticRelease ->> SemanticRelease: Create Git tag

      %% Publish GitHub Release
      SemanticRelease ->> GitHubAPI: Publish GitHub release
      GitHubAPI -->> SemanticRelease: GitHub release published

      %% Publish to NPM (If applicable)
      alt Repository uses semantic-release.npm
          SemanticRelease ->> NPMRegistry: Publish to NPM ("@semantic-release/npm")
          NPMRegistry -->> SemanticRelease: Publish confirmed
      end
      SemanticRelease ->> Runner: Notify success
   end
   alt Workflow Successful
        Runner ->> GitHubAPI: Report Workflow Success
        GitHubAPI ->> GitHubRepo: Update Status as Successful
    else Workflow Failed
        Runner ->> GitHubAPI: Report Workflow Failure
        GitHubAPI ->> GitHubRepo: Update Status with Errors
    end
```
