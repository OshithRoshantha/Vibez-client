import './Styles/Signin.css'
import mainLogo from '../assets/Icons/main-logo.png'
import { useState } from 'react';

export default function Signin() {
  const [swiped, setSwiped] = useState(false);
  const handleSwipe = () => {
    setSwiped(!swiped);
  };
  return (
    <div className={`main-container ${swiped ? 'swiped' : ''}`}>
        <div className='left-side'>
            <img src={mainLogo} className='main-logo' alt='Main Logo'/>
            <h1 className='main-hero'>A place for meaningful conversations</h1>
            <h1 className="display-4 main-sub">Sign in to stay connected with your friends and team.</h1>
        </div>
        <div className='right-side'>
        </div>
    </div>
  )
}
