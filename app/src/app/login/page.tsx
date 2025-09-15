'use client';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const username = formData.get('username') as string;
    const password = formData.get('password') as string;
    const res = await signIn('credentials', {
      redirect: false,
      username,
      password
    });
    if (res?.ok) {
      router.push('/tools');
    } else {
      setError('Identifiants invalides');
    }
  };

  return (
    <form onSubmit={onSubmit} className="space-y-4 max-w-sm mx-auto mt-20">
      <h1 className="text-2xl font-semibold text-center">Connexion</h1>
      <div>
        <label className="block mb-1">Identifiant</label>
        <input name="username" className="w-full border p-2" />
      </div>
      <div>
        <label className="block mb-1">Mot de passe</label>
        <input name="password" type="password" className="w-full border p-2" />
      </div>
      {error && <p className="text-red-600">{error}</p>}
      <button type="submit" className="bg-blue-600 text-white px-4 py-2">Se connecter</button>
    </form>
  );
}
