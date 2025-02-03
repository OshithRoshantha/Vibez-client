import './Styles/Signin.css';
import mainLogo from '../assets/Icons/main-logo.png';
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { GoogleLogin } from '@react-oauth/google';
import LandingAnimation from '@/Components/LandingAnimation';
import { useNavigate } from 'react-router-dom';
import jwtDecode from "jwt-decode";
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

export default function Signin() {
  const [showPassword, setShowPassword] = useState(false);
  const [emailNotFound, setEmailNotFound] = useState(false);
  const [incorrectPassword, setIncorrectPassword] = useState(false);
  const [swiped, setSwiped] = useState(false);
  const navigate = useNavigate();

  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const toggleSwipe = () => setSwiped(!swiped);
  const navigateToSignup = () => {
    setTimeout(() => navigate('/Signup'), 400);
  };
  const navigateToDashboard = () => navigate('/Dashboard');

  const handleGoogleSuccess = (credentialResponse) => {
    toggleSwipe();
    navigateToDashboard();
    const decoded = jwtDecode(credentialResponse.credential);
    console.log(decoded);
  };

  return (
    <div className={`main-container ${swiped ? 'swiped' : ''}`}>
      <div className='left-side'>
        <img src={mainLogo} className='main-logo' alt='Main Logo' />
        <h1 className='main-hero'>A place for meaningful conversations</h1>
        <h1 className="display-4 main-sub">Sign in to stay connected with your friends and team.</h1>
        <div className='cta'>
          <LandingAnimation />
        </div>
      </div>
      <div className='right-side'>
        <Card className='login-card'>
          <CardHeader>
            <CardDescription>
              Welcome to <img src={mainLogo} className='text-logo' alt='Main Logo' />
            </CardDescription>
            <CardTitle className='card-heading'>{swiped ? 'Sign Up' : 'Sign In'}</CardTitle>
          </CardHeader>
          <CardContent>
            {swiped ? (
              <>
                <Label htmlFor="email">Enter your email address</Label>
                <Input className='rounded-custom-md input-group' type="email" id="email" placeholder="John@example.com" />
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
                    onSuccess={handleGoogleSuccess}
                    onError={() => console.log('Login Failed')}
                  />
                </div>
                <br />
                <div className='divider'>
                  <div className='divider-line'></div>
                  &nbsp;&nbsp;Or&nbsp;&nbsp;
                  <div className='divider-line'></div>
                </div>
                <TextField
                  id="outlined-basic"
                  label="Email address"
                  className='w-full mb-3'
                  type="email"
                  helperText={emailNotFound ? "The email address you entered isn't connected to an account." : ''}
                  error={emailNotFound}
                  placeholder="John@example.com"
                  InputProps={{ sx: { borderRadius: '20px' } }}
                />
                <TextField
                  id="outlined-password"
                  className='w-full'
                  label="Password"
                  error={incorrectPassword}
                  helperText={incorrectPassword ? "The password that you've entered is incorrect." : ''}
                  placeholder="Password"
                  type={showPassword ? "text" : "password"}
                  InputProps={{
                    sx: { borderRadius: '20px' },
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={togglePasswordVisibility}
                          onMouseDown={(e) => e.preventDefault()}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
                <Button className='sign-in-btn-main rounded-custom-md' onClick={() => { toggleSwipe(); navigateToDashboard(); }}>Sign In</Button>
              </>
            )}
          </CardContent>
          <CardFooter>
            <p>No account? <a className='signup-link' onClick={() => { toggleSwipe(); navigateToSignup(); }}>Sign Up</a></p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
