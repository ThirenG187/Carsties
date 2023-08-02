import { AuthOptions } from 'next-auth'
import NextAuth from 'next-auth/next'
import DuendeIDS6 from 'next-auth/providers/duende-identity-server6'

export const authOptions: AuthOptions = {
  session: {
    strategy: 'jwt',
  },
  providers: [
    DuendeIDS6({
      id: 'id-server',
      clientId: 'auctionsNextApp',
      clientSecret: 'secret',
      issuer: process.env.IDS_URL,
      authorization: {
        params: {
          scope: 'openid profile auctionApp',
        },
      },
      idToken: true,
    }),
  ],
  callbacks: {
    async jwt({ token, profile, account }) {
      if (profile) {
        token.username = profile.username
      }

      if (account) {
        token.access_token = account.access_token
      }

      return token
    },
    async session({ session, token }) {
      if (token) {
        session.user.username = token.username
      }
      return session
    },
  },
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }
