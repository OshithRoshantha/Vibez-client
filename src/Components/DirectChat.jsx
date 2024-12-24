import ReceiveMessage from "./ReceiveMessage";
import SendMessage from "./SendMessage";


export default function DirectChat() {
  return (
    <div>
        <div className="bg-background min-h-screen flex flex-col">
        <div style={{cursor:'pointer'}} className="flex items-center px-4 py-3 border-b border-border">
            <div className="flex items-center">
            <img src="https://placehold.co/40x40" alt="User Avatar" className="rounded-full mr-2" />
            <span className="text-lg font-semibold text-black">TestUser</span>
            </div>
        </div>
        <div className="p-4" style={{height:'78vh', overflowY:'auto', scrollbarWidth:'none'}}>
            <ReceiveMessage time={'00:26'} message={'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'}/>
            <ReceiveMessage time={'00:26'} message={'receive message'}/>
            <SendMessage time={'00:26'} message={'send message'}/>
            <SendMessage time={'00:26'} message={'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'}/>
            <SendMessage time={'00:26'} message={'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'}/>
            <SendMessage time={'00:26'} message={'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'}/>
        </div>
        <div className=" px-4 py-3  border-t border-border bg-card" style={{display:'flex', alignItems:'center',columnGap:'1rem'}}>
            <input type="text" placeholder="Type a message" className="w-full p-2 rounded-lg bg-input text-black" />
            <span><i style={{cursor:'pointer'}} className="bi bi-send-fill text-2xl"></i></span>
        </div>
        </div>
    </div>
  )
}
