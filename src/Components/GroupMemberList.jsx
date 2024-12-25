import React from 'react'

export default function GroupMemberList() {
  return (
    <div className="mt-0">
        <div className="flex items-center mb-2">

        <div className="w-8 h-8 rounded-full bg-green-500 mr-2"></div>
        <div>
            <span className="font-semibold">You</span>
            <p className="text-sm text-muted-foreground">Hey there! I am using Vibez.</p>
        </div>
        <button className="ml-auto text-sm bg-red-300 text-white hover:bg-red-200 border-none">Delete group</button>
        </div>

        <div className="flex items-center mb-2">
        <div className="w-8 h-8 rounded-full bg-blue-500 mr-2"></div>
        <div>
            <span className="font-semibold">user01</span>
            <p className="text-sm text-muted-foreground">Available</p>
        </div>
        <button className="ml-auto text-sm bg-gray-300 text-gray-600 hover:bg-gray-200 border-none">Remove</button>
        </div>
    </div>
  )
}
