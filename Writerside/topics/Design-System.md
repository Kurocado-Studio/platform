# Design System

|            |                                                    |
| ---------- | -------------------------------------------------- |
| Repository | <https://github.com/Kurocado-Studio/design-system> |
| Storybook  | <https://design-system-kurocado-studio.vercel.app> |

**A token‑driven UI library whose look & feel can be tweaked in Figma and—via
Token Studio—propagated to React components in seconds, guaranteeing pixel‑perfect brand consistency
without hand‑off friction.**

---

Kurocado Studio’s Design System delivers a single source of truth for typography, color, spacing,
and interaction patterns across web and mobile products. Designers iterate visually in Figma; Token
Studio syncs the updated design tokens to the codebase, and Storybook reflects the changes
instantly—so product teams ship new features faster while staying perfectly on‑brand.

## Objectives

- **Visual Consistency** – Every product or feature shares the same visual language—from tokens to
  fully composed components.
- **Development Velocity** – Ready‑to‑use React (and soon Remix/Vue) components eliminate repetitive
  UI rebuilds.
- **Accessibility by Default** – Components conform to WCAG 2.1 AA out‑of‑the‑box via baked‑in ARIA
  patterns and semantic markup.
- **Client Customization** – Fork‑friendly architecture lets clients publish their own variant (e.g.
  `@client/design-system`) while keeping the token‑sync workflow.

## Use Cases

1. **Internal Product Teams** – Prototype, iterate, and launch interfaces with a shared library and
   zero visual drift.
2. **External Collaborators** – Freelance designers or agencies adopt the same Storybook doc site to
   stay aligned—no redundant asset hand‑offs.
3. **Client Projects** – Clients inherit the system to maintain best‑practice UX while skinning
   tokens to match their brand guidelines.
4. **Proof‑of‑Concept Sprint** – Swap a token set in Figma, sync through Token Studio, and demo a
   fully re‑themed product in hours.

## Scope & Constraints

### In Scope

- **Core Component Library** – Buttons, forms, nav, layout primitives.
- **Design Tokens** – Color, typography, spacing, radii, shadows.
- **Live Documentation** – Storybook with usage guidelines and code snippets.
- **Accessibility Hooks** – Pre‑configured behaviors and tests.
- **CI/CD** – Lint, test, and publish via GitHub Actions.

### Out of Scope

- **Complex Platform Widgets** – Data‑grid, rich‑text editor (future).
- **Content i18n** – Requires discovery for token localization.

### Constraints

- Balance **branding flexibility** with system‑wide consistency.
- Limited initial resourcing—focus on highest‑impact primitives first.
- Seamless integration with Token Studio, Storybook, GitHub Actions.

## Key Milestones

| Milestone                        | ETA |
| -------------------------------- | --- |
| Foundational Tokens Finalized    | TBA |
| Button / Input / Card Components | TBA |
| Accessibility Audit (AA)         | TBA |
| Public NPM Release v1            | TBA |

## Success Criteria

1. **Quality & Consistency** – UI passes design reviews with zero stylistic regressions; AA
   accessibility on critical components.
2. **Speed** – New developers integrate the Design System or begin prototyping in ≤ 5 minutes.
3. **Adoption** – 100% of new Kurocado Studio projects start with the system; ≥ 2 client forks live
   on NPM within 6 months.
4. **Token Sync Reliability** – Figma → Code round‑trip averages < 60 sec.
