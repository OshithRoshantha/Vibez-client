import {useState} from 'react'

export default function GroupInfo() {
  var groupName = 'friends'
  var groupDescp = 'This is a group of friends'
  var memberCount = 5
  const [isAmAdmin, setIsAmAdmin] = useState(true);

  return (
<div>
      <div className="border-r border-border p-4 info-column" style={{backgroundColor:'#f2f3f7'}}>
      <h2 className="text-lg font-semibold mb-4">Group info</h2>
        <div className="bg-card p-6 w-full" style={{backgroundColor:'#f2f3f7'}} >
          <div className="flex flex-col items-center mb-5" style={{marginTop:'-5%'}}>
            <div className=" rounded-full flex items-center justify-center mb-1" style={{backgroundColor:'red', width:'150px', height:'150px', cursor:'pointer'}}>
              
            </div>
            <h2 className="text-xl font-semibold text-foreground">{groupName}</h2>
            <div style={{display:'flex', justifyContent:'center', alignItems:'center', columnGap:'3px'}}>
              <p className="text-muted-foreground text-sm">Group</p>
              <i className="bi bi-dot"></i>
              <p className="text-muted-foreground">{memberCount} members</p>
            </div>
            <p className="text-muted-foreground">{groupDescp}</p>
          </div>
          <h2 className="text-lg font-semibold mb-4" style={{marginTop:'-5%'}}>{memberCount} members</h2>
          {isAmAdmin && <div>
            <div className="flex items-center mb-1">
              <button className="bg-primary text-primary-foreground p-1 rounded-full mr-2">
                <span className="material-icons">add</span>
              </button>
              <span className="text-base">Add member</span>
            </div>
            <div className="border-b border-border my-4"></div>
            </div>}
          <div className={`w-full  ${isAmAdmin ? 'h-[25vh]' : 'h-[38vh]'}`} style={{overflowY:'auto', scrollbarWidth:'none'}}>
          <div className="mt-0">
              <div className="flex items-center mb-2">
                <div className="w-8 h-8 rounded-full bg-green-500 mr-2"></div>
                <div>
                  <span className="font-semibold">You</span>
                  <p className="text-sm text-muted-foreground">Hey there! I am using Vibez.</p>
                </div>
                <span className="ml-auto text-sm text-muted-foreground">Group admin</span>
              </div>
              <div className="flex items-center mb-2">
                <div className="w-8 h-8 rounded-full bg-blue-500 mr-2"></div>
                <div>
                  <span className="font-semibold">user01</span>
                  <p className="text-sm text-muted-foreground">Available</p>
                </div>
              </div>
              <div className="flex items-center mb-2">
                <div className="w-8 h-8 rounded-full bg-green-500 mr-2"></div>
                <div>
                  <span className="font-semibold">user02</span>
                  <p className="text-sm text-muted-foreground">Soulmate *404 Not found* 📱</p>
                </div>
              </div>
              <div className="flex items-center mb-2">
                <div className="w-8 h-8 rounded-full bg-blue-500 mr-2"></div>
                <div>
                  <span className="font-semibold">user03</span>
                  <p className="text-sm text-muted-foreground">Do the best. But don't expect again 😉.</p>
                </div>
              </div>
              <div className="flex items-center mb-2">
                <div className="w-8 h-8 rounded-full bg-zinc-500 mr-2"></div>
                <div>
                  <span className="font-semibold">user04</span>
                  <p className="text-sm text-muted-foreground">Not Available</p>
                </div>
              </div>
            </div>   
          </div>
        </div>
      </div>
    </div>
  )
}
