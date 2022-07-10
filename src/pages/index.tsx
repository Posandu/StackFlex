import { Button } from '@chakra-ui/react';
import { RedirectToSignIn, SignedIn, SignedOut } from '@clerk/nextjs';
import { useAuth } from '@clerk/nextjs';
import Link from 'next/link';

function Home() {
  const { userId } = useAuth();

  return (
    <div>
      <h1>Home</h1>
      <p>This is the home page</p>

      <SignedIn>
        <p>Signed in user id: {userId}</p>
      </SignedIn>

      <Link href='/createCode'>
        <Button>Create Code</Button>
      </Link>

      <Link href='/codes'>
        <Button>Codes</Button>
      </Link>

      <SignedOut>
        <p>Signed out</p>

        <RedirectToSignIn />
      </SignedOut>
    </div>
  );
}

export default Home;
