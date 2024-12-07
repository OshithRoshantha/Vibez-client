import React from 'react'
import './Styles/Signup.css'
import SignupElement from '@/Components/SignupElement'
import mainLogo from '../assets/Icons/main-logo.png'

export default function Signup() {
  return (
    <div className='second-container'>
      <div className='header'>
        <div className='header-right'>
          <p class="h1 signup-main">Sign Up</p>
          <p class="display-6 signup-sub">Let's get started, Sign up and keep the conversation flowing.</p>
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
