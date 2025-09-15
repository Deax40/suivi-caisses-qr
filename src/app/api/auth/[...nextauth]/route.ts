import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';

const users = [
  { id: '1', name: 'Admin', username: 'admin', password: 'admin', role: 'admin' },
  { id: '2', name: 'Tech', username: 'tech', password: 'tech', role: 'tech' }
];

const handler = NextAuth({
  providers: [
    Credentials({
      credentials: {
        username: { label: 'Identifiant', type: 'text' },
        password: { label: 'Mot de passe', type: 'password' },
        role: { label: 'Rôle', type: 'text' }
      },
      async authorize(credentials) {
        const user = users.find(
          u =>
            u.username === credentials?.username &&
            u.password === credentials?.password &&
            u.role === credentials?.role
        );
        if (user) return user as any;
        return null;
      }
    })
  ],
  callbacks: {
    async session({ session, token }) {
      if (token.role) session.user.role = token.role as string;
      return session;
    },
    async jwt({ token, user }) {
      if (user) token.role = (user as any).role;
      return token;
    }
  }
});

export async function GET(req: Request) {
  return handler(req);
}

export async function POST(req: Request) {
  return handler(req);
}
