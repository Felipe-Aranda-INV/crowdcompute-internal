'use client';

import { signIn } from 'next-auth/react';
import { useSearchParams } from 'next/navigation';

const LoginPage = () => {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/dashboard';

  return (
    <div>
      <h1>Login</h1>
      <button onClick={() => signIn('google', { callbackUrl })}>Sign in with Google</button>
    </div>
  );
};

export default LoginPage;