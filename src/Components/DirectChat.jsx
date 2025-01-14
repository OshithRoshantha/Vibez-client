import ReceiveMessage from "./ReceiveMessage";
import SendMessage from "./SendMessage";
import { useState, useEffect, useRef } from "react";
import { ChevronRight } from "lucide-react";
import AnimatedGradientText from "@/components/ui/animated-gradient-text";
import { fetchUserMetaDataById } from '../Services/ProfileService';
import { Skeleton } from "@/components/ui/skeleton";
import { useWebSocket } from '../Context/WebSocketContext';
import { getChatMessages, checkIsRelated, sendMessage } from '../Services/ChatService';

export default function DirectChat({showFriendInfoMenu, darkMode, receiverId}) {

  const chatRef = useRef(null);
  const { messages } = useWebSocket();
  const [processedMessages, setProcessedMessages] = useState([]);

  const [showScrollButton, setShowScrollButton] = useState(false);
  const chatWallpaper = darkMode ? 'url(./src/assets/Wallpapers/dark.png)' : 'url(./src/assets/Wallpapers/light.png)';
  const [magicReplyButton, setMagicReplyButton] = useState(false);
  const [userName, setUserName] = useState('');
  const [userAvatar, setUserAvatar] = useState('');
  const [loading, setLoading] = useState(true);
  const [chatsLoading, setChatsLoading] = useState(true);
  const [message, setMessage] = useState([]);
  const [typedMessage, setTypedMessage] = useState('');

    function handleScroll() {
      const chatContainer = chatRef.current;
      if (chatContainer) {
        const isAtBottom =
          chatContainer.scrollHeight - chatContainer.scrollTop === chatContainer.clientHeight;
        setShowScrollButton(!isAtBottom);
      }
    }

    function showMagicReplyButton(){
      setMagicReplyButton(true);
    }

    function hideMagicReplyButton(){
      setMagicReplyButton(false);
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

    const fetchReceiverInfo = async () => {
      try{
        const response = await fetchUserMetaDataById(receiverId);
        setUserName(response.userName);
        setUserAvatar(response.profilePicture);
      }
      finally{
        setLoading(false);
      }
    }

    const fetchChatMessages = async () => {
      try{
        const response = await getChatMessages(receiverId);
        setMessage(response);
      }
      finally{
        setChatsLoading(false);
      }
    }
    
    useEffect(() => {
      fetchReceiverInfo();
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

   useEffect(() => {
        const handleMessages = async () => {
            if (messages.length === 0) {
                return;
            }
            const newMessages = messages.filter(
                (message) => !processedMessages.includes(message.id)
            );
            if (newMessages.length === 0) {
                return;
            }
            for (const lastMessage of newMessages) {
                if (lastMessage.action === 'messageService') {
                    const isRelated = await checkIsRelated(lastMessage.chatId);
                    if (isRelated) {
                       fetchChatMessages();
                    }
                }
            }
            setProcessedMessages((prevProcessedMessages) => [
                ...prevProcessedMessages,
                ...newMessages.map((message) => message.id),
            ]);
        };
        handleMessages();
    }, [messages, processedMessages]);

    useEffect(() => {
      fetchReceiverInfo();
    }, [receiverId]);

    useEffect(() => {
      fetchChatMessages();
    }, [receiverId]);

    const handleSendMessage = async () => {
      await sendMessage('67761526c2f7bd5122fad6d9', typedMessage);
      setTypedMessage('');
    }

  return (
    <div>
        <div className={`${darkMode ? 'bg-[#262729]' : 'bg-background' } min-h-screen flex flex-col`} >
        <div onClick={showFriendInfoMenu} style={{cursor:'pointer'}} className={`${darkMode ? 'border-gray-600' : 'border-border'} flex items-center px-4 py-3 border-b`}>
            {loading ? (
              <div>
                <div className="flex items-center">
                  <Skeleton className="h-11 w-11 rounded-full mr-2"/>
                  <div className="mt-1">
                    <Skeleton className="h-4 w-[150px] mb-2" />
                    <Skeleton className="h-3 w-[200px]" />
                  </div>
                </div>
              </div>
            ) : (
              <div>
                <div className="flex items-center">
                <img src={userAvatar} alt="User Avatar" className="rounded-full mr-2" style={{height:'45px'}}/>
                <div>
                  <span className={`${darkMode ? 'text-white':'text-black'} text-lg font-semibold`}>{userName}</span>
                  <p className={`${darkMode ? 'text-gray-400':'text-muted-foreground'} mt-0`}  style={{fontSize:'70%'}}>Click here for contact info</p>
                </div>
                </div>
              </div>
            ) }
        </div>
        <div className="p-4" ref={chatRef} style={{height:'78vh', overflowY:'auto', scrollbarWidth:'none', backgroundImage: chatWallpaper, backgroundSize: 'cover' , display:'flex', flexDirection:'column', justifyContent:'end'}}>
        {showScrollButton && <i onClick={scrollToBottom} className={`${darkMode ? 'bg-[#262729]' : 'bg-white'} cursor-pointer absolute bi bi-arrow-down-circle-fill text-4xl text-primary`} style={{left: '67%'}}></i>}
          {chatsLoading ? (
            <div>
              <div className="w-full" style={{ display: 'flex', justifyContent: 'right' }}>
                <div className="flex items-start mb-2">
                  <div className="bg-primary text-white p-2 rounded-lg max-w-xs break-words">
                    <Skeleton className="h-12 w-[200px] mb-2" />
                    <Skeleton className="h-3 w-[100px]" />
                  </div>
                </div>
              </div>
              <div className="w-full" style={{ display: 'flex', justifyContent: 'right' }}>
                <div className="flex items-start mb-2">
                  <div className="bg-primary text-white p-2 rounded-lg max-w-xs break-words">
                    <Skeleton className="h-4 w-[200px] mb-1" />
                    <Skeleton className="h-3 w-[100px]" />
                  </div>
                </div>
              </div>
              <div className="w-full" style={{ display: 'flex', justifyContent: 'left' }}>
                <div className="flex items-start mb-2">
                  <div className="bg-[#1c1c1c] text-white p-2 rounded-lg max-w-xs break-words">
                    <Skeleton className="h-12 w-[200px] mb-2" />
                    <Skeleton className="h-3 w-[100px]" />
                  </div>
                </div>
              </div>        
            </div>
          ) : (
            message.length > 0 ? (
              message.map((message, index) =>
                message.isSendByMe ? (
                  <SendMessage
                    key={index}
                    time={message.timestamp}
                    message={message.message}
                  />
                ) : (
                  <ReceiveMessage
                    key={index}
                    time={message.timestamp}
                    message={message.message}
                  />
                )
              )
            ) : (
              <div className={`${darkMode ? 'text-gray-300' : 'text-gray-500'} text-center`}>	 
                No messages to display.
              </div>
            )
          )}      
        {magicReplyButton && <div style={{left: '64%', bottom: '13%'}} className="absolute cursor-pointer bg-white rounded-full">
          <AnimatedGradientText>
            <span
              className={cn(
                `inline animate-gradient bg-gradient-to-r from-[#ffaa40] via-[#9c40ff] to-[#ffaa40] bg-[length:var(--bg-size)_100%] bg-clip-text text-transparent`,
              )}
            >
              Magic Reply
            </span>
            <ChevronRight className="ml-1 size-3 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5" />
          </AnimatedGradientText>          
        </div>}
        </div>
        <div className={`${darkMode ? 'border-gray-600 bg-[#262729]' : 'border-border bg-card'} px-4 py-3  border-t`} style={{display:'flex', alignItems:'center',columnGap:'1rem'}}>
            <input type="text" value={typedMessage} onChange={(e) => setTypedMessage(e.target.value)} placeholder="Type a message" className={`${darkMode ? ' text-white' : 'bg-input text-black'} focus:border-none focus:outline-none w-full p-2 rounded-lg`}/>
            <span><i style={{cursor:'pointer'}} onClick={handleSendMessage} className="bi bi-send-fill text-2xl text-primary"></i></span>
        </div>
        </div>
    </div>
  )
}
