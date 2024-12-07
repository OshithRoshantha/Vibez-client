import './Styles/Signup.css'
import SignupElement from '@/Components/SignupElement'
import mainLogo from '../assets/Icons/main-logo.png'
import { useNavigate } from 'react-router-dom';

export default function Signup() {
  const navigate = useNavigate();
  function navSignin() {
      navigate('/');
  }

  return (
    <div className='second-container'>
      <div className='header'>
        <div className='header-right'>
          <p class="h1 signup-main">Sign Up</p>
          <p class="display-6 signup-sub">Let's get started, Sign up and keep the conversation flowing.</p><br></br>
          <p>Already have an account? <a className='signup-link' onClick={() => {navSignin();}}>Sign In</a></p>
        </div>
        <div className='logo'>
          <img src={mainLogo} className='main-logo-signup' alt='Main Logo'/>
        </div>
      </div>
      <div className='signup-container'>
        <SignupElement/>
      </div>
    </div>
  )
}
