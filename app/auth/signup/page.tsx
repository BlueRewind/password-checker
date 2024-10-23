"use client";
import { Button, Card, Label, TextInput } from "flowbite-react";
import {
  CognitoIdentityProviderClient,
  ConfirmSignUpCommand,
  SignUpCommand,
} from "@aws-sdk/client-cognito-identity-provider";
import { createHmac } from "crypto";
import { signIn } from "next-auth/react";
import { useState } from "react";

enum SignUpSteps {
  CONFIRM_SIGN_UP = "CONFIRM_SIGN_UP",
  DONE = "DONE",
  COMPLETE_AUTO_SIGN_IN = "COMPLETE_AUTO_SIGN_IN",
}

const generateSecretHash = (email: String): string => {
  const message = email + String(process.env.NEXT_PUBLIC_AWS_COGNITO_CLIENT_ID);
  const hmac = createHmac(
    "sha256",
    String(process.env.NEXT_PUBLIC_AWS_COGNITO_CLIENT_SECRET),
  );
  hmac.update(message);
  return hmac.digest("base64");
};

export default function Signup() {
  const [step, setStep] = useState<SignUpSteps | null>(null);
  const [email, setEmail] = useState<string>("");

  async function handleSignUp(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const givenName = formData.get("given_name") as string;
    setEmail(email);
    const secretHash = generateSecretHash(email);

    const client = new CognitoIdentityProviderClient({ region: "us-east-1" });
    const command = new SignUpCommand({
      ClientId: process.env.NEXT_PUBLIC_AWS_COGNITO_CLIENT_ID,
      SecretHash: secretHash,
      UserAttributes: [{ Name: "given_name", Value: givenName }],
      Username: email,
      Password: password,
    });

    try {
      await client.send(command);
      setStep(SignUpSteps.CONFIRM_SIGN_UP);
    } catch (error: any) {
      return { error: error.message || "Error signing up" };
    }
  }

  const handleConfirm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    console.log(formData);
    const confirmationCode = formData.get("code") as string;
    const secretHash = generateSecretHash(email);
    try {
      const command = new ConfirmSignUpCommand({
        ClientId: process.env.NEXT_PUBLIC_AWS_COGNITO_CLIENT_ID,
        SecretHash: secretHash,
        Username: email,
        ConfirmationCode: confirmationCode,
      });
      const client = new CognitoIdentityProviderClient({ region: "us-east-1" });
      const data = await client.send(command);
      if (data.$metadata.httpStatusCode == 200) {
        await signIn("cognito", {
          redirect: false,
          callbackUrl: "/",
        });
      }
    } catch (error: any) {
      console.error(`Error ${error}`);
    }
  };

  return (
    <main className="flex min-h-screen min-w-full items-center justify-center gap-2 dark:bg-gray-700">
      {step === SignUpSteps.CONFIRM_SIGN_UP ? (
        <Card className="w-full max-w-sm rounded p-2 shadow-lg dark:bg-gray-800">
          <form
            className="flex flex-col gap-4"
            onSubmit={(e) => handleConfirm(e)}
          >
            <div>
              <Label htmlFor="code" value="Confirmation Code" />
              <TextInput
                id="code"
                name="code"
                required
                placeholder="Enter your confirmation code"
              />
            </div>
            <Button type="submit">Confirm Sign Up</Button>
          </form>
        </Card>
      ) : (
        <Card className="w-full max-w-sm rounded p-2 shadow-lg dark:bg-gray-800">
          <form
            className="flex flex-col gap-4"
            onSubmit={(e) => handleSignUp(e)}
          >
            <h1 className="mb-4 text-center text-2xl font-bold text-white">
              Sign Up
            </h1>
            <div>
              <Label htmlFor="given_name" value="Given Name" />
              <TextInput
                id="given_name"
                name="given_name"
                type="text"
                required
                placeholder="James P"
              />
            </div>
            <div>
              <Label htmlFor="email" value="Email" />
              <TextInput
                id="email"
                name="email"
                type="email"
                required
                placeholder="name@domain.com"
              />
            </div>
            <div>
              <Label htmlFor="password" value="Password" />
              <TextInput
                id="password"
                name="password"
                type="password"
                required
                placeholder="********"
              />
            </div>
            <Button gradientDuoTone="purpleToBlue" type="submit">
              Sign Up
            </Button>
          </form>
        </Card>
      )}
    </main>
  );
}
