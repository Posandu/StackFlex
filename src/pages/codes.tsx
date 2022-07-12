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
import { withServerSideAuth } from '@clerk/nextjs/ssr';
import Editor from '@monaco-editor/react';
import Fuse from 'fuse.js';
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
                    if (res.data) {
                      setEditData(res.data);

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

//🙄
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
