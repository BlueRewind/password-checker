"use client";

import { getCurrentUser, signOut } from "aws-amplify/auth";
import { Button, Navbar, NavbarBrand } from "flowbite-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function NavbarComponent() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkUser = async () => {
      try {
        const user = await getCurrentUser();

        if (user) {
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.log("User not authenticated:", error);
        setIsAuthenticated(false);
      }
    };

    checkUser();
  }, []);

  const handleSignOut = async () => {
    try {
      await signOut();
      setIsAuthenticated(false);
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
        {isAuthenticated ? (
          <>
            <Button gradientDuoTone="redToYellow" onClick={handleSignOut}>
              Sign Out
            </Button>
          </>
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
