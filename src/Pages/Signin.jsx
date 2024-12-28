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
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';


export default function Signin() {
  const [showPassword, setShowPassword] = useState(false);
  const [loginEmail, setLoginEmail] = useState('');
  const [isEmailMatch, setIsEmailMatch] = useState(true);
  const navigate = useNavigate();
  const [swiped, setSwiped] = useState(false);
  
  function handleClickShowPassword() {
    setShowPassword(!showPassword);
  }

  function handleSwipe() {
    setSwiped(!swiped);
  }
  
  function navSignup() {
    setTimeout(function() {
      navigate('/Signup');
    }, 400);
  }

  function navDashboard() {
      navigate('/Dashboard');
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
                    <CardTitle className='card-heading'>{swiped ? 'Sign Up' : 'Sign In'}</CardTitle>  
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
                                        navDashboard();
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
                            <TextField id="outlined-basic" label="Email address" className='w-full mb-3' type="email"  placeholder="Jhon@example.com" InputProps={{ sx: { borderRadius: '20px'} }}/>
                            <TextField
                            id="outlined-password"
                            className='w-full'
                            label="Password"
                            variant="outlined"
                            placeholder="Password"
                            InputProps={{
                                sx: { borderRadius: '20px'},
                                endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                    onClick={handleClickShowPassword}
                                    onMouseDown={(e) => e.preventDefault()}
                                    edge="end"
                                    >
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                                ),
                            }}
                            type={showPassword ? "text" : "password"}
                            />
                            <Button className='sign-in-btn-main rounded-custom-md' onClick={() => { handleSwipe(); navDashboard();}}>Sign In</Button>
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
