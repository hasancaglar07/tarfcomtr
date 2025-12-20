import type { NextAuthOptions } from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import bcrypt from 'bcryptjs'

const adminEmail = process.env.ADMIN_EMAIL || 'admin@tarf.com'
const adminPassword = 'Tarfyazilim123456!'

export const authOptions: NextAuthOptions = {
  session: { strategy: 'jwt' },
  pages: { signIn: '/admin/login' },
  providers: [
    Credentials({
      name: 'Admin',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null
        // Basit fallback: env yoksa default admin/parola geçerli
        const inputEmail = credentials.email.toLowerCase()
        const adminEmailNormalized = adminEmail.toLowerCase()
        if (inputEmail !== adminEmailNormalized) return null

        if (credentials.password !== adminPassword) return null

        return { id: 'admin', email: adminEmail }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user?.email) {
        token.email = user.email
      }
      return token
    },
    async session({ session, token }) {
      if (session.user && token.email) {
        session.user.email = token.email as string
      }
      return session
    },
  },
}
