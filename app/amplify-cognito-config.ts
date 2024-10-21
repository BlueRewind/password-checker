"use client";

import { Amplify, type ResourcesConfig } from "aws-amplify";

console.log(process.env.NEXT_PUBLIC_COGNITO_USER_POOL_ID);

export const authConfig: ResourcesConfig["Auth"] = {
  Cognito: {
    userPoolId: String(process.env.NEXT_PUBLIC_COGNITO_USER_POOL_ID),
    userPoolClientId: String(
      process.env.NEXT_PUBLIC_COGNITO_USER_POOL_CLIENT_ID,
    ),
  },
};

Amplify.configure({ Auth: authConfig }, { ssr: true });

export default function ConfigureAmplifyClientSide() {
  return null;
}
