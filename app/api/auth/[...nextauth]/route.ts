import { type DefaultSession } from "next-auth";
import { type JWT, type DefaultJWT } from "next-auth/jwt";
import NextAuth from "next-auth";

import Cognito from "next-auth/providers/cognito";
import { randomUUID } from "crypto";

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      firstName?: string;
      lastName?: string;
      sub?: string;
      name?: string;
      email?: string;
      image?: string;
      userId?: string;
    };
    access_token?: string;
    id_token?: string;
    groups?: string[];
  }
}

declare module "next-auth/jwt" {
  interface JWT extends Record<string, string>, DefaultJWT {
    firstName?: string;
    lastName?: string;
    access_token?: string;
    expires_at?: number;
    refresh_token?: string;
    userId?: string;
    groups?: string[];
  }
}
export const authConfig = {
  callbacks: {
    jwt: ({ token, account, profile }: any) => {
      if (account) {
        //First login. Push necessary tokens into the JWT
        const newToken: JWT = {
          ...token,
          firstName: profile?.given_name ?? undefined,
          lastName: profile?.family_name ?? undefined,
          access_token: account.access_token,
          expires_at: account.expires_at,
          refresh_token: account.refresh_token,
          userId: profile?.userId as string,
          groups: (profile?.["cognito:groups"] ?? []) as string[],
        };

        return newToken;
      }

      return token;
    },
    session: ({ session, token }: any) => {
      const { firstName, lastName, sub } = token;

      return {
        ...session,
        user: {
          ...session.user,
          sub: sub,
          firstName,
          lastName,
          name: `${firstName} ${lastName}`,
          userId: token.userId,
        },
        access_token: token.access_token,
        refresh_token: token.refresh_token,
        expires_at: token.expires_at,
        groups: token.groups,
      };
    },
    authorized: ({ auth }: any) => {
      return !!auth;
    },
  },
  trustHost: true,
  providers: [
    Cognito({
      clientId: String(process.env.NEXT_PUBLIC_AWS_COGNITO_CLIENT_ID),
      clientSecret: String(process.env.NEXT_PUBLIC_AWS_COGNITO_CLIENT_SECRET),
      issuer: String(process.env.NEXT_PUBLIC_AWS_COGNITO_IDP_URL),
      authorization: { params: { scope: "openid email profile" } },
      wellKnown: String(process.env.NEXT_PUBLIC_AWS_COGNITO_IDP_URL),
      checks: ["pkce", "state"],
      idToken: true,
      profile(profile) {
        return {
          id: profile.sub ?? randomUUID(),
          name: profile.name ?? "",
          email: profile.email ?? null,
          image: profile.picture ?? null,
        };
      },
    }),
  ],
  debug: false,
  secret: String(process.env.NEXTAUTH_SECRET),
};

const handler = NextAuth(authConfig as any);
export { handler as GET, handler as POST };
