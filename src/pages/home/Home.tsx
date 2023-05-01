import Header from '../../components/layout/Header';
import PageBody from '../../components/layout/PageBody';
import Main from '../../components/layout/Main';
import MainMessage from './components/MainMessage';
import AnimatedIcon from './components/AnimatedIcon';
import Stack from '../../components/Stack';
import SmallViteIcon from './components/SmallViteIcon';

const Home = () => (
  <PageBody>
    <Header>Web application template</Header>
    <Main>
      <MainMessage>Hello world!</MainMessage>
      <AnimatedIcon>
        <Stack>
          <div>🐳</div>
          <SmallViteIcon />
        </Stack>
      </AnimatedIcon>
    </Main>
    <footer>
      Source code available at{' '}
      <a href="https://github.com/ntdesmond/styled-react-ts-vite">GitHub</a>!
    </footer>
  </PageBody>
);

export default Home;
