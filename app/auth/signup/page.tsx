"use client";

import { FormEvent, useState } from 'react';
import { Button, Label, TextInput } from 'flowbite-react';
import { signUp } from "aws-amplify/auth"

interface SignUpFormElements extends HTMLFormControlsCollection {
    email: HTMLInputElement
    password: HTMLInputElement
}

interface SignUpForm extends HTMLFormElement {
    readonly elements: SignUpFormElements
}

export default function Signup() {
  const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({ email: '', password: '' });

//   const validatePassword = (password: string) => {
//     const specialChar = /[!@#$%^&*(),.?":{}|<>]/;
//     const number = /\d/;
//     if (password.length < 8) return 'Password must be at least 8 characters long.';
//     if (!specialChar.test(password)) return 'Password must include at least one special character.';
//     if (!number.test(password)) return 'Password must include at least one number.';
//     return '';
//   };

  async function handleSubmit(event: FormEvent<SignUpForm>) {
    event.preventDefault();
    const form = event.currentTarget;

    await signUp({
      username: form.elements.email.value,
      password: form.elements.password.value,
    })
  }

  return (
    <main className="flex min-h-screen min-w-full items-center justify-center gap-2 dark:bg-gray-800">
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <div>
            <Label htmlFor="email" value="Your email" />
            <TextInput
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="name@domain.com"
            />
            {errors.email && <p className="text-red-500">{errors.email}</p>}
        </div>
        <div>
            <Label htmlFor="password" value="Your password" />
            <TextInput
            id="password"
            type="password"
            required
            placeholder="********"
            />
            {errors.password && <p className="text-red-500">{errors.password}</p>}
        </div>
        <Button type="submit">
            Sign up
        </Button>
        </form>
    </main>
  );
};
