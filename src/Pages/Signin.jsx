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
        <Card>
          <CardHeader>
            <CardDescription>Welcome to&nbsp;<img src={mainLogo} className='text-logo' alt='Main Logo'/> </CardDescription>
            <CardTitle className='card-heading'>Sign In</CardTitle>
          </CardHeader>
          <CardContent>
            <GoogleLogin
              onSuccess={credentialResponse => {
                console.log(credentialResponse);
              }}
              onError={() => {
                console.log('Login Failed');
              }}
            />
            <Label htmlFor="email">Enter your email address</Label>
            <Input type="email" id="email" placeholder="jhon@example.com" />
            <Label htmlFor="email">Enter your password</Label>
            <Input type="password" id="email" placeholder="Password" />
            <Button className='sign-in-btn-main' onClick={handleSwipe}>Sign In</Button>
          </CardContent>
          <CardFooter>
            <p>No account? <a className='signup-link'>Sign Up</a></p>
          </CardFooter>
        </Card>
        </div>
    </div>
  )
}
