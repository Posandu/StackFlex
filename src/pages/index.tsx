import { AddIcon, EditIcon } from '@chakra-ui/icons';
import { Container, Heading, LinkBox } from '@chakra-ui/react';
import { RedirectToSignIn, SignedOut } from '@clerk/nextjs';
import Link from 'next/link';

function ActionBox({
  icon,
  text,
  link,
}: {
  icon: React.ReactNode;
  text: string;
  link: string;
}) {
  return (
    <Link href={link}>
      <LinkBox
        as='a'
        className='inline-block rounded'
        href={link}
        background='gray.700'
        ringColor='gray.600'
        transition='all 0.2s ease'
        userSelect='none'
        _hover={{
          ring: 4,
          background: 'gray.600',
        }}
        _active={{
          shadow: '8xl',
          ring: 8,
        }}
        mr={4}
      >
        <div className='p-4 flex flex-col'>
          <div className='text-4xl text-center'>{icon}</div>
          <div className='text-xl mt-4'>{text}</div>
        </div>
      </LinkBox>
    </Link>
  );
}

function Home() {
  return (
    <Container maxW='6xl'>
      <Heading my={8}>Home</Heading>

      <ActionBox icon={<AddIcon />} text='Create Code' link='/createCode' />

      <ActionBox icon={<EditIcon />} text='Saved Codes' link='/codes' />

      <SignedOut>
        <p>Signed out</p>

        <RedirectToSignIn />
      </SignedOut>
    </Container>
  );
}

export default Home;
