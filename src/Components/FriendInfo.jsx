import React from 'react'

export default function FriendInfo() {
  return (
    <div>
      <div className="border-r border-border p-4 info-column">
        <div className="bg-card p-6 w-full">
          <button className="absolute top-2 right-2 text-muted-foreground hover:text-muted">✖</button>
          <div className="flex flex-col items-center">
            <div className="bg-zinc-300 rounded-full flex items-center justify-center mb-4" style={{backgroundColor:'red', width:'150px', height:'150px'}}>
              
            </div>
            <h2 className="text-xl font-semibold text-foreground">My Airtel</h2>
            <p className="text-muted-foreground">+94 75 956 3850</p>
          </div>
        </div>
      </div>
    </div>
  )
}
