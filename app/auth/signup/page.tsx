"use client";
import { Button, Card, Label, TextInput } from "flowbite-react";
import { createHmac } from "crypto";
import { useState } from "react";
import { confirmSignUp, signIn, signUp } from "aws-amplify/auth";

enum SignUpSteps {
  CONFIRM_SIGN_UP = "CONFIRM_SIGN_UP",
  DONE = "DONE",
  COMPLETE_AUTO_SIGN_IN = "COMPLETE_AUTO_SIGN_IN",
}

export default function Signup() {
  const [step, setStep] = useState<SignUpSteps | null>(null);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  async function handleSignUp(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const givenName = formData.get("given_name") as string;
    setEmail(email);
    setPassword(password);

    const { isSignUpComplete, userId, nextStep } = await signUp({
      username: email,
      password: password,
      options: {
        userAttributes: {
          given_name: givenName,
          picture:
            "https://upload.wikimedia.org/wikipedia/commons/2/2c/Default_pfp.svg",
        },
      },
    });

    if (nextStep.signUpStep === "CONFIRM_SIGN_UP") {
      setStep(SignUpSteps.CONFIRM_SIGN_UP);
    }
  }

  const handleConfirm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const confirmationCode = formData.get("code") as string;
    try {
      const { isSignUpComplete } = await confirmSignUp({
        username: email,
        confirmationCode: confirmationCode,
      });
      if (isSignUpComplete) {
        const { isSignedIn } = await signIn({
          username: email,
          password: password,
        });
        if (isSignedIn) {
          window.location.href = "/";
        }
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
