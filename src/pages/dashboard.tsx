import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import { Box, Container, Heading } from '@chakra-ui/react';
import Head from 'next/head';
import Link from 'next/link';

function Actionbox({
  link,
  name,
}: {
  link: string;
  name: string;
}): JSX.Element {
  return (
    <Link href={link}>
      <a>
        <Box
          background='gray.700'
          display='inline-block'
          p={7}
          mr={4}
          rounded='md'
          transform='translateY(0)'
          _hover={{
            transform: 'translateY(-4px)',
          }}
          className='shadow-xl border group hover:border-gray-700 transition-all shadow-gray-800 hover:shadow-2xl hover:shadow-gray-700 text-xl'
        >
          {name}{' '}
          <b className='text-2xl ml-4 group-hover:ml-6 transition-all'>-&gt;</b>
        </Box>
      </a>
    </Link>
  );
}

function Home() {
  return (
    <Container maxW='6xl'>
      <Head>
        <title>Dashboard - StackFlex</title>
      </Head>

      <Heading my={8}>Dashboard</Heading>

      <Actionbox link='/codes' name='Library' />
      <Actionbox link='/createCode' name='Create Code' />
    </Container>
  );
}

export default Home;

export const getServerSideProps = withPageAuthRequired();
