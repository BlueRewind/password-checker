"use client";

import { FormEvent, useState } from 'react';
import { Button, Card, Label, TextInput } from 'flowbite-react';
import { signUp, confirmSignUp } from "aws-amplify/auth";

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
  COMPLETE_AUTO_SIGN_IN = "COMPLETE_AUTO_SIGN_IN"
}

export default function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [step, setStep] = useState<SignUpSteps | null>(null);
  const [errors, setErrors] = useState({ email: '', password: '', code: '' });

  const [confirmationCode, setConfirmationCode] = useState('');

  async function handleSubmit(event: FormEvent<SignUpForm>) {
    event.preventDefault();
    const form = event.currentTarget;

    try {
      const { isSignUpComplete, nextStep } = await signUp({
        username: form.elements.email.value,
        password: form.elements.password.value,
      });

      if (nextStep.signUpStep === SignUpSteps.CONFIRM_SIGN_UP) {
        setStep(SignUpSteps.CONFIRM_SIGN_UP);
        console.log("Confirmation code sent to email");
      } else if (nextStep.signUpStep === SignUpSteps.DONE) {
        console.log("Signup complete!");
      } else if (nextStep.signUpStep === SignUpSteps.COMPLETE_AUTO_SIGN_IN) {
        console.log("Auto sign-in complete");
      }
    } catch (error) {
      console.error("Signup error:", error);
      setErrors({ ...errors, email: 'Signup failed' });
    }
  }

  async function handleConfirm(event: FormEvent<SignUpForm>) {
    event.preventDefault();

    try {
        await confirmSignUp({
            username: email, 
            confirmationCode: confirmationCode
        });
        console.log("Account confirmed successfully!");
        setStep(SignUpSteps.DONE);
    } catch (error) {
      console.error("Confirmation error:", error);
      setErrors({ ...errors, code: 'Invalid confirmation code' });
    }
  }

  return (
    <main className="flex min-h-screen min-w-full items-center justify-center gap-2 dark:bg-gray-700">
      {step === SignUpSteps.CONFIRM_SIGN_UP ? (
        <Card className="dark:bg-gray-800 p-2 rounded shadow-lg w-full max-w-sm">
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
        <Card className="dark:bg-gray-800 p-2 rounded shadow-lg w-full max-w-sm">
            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <h1 className="text-2xl font-bold mb-4 text-center text-white">Sign Up</h1>
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
                {errors.password && <p className="text-red-500">{errors.password}</p>}
                <Button gradientDuoTone="purpleToBlue" type="submit">Sign Up</Button>
            </form>
        </Card>
      )}
    </main>
  );
}
