import { UserProvider } from '@auth0/nextjs-auth0';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import { AppProps } from 'next/app';

import '@/styles/globals.css';

const config = {
  initialColorMode: 'dark',
  useSystemColorMode: false,
};

const theme = extendTheme({ config });

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <UserProvider>
      <ChakraProvider theme={theme}>
        <Component {...pageProps} />
      </ChakraProvider>
    </UserProvider>
  );
}

export default MyApp;
