import { Button, Heading } from '@chakra-ui/react';
import Image from 'next/image';

function Home() {
  return (
    <div className='min-h-screen text-center overflow-hidden bg-gradient-to-tr from-[#01051bdd] to-[#230a3fdd]'>
      <div className='h-[20vh]'></div>

      <Image
        src='/logo.png'
        alt='logo'
        width={200}
        height={200}
        className='rounded'
      />

      <Heading className='max-w-max m-auto mt-8' size='4xl'>
        <del className='opacity-30'>Copy-paste</del>{' '}
        <span className='bg-gradient-to-tr from-blue-600 to-red-600 bg-clip-text text-transparent'>
          Save-Use
        </span>
      </Heading>

      <p className='text-gray-400 text-xl my-10'>
        StackFlex is a new kind of copy-paste.
      </p>

      <Button size='lg'>Sign up</Button>
    </div>
  );
}

export default Home;
