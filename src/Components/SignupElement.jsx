import React from "react";
import './Styles/SignupElement.css'
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import TextField from '@mui/material/TextField';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import { Card } from './ui/card';
import { useNavigate } from 'react-router-dom';
import { PatternFormat } from "react-number-format";
import ContactField from "./ContactField";

export default function SignupElement() {
  const steps = ['Basic Information', 'Add Password', 'Personalize and Finalize'];
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (activeStep === 2) {
      navigate('/');
    }
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <div>
    <Card className='stepper-body'>
      <Box sx={{ width: '100%',paddingX:'3%',paddingY:'2.5%'}}>
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
        {activeStep === 0 && <div className='field-container'>
            <div className='field-box'>
            <Box
              component="form"
              sx={{ '& > :not(style)': { m: 1, width: '120%',marginLeft:'-20%'} }}
              noValidate
              autoComplete="off"
            >
              <TextField id="outlined-basic" label="Full Name" variant="outlined" placeholder="John Doe" InputProps={{sx: { borderRadius: '20px'}}}/><br></br>
              <TextField id="outlined-email" label="Email Address" variant="outlined" placeholder="john@example.com" InputProps={{sx: { borderRadius: '20px' }}}/>
              <ContactField/>
            </Box></div>
            
        </div>}
        {activeStep === 1 && <div>Add Password</div>}
        {activeStep === 2 && <div>Personalize and Finalize</div>}
    </div>
    <div className='stepper-buttons'>
    <Box sx={{ display: 'flex', flexDirection: 'row',columnGap:'10px'}}>
            <Button
              color="inherit"
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{paddingX:'25px',paddingY:'7px', borderRadius:'20px'}}
            >
              Back
            </Button>
            <Box />
            <Button onClick={handleNext}
              sx={{color:'white', fontSize:'700' ,backgroundColor:'#0d6efd', paddingX:'25px',paddingY:'7px' , borderRadius:'20px'}}
            >
              {activeStep === steps.length - 1 ? 'Create' : 'Continue'}
            </Button>
    </Box>
    </div>
    </div>
  )
}
