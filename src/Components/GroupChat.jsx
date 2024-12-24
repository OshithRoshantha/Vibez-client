import GroupReceiveMessage from "./GroupReceiveMessage";
import GroupSendMessage from "./GroupSendMessage";


export default function GroupChat({showGroupInfoMenu}) {
  return (
    <div>
        <div className="bg-background min-h-screen flex flex-col">
        <div onClick={showGroupInfoMenu} style={{cursor:'pointer'}} className="flex items-center px-4 py-3 border-b border-border">
            <div className="flex items-center">
            <img src="https://placehold.co/40x40" alt="User Avatar" className="rounded-full mr-2" />
            <div>
              <span className="text-lg font-semibold text-black">Group1</span>
              <p className="text-muted-foreground mt-0" style={{fontSize:'70%'}}>Click here for group info</p>
            </div>
            </div>
        </div>
        <div className="p-4" style={{height:'78vh', overflowY:'auto', scrollbarWidth:'none'}}>
            <GroupReceiveMessage senderName={'sendUser 01'} time={'00:26'} message={'Simple AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'}/>
            <GroupReceiveMessage senderName={'sendUser 02'} time={'00:26'} message={'AAAAAAAAAAAAAAAAAAAA'}/>
            <GroupReceiveMessage senderName={'sendUser 01'} time={'00:26'} message={'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'}/>
            <GroupSendMessage time={'00:26'} message={'send message'}/>
            <GroupReceiveMessage senderName={'sendUser 01'} time={'00:26'} message={'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'}/>
        </div>
        <div className=" px-4 py-3  border-t border-border bg-card" style={{display:'flex', alignItems:'center',columnGap:'1rem'}}>
            <input type="text" placeholder="Type a message" className="w-full p-2 rounded-lg bg-input text-black" />
            <span><i style={{cursor:'pointer'}} className="bi bi-send-fill text-2xl"></i></span>
        </div>
        </div>
    </div>
  )
}
