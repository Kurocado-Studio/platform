/// <reference types="vite/client" />
/// <reference types="@testing-library/jest-dom" />
// global.d.ts
interface ImportMetaEnv {
  readonly VITE_AUTH_DOMAIN: string;
  readonly VITE_AUTH_CLIENT_ID: string;
  readonly VITE_AUTH_AUDIENCE: string;
  readonly VITE_AUTH_SCOPE: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
