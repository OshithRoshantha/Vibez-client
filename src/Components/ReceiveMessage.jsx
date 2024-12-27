import React from 'react'

export default function ReceiveMessage({message, time}) {
  return (
    <div className="w-full" style={{display:'flex', justifyContent:'left'}}>
        <div className="flex items-start mb-2">
        <div className="bg-[#262729] text-white p-2 rounded-lg max-w-xs break-words">
            <p style={{fontSize:'95%'}}>{message}</p>
            <span className="text-xs text-muted-foreground">{time}</span>
        </div>
        </div>
    </div>
  )
}
