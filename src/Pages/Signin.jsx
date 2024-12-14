import './Styles/Signin.css'
import mainLogo from '../assets/Icons/main-logo.png'
import { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { GoogleLogin } from '@react-oauth/google';
import LandingAnimation from '@/Components/LandingAnimation';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";


export default function Signin() {
  const navigate = useNavigate();
  const [swiped, setSwiped] = useState(false);
  
  function handleSwipe() {
    setSwiped(!swiped);
    console.log(swiped);
  }
  
  function navSignup() {
    setTimeout(function() {
      navigate('/Signup');
    }, 400);
  }

  return (
    <div className={`main-container ${swiped ? 'swiped' : ''}`}>
        <div className='left-side'>
            <img src={mainLogo} className='main-logo' alt='Main Logo'/>
            <h1 className='main-hero'>A place for meaningful conversations</h1>
            <h1 className="display-4 main-sub">Sign in to stay connected with your friends and team.</h1>
            <div className='cta'>
              <LandingAnimation/>
            </div>
        </div>
        <div className='right-side'>
            <Card className='login-card'>
                <CardHeader>
                    <CardDescription>
                        Welcome to <img src={mainLogo} className='text-logo' alt='Main Logo'/>
                    </CardDescription>
                    <CardTitle className='card-heading'>{swiped ? 'Sign Up' : 'Sign In'}</CardTitle>  {/* Conditionally render */}
                </CardHeader>
                <CardContent>
                    {swiped ? (
                        <>
                            <Label htmlFor="email">Enter your email address</Label>
                            <Input className='rounded-custom-md input-group' type="email" id="email" placeholder="Jhon@example.com" />
                            <Label htmlFor="password">Enter your password</Label>
                            <Input className='rounded-custom-md input-group' type="password" id="password" placeholder="Password" />
                            <Button className='sign-in-btn-main rounded-custom-md'>Sign Up</Button>
                        </>
                    ) : (
                        <>
                            <div className='google-login'>
                                <GoogleLogin
                                    shape="pill"
                                    theme="outline"
                                    width={282}
                                    onSuccess={credentialResponse => {
                                        handleSwipe();
                                        const decoded = jwtDecode(credentialResponse.credential);
                                        console.log(decoded);
                                    }}
                                    onError={() => {
                                        console.log('Login Failed');
                                    }}
                                />
                            </div>
                            <br/>
                            <div className='divider'>
                                <div className='divider-line'></div>
                                &nbsp;&nbsp;Or&nbsp;&nbsp;
                                <div className='divider-line'></div>
                            </div>
                            <Label htmlFor="email">Enter your email address</Label>
                            <Input className='rounded-custom-md input-group' type="email" id="email" placeholder="Jhon@example.com" />
                            <Label htmlFor="email">Enter your password</Label>
                            <Input className='rounded-custom-md input-group' type="password" id="email" placeholder="Password" />
                            <Button className='sign-in-btn-main rounded-custom-md' onClick={() => { handleSwipe(); }}>Sign In</Button>
                        </>
                    )}
                </CardContent>
                <CardFooter>
                    <p>No account? <a className='signup-link' onClick={() => { handleSwipe(); navSignup(); }}>Sign Up</a></p>
                </CardFooter>
            </Card>
        </div>

    </div>
  )
}
