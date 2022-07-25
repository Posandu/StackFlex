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
          Logging in to VSCode extension
        </Heading>
        <p>
          Install VSCode extension from{' '}
          <a
            href='https://marketplace.visualstudio.com/items?itemName=Posandu.stackflex'
            target='_blank'
            rel='noopener noreferrer'
            className='text-blue-500 mb-4 block'
          >
            here
          </a>
        </p>
        <iframe
          width='789'
          height='631'
          src='https://www.youtube.com/embed/7Vn1cue8pDs'
          title='log in to ext'
          allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
          allowFullScreen
          className='mb-4'
        ></iframe>

        <Heading size='md' mb={4}>
          Installing StackFlex browser extension
        </Heading>
        <p>
          Download the extension zip file from{' '}
          <a
            href='https://github.com/Posandu/stackflex-extensions/blob/main/browser/dist/stackflex-browser.zip?raw=true'
            target='_blank'
            rel='noopener noreferrer'
            className='text-blue-500 mb-4 block'
          >
            here
          </a>
          And extract it
        </p>
        <iframe
          width='789'
          height='631'
          src='https://www.youtube.com/embed/6l71GTBGee8'
          title='install extension'
          frameBorder='0'
          allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
          allowFullScreen
          className='mb-4'
        ></iframe>

        <Heading size='md' mb={4}>
          Saving and using codes
        </Heading>
        <iframe
          width='789'
          height='631'
          src='https://www.youtube.com/embed/P-XqC3K6bc4'
          title='save and use'
          frameBorder='0'
          allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
          allowFullScreen
          className='mb-4'
        ></iframe>
      </Container>
    </>
  );
}
export default Home;
