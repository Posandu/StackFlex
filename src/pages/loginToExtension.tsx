import { Button, Container, Heading, Input } from '@chakra-ui/react';
import { useAuth } from '@clerk/nextjs';
import { withServerSideAuth } from '@clerk/nextjs/ssr';
import { useState } from 'react';

function hash(str: string): string {
  return str
    .split('')
    .map((char) => {
      return char.charCodeAt(0).toString(16);
    })
    .join('.');
}

function Home() {
  const { userId } = useAuth();
  const code = hash(userId || '') || '';
  const [copied, setCopied] = useState(false);

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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const fn = async (props: { req: any; resolvedUrl: any }): Promise<any> => {
  const { req, resolvedUrl } = props;
  const { userId } = req.auth;

  if (!userId) {
    return {
      redirect: { destination: '/sign-in?redirect_url=' + resolvedUrl },
    };
  }

  return {
    props: {},
  };
};

export const getServerSideProps = withServerSideAuth(fn);
export default Home;
