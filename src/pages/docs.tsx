import { Container, Heading } from '@chakra-ui/react';
import Head from 'next/head';

function Home() {
  return (
    <>
      <Head>
        <title>StackFlex | docs</title>
      </Head>

      <Container p={10} maxWidth='container.xl'>
        <Heading mb={4}>StackFlex Docs</Heading>
        <p>
          Welcome to the StackFlex documentation. Here you can find information
          about how to use StackFlex.
        </p>
        <div className='p-4'></div>

        <Heading size='md' mb={4}>
          Creating an item
        </Heading>
      </Container>
    </>
  );
}
export default Home;
