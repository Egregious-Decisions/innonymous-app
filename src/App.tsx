import Login from './pages/login/Login';
import Messages from './pages/chats/Messages';
import './index.css';

const isLoggedIn = true;

const App = () => (isLoggedIn ? <Messages /> : <Login />);

export default App;
