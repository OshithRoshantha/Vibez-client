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
} from "@/Components/ui/card"
import { Input } from "@/Components/ui/input"
import { Label } from "@/Components/ui/label"
import { Button } from "@/Components/ui/button"
import { GoogleLogin } from '@react-oauth/google';
import LandingAnimation from '@/Components/LandingAnimation';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { ThreeDots} from 'react-loader-spinner';
import { checkAccount, directLoginAuth, googleLoginAuth} from '../Services/AuthService';
import { fetchUserId } from '../Services/ProfileService';
import { getConnectedProfile } from '../Services/FriendshipService';
import { useIsMobile } from '../hooks/useIsMobile';

export default function Signin({ onLogin }) {

  const isMobile = useIsMobile();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [emailNotFound, setEmailNotFound] = useState(false);
  const [incorrectPassword, setIncorrectPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
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

  const handleEmail = (e) => {
    setEmail(e.target.value);
  }

  const handlePassword = (e) => {
    setPassword(e.target.value);
  }

  const handleDirectLogin = async () => {
    if (email === ''){
        setEmailNotFound(true);
        return;
    }
    setLoading(true);
    const response = await checkAccount(email);
    setEmailNotFound(!response);
    if (response) {
        try {
            const jwtToken = await directLoginAuth(email, password);
            sessionStorage.setItem('token', jwtToken);
            await fetchProfileId();
            onLogin(true);
            setIncorrectPassword(false);
            sessionStorage.setItem('linkedProfiles', JSON.stringify([]));
            sessionStorage.setItem('email', email);
            await fetchConnectedProfiles();
            navDashboard();
            setLoading(false);
        } catch (error) {
            if (error.response.status === 401) {
                setIncorrectPassword(true);
                setLoading(false);
            }
        }
    } else {
        setIncorrectPassword(false);
        setLoading(false);
    }
  }
  
  const handleGoogleLogin = async (credentialResponse) => {
        setLoading(true);
        const googleToken = credentialResponse.credential; 
        const decoded = jwtDecode(googleToken);
        const { name, picture, email, sub } = decoded;
        const jwtToken = await googleLoginAuth(email, name, picture, sub);
        sessionStorage.setItem('token', jwtToken);
        await fetchProfileId();
        onLogin(true);
        handleSwipe();
        sessionStorage.setItem('linkedProfiles', JSON.stringify([]));
        sessionStorage.setItem('email', email);
        await fetchConnectedProfiles();
        navDashboard();
        setLoading(false);
   }

   const fetchProfileId = async () => {
        const response = await fetchUserId(sessionStorage.getItem('token'));
        sessionStorage.setItem('userId', response);
   }

   const fetchConnectedProfiles = async () => {
        const response = await getConnectedProfile();
        if (response.length !== 0) {
        let linkedProfiles = JSON.parse(sessionStorage.getItem('linkedProfiles'));
        response.forEach((profile) => {
            linkedProfiles.push(profile);
        });
        sessionStorage.setItem('linkedProfiles', JSON.stringify(linkedProfiles));
      }
   }

  return (
    <div className={`main-container ${swiped ? 'swiped' : ''}`}>
        {!isMobile && <>
            <div className='left-side'>
                <img src={mainLogo} className='main-logo' alt='Main Logo'/>
                <h1 className='main-hero'>A place for meaningful conversations</h1>
                <h1 className="display-4 main-sub">Sign in to stay connected with your friends and team.</h1>
                <div className='cta'>
                <LandingAnimation/>
                </div>
            </div>
        </>}
        <div className='right-side' style={{ width: isMobile ? '90vw' : '520px', marginLeft: isMobile ? '0%' : '-100px' }}>
            <Card className='login-card' style={{ width: isMobile ? '80vw' : '' }}>
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
                                        handleGoogleLogin(credentialResponse);
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
                            <TextField onChange={handleEmail} id="outlined-basic directLogin-email" label="Email address" className='w-full mb-3' type="email" helperText={emailNotFound ? "The email address you entered isn't connected to an account." : ''} error={emailNotFound}  placeholder="Jhon@example.com" InputProps={{ sx: { borderRadius: '20px'} }}/>
                            <TextField
                            id="outlined-password"
                            className='w-full'
                            label="Password"
                            error={incorrectPassword}
                            helperText={incorrectPassword ? "The password that you've entered is incorrect." : ''}
                            variant="outlined"
                            placeholder="Password"
                            onChange={handlePassword}
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
                            <Button className='sign-in-btn-main rounded-custom-md' disabled={loading} onClick={() => {handleDirectLogin();}}>
                                {loading ? 
                                <div style={{ transform: 'scale(2)', display: 'inline-block' }}>
                                    <ThreeDots
                                    visible={true}
                                    height="150"
                                    width="150"
                                    color="#ffffff"
                                    radius="15"
                                    ariaLabel="three-dots-loading"
                                    wrapperStyle={{}}
                                    wrapperClass=""
                                /></div>
                                    : "Sign In"
                                }
                            </Button>
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
