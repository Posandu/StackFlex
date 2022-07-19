import { Button, Heading } from '@chakra-ui/react';
import Image from 'next/image';

function Home() {
  return (
    <>
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

        <Button
          size='lg'
          className='shadow-2xl shadow-blue-700 hover:shadow-blue-900'
        >
          Sign up
        </Button>
      </div>

      <section className='py-10 px-8'>
        <h1 className='text-4xl font-bold text-center mb-8'>
          What is StackFlex?
        </h1>
        <p className='text-xl'>
          Now, think that you got a problem and Google it. You found a solution.
          What do you do? You <b>Copy-Paste</b> it! But, imagine you get the
          same problem again. But you can&apos;t find the solution.{' '}
          <span className='bg-gradient-to-tr from-blue-600 to-red-600 bg-clip-text text-transparent'>
            That&apos;s what StackFlex is for.
          </span>{' '}
          You save the code and use it from VsCode. Everything is synced.
        </p>

        <div className='p-8'></div>

        <div className='relative flex align-middle justify-center'>
          <div className='relative'>
            <Image src='/so.png' alt='Stack' width='689' height='325' />
            <span className='block absolute h-8 w-8 bg-blue-600 rounded-full animate-ping left-[35px] top-[35px]'></span>
          </div>
        </div>
      </section>
    </>
  );
}

export default Home;
