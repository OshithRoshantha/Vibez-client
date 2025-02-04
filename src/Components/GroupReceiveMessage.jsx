import React from 'react'

export default function GroupReceiveMessage({message, time, senderName}) {
  return (
    <div className="w-full" style={{display:'flex', justifyContent:'left'}}>
        <div className="flex items-start mb-2">
        <div className="bg-[#1c1c1c] text-white p-2 rounded-lg max-w-xs break-words">
            <span className="text-primary" style={{fontSize:'85%'}}>{senderName}</span>
            <p style={{fontSize:'95%'}}>{message}</p>
            <span className="text-xs text-muted-foreground">
              {(() => {
                  const [hours, minutes] = time.split(':').map(num => parseInt(num));
                  const colomboHours = (hours + 5 + 30 / 60) % 24;
                  const colomboMinutes = minutes;
                  return `${Math.floor(colomboHours).toString().padStart(2, '0')}:${colomboMinutes.toString().padStart(2, '0')}`;
                })()}
            </span>
        </div>
        </div>
    </div>
  )
}
