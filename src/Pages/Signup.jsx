import './Styles/Signup.css'
import SignupElement from '@/Components/SignupElement'
import mainLogo from '../assets/Icons/main-logo.png'
import { useNavigate } from 'react-router-dom';
import { useIsMobile } from '../hooks/useIsMobile';

export default function Signup() {

  const isMobile = useIsMobile();
  const navigate = useNavigate();
  function navSignin() {
      navigate('/');
  }

  return (
    <div className='second-container'>
      <div className='header' style={{width: isMobile ? '80%' : ''}}>
        <div className='header-right'>
          <p className="h1 signup-main">Sign Up</p>
          <p className="display-6 signup-sub">Let's get started, Sign up and keep the conversation flowing.</p><br></br>
          <p>Already have an account? <a className='signup-link' onClick={() => {navSignin();}}>Sign In</a></p>
        </div>
        {!isMobile && <>
        <div className='logo'>
          <img src={mainLogo} className='main-logo-signup' alt='Main Logo'/>
        </div>
        </>}
      </div>
      <div className='signup-container' style={{width: isMobile ? '80%' : ''}}>
        <SignupElement/>
      </div>
    </div>
  )
}
