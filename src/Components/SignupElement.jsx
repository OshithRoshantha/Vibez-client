import React, { useRef, useState, useEffect } from 'react';
import './Styles/SignupElement.css'
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import TextField from '@mui/material/TextField';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import { Card } from './ui/card';
import { useNavigate } from 'react-router-dom';
import ContactField from "./ContactField";
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Slider from '@mui/material/Slider';
import { passwordStrength } from 'check-password-strength'
import { Progress } from "@/components/ui/progress"
import AvatarEditor from 'react-avatar-editor'
import { ToastContainer, toast } from 'react-toastify';
import { createAccount} from '../Api/ProfileService';

export default function SignupElement() {
  const steps = ['Basic Information', 'Add Password', 'Personalize and Finalize'];
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [progress, setProgress] = useState(25);
  const [passwordStrengthValue, setPasswordStrengthValue] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [editPictureForm, setEditPictureForm] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [cropFactor, setCropFactor] = useState(1);
  const [cropedImage, setCropedImage] = useState(null);
  const fileInputRef = useRef(null);
  const avatarEditorRef = useRef(null);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [contact, setContact] = useState('');
  const [fullNameError, setFullNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [contactNumberError, setContactNumberError] = useState(false);
  const [passwordUnmatchError, setPasswordUnmatchError] = useState(false);
  const [disableContinueBtn, setDisableContinueBtn] = useState(true);

  const defaultImage = "./src/assets/userDefault.jpg";

  function notify() {
    toast.success("Account create successfully!");
}

  function validateFullName(name) {
    return /^[a-zA-Z\s]{3,}$/.test(name);
  }
  
  function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }
  
  function handleFullNameChange(event) {
    setFullName(event.target.value);
    setFullNameError(!validateFullName(event.target.value));
  }
  
  function handleEmailChange(event) {
    setEmail(event.target.value);
    setEmailError(!validateEmail(event.target.value));
  }
  
  useEffect(function() {
    if (activeStep === 0) {
      if (validateEmail(email) && validateFullName(fullName) && contactNumberError) {
        setDisableContinueBtn(false);
      }
    }
    if (activeStep === 1) {
      setDisableContinueBtn(true);
      if(!passwordUnmatchError && password !== '' && confirmPassword !== '') {
        setDisableContinueBtn(false);
      }
    }
  }, [fullName, email, contact, password, confirmPassword, activeStep]);
  
  function editPictureFormHandler() {
    setEditPictureForm(!editPictureForm);
  }
  
  function handleSliderChange(event, newValue) {
    setCropFactor(newValue);
  }
  
  function uploadImg() {
    fileInputRef.current.click();
  }
  
  function handleFileChange(event) {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setSelectedImage(imageUrl);
      editPictureFormHandler();
    }
  }
  
  function handleCrop() {
    if (avatarEditorRef.current) {
      const canvas = avatarEditorRef.current.getImageScaledToCanvas();
      const croppedImageUrl = canvas.toDataURL();
      setSelectedImage(croppedImageUrl);
      setCropedImage(croppedImageUrl);
      editPictureFormHandler();
    }
  }
  
  function handlePasswordChange(event) {
    const newPassword = event.target.value;
    setPassword(newPassword);
    setPasswordStrengthValue(passwordStrength(newPassword).id);
    if (passwordStrength(newPassword).id === 0) {
      setProgress(25);
    }
    else if (passwordStrength(newPassword).id === 1) {
      setProgress(50);
    }
    else if (passwordStrength(newPassword).id === 2) {
      setProgress(75);
    }
    else if (passwordStrength(newPassword).id === 3) {
      setProgress(100);
    }
    else {
      setProgress(0);
    }
    if(confirmPassword !== '') {
      setPasswordUnmatchError(newPassword !== confirmPassword);
    }
  }
  
  function handleConfirmPasswordChange(event) {
    setConfirmPassword(event.target.value);
    setPasswordUnmatchError(password !== event.target.value);
  }
  
  function handleClickShowPassword() {
    setShowPassword(!showPassword);
  }
  
  function handleClickShowConfirmPassword() {
    setShowConfirmPassword(!showConfirmPassword);
  }
  
  function getStrengthColor(strength) {
    switch (strength) {
      case 0:
        return { color: 'red' };
      case 1:
        return { color: 'orange' };
      case 2:
        return { color: 'yellow' };
      case 3:
        return { color: 'green' };
      default:
        return { color: 'black' };
    }
  }
  
  function isStepSkipped(step) {
    return skipped.has(step);
  }
  
  function handleNext() {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }
    setActiveStep(function(prevActiveStep) {
      return prevActiveStep + 1;
    });
    setSkipped(newSkipped);
  }
  
  function handleBack() {
    setActiveStep(function(prevActiveStep) {
      return prevActiveStep - 1;
    });
  }
  
  const handleSignUp = async () => {
    if (activeStep === 2){
      const data = {
        userName: fullName,
        email: email,
        password: confirmPassword,
      }
      await createAccount(data);
      notify();
      setTimeout(() => {
        navigate('/');
      }, 1300);
    }
  }

  return (
    <div>
      <ToastContainer
        position="top-center"
        autoClose={1200}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <Card className='stepper-body'>
        <Box sx={{ width: '100%', paddingX: '3%', paddingY: '2.5%' }}>
          <Stepper activeStep={activeStep}>
            {steps.map((label, index) => {
              const stepProps = {};
              const labelProps = {};
              if (isStepSkipped(index)) {
                stepProps.completed = false;
              }
              return (
                <Step key={label} {...stepProps}>
                  <StepLabel {...labelProps}>{label}</StepLabel>
                </Step>
              );
            })}
          </Stepper>
        </Box>
      </Card>
      <div className='stepper-content'>
        {activeStep === 0 && (
          <div className='field-container'>
            <div className='field-box'>
              <Box
                component="form"
                sx={{ '& > :not(style)': { m: 1, width: '120%', marginLeft: '-20%' } }}
                noValidate
                autoComplete="off"
              >
                <TextField id="outlined-basic" label="Full Name" helperText={fullNameError ? 'Full name must be at least 3 characters long.' : ''} value={fullName} onChange={handleFullNameChange} error={fullNameError} variant="outlined" placeholder="John Doe" InputProps={{ sx: { borderRadius: '20px', backgroundColor: 'white' } }} /><br />
                <TextField id="outlined-email" label="Email Address" helperText={emailError ? 'Please enter a valid email address.' : ''} value={email} onChange={handleEmailChange} error={emailError} variant="outlined" placeholder="john@example.com" InputProps={{ sx: { borderRadius: '20px', backgroundColor: 'white' } }} />
                <ContactField setContactNumberError={setContactNumberError} setContact={setContact}/>
              </Box>
            </div>
          </div>
        )}
        {activeStep === 1 && (
          <div>
            <div className='field-box2'>
              <Box
                component="form"
                sx={{ '& > :not(style)': { m: 1, width: '70%', marginLeft: '10%' } }}
                noValidate
                autoComplete="off"
              >
              <TextField
                  id="outlined-password"
                  label="Password"
                  variant="outlined"
                  placeholder="Enter Password"
                  onChange={handlePasswordChange}
                  InputProps={{
                    sx: { borderRadius: '20px', backgroundColor: 'white' },
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
                <p className="password-strength">Password Strength:&nbsp;
                  <span style={getStrengthColor(passwordStrengthValue)}>
                    {passwordStrengthValue === 0 ? 'Too weak' :
                      passwordStrengthValue === 1 ? 'Weak' :
                      passwordStrengthValue === 2 ? 'Medium' :
                      'Strong'}
                  </span>
                  <div className="progress-bar">
                    <Progress value={progress} 
                        className={`progress-${passwordStrengthValue}`}
                        style={{ width: '50%', height: '7px' }}/>
                  </div>
                </p>
                <TextField
                  id="outlined-confirm-password"
                  helperText={passwordUnmatchError ? 'Passwords do not matched.' : ''}
                  value={confirmPassword}	
                  error={passwordUnmatchError}
                  label="Confirm Password"
                  variant="outlined"
                  placeholder="Confirm Password"
                  onChange={handleConfirmPasswordChange}
                  InputProps={{
                    sx: { borderRadius: '20px', backgroundColor: 'white' },
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={handleClickShowConfirmPassword}
                          onMouseDown={(e) => e.preventDefault()}
                          edge="end"
                        >
                          {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  type={showConfirmPassword ? "text" : "password"}
                />
              </Box>
            </div>
          </div>
        )}
        {activeStep === 2 && <div>
            <div className="field-box3">
              <div className='profile-pic' onClick={uploadImg}   
              style={{
                backgroundImage: cropedImage ? `url(${cropedImage})` : `url(${defaultImage})`, 
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}>
                <span className='camera-icon'><i className="bi bi-camera-fill"></i></span>ADD PROFILE PICTURE
              </div>
              <input
                type='file'
                accept='image/*'
                ref={fileInputRef}
                style={{ display: 'none' }}
                onChange={handleFileChange}
              />
              {editPictureForm && <div className='edit-picture-form'>
                  <AvatarEditor
                    ref={avatarEditorRef}
                    image={selectedImage}
                    width={180}
                    height={180}
                    border={0}
                    borderRadius={150}
                    color={[0, 0, 0, 0.5]} 
                    scale={cropFactor}
                  />
                  <Slider defaultValue={[1]} min={1} max={10} step={1} style={{ width: '70%'}} onChange={handleSliderChange} value={cropFactor}/>
                  <div className='edit-picture-buttons'>
                    <Button onClick={editPictureFormHandler} sx={{width:'20%',borderRadius: '20px'}}>Back</Button>
                    <Button onClick={handleCrop} sx={{width:'20%',borderRadius: '20px',backgroundColor: '#0d6efd',color: 'white'}}>Crop</Button>
                  </div>
                </div>}
              <div className='about-input'>
                <TextField id="outlined-basic" label="About" variant="outlined" placeholder="Can't talk, Vibez only." InputProps={{ sx: { borderRadius: '20px', backgroundColor: 'white' ,width:'180%'} }} />
              </div>
            </div>
          </div>}
      </div>
      <div className='stepper-buttons'>
        <Box sx={{ display: 'flex', flexDirection: 'row', columnGap: '10px' }}>
          <Button
            color="inherit"
            disabled={activeStep === 0}
            onClick={handleBack}
            sx={{ paddingX: '25px', paddingY: '7px', borderRadius: '20px' }}
          >
            Back
          </Button>
          <Box />
          <Button onClick={() => { handleNext(); handleSignUp(); }} disabled={fullNameError || emailError || disableContinueBtn}
            sx={{ color: 'white', fontSize: '700', backgroundColor: '#0d6efd', paddingX: '25px', paddingY: '7px', borderRadius: '20px' }}>
            {activeStep === steps.length - 1 ? 'Create' : 'Continue'}
          </Button>
        </Box>
      </div>
    </div>
  );
}
