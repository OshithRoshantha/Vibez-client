import './Styles/Signup.css';
import SignupElement from '@/Components/SignupElement';
import mainLogo from '../assets/Icons/main-logo.png';
import { useNavigate } from 'react-router-dom';

export default function Signup() {
  const navigate = useNavigate();

  const navigateToSignin = () => navigate('/');

  return (
    <div className='second-container'>
      <div className='header'>
        <div className='header-right'>
          <h1 className="signup-main">Sign Up</h1>
          <p className="display-6 signup-sub">
            Let's get started, sign up and keep the conversation flowing.
          </p>
          <p>
            Already have an account?{' '}
            <a className='signup-link' onClick={navigateToSignin}>
              Sign In
            </a>
          </p>
        </div>
        <div className='logo'>
          <img src={mainLogo} className='main-logo-signup' alt='Main Logo' />
        </div>
      </div>
      <div className='signup-container'>
        <SignupElement />
      </div>
    </div>
  );
}
