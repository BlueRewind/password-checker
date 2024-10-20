"use client";

import { Button, Card, Checkbox, Label, TextInput } from "flowbite-react";
import { FormEvent } from "react";
import { signIn } from "aws-amplify/auth"

interface SignInFormElements extends HTMLFormControlsCollection {
    email: HTMLInputElement
    password: HTMLInputElement
}

interface SignInForm extends HTMLFormElement {
    readonly elements: SignInFormElements
}

export default function SignIn() {

    async function handleSubmit(event: FormEvent<SignInForm>) {
        event.preventDefault();
        const form = event.currentTarget;

        await signIn({
            username: form.elements.email.value,
            password: form.elements.password.value,
        });
    }

    return (
        <main className="flex min-h-screen min-w-full items-center justify-center gap-2 dark:bg-gray-700">
            <Card className="dark:bg-gray-800 p-2 rounded shadow-lg w-full max-w-sm">
                <form onSubmit={handleSubmit}>
                    <h1 className="text-2xl font-bold mb-4 text-center text-white">Sign In</h1>

                    <div className="mb-4">
                        <Label htmlFor="email" value="Email" />
                        <TextInput id="email" name="email" type="email" placeholder="name@domain.com" required />
                    </div>

                    <div className="mb-4">
                        <Label htmlFor="password" value="Password" />
                        <TextInput id="password" name="password" type="password" placeholder="********" required />
                    </div>

                    <div className="mb-4">
                        <Checkbox id="remember" name="remember" />
                        <Label htmlFor="remember" className="ml-2">Remember me</Label>
                    </div>

                    <Button type="submit" gradientDuoTone="purpleToBlue" fullSized>Sign In</Button>
                </form>
            </Card>
        </main>
    );
}