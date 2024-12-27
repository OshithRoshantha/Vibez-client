import ReceiveMessage from "./ReceiveMessage";
import SendMessage from "./SendMessage";
import { useState, useEffect, useRef } from "react";

export default function DirectChat({showFriendInfoMenu, darkMode}) {

  const chatRef = useRef(null);
  const [showScrollButton, setShowScrollButton] = useState(false);
  const chatWallpaper = darkMode ? 'url(./src/assets/Wallpapers/dark.png)' : 'url(./src/assets/Wallpapers/light.png)';

    function handleScroll() {
      const chatContainer = chatRef.current;
      if (chatContainer) {
        const isAtBottom =
          chatContainer.scrollHeight - chatContainer.scrollTop === chatContainer.clientHeight;
        setShowScrollButton(!isAtBottom);
      }
    }
    
    function scrollToBottom() {
      const chatContainer = chatRef.current;
      if (chatContainer) {
        chatContainer.scrollTo({
          top: chatContainer.scrollHeight,
          behavior: "smooth",
        });
      }
    }
    
    useEffect(() => {
      const chatContainer = chatRef.current;
      if (chatContainer) {
        chatContainer.addEventListener("scroll", handleScroll);
        scrollToBottom();
      }
      return () => {
        if (chatContainer) {
          chatContainer.removeEventListener("scroll", handleScroll);
        }
      };
    }, []);
  
  

  return (
    <div>
        <div className={`${darkMode ? 'bg-[#262729]' : 'bg-background' } min-h-screen flex flex-col`} >
        <div onClick={showFriendInfoMenu} style={{cursor:'pointer'}} className={`${darkMode ? 'border-gray-600' : 'border-border'} flex items-center px-4 py-3 border-b`}>
            <div className="flex items-center">
            <img src="https://placehold.co/40x40" alt="User Avatar" className="rounded-full mr-2" />
            <div>
              <span className={`${darkMode ? 'text-white':'text-black'} text-lg font-semibold`}>TestUser</span>
              <p className={`${darkMode ? 'text-gray-400':'text-muted-foreground'} mt-0`}  style={{fontSize:'70%'}}>Click here for contact info</p>
            </div>
            </div>
        </div>
        <div className="p-4" ref={chatRef} style={{height:'78vh', overflowY:'auto', scrollbarWidth:'none', backgroundImage: chatWallpaper, backgroundSize: 'cover' }}>
        {showScrollButton && <i onClick={scrollToBottom} className={`${darkMode ? 'bg-[#262729]' : 'bg-white'} cursor-pointer absolute bi bi-arrow-down-circle-fill text-4xl text-primary`} style={{left: '67%'}}></i>}
            <ReceiveMessage time={'00:26'} message={'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'}/>
            <ReceiveMessage time={'00:26'} message={'receive message'}/>
            <SendMessage time={'00:26'} message={'send message'}/>
            <SendMessage time={'00:26'} message={'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'}/>
            <SendMessage time={'00:26'} message={'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'}/>
            <SendMessage time={'00:26'} message={'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'}/>
        </div>
        <div className={`${darkMode ? 'border-gray-600 bg-[#262729]' : 'border-border bg-card'} px-4 py-3  border-t`} style={{display:'flex', alignItems:'center',columnGap:'1rem'}}>
            <input type="text" placeholder="Type a message" className={`${darkMode ? ' text-white' : 'bg-input text-black'} focus:border-none focus:outline-none w-full p-2 rounded-lg`}/>
            <span><i style={{cursor:'pointer'}} className="bi bi-send-fill text-2xl text-primary"></i></span>
        </div>
        </div>
    </div>
  )
}
