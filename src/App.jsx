import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Signin from './Pages/Signin';
import Signup from './Pages/Signup';
import Dashboard from './Pages/Dashboard';
import { WebSocketProvider } from './Context/WebSocketContext';
import { GlobalProvider } from './States/UseStore';
import { useState} from 'react';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = (status) => {
    setIsLoggedIn(status);
  };

  return (
    <>
    <WebSocketProvider isLoggedIn={isLoggedIn}>
    <GlobalProvider>
      <Router>
        <Routes>
          <Route path='/' element={<Signin onLogin={handleLogin} />} />
          <Route path='/Signup' element={<Signup/>} />
          <Route path='/Dashboard' element={<Dashboard/>} />
        </Routes>
      </Router>
      </GlobalProvider>
    </WebSocketProvider>
    </>
  )
}

export default App
