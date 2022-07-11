import { Button, Container, Heading } from '@chakra-ui/react';
import { SignInButton } from '@clerk/nextjs';
import { useEffect, useState } from 'react';

function Home() {
  const [redirectTo, setRedirectTo] = useState<string>('');

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.href);

    if (urlParams.has('redirect_url')) {
      return setRedirectTo(urlParams.get('redirect_url') || '');
    }
  }, []);

  return (
    <Container maxW='container.xl' p={10}>
      <Heading mb={8}>Sign in to continue</Heading>

      <SignInButton redirectUrl={redirectTo}>
        <Button>Sign In</Button>
      </SignInButton>
    </Container>
  );
}

export default Home;
