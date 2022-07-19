import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import {
  Alert,
  Button,
  Container,
  FormControl,
  FormLabel,
  Grid,
  Heading,
  Input,
  Select,
  useToast,
} from '@chakra-ui/react';
import Editor from '@monaco-editor/react';
import Head from 'next/head';
import Router from 'next/router';
import { useEffect, useRef, useState } from 'react';

const languages =
  `css,c++,c,rust,xml,javascript,typescript,go,python,java,html,json,yaml,markdown,shell,php,ruby,swift,kotlin,scala,r,jsx,tsx,C#,sql,vim,plaintext`.split(
    ','
  );

function Home(): JSX.Element {
  /**
   * Monaco editor ref
   */
  const monacoRef = useRef(null);

  /**
   * Toast
   */
  const toast = useToast();

  /**
   * States
   */
  const [title, setTitle] = useState('');
  const [language, setLanguage] = useState('plaintext');
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const getHashProps = () => {
    const hash = window.location.hash.slice(1);
    const [title, language, code] = hash.split(`|`).map(decodeURIComponent);
    return { title, language, code };
  };

  function create() {
    setLoading(true);
    setError('');

    fetch(`/api/codes/create`, {
      method: `POST`,
      headers: {
        'Content-Type': `application/json`,
      },
      body: JSON.stringify({
        title,
        language,
        code,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.created) {
          setLoading(false);
          toast({
            title: `Created`,
            description: `Code created successfully`,
            status: `success`,
            duration: 5000,
            isClosable: true,
          });

          window.close();
        } else {
          setLoading(false);
          setError(res.error || `Unknown error`);
        }
      });
  }

  useEffect(() => {
    const { title, language, code } = getHashProps();
    setTitle(title);
    setLanguage(language);
    setCode(code);
  }, []);

  function handleEditorDidMount(editor: null) {
    // here is another way to get monaco instance
    // you can also store it in `useRef` for further usage
    monacoRef.current = editor;
  }

  return (
    <Container maxW='6xl'>
      <Head>
        <title>Create Code | StackFlex</title>
      </Head>

      <Heading my={8}>Create Code</Heading>

      <FormControl>
        <FormLabel>Title</FormLabel>
        <Input onChange={(e) => setTitle(e.target.value)} value={title} />
      </FormControl>

      <div className='p-2'></div>

      <FormControl>
        <FormLabel>Code</FormLabel>
        <Editor
          height='500px'
          defaultValue={code}
          theme='vs-dark'
          onMount={handleEditorDidMount}
          onChange={(newValue) => {
            setCode(newValue || '');
          }}
          language={language}
        ></Editor>
      </FormControl>

      <div className='p-2'></div>

      <FormControl>
        <FormLabel>Language</FormLabel>
        <Select
          onChange={(e) => setLanguage(e.target.value)}
          defaultValue={language}
          value={language}
        >
          {languages.map((Optlanguage) => (
            <option key={Optlanguage} value={Optlanguage}>
              {Optlanguage}
            </option>
          ))}
        </Select>
      </FormControl>

      <div className='p-2'></div>

      {error && (
        <Alert colorScheme='red' my={4}>
          {error}
        </Alert>
      )}

      <Grid templateColumns='1fr 1fr' gap={4} w='max-content'>
        <Button
          colorScheme='cyan'
          onClick={create}
          disabled={loading}
          isLoading={loading}
        >
          Create
        </Button>

        <Button
          variant='ghost'
          onClick={() => {
            /**
             * Check if popup is opened
             */
            if (window.opener) {
              window.close();
            }

            Router.push(`/`);
          }}
        >
          Cancel
        </Button>
      </Grid>

      <div className='p-4'></div>
    </Container>
  );
}

export default Home;

export const getServerSideProps = withPageAuthRequired();
