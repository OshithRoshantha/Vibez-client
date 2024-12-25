import React from 'react'

export default function GroupInfo() {
  var groupName = 'friends'
  var groupDescp = 'This is a group of friends'
  var memberCount = 5
  return (
<div>
      <div className="border-r border-border p-4 info-column" style={{backgroundColor:'#f2f3f7'}}>
      <h2 className="text-lg font-semibold mb-4">Group info</h2>
        <div className="bg-card p-6 w-full" style={{marginTop:'12%', backgroundColor:'#f2f3f7'}} >
          <div className="flex flex-col items-center">
            <div className=" rounded-full flex items-center justify-center mb-4" style={{backgroundColor:'red', width:'150px', height:'150px', cursor:'pointer'}}>
              
            </div>
            <h2 className="text-xl font-semibold text-foreground">{groupName}</h2>
            <div style={{display:'flex', justifyContent:'center', alignItems:'center', columnGap:'3px'}}>
              <p className="text-muted-foreground text-sm">Group</p>
              <i className="bi bi-dot"></i>
              <p className="text-muted-foreground">{memberCount} members</p>
            </div>
            <p className="text-muted-foreground">{groupDescp}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
