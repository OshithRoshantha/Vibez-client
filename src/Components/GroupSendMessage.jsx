import React from 'react'

export default function GroupSendMessage({message, time}) {
  return (
    <div className="w-full" style={{display:'flex', justifyContent:'right'}}>
        <div className="flex items-start mb-2">
        <div className="bg-primary text-white p-2 rounded-lg max-w-xs break-words">
            <p style={{fontSize:'95%'}}>{message}</p>
            <span className="text-xs text-gray-600">{time}</span>
        </div>
        </div>
    </div>
  )
}
