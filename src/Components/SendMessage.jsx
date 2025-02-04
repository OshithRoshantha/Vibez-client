import React from 'react'

export default function SendMessage({message, time}) {
  return (
    <div className="w-full" style={{display:'flex', justifyContent:'right'}}>
        <div className="flex items-start mb-2">
        <div className="bg-primary text-white p-2 rounded-lg max-w-xs break-words">
            <p style={{fontSize:'95%'}}>{message}</p>
            <div className='pr-1' style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
              <span className="text-xs text-gray-600 pr-5">
                {(() => {
                  const [hours, minutes] = time.split(':').map(num => parseInt(num));
                  const colomboHours = (hours + 5 + 30 / 60) % 24;
                  const colomboMinutes = minutes;
                  return `${Math.floor(colomboHours).toString().padStart(2, '0')}:${colomboMinutes.toString().padStart(2, '0')}`;
                })()}                
              </span>
              <i className="bi bi-check2-all"></i>
            </div>
        </div>
        </div>
    </div>
  )
}
