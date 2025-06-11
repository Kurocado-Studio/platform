# Case Study

**“Kurocado Studio Platform – Turning Engineering Foundations Into a Developer Product”**

## Overview

**Kurocado Studio Platform** is a developer-first initiative to turn the repetitive foundations of
frontend development—like CI/CD, QA, IAM, and design systems—into a modular, installable platform.

Built in **TypeScript**, and designed with a **“Platform as a Product”** mindset, the system enables
engineers to:

- Install only what they need (`npm i @kurocado-studio/{module}`)
- Integrate CI/CD, QA, or IAM in under 5 minutes
- Maintain best practices across projects via shared configuration and tooling

---

## Why I Built This

While working across startups and product teams, I kept rebuilding the same engineering scaffolding:

- CI/CD pipelines
- Auth flows
- Testing harnesses
- Lint/format/config tooling

This platform was born out of a desire to **productize** that boilerplate—turning it into a
DX‑driven experience I could **open source**, **maintain**, and eventually **monetize or scale**
with partners and sponsors.

---

## What’s in the Platform

Each part of the platform is versioned, documented, and distributed via NPM. All repos are public
under the [`@kurocado-studio`](https://www.npmjs.com/org/kurocado-studio) namespace.

### Engineering Styleguide

**Purpose:** Centralize TypeScript best practices, Prettier config, ESLint rules, and commit
conventions.

- Built with
  [`Kurocado-Studio engineering style-guide`](https://github.com/Kurocado-Studio/styleguide)
- Includes test and formatting checks on commit and CI
- Encourages “zero-drift” TypeScript hygiene

### QA Module

**Purpose:** Drop-in testing framework using `Vitest` and `React Testing Library`.

- Pre-wired with `userEvent` for accessibility
- Includes reusable test utils and Jest-style mocks
- CI-tested via GitHub Actions

### IAM Module

**Purpose:** Auth module with built-in support for Auth0 and scalable patterns for RBAC.

- Auth strategy abstraction
- Reusable guards and context providers
- Published via NPM for install on any frontend project

### DevOps Workflows

**Purpose:** GitHub Actions that enforce standards and automate releases.

- `lint.yml`, `test.yml`, `release.yml`, `dependabot.yml`
- Follows semantic-release standards
- Designed to support multiple repos and mono-repos alike

### Developer Experience (DX) Utilities

**Purpose:** Utilities that improve developer productivity.

- Custom axios wrappers, error handlers
- Form helpers using `@conform-to/react`
- Framework-agnostic utilities

## Results & Traction

- **85% faster onboarding**: New projects get set up in under 5 minutes.
- **Zero-drift standards**: Shared styleguide and CI keep repos aligned.
- **Scalable**: Ready to support React 19 & Remix setups.
- **Public GitHub usage**: Multiple public modules are already available and installable.

---

## What's Next

- **Community Adoption**: Start onboarding other devs & open source contributors.
- **Sponsorship & R\&D**: Exploring GitHub Sponsors + dev shop monetization model.
- **Platform Expansion**:

  - Vue 3 and Next.js support
  - Feature flags and DangerJS integration
  - Dashboard UI for managing modules visually
