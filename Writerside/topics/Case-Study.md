# Case Study

_A unified, open-source foundation powering all studio products_

---

## **1. Context**

Throughout my career, I’ve gravitated toward platform work — the kind of engineering that sits
beneath every product and keeps teams fast, aligned, and productive. At Project44 I built automated
test frameworks; at Dais I modernized apps from Vue 2 to Vue 3 and initiated its design system.
Across all of these environments, I kept running into the same patterns:

- repeated boilerplate
- misaligned architecture
- duplicated CI/CD pipelines
- inconsistent TypeScript configurations
- fragmented design tokens and UI logic
- manual, error-prone release processes

When I founded **Kurocado Studio**, I didn’t want to recreate those problems.

The studio’s roadmap isn’t one product — it’s an ecosystem:

- **FormKit** — a form UI system + toolkit
- **Design System** — a shared visual and functional language
- **Daily UI Challenge App** — 100 small React/Vue implementations
- **Future SaaS templates and client projects**
- Internal tools, libraries, and open-source utilities

Every piece needs to be consistent, maintainable, and high-quality.

Building each of these independently would guarantee fragmentation and technical drift. So I made
the decision early: **The studio needed one platform to power all of it.**

---

## **2. Why the Platform Is Open Source**

The decision to open-source the platform came directly from the studio’s business plan and my
personal philosophy.

### **2.1 Business Rationale**

Open source reflects the values driving Kurocado Studio:

- **Transparency** — clients can inspect our engineering standards
- **Credibility** — real code is more trust-building than marketing
- **Community** — creators learn best when the work is visible
- **Differentiation** — most studios hide their methodology; we share ours

Open-sourcing aligns with the “build in public” culture I admire. It positions the studio not just
as a service provider, but as a platform-driven engineering organization.

### **2.2 Engineering Rationale**

Open source enforces:

- better documentation
- clearer architecture
- reusable tooling
- consistency across repos
- community feedback loops

It also supports the studio’s educational goals — letting developers learn directly from real,
production-grade scaffolding.

---

## **3. Problem**

Kurocado Studio’s product ecosystem — FormKit, 100 Daily UI challenges, a design system, and future
apps — shared core requirements:

### **3.1 Repeated Engineering Work**

Every project required its own:

- TS configs
- ESLint rules
- Build setup
- Testing utilities
- CI/CD YAML
- Documentation patterns
- Release processes

This creates the same scaling problems I’ve seen inside enterprise platform teams.

### **3.2 Inconsistent Standards Across Projects**

Without a shared foundation:

- UI patterns diverge
- Design tokens drift
- Code quality varies
- Versioning becomes chaotic
- Onboarding slows down

### **3.3 High Maintenance Cost for a Small Team**

As a solo engineer (for now), maintaining multiple standalone repos would eventually collapse under
its own weight.

I needed to solve the problem _systemically_, not project-by-project.

---

## **4. Goal**

### **4.1 Engineering Goals**

- Create a **TypeScript-first platform** for all studio products
- Make new repo setup take minutes, not hours
- Guarantee that every app uses the same standards
- Automate everything: linting, tests, docs, releases
- Support both monorepo and standalone structures
- Ensure React, Vue, and design system components share the same foundation

### **4.2 Business Goals**

- Reduce engineering overhead for future client projects
- Create a scalable base for the studio’s educational tools
- Strengthen brand differentiation through open-source quality
- Build systems that allow one engineer to maintain a full product ecosystem

---

## **5. My Role**

I owned:

- platform architecture
- all TypeScript packages
- CI/CD reusable workflows
- semantic release automation
- documentation tooling
- design tokens foundation
- developer experience and onboarding flow
- all technical writing and documentation

This project represents the intersection of product design, front-end engineering, and platform
architecture — the work I naturally gravitate toward.

---

## **6. Research & Inputs**

This platform is built on years of pattern recognition from:

- enterprise product platforms (p44 IAM, Dais insurance products)
- design-system environments (SpotOn, Dais)
- multi-repo toolchains
- GitHub Actions workflow engineering
- modern monorepo best practices (PNPM + Turborepo)
- OSS tooling standards from Vercel, Shopify, Radix, and Astro

I distilled the best practices I’ve learned into something I could maintain as a single engineer.

---

## **7. Constraints**

The platform had to:

- Work across **React**, **Vue**, and **node-based libraries**
- Power everything from UI challenges to enterprise SaaS templates
- Be easy to maintain long-term with minimal resources
- Work fully on GitHub Actions
- Provide consistent DX across all repos
- Remain open-source and well-documented
- Scale to dozens of apps without becoming complex

