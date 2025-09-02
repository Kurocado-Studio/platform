# IAM

**Kurocado Studio IAM** provides a centralized solution for authentication, authorization, and user
management across internal and client-facing applications. It leverages integrations to simplify
secure sign-ups, logins, and role-based access control (RBAC).

## Objectives

1. **Streamlined Authentication & Authorization**
   - Provide pre-configured modules (e.g., **[@kurocado-studio/auth-zero](Auth0-by-Okta.md)**) to
     handle sign-in flows and user sessions without repetitive boilerplate.

2. **Centralized User Management**
   - Offer a unified interface for managing user accounts, roles, and permissions across multiple
     projects and services.

3. **Rapid Integration**
   - Reduce onboarding time for new projects or client engagements by supplying straightforward
     examples, templates, and docs for integrating IAM.

## Use Cases

1. **Internal Systems & Microservices**
   - Simplify authentication flows within Kurocado Studio’s internal tools (e.g., dashboards,
     internal APIs) by relying on a single source of truth for user data.

2. **Client Collaboration**
   - The IAM solution will serve as a transparent resource for clients. Clients may fork, customize,
     and publish their own versions of the IAM package (e.g., @OUR_ORG/CLIENT_NAME_IAM on NPM),
     ensuring they can adapt the system to their unique business requirements.

## Scope & Constraints

### In Scope

- **Authentication Modules & Adapters**
  - Standard or reusable modules for popular identity providers like Auth0.
- **RBAC (Role-Based Access Control)**
  - Configurable roles and permissions for diverse project requirements.
- **Docs & Examples**
  - Guides, code examples, and best practices for implementing IAM in Node.js/TypeScript apps.

### Constraints

- **Third-Party Integrations**
  - Dependent on external uptime and API changes of Auth0.

## Key Milestones

1. **Auth0 Module MVP**
   - Publish the core `packages/auth0` module with default login flows & universal login support.

2. **Extended Provider Support**
   - Provide a flexible, pluggable architecture for future identity providers.

3. **Access Control**
   - Introduce more granular role-based access control (RBAC).

4. **Client Forking & Customization**
   - Document how clients can fork or overlay custom logic, or configurations for their own identity
     needs (e.g., `@CLIENT_ORG/iam`).
