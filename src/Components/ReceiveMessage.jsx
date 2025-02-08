import React from 'react'

export default function ReceiveMessage({message, time}) {
  return (
    <div className="w-full" style={{display:'flex', justifyContent:'left'}}>
        <div className="flex items-start mb-2">
        <div className="bg-[#1c1c1c] text-white p-2 rounded-lg max-w-xs break-words">
            <p style={{fontSize:'95%'}}>{message}</p>
            <span className="text-xs text-muted-foreground">
                {(() => {
                  const [hours, minutes] = time.split(':').map(Number);
                  const colomboDate = new Date(0, 0, 0, hours + 0, minutes + 0);
                  return colomboDate.toTimeString().slice(0, 5);
                })()}
            </span>
        </div>
        </div>
    </div>
  )
}
