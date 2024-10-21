import { authConfig } from "@/app/amplify-cognito-config";
import { createServerRunner } from '@aws-amplify/adapter-nextjs'

export const { runWithAmplifyServerContext } = createServerRunner({
    config: {
        Auth: authConfig
    },
});

import { signUp } from "aws-amplify/auth"

export async function handleSignup(prevState: string | undefined, formData: FormData) {
    try {
        const { isSignUpComplete, userId, nextStep } = await signUp({
            username: String(formData.get("email")),
            password: String(formData.get("password")),
            options: {
              userAttributes: {
                email: String(formData.get("email"))
              },
              autoSignIn: true
            }
          });
    } catch (err) {
        throw Error(`Unable to sign up to service, error: ${err}`);
    }
}