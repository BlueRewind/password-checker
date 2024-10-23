"use client";
import { Amplify, type ResourcesConfig } from "aws-amplify";

export const authConfig: ResourcesConfig["Auth"] = {
  Cognito: {
    userPoolId: String(process.env.NEXT_PUBLIC_AWS_COGNITO_USER_POOL_ID),
    userPoolClientId: String(process.env.NEXT_PUBLIC_AWS_COGNITO_CLIENT_ID),
    identityPoolId: String(process.env.NEXT_PUBLIC_AWS_COGNITO_IDP_URL),
  },
};
Amplify.configure({ Auth: authConfig }, { ssr: true });
export default function ConfigureAmplifyClientSide() {
  return null;
}
