import {
  Box,
  Button,
  Container,
  Heading,
  Input,
  SimpleGrid,
} from '@chakra-ui/react';
import { withServerSideAuth } from '@clerk/nextjs/ssr';
import Fuse from 'fuse.js';
import { useEffect, useState } from 'react';

import { prisma } from '@/db';

interface element {
  id: string;
  title: string;
  language: string;
  code?: string;
  createdAt: string;
}

function Home({ codes }: { codes: Array<element> }): JSX.Element {
  const [items, setItems] = useState<Array<element>>(codes);
  const [query, setQuery] = useState<string>('');

  const search = () => {
    if (query.trim().length < 1) return setItems(codes);

    const fuse = new Fuse(codes, {
      keys: ['title', 'language'],
    });

    const results = fuse.search(query).map((result) => result.item);

    setItems(results as unknown as Array<element>);
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(search, [query]);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(search, []);

  return (
    <Container maxW='container.xl'>
      <div className='p-4'></div>

      <Heading mb={8}>Library</Heading>

      <Input
        value={query}
        placeholder='Search by title or language'
        variant='filled'
        onChange={(e) => setQuery(e.target.value)}
      />

      <p className='text-gray-700 my-4'>{items.length} Items</p>

      <SimpleGrid columns={6} spacing={4} mt={8}>
        {items.map((element) => (
          <Box
            key={element.id + element.title}
            borderRadius='md'
            bg='gray.900'
            p={4}
            shadow='md'
            _hover={{
              ring: 2,
              ringColor: 'black',
            }}
          >
            <Heading size='sm'>{element.title}</Heading>
            <p className='mt-4 text-gray-700'>{element.language}</p>

            <Button size='sm' mt={4}>
              View
            </Button>
            <Button size='sm' mt={4} colorScheme='red' variant='ghost' ml={2}>
              Delete
            </Button>
          </Box>
        ))}
      </SimpleGrid>
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

  const _data = await prisma.data.findMany({
    where: {
      owner: userId,
    },
    select: {
      code: false,
      owner: false,
      createdAt: true,
      id: true,
      language: true,
      title: true,
    },
  });

  const data = _data.map((element) => {
    return {
      ...element,
      createdAt: '_' + element.createdAt,
    };
  });

  return {
    props: {
      codes: data,
    },
  };
};

export const getServerSideProps = withServerSideAuth(fn);
export default Home;
