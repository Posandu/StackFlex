import { withPageAuthRequired } from '@auth0/nextjs-auth0';

function Home() {
  return <h1>Home</h1>;
}

export default Home;

export const getServerSideProps = withPageAuthRequired();
