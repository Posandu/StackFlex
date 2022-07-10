import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import { ClerkProvider } from '@clerk/nextjs';
import { AppProps } from 'next/app';

import '@/styles/globals.css';

const config = {
  initialColorMode: 'dark',
  useSystemColorMode: false,
};

const theme = extendTheme({ config });

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ClerkProvider {...pageProps}>
      <ChakraProvider theme={theme}>
        <Component {...pageProps} />
      </ChakraProvider>
    </ClerkProvider>
  );
}

export default MyApp;
