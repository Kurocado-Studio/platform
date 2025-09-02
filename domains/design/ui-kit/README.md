# @kurocado-studio/auth-zero

## Installation

```bash
pnpm install @kurocado-studio/auth-zero
```

### Setup

Configure Environment Variables by creating a `.env` file with your Auth0 credentials:

```bash
VITE_AUTH_DOMAIN=**
VITE_AUTH_CLIENT_ID=**
VITE_AUTH_AUDIENCE=**
VITE_AUTH_SCOPE=**
VITE_AUTH_REDIRECT_URI=**
```

### Usage

```typescript jsx
import { AuthSilentlyProvider, useAuthSilentlyContext } from '@kurocado-studio/auth-zero';
import React from 'react';

const YourComponent = () => {
  const { handleLogout } = useAuthSilentlyContext();
  return <button onCLick={() => handleLogout()}>Logout</button>
}

const Example: React.FC = () => {
  const domain = import.meta.env.VITE_AUTH_DOMAIN;
  const clientId = import.meta.env.VITE_AUTH_CLIENT_ID;
  const redirectUri = import.meta.env.VITE_AUTH_REDIRECT_URI

  return (
    <AuthSilentlyProvider
      domain={domain}
      clientId={clientId}
      authorizationParams={{ redirectUri }}
    >
      {({ isAuthenticated, isLoading }) => {
        if (isAuthenticated && !isLoading) {
          return <YourComponent />;
        }
        return null;
      }}
    </AuthSilentlyProvider>
  )
}
```
