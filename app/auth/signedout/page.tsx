"use client";

import { useEffect } from "react";
import { Button } from "flowbite-react";
import { signOut } from "aws-amplify/auth";

const SignOutPage = () => {
  useEffect(() => {
    const handleSignOut = async () => {
      try {
        await signOut({ global: true });
        setTimeout(() => {
          window.location.href = "/";
        }, 2000);
      } catch (error) {
        console.error("Error signing out:", error);
      }
    };

    handleSignOut();
  }, []);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="rounded-lg bg-white p-6 text-center shadow-md">
        <h1 className="mb-4 text-xl font-semibold">
          You have successfully signed out
        </h1>
        <p className="mb-4 text-gray-600">
          Redirecting you to the home page...
        </p>
        <Button color="gray" href="/">
          Go to Home Now
        </Button>
      </div>
    </div>
  );
};

export default SignOutPage;