These constraints pushed the design toward convention-over-configuration.

---

## **8. Approach**

### **8.1 Platform-First Thinking**

Instead of configuring tooling per repo, I solved it once:

- one set of tsconfigs
- one ESLint preset
- one design token system
- one release pipeline
- one workflow for docs
- one pattern for routing, folders, and build steps

Everything inherits from the platform.

### **8.2 Architecture Strategy**

- PNPM workspaces
- Turborepo build pipelines
- Internal and public package boundaries
- Reusable GitHub Actions workflows
- Automated semantic releases
- Docs-as-code deployed via GitHub Pages

This approach ensures all studio projects evolve together, not apart.

---

# **9. Solution**

## **9.1 Monorepo Architecture**

Core packages include:

- **@kurocado/tsconfig** — shared TS config
- **@kurocado/eslint-config** — linting standards
- **@kurocado/utils** — shared logic
- **@kurocado/design-tokens** — future design system foundation
- **@kurocado/workflows** — reusable GitHub Actions

Every project — FormKit, the Daily UI Challenge App, the design system — inherits these
automatically.

---

## **9.2 Reusable CI/CD Workflows**

A major differentiator.

Any repo can import the studio workflows:

```yaml
jobs:
  lint:
    uses: kurocado-studio/platform/.github/workflows/workflow.lint.yml@main

  test:
    needs: lint
    uses: kurocado-studio/platform/.github/workflows/workflow.test.yml@main

  document:
    needs: test
    uses: kurocado-studio/platform/.github/workflows/workflow.document.yml@main

  release:
    needs: test
    uses: kurocado-studio/platform/.github/workflows/workflow.release.yml@main
```

This gives every project:

- linting
- testing
- documentation
- semantic versioning
- changelog automation
- npm publishing
- tag pushes

No duplication. No drift.

---

## **9.3 Automated Release System**

The release workflow:

- reads commits
- determines semantic version bump
- generates release notes
- updates the changelog
- publishes to npm
- pushes tags
- supports both monorepo and standalone packages

This eliminates the manual release chaos many teams face.

---

## **9.4 Documentation Pipeline**

Every repo automatically:

- builds docs
- deploys to GitHub Pages
- inherits a consistent documentation structure
- stays synchronized with the platform

Documentation is part of the product — especially because everything is OSS.

---

## **9.5 Developer Experience Improvements**

- opinionated defaults
- instant repo setup
- consistent folder structure
- debug-friendly logs in CI/CD
- shared tokens and UI foundations
- unified testing strategy
- long-term maintainability

The platform enables me to build faster — without sacrificing quality.

---

# **10. Challenges & How I Solved Them**

### **Reusable Workflows**

GitHub Actions are powerful but restrictive. I built clean input interfaces and centralized secrets
to keep repos isolated but consistent.

### **Supporting Both React and Vue**

Shared tooling abstracts differences so all projects behave the same under the hood.

### **Monorepo Release Complexity**

I implemented logic to detect package changes and apply versioning intelligently.

### **Avoiding Platform Bloat**

I kept the platform focused: strong defaults, minimal configuration, no unnecessary abstractions.

---

# **11. Impact**

### **11.1 Engineering Impact**

- All Kurocado Studio projects now share the same engineering standards
- FormKit, the design system, and the Daily UI Challenge App all run on one backbone
- New project setup takes minutes
- Releases are fully automated
- Zero configuration drift across repos
- One engineer can maintain a multi-product ecosystem

### **11.2 Business Impact**

- Faster delivery for client work
- Stronger studio identity built on transparent engineering
- A reusable foundation for educational content and tutorials
- Enterprise-quality consistency without enterprise headcount

---

# **12. What I’d Do Next**

- Add CLI scaffolding (“create-kurocado-app”)
- Expand design tokens into a full design system
- Add test utilities for UI challenges
- Add preview deployments for PRs
- Release multiple starter template repos
- Support alpha/beta channels in release workflows

---

# **13. Reflection**

### **What I Learned About Platform Design**

A strong platform turns one engineer into a team. Building this foundation taught me how much
leverage comes from solving problems once and inheriting the solution everywhere.

### **How This Reflects My Career Direction**

I realized I genuinely love architecting systems like this — the kind of high-leverage,
cross-cutting work that powers entire product suites. This project represents where I’m most
effective and where I want to keep growing: **platform engineering, frontend architecture, and
systems that scale.**
