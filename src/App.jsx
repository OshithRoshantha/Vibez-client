import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Signin from './Pages/Signin';
import Signup from './Pages/Signup';
import Dashboard from './Pages/Dashboard';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Signin/>} />
          <Route path='/Signup' element={<Signup/>} />
          <Route path='/Dashboard' element={<Dashboard/>} />
        </Routes>
      </Router>
    </>
  )
}

export default App
