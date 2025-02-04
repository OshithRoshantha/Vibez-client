import React from 'react'

export default function GroupSendMessage({message, time}) {
  return (
    <div className="w-full" style={{display:'flex', justifyContent:'right'}}>
        <div className="flex items-start mb-2">
        <div className="bg-primary text-white p-2 rounded-lg max-w-xs break-words">
            <p style={{fontSize:'95%'}}>{message}</p>
            <div className='pr-1' style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
              <span className="text-xs text-gray-600 pr-5">{time}</span>
              <i className="bi bi-check2-all"></i>
            </div>
        </div>
        </div>
    </div>
  )
}
