// /pages/api/auth/register.ts
import { CognitoIdentityProviderClient, SignUpCommand } from "@aws-sdk/client-cognito-identity-provider";
import { NextRequest, NextResponse } from "next/server";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { email, password }: any = req.body;

    const client = new CognitoIdentityProviderClient({ region: "us-east-1" });
    const command = new SignUpCommand({
      ClientId: process.env.NEXT_PUBLIC_COGNITO_CLIENT_ID,
      Username: email,
      Password: password,
    });
    try {
      const response = await client.send(command);
      res.status(200).json({ message: "User registered successfully!", response });
    } catch (error) {
      console.error("Error signing up user:", error);
      res.status(500).json({ error: error?.message });
    }
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
