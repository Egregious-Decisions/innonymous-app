import Login from './pages/login/Login';

const isLoggedIn = false;

const App = () => (isLoggedIn ? <div /> : <Login />);

export default App;
