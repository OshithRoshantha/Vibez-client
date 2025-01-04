import React from 'react'

export default function PreviewPendingRequests({darkMode, user, about}) {
  return (
    <div className="flex items-center justify-between border-border py-0 mt-2" >
        <div className="flex items-center">
            <img src="https://placehold.co/40x40" className="rounded-full mr-2 w-55 h-55" />
            <div>
                <p className={`${darkMode ? 'text-white' : ''} font-medium`}>{user}</p>
                <p className={`${darkMode ? 'text-gray-400' : 'text-muted-foreground'} text-sm `}>{about}</p>
            </div>
        </div>
        <div className="btn-container">
            <button className="bg-primary text-primary-foreground px-3 py-1 mr-2 rounded">Confirm</button>
            <button
                className={`${darkMode ? 'bg-[#6a6b6d] text-white hover:bg-[#545454]' : 'bg-muted text-muted-foreground hover:bg-gray-300'} border-none px-3 py-1 rounded`}
            >
                Delete
            </button>
        </div>
    </div>
  )
}
