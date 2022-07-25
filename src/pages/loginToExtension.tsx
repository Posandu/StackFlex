import { useUser, withPageAuthRequired } from '@auth0/nextjs-auth0';
import { Button, Container, Heading, Input } from '@chakra-ui/react';
import { useEffect, useState } from 'react';

function hash(str: string): string {
  return str
    .split('')
    .map((char) => {
      return char.charCodeAt(0).toString(16);
    })
    .join('.');
}

function Home() {
  const { user } = useUser();

  const code = hash(user?.sub || '');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    document.title = `Logging you in to StackFlex`;
  }, []);

  return (
    <Container p={8} maxW='4xl'>
      <Heading>Login to extension</Heading>

      <p className='mt-4'>
        Copy the below code, go to VScode and paste it in the prompt.
      </p>

      <Input my={4} value={code} readOnly size='lg' />

      <Button
        onClick={() => {
          if (navigator.clipboard) {
            navigator.clipboard.writeText(code);
          } else {
            const textarea = document.createElement('textarea');
            textarea.value = code;
            document.body.appendChild(textarea);
            textarea.select();
            document.execCommand('copy');
            document.body.removeChild(textarea);
          }
          setCopied(true);
          setTimeout(() => {
            setCopied(false);
          }, 2000);
        }}
        colorScheme={copied ? 'green' : 'blue'}
      >
        {copied ? 'Copied!' : 'Copy'}
      </Button>
    </Container>
  );
}

export const getServerSideProps = withPageAuthRequired();
export default Home;
