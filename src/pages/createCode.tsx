/* eslint-disable react-hooks/rules-of-hooks */
import { Alert, Button, Input, Select, useToast } from '@chakra-ui/react';
import Editor from '@monaco-editor/react';
import { useEffect, useRef, useState } from 'react';

const languages =
  `css,c++,c,rust,javascript,typescript,go,python,java,html,json,yaml,markdown,shell,php,ruby,swift,kotlin,scala,r,jsx,tsx,C#,sql,vim`.split(
    `,`
  );

function Home(): JSX.Element {
  const monacoRef = useRef(null);
  const toast = useToast();

  const [title, setTitle] = useState('');
  const [language, setLanguage] = useState('');
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
    <div className='max-w-2xl m-auto my-8'>
      <h1 className='text-2xl mb-4'>Create Code</h1>

      <p className='text-gray-600 text-sm my-4'>Title</p>
      <Input onChange={(e) => setTitle(e.target.value)} value={title} />

      <p className='text-gray-600 text-sm my-4'>Code</p>
      <Editor
        height='500px'
        defaultValue={code}
        theme='vs-dark'
        onMount={handleEditorDidMount}
        onChange={(newValue) => {
          setCode(newValue || '');
        }}
      ></Editor>

      <p className='text-gray-600 text-sm my-4'>Language</p>
      <Select onChange={(e) => setLanguage(e.target.value)} value={language}>
        {languages.map((language) => (
          <option key={language} value={language}>
            {language}
          </option>
        ))}
      </Select>

      <div className='p-4'></div>

      {error && (
        <Alert colorScheme='red' my={4}>
          {error}
        </Alert>
      )}

      <Button
        colorScheme='cyan'
        onClick={create}
        disabled={loading}
        isLoading={loading}
      >
        Create
      </Button>
    </div>
  );
}

export default Home;
