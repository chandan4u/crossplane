import * as React from 'react';
import { SignInPage } from '@backstage/core-components';
import { useApi, identityApiRef } from '@backstage/core-plugin-api';

/**
 * CustomSignInPage renders the Backstage SignInPage with auto provider detection.
 * It provides the required onSignInSuccess prop for compatibility with Backstage v1+.
 */
export const CustomSignInPage = () => {
  const identityApi = useApi(identityApiRef);
  return (
    <SignInPage
      auto
      onSignInSuccess={() => {
        // Optionally do something after sign-in
      }}
    />
  );
};
