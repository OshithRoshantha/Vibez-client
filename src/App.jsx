import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Signin from './Pages/Signin';
import Signup from './Pages/Signup';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Signin/>} />
          <Route path='/Signup' element={<Signup/>} />
        </Routes>
      </Router>
    </>
  )
}

export default App
