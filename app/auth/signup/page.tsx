"use client";

import { FormEvent, useState } from "react";
import { Button, Card, Label, TextInput } from "flowbite-react";
import { signUp, confirmSignUp, signIn } from "aws-amplify/auth";

interface SignUpFormElements extends HTMLFormControlsCollection {
  email: HTMLInputElement;
  password: HTMLInputElement;
  code: HTMLInputElement;
}

interface SignUpForm extends HTMLFormElement {
  readonly elements: SignUpFormElements;
}

enum SignUpSteps {
  CONFIRM_SIGN_UP = "CONFIRM_SIGN_UP",
  DONE = "DONE",
  COMPLETE_AUTO_SIGN_IN = "COMPLETE_AUTO_SIGN_IN",
}

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmationCode, setConfirmationCode] = useState("");
  const [step, setStep] = useState<SignUpSteps | null>(null);
  const [errors, setErrors] = useState({ email: "", password: "", code: "" });

  const handleSubmit = async (event: FormEvent<SignUpForm>) => {
    event.preventDefault();
    setErrors({ email: "", password: "", code: "" });

    try {
      await signUp({
        username: email,
        password,
        options: {
          userAttributes: { email: email },
          autoSignIn: true,
        },
      });
      setStep(SignUpSteps.CONFIRM_SIGN_UP);
    } catch (error: any) {
      setErrors((prev) => ({
        ...prev,
        email: error.message || "Signup failed",
      }));
    }
  };

  const handleConfirm = async (event: FormEvent<SignUpForm>) => {
    event.preventDefault();
    setErrors({ email: "", password: "", code: "" });

    try {
      const user = await confirmSignUp({
        username: email,
        confirmationCode: confirmationCode,
      });
      if (user.isSignUpComplete) {
        console.log("awaiting sign in");
        const signInResponse = await signIn({
          username: email,
          password: password,
        });
        console.log("Sign-in successful:", signInResponse);
        setStep(SignUpSteps.DONE);
      }
    } catch (error: any) {
      setErrors((prev) => ({
        ...prev,
        code: error.message || "Invalid confirmation code",
      }));
    }
  };

  return (
    <main className="flex min-h-screen min-w-full items-center justify-center gap-2 dark:bg-gray-700">
      {step === SignUpSteps.CONFIRM_SIGN_UP ? (
        <Card className="w-full max-w-sm rounded p-2 shadow-lg dark:bg-gray-800">
          <form className="flex flex-col gap-4" onSubmit={handleConfirm}>
            <div>
              <Label htmlFor="code" value="Confirmation Code" />
              <TextInput
                id="code"
                name="code"
                value={confirmationCode}
                onChange={(e) => setConfirmationCode(e.target.value)}
                required
                placeholder="Enter your confirmation code"
              />
              {errors.code && <p className="text-red-500">{errors.code}</p>}
            </div>
            <Button type="submit">Confirm Sign Up</Button>
          </form>
        </Card>
      ) : (
        <Card className="w-full max-w-sm rounded p-2 shadow-lg dark:bg-gray-800">
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <h1 className="mb-4 text-center text-2xl font-bold text-white">
              Sign Up
            </h1>
            <div>
              <Label htmlFor="email" value="Email" />
              <TextInput
                id="email"
                name="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="********"
              />
            </div>
            {errors.email && <p className="text-red-500">{errors.email}</p>}
            {errors.password && (
              <p className="text-red-500">{errors.password}</p>
            )}
            <Button gradientDuoTone="purpleToBlue" type="submit">
              Sign Up
            </Button>
          </form>
        </Card>
      )}
    </main>
  );
}
