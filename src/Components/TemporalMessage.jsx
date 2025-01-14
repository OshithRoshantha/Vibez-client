import React from 'react'

export default function TemporalMessage({ message }) {
  const getCurrentTime = () => {
    const now = new Date();
    let hours = now.getHours();
    let minutes = now.getMinutes();
    if (minutes < 10) {
      minutes = `0${minutes}`;
    }
    if (hours < 10) {
      hours = `0${hours}`;
    }
    return `${hours}:${minutes}`;
  };
  return (
    <div className="w-full" style={{ display: 'flex', justifyContent: 'right' }}>
      <div className="flex items-start mb-2">
        <div className="bg-primary text-white p-2 rounded-lg max-w-xs break-words">
          <p style={{ fontSize: '95%' }}>{message}</p>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span className="text-xs text-gray-600 pr-5">{getCurrentTime()}</span>
            <i className="bi bi-clock-history"></i>
          </div>
        </div>
      </div>
    </div>
  )
}
