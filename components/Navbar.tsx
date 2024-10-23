"use client";

import { Button, Navbar, NavbarBrand } from "flowbite-react";
import Link from "next/link";
import { ProfileDropdown } from "./ProfileDropdown";
import { useAuth } from "./AuthHook";

export default function NavbarComponent() {
  const { user, loading } = useAuth();

  return (
    <Navbar fluid className="bg-gray-900">
      <NavbarBrand className="text-lg font-bold text-white" href="/">
        Password Checker
      </NavbarBrand>

      <div className="ml-auto flex gap-4">
        {user !== null ? (
          <>
            <ProfileDropdown />
          </>
        ) : loading ? (
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
