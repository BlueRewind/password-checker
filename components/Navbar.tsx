import { Button, Navbar, NavbarBrand } from 'flowbite-react';
import Link from 'next/link';

export default function NavbarComponent() {
  return (
    <Navbar fluid className="bg-gray-900">
      <NavbarBrand>
        <Link href="/" className="text-white text-lg font-bold">
          Password Checker
        </Link>
      </NavbarBrand>
      <div className="flex gap-4 ml-auto">
        <Link href="/auth/signin">
          <Button gradientDuoTone="purpleToBlue">Login</Button>
        </Link>
        <Link href="/auth/signup">
          <Button gradientDuoTone="cyanToBlue">Sign up</Button>
        </Link>
      </div>
    </Navbar>
  );
};

