import React, { useState, useEffect } from 'react';
import { TextField, MenuItem, Select, FormControl, InputLabel } from '@mui/material';
import { PatternFormat } from 'react-number-format';
import Flag from 'react-world-flags';

function ContactField() {
  const [countryCode, setCountryCode] = useState('+94');
  const [contactNumber, setContactNumber] = useState('');
  const [validContactNo, setValidContactNo] = useState(false);

  const handleCountryCodeChange = (event) => {
    setCountryCode(event.target.value);
  };

  const handleContactNumberChange = (value) => {
    setContactNumber(value);
  };

  useEffect(() => {
    const pattern = new RegExp(`^${countryCode.replace('+', '\\+')} \\d{2} \\d{3} \\d{4}$`);
    setValidContactNo(pattern.test(contactNumber)); 
  }, [contactNumber, countryCode]);

  const countries = [
    { code: '+94', country: 'LK' },
    { code: '+1', country: 'US' },
    { code: '+44', country: 'GB' },
    { code: '+91', country: 'IN' },
    { code: '+61', country: 'AU' },
    { code: '+81', country: 'JP' },
    { code: '+49', country: 'DE' },
    { code: '+33', country: 'FR' },
    { code: '+39', country: 'IT' },
    { code: '+34', country: 'ES' },
    { code: '+55', country: 'BR' },
    { code: '+7', country: 'RU' },
    { code: '+27', country: 'ZA' },
    { code: '+52', country: 'MX' },
    { code: '+966', country: 'SA' },
    { code: '+971', country: 'AE' },
    { code: '+254', country: 'KE' },
    { code: '+31', country: 'NL' },
    { code: '+46', country: 'SE' },
    { code: '+47', country: 'NO' },
    { code: '+41', country: 'CH' },
    { code: '+20', country: 'EG' },
    { code: '+90', country: 'TR' },
    { code: '+43', country: 'AT' },
    { code: '+32', country: 'BE' },
    { code: '+48', country: 'PL' },
    { code: '+374', country: 'AM' },
    { code: '+855', country: 'KH' },
    { code: '+212', country: 'MA' },
    { code: '+852', country: 'HK' },
    { code: '+60', country: 'MY' },
    { code: '+66', country: 'TH' },
    { code: '+62', country: 'ID' },
    { code: '+92', country: 'PK' },
    { code: '+1', country: 'CA' },
    { code: '+51', country: 'PE' },
    { code: '+53', country: 'CU' },
    { code: '+380', country: 'UA' },
    { code: '+63', country: 'PH' },
  ];

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
      <FormControl variant="outlined" sx={{ minWidth: 100 }}>
        <InputLabel>Code</InputLabel>
        <Select
          value={countryCode}
          onChange={handleCountryCodeChange}
          label="Code"
          sx={{ borderRadius: '20px', backgroundColor: 'white' }}
          MenuProps={{
            PaperProps: {
              sx: {
                maxHeight: 300, 
                overflowY: 'auto',
              },
            },
          }}
        >
          {countries.map((country, index) => (
            <MenuItem key={index} value={country.code} sx={{ display: 'flex', alignItems: 'center' }}>
              <Flag code={country.country} style={{ width: 25, height: 25, marginRight: '10px' ,display:'inline'}} />
              {country.code}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <PatternFormat
        format={`${countryCode} ## ### ####`}
        allowEmptyFormatting
        customInput={TextField}
        label="Contact Number"
        variant="outlined"
        placeholder={`${countryCode} 76 918 2392`}
        value={contactNumber}
        onValueChange={(values) => handleContactNumberChange(values.value)}
        InputProps={{
          sx: { borderRadius: '20px', width: '134%', backgroundColor: 'white' },
        }}
      />
    </div>
  );
}

export default ContactField;

