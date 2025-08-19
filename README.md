# Kurocado Studio TypeScript Development Platform

**Turn engineering foundations into installable developer products.**

## Overview

**Kurocado Studio Platform** is an opinionated, modular system that turns the repetitive foundations
of frontend engineering into installable, reusable packages.

Built with a **“Platform as a Product”** mindset and written in **TypeScript**, this system helps
developers:

- Set up CI/CD, QA, IAM, and DevOps in minutes.
- Share best practices across teams using centralized configuration.
- Install only what they need, when they need it:  
  `npm i @kurocado-studio/{module}`

## Why This Exists

After years working with startups and product teams, I saw the same scaffolding built over and over
again:

- CI/CD pipelines
- Auth and IAM flows
- Testing harnesses
- Lint/format/commit tooling

I turned that boilerplate into a **DX-first platform**—something we can open source, maintain, and
eventually scale with partners and sponsors.

## Modules

Each module is versioned, documented, and published under the
[`@kurocado-studio`](https://www.npmjs.com/org/kurocado-studio) namespace.

**[Style Guide](https://github.com/Kurocado-Studio/styleguide)** Centralizes TypeScript rules,
ESLint config, Prettier, and commit conventions.

| Module               | Purpose                                                                                 |
| -------------------- | --------------------------------------------------------------------------------------- |
| **QA**               | Pre-wired `Vitest` + `React Testing Library` with A11y-first defaults and CI support.   |
| **IAM**              | Drop-in auth strategies (Auth0, etc.) with RBAC support, guards, and reusable context.  |
| **DevOps Workflows** | GitHub Actions for linting, testing, semantic release, and dependency updates.          |
| **DX Utilities**     | Custom Axios wrappers, error handlers, form helpers with `@conform-to/react`, and more. |

## Benefits

- 🚀 **85% faster onboarding** — set up new projects in under 5 minutes.
- 🔒 **Zero-drift config** — shared standards enforced by CI.
- 🔁 **Composable** — install only what you need, per project.
- 🧩 **Scalable** — supports mono-repos, multi-framework projects, and future React/Remix upgrades.

## Developer Experience Overview

1. **Install a module**:

   ```bash
   npm i @kurocado-studio/qa
   ```

2. **Set up CI/CD** with reusable workflows:

   ```yaml
   # .github/workflows/ci.yml
   name: CI/CD Pull Request Pipeline

   permissions:
     contents: write
     pull-requests: write

   on:
     pull_request:
       lint:
       uses: kurocado-studio/platform/.github/workflows/workflow.lint.yml@main
       secrets:
         GH_TOKEN: ${{ secrets.GITHUB_TOKEN }}

       test:
         uses: kurocado-studio/platform/.github/workflows/workflow.test.yml@main
         secrets:
           GH_TOKEN: ${{ secrets.GITHUB_TOKEN }}
   ```

3. **Add auth module** to your frontend app:

   ```bash
   npm i @kurocado-studio/iam
   ```

## Roadmap

- [ ] Support for **Next.js**
- [ ] Integrated **DangerJS**
- [ ] **Visual dashboard** to manage modules across projects
- [ ] Community docs and contributor onboarding
- [ ] Launch on GitHub Sponsors
