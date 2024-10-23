import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeModeScript } from "flowbite-react";
import "./globals.css";
import NavbarComponent from "@/components/Navbar";
import ConfigureAmplifyClientSide from "@/app/amplify-cognito-config";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Password Checker",
  description: "Check if your password has breached credentials",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <ThemeModeScript />
        <ConfigureAmplifyClientSide />
      </head>
      <body className={inter.className}>
        {/* <NextAuthProvider> */}
        <NavbarComponent />
        {children}
        {/* </NextAuthProvider> */}
      </body>
    </html>
  );
}
