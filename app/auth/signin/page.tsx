"use client";

import { Button, Card, Checkbox, Label, TextInput } from "flowbite-react";
import { useState } from "react";
import { signIn } from "aws-amplify/auth";

interface SignInFormElements {
  email: string;
  password: string;
}

export default function SignIn() {
  const [formSchema, setFormSchema] = useState<SignInFormElements>({
    email: "",
    password: "",
  });

  const handleFormSchema = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    const newFormValue = { ...formSchema, [name]: value };

    setFormSchema(newFormValue);
  };

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>,
    data: SignInFormElements,
  ) => {
    event.preventDefault();
    if (data.email === "" || data.password === "") {
      return;
    }
    const { isSignedIn } = await signIn({
      username: data.email,
      password: data.password,
    });
    if (isSignedIn) {
      window.location.href = "/";
    }
  };

  return (
    <main className="flex min-h-screen min-w-full items-center justify-center gap-2 dark:bg-gray-700">
      <Card className="w-full max-w-sm rounded p-2 shadow-lg dark:bg-gray-800">
        <form onSubmit={(e) => handleSubmit(e, formSchema)}>
          <h1 className="mb-4 text-center text-2xl font-bold text-white">
            Sign In
          </h1>

          <div className="mb-4">
            <Label htmlFor="email" value="Email" />
            <TextInput
              id="email"
              name="email"
              type="email"
              placeholder="name@domain.com"
              value={formSchema.email}
              onChange={handleFormSchema}
              required
            />
          </div>

          <div className="mb-4">
            <Label htmlFor="password" value="Password" />
            <TextInput
              id="password"
              name="password"
              type="password"
              placeholder="********"
              value={formSchema.password}
              onChange={handleFormSchema}
              required
            />
          </div>

          <div className="mb-4">
            <Checkbox id="remember" name="remember" />
            <Label htmlFor="remember" className="ml-2">
              Remember me
            </Label>
          </div>

          <Button type="submit" gradientDuoTone="purpleToBlue" fullSized>
            Sign In
          </Button>
        </form>
      </Card>
    </main>
  );
}
