import React from 'react';
import PropTypes from 'prop-types';

export default function SendMessage({ message, time }) {
  if (!message || typeof message !== 'string') {
    console.error('Invalid or missing "message" prop');
    return null;
  }

  if (!time || typeof time !== 'string') {
    console.error('Invalid or missing "time" prop');
    return null;
  }

  return (
    <div className="w-full" style={{ display: 'flex', justifyContent: 'flex-end' }}>
      <div className="flex items-start mb-2">
        <div className="bg-primary text-white p-2 rounded-lg max-w-xs break-words">
          <p style={{ fontSize: '95%' }}>{message}</p>
          <span className="text-xs text-gray-600">{time}</span>
        </div>
      </div>
    </div>
  );
}

SendMessage.propTypes = {
  message: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired,
};
