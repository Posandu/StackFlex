import { getSession, Session, withPageAuthRequired } from '@auth0/nextjs-auth0';
import {
  Box,
  Button,
  Container,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Modal,
  ModalContent,
  ModalOverlay,
  Select,
  SimpleGrid,
  Spinner,
} from '@chakra-ui/react';
import Editor from '@monaco-editor/react';
import Fuse from 'fuse.js';
import { NextApiRequest, NextApiResponse } from 'next';
import Head from 'next/head';
import Router from 'next/router';
import { useEffect, useState } from 'react';

import { prisma } from '@/db';

const languages =
  `css,c++,c,rust,xml,javascript,typescript,go,python,java,html,json,yaml,markdown,shell,php,ruby,swift,kotlin,scala,r,jsx,tsx,C#,sql,vim,plaintext`.split(
    ','
  );

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

  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [editData, setEditData] = useState<element>({} as element);

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
    <Container maxW='6xl'>
      <Head>
        <title>Saved Codes | StackFlex</title>
      </Head>

      <Heading my={8}>Library</Heading>

      <Input
        value={query}
        placeholder='Search by title or language'
        variant='filled'
        onChange={(e) => setQuery(e.target.value)}
      />

      <p className='text-gray-700 my-4'>{items.length} Items</p>

      <SimpleGrid columns={6} spacing={4} mt={8}>
        {items.map((element: element) => (
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

            <Button
              size='sm'
              mt={4}
              onClick={() => {
                setDialogOpen(true);
                setLoading(true);

                fetch(`/api/codes/getInfo`, {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({
                    id: element.id,
                  }),
                })
                  .then((res) => res.json())
                  .then((res) => {
                    if (res.data[0]) {
                      setEditData(res.data[0]);

                      setTimeout(() => {
                        setLoading(false);
                      });
                    } else {
                      alert('Error');
                    }
                  });
              }}
            >
              View
            </Button>

            <Button
              size='sm'
              mt={4}
              colorScheme='red'
              variant='ghost'
              ml={2}
              onClick={() => {
                if (window.confirm('Are you sure?')) {
                  fetch(`/api/codes/update`, {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                      id: element.id,
                      deleteItem: true,
                    }),
                  })
                    .then((res) => res.json())
                    .then(() => {
                      Router.reload();
                    });
                }
              }}
            >
              Delete
            </Button>
          </Box>
        ))}
      </SimpleGrid>

      <div className='p-4'></div>

      <Modal
        isOpen={dialogOpen}
        onClose={() => setDialogOpen(false)}
        size='6xl'
      >
        <ModalOverlay />

        <ModalContent p={4}>
          {loading && <Spinner margin='auto' size='xl' />}

          {!loading && (
            <>
              <FormControl>
                <FormLabel>Title</FormLabel>
                <Input
                  defaultValue={editData.title}
                  onChange={(e) =>
                    setEditData({ ...editData, title: e.target.value })
                  }
                />
              </FormControl>

              <FormControl my={4}>
                <FormLabel>Code</FormLabel>
                <Editor
                  defaultValue={editData.code}
                  language={editData.language}
                  height='600px'
                  onChange={(value) =>
                    setEditData({ ...editData, code: value })
                  }
                  width='100%'
                  theme='vs-dark'
                />
              </FormControl>

              <FormControl mb={4}>
                <FormLabel>Language</FormLabel>

                <Select
                  defaultValue={editData.language}
                  onChange={(e) =>
                    setEditData({ ...editData, language: e.target.value })
                  }
                >
                  {languages.map((language) => (
                    <option key={language} value={language}>
                      {language}
                    </option>
                  ))}
                </Select>
              </FormControl>

              <div className='flex'>
                <Button
                  colorScheme='blue'
                  onClick={() => {
                    setLoading(true);

                    fetch(`/api/codes/update`, {
                      method: 'POST',
                      headers: {
                        'Content-Type': 'application/json',
                      },
                      body: JSON.stringify({
                        id: editData.id,
                        title: editData.title,
                        language: editData.language,
                        code: editData.code,
                      }),
                    })
                      .then((res) => res.json())
                      .then((res) => {
                        if (res.completed) {
                          setDialogOpen(false);
                          setLoading(false);
                        } else {
                          alert('Error: ' + res.error);
                        }
                      });
                  }}
                  disabled={loading}
                >
                  Update
                </Button>

                <Button
                  ml={2}
                  variant='ghost'
                  onClick={() => {
                    setDialogOpen(false);
                    setEditData({} as element);
                  }}
                  disabled={loading}
                >
                  Cancel
                </Button>
              </div>
            </>
          )}
        </ModalContent>
      </Modal>
    </Container>
  );
}

export const getServerSideProps = withPageAuthRequired({
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  async getServerSideProps(context: {
    req: NextApiRequest;
    res: NextApiResponse;
  }) {
    const { user } = getSession(context.req, context.res) as Session;

    const userId = user.sub ?? '';

    const _data = await prisma.data.findMany({
      where: {
        owner: {
          equals: userId,
        },
      },
      select: {
        id: true,
        title: true,
        language: true,
        code: false,
        createdAt: true,
      },
    });

    const data = _data.map((element) => {
      return {
        ...element,
        createdAt: '' + element.createdAt,
      };
    });

    return {
      props: {
        codes: data,
      },
    };
  },
});
export default Home;
