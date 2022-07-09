import { RedirectToSignIn, SignedIn, SignedOut } from '@clerk/nextjs';
import { useAuth } from '@clerk/nextjs';

function Home() {
  const { userId } = useAuth();

  return (
    <div>
      <h1>Home</h1>
      <p>This is the home page</p>

      <SignedIn>
        <p>Signed in user id: {userId}</p>
      </SignedIn>

      <SignedOut>
        <p>Signed out</p>

        <RedirectToSignIn />
      </SignedOut>
    </div>
  );
}

export default Home;
