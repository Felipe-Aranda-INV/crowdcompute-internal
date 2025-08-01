'use client';

import { signOut, useSession } from 'next-auth/react';

const Header = () => {
  const { data: session } = useSession();

  return (
    <header style={{ display: 'flex', justifyContent: 'space-between', padding: '20px', borderBottom: '1px solid #ccc' }}>
      <h1>CrowdCompute</h1>
      {session && (
        <button onClick={() => signOut()}>Sign Out</button>
      )}
    </header>
  );
};

export default Header;