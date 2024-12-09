import React, { useState } from 'react';
import { TextField, MenuItem, Select, FormControl, InputLabel } from '@mui/material';
import { PatternFormat } from 'react-number-format';
import Flag from 'react-world-flags';

const ContactNumberInput = () => {
  const [countryCode, setCountryCode] = useState('+94');

  const handleCountryCodeChange = (event) => {
    setCountryCode(event.target.value);
  };

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
    { code: '+44', country: 'GB' },
    { code: '+966', country: 'SA' },
    { code: '+33', country: 'FR' },
    { code: '+91', country: 'IN' },
    { code: '+39', country: 'IT' },
    { code: '+971', country: 'AE' },
    { code: '+254', country: 'KE' },
    { code: '+31', country: 'NL' },
    { code: '+46', country: 'SE' },
    { code: '+47', country: 'NO' },
    { code: '+55', country: 'BR' },
    { code: '+41', country: 'CH' },
    { code: '+20', country: 'EG' },
    { code: '+90', country: 'TR' },
    { code: '+43', country: 'AT' },
    { code: '+32', country: 'BE' },
    { code: '+48', country: 'PL' },
    { code: '+374', country: 'AM' },
    { code: '+20', country: 'EG' },
    { code: '+855', country: 'KH' },
    { code: '+212', country: 'MA' },
    { code: '+855', country: 'KH' },
    { code: '+852', country: 'HK' },
    { code: '+60', country: 'MY' },
    { code: '+66', country: 'TH' },
    { code: '+62', country: 'ID' },
    { code: '+92', country: 'PK' },
    { code: '+1', country: 'CA' },
    { code: '+90', country: 'TR' },
    { code: '+51', country: 'PE' },
    { code: '+53', country: 'CU' },
    { code: '+52', country: 'MX' },
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
          sx={{ borderRadius: '20px' }}
          MenuProps={{
            PaperProps: {
              sx: {
                maxHeight: '80px', 
                overflowY: 'auto', 
              },
            },
          }}
        >
          {countries.map((country, index) => (
            <MenuItem key={index} value={country.code} sx={{ display: 'flex', alignItems: 'center'}}>
              <Flag code={country.country} style={{ width: 25, height: 25, marginRight: '10px',display:'inline' }} />
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
        InputProps={{
          sx: { borderRadius: '20px', width: '134%' },
        }}
      />
    </div>
  );
};

export default ContactNumberInput;
