# Engineering Styleguide

|            |                                                                                                                                                                                              |
| ---------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| NPM        | <https://www.npmjs.com/package/@kurocado-studio/styleguide>                                                                                                                                  |
| Repository | <https://github.com/Kurocado-Studio/styleguide>                                                                                                                                              |
| Main       | [![CI/CD Main Pipeline](https://github.com/Kurocado-Studio/styleguide/actions/workflows/ci.push.yml/badge.svg)](https://github.com/Kurocado-Studio/styleguide/actions/workflows/ci.push.yml) |

Kurocado Studio needs to streamline development workflows, speed up project onboarding, and ensure
consistency across internal and client-facing projects. Internal teams, external contributors, and
clients require a unified standard for TypeScript development that is both efficient and adaptable.

Additionally, when we engage in contracts with clients, we want to provide the flexibility for them
to fork, edit, and publish their own versions of the style guide (e.g. @(OUR_ORG or
THEIR_ORG)—dash—CLIENT_NAME_STYLEGUIDE on NPM). This ensures we can adhere to their coding standards
and guidelines seamlessly.

## Objectives

- **Speed up Development Onboarding:**
  - Provide templated repositories that enable teams to go from “0 to Hello World” in under five
    minutes without compromising code quality.
- **Streamline Development Processes:**
  - Reduce technical debt by offering a centralized, comprehensive and enforceable coding style
    guide for all TypeScript projects.
- **Enhance Developer Efficiency:**
  - Minimize ambiguities by delivering clear standards for code formatting, commit conventions, and
    workflow automation.

## **Use Cases**

1. **Internal Team Adoption:**
   1. Kurocado Studio’s internal teams will rely on the Style Guide as the definitive reference for
      all design and development standards, ensuring consistency across projects.
2. **External Contributor Alignment:**
   1. External developers or freelancers working with Kurocado Studio will use the Style Guide to
      align their contributions with studio quality standards and expectations.
3. **Client Collaboration:**
   1. The Style Guide will serve as a transparent resource for clients, enabling them to understand
      and influence how their projects are built and designed. Clients may fork, customize, and
      publish their version of the guide (e.g., @OUR_ORG/CLIENT_NAME_STYLEGUIDE on NPM).
4. **Quick Prototyping on CodeSandbox:**
   1. Provide templates and guidelines that facilitate rapid prototyping directly on CodeSandbox.
      This enables teams to experiment, iterate, and validate ideas quickly without compromising on
      code quality or deviating from best practices.

## Scope & Constraints

### **In Scope**

1. **Development of a Comprehensive Style Guide:**
   1. Define standards for code formatting, linting rules, commit conventions, and configuration
      management.
   2. Incorporate automated workflows using GitHub Actions to enforce standards across repositories.
2. **Reusable Configurations and Scripts:**
   1. Create configuration files and scripts to standardize and automate common development tasks,
      ensuring consistency and efficiency.
3. **Templates for Prototyping and Deployment:**
   1. Develop and maintain templated repositories optimized for:
      1. Quick prototyping on platforms:
         1. CodeSandbox.
      2. Framework-specific setups:
         1. Remix
         2. NestJS
         3. NPM packages
4. **Documentation and Onboarding Materials**
5. **Open-Sourcing:**
   1. Publish reusable packages to the NPM registry for internal and external use.

### **Constraints**

1. **Resource Availability:**
   1. Limited time and development resources require careful prioritization of high-impact
      deliverables.
2. **Alignment with Existing Ecosystem:**
   1. Ensure seamless integration with Vercel, GitHub Actions, and other tools currently in use at
      Kurocado Studio.
3. **Balance Between Flexibility and Standardization:**
   1. Create a guide that enforces best practices while remaining adaptable for rapid prototyping
      and diverse project needs.

## **Key Milestones**

|                                     |     |
| ----------------------------------- | --- |
| DangerJS integration                |     |
| JavaScript to TypeScript Conversion |     |

## **Success Criteria**

- **Efficiency**
  - **Rapid Prototyping:**
    - Achieve “0 to Hello World” setups in under 5 minutes for all projects using the templates.
  - **Time Savings:**
    - Reduce repetitive setup tasks by at least 25% through reusable configurations and GitHub
      Actions.
- **Quality and Consistency**
  - **Error Reduction:**
    - Cut down on common linting or formatting issues by at least 25% through automated checks.
  - **Standardized Deliverables:**
    - Ensure all deliverables meet consistent code quality standards across projects.
- **Client Collaboration**
  - **Fork and Customize:**
    - Clients successfully fork and adapt the style guide to their needs when needed.
  - **Seamless Handover:**
    - Deliver projects that align with client guidelines by using the style guide templates as
      @(OUR_ORG or THEIR_ORG)—dash—CLIENT_NAME_STYLEGUIDE on NPM or GitHub.
