import {useState} from 'react'
import GroupMemberList from './GroupMemberList';
import GroupMemberList2 from './GroupMemberList2';

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
            {isAmAdmin && 
              <div className=" rounded-full flex items-center justify-center mb-1" style={{backgroundColor:'red', width:'150px', height:'150px', cursor:'pointer', marginTop:'-5%'}}></div>
            }
            {!isAmAdmin &&
              <div className=" rounded-full flex items-center justify-center mb-1" style={{backgroundColor:'red', width:'150px', height:'150px', marginTop:'-5%'}}></div>  
            } 
            <h2 className="text-xl font-semibold text-foreground mt-4">{groupName}</h2>
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
              <button className="bg-gray-300 text-gray-600 hover:bg-gray-200 mr-2" style={{borderRadius:'50%', width:'38px', height:'38px', display:'flex', justifyContent:'center', alignItems:'center', border:'none'}}>
                <i className="bi bi-person-fill-add"></i>
              </button>
              <span className="text-base">Add member</span>
            </div>
            <div className="border-b border-border my-4"></div>
            </div>}
          <div className={`w-full  ${isAmAdmin ? 'h-[25vh]' : 'h-[38vh]'}`} style={{overflowY:'auto', scrollbarWidth:'none'}}>
            {isAmAdmin ? <GroupMemberList/> : <GroupMemberList2/>}
          </div>
        </div>
      </div>
    </div>
  )
}
