import { AddIcon, EditIcon } from '@chakra-ui/icons';
import { Container, Heading, LinkBox } from '@chakra-ui/react';
import { RedirectToSignIn, SignedOut } from '@clerk/nextjs';
import Link from 'next/link';

function Home() {
  return (
    <Container maxW='6xl'>
      <Heading my={8}>Home</Heading>

      <Link href='/createCode'>
        <LinkBox
          as='a'
          className='inline-block rounded'
          href='/createCode'
          background='gray.900'
          ringColor='gray.700'
          _hover={{
            ring: 4,
          }}
          _active={{
            opacity: 0.8,
            shadow: '8xl',
          }}
        >
          <div className='p-4 flex flex-col'>
            <div className='text-4xl text-center'>
              <AddIcon />
            </div>
            <div className='text-xl mt-4'>Create Code</div>
          </div>
        </LinkBox>
      </Link>

      <Link href='/codes'>
        <LinkBox
          as='a'
          className='inline-block rounded'
          href='/codes'
          background='gray.900'
          ringColor='gray.700'
          _hover={{
            ring: 4,
          }}
          ml={4}
          _active={{
            opacity: 0.8,
            shadow: '8xl',
          }}
        >
          <div className='p-4 flex flex-col'>
            <div className='text-4xl text-center'>
              <EditIcon />
            </div>
            <div className='text-xl mt-4'>Saved Codes</div>
          </div>
        </LinkBox>
      </Link>

      <SignedOut>
        <p>Signed out</p>

        <RedirectToSignIn />
      </SignedOut>
    </Container>
  );
}

export default Home;
