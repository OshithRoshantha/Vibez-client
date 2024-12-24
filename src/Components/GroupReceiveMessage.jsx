import React from 'react'

export default function GroupReceiveMessage({message, time, senderName}) {
  return (
    <div className="w-full" style={{display:'flex', justifyContent:'left'}}>
        <div className="flex items-start mb-2">
        <div className="bg-zinc-800 text-white p-2 rounded-lg max-w-xs break-words">
            <span className="text-white" style={{fontSize:'85%'}}>{senderName}</span>
            <p style={{fontSize:'95%'}}>{message}</p>
            <span className="text-xs text-muted-foreground">{time}</span>
        </div>
        </div>
    </div>
  )
}
