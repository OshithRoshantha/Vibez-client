import React from 'react'

export default function FriendInfo() {
  return (
    <div>
      <div className="border-r border-border p-4 info-column">
        <div className="bg-card p-6 w-full" style={{marginTop:'12%'}} >
          <div className="flex flex-col items-center">
            <div className="bg-zinc-300 rounded-full flex items-center justify-center mb-4" style={{backgroundColor:'red', width:'150px', height:'150px'}}>
              
            </div>
            <h2 className="text-xl font-semibold text-foreground">My Airtel</h2>
            <p className="text-muted-foreground">+94 75 956 3850</p>
          </div>
            <ul className="space-y-2" style={{marginTop:'10%'}} >
              <li className="flex items-center py-2 px-3 text-black rounded-lg hover:bg-gray-100 " style={{cursor:'pointer'}}>
                <span>Add to favorites</span>
              </li>
              <li className="flex items-center py-2 px-3 text-destructive rounded-lg hover:bg-gray-100 "  style={{cursor:'pointer'}}>
                <span>Block My Airtel</span>
              </li>
              <li className="flex items-center py-2 px-3 text-destructive rounded-lg hover:bg-gray-100 "  style={{cursor:'pointer'}}>
                <span>Report My Airtel</span>
              </li>
              <li className="flex items-center py-2 px-3 text-destructive rounded-lg hover:bg-gray-100 "  style={{cursor:'pointer'}}>
                <span>Delete chat</span>
              </li>
            </ul>
        </div>
      </div>
    </div>
  )
}
