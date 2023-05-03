import Login from './pages/login/Login';
import './index.css';

const isLoggedIn = false;

const App = () => (isLoggedIn ? <div /> : <Login />);

export default App;
