"use client";

import { Button, Navbar, NavbarBrand } from "flowbite-react";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";

export default function NavbarComponent() {
  const session = useSession();
  const handleSignOut = async () => {
    try {
      signOut({ callbackUrl: "http://localhost:3000" });
    } catch (error) {
      console.log("Error signing out:", error);
    }
  };
  return (
    <Navbar fluid className="bg-gray-900">
      <NavbarBrand className="text-lg font-bold text-white" href="/">
        Password Checker
      </NavbarBrand>

      <div className="ml-auto flex gap-4">
        {session.status === "authenticated" ? (
          <>
            <Button gradientDuoTone="redToYellow" onClick={handleSignOut}>
              Sign Out
            </Button>
          </>
        ) : session.status === "loading" ? (
          <></>
        ) : (
          <>
            <Link href="/auth/signin">
              <Button gradientDuoTone="purpleToBlue">Login</Button>
            </Link>
            <Link href="/auth/signup">
              <Button gradientDuoTone="cyanToBlue">Sign up</Button>
            </Link>
          </>
        )}
      </div>
    </Navbar>
  );
}
