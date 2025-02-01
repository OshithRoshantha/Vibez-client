import ReceiveMessage from "./ReceiveMessage";
import SendMessage from "./SendMessage";
import { useState, useEffect, useRef } from "react";
import { ChevronRight } from "lucide-react";
import AnimatedGradientText from "@/components/ui/animated-gradient-text";
import CircularProgress from '@mui/material/CircularProgress';
import { fetchUserMetaDataById } from '../Services/ProfileService';
import { Skeleton } from "@/components/ui/skeleton";
import { useWebSocket } from '../Context/WebSocketContext';
import { getChatMessages, markAsRead } from '../Services/ChatService';
import { getChatHistory, getSmartReply } from '../Services/VibezIntelligence';
import TemporalMessage from "./TemporalMessage";
import { DotLoader } from 'react-spinners';
import { validateFriendship, getFriendshipId } from '../Services/FriendshipService';
import EmojiPicker from 'emoji-picker-react';
import { useIsMobile } from '../hooks/useIsMobile';

export default function DirectChat({setMarketplaceMenu, showFriendInfoMenu, darkMode, receiverId, fetchUnreadMessages, setChatsMenu, setShowMobileRight}) {

  const isMobile = useIsMobile();
  const chatRef = useRef(null);
  const { messages, sendPrivateMessage } = useWebSocket();
  const [processedMessages, setProcessedMessages] = useState([]);

  const [showScrollButton, setShowScrollButton] = useState(false);
  const chatWallpaper = darkMode ? 'url(./src/assets/Wallpapers/dark.png)' : 'url(./src/assets/Wallpapers/light.png)';
  const [magicReplyButton, setMagicReplyButton] = useState(true);
  const [userName, setUserName] = useState('');
  const [userAvatar, setUserAvatar] = useState('');
  const [loading, setLoading] = useState(true);
  const [chatsLoading, setChatsLoading] = useState(true);
  const [message, setMessage] = useState([]);
  const [typedMessage, setTypedMessage] = useState('');
  const [temporalMessage, setTemporalMessage] = useState(false);
  const [temporalMessageContent, setTemporalMessageContent] = useState('');
  const [generateReply, setGenerateReply] = useState(false);
  const [isFriend, setIsFriend] = useState(true);
  const [friendshipId, setFriendshipId] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const inputRef = useRef(null);

  function handleScroll() {
    const chatContainer = chatRef.current;
    if (chatContainer) {
      const isAtBottom = chatContainer.scrollHeight - chatContainer.scrollTop === chatContainer.clientHeight;
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
    setShowScrollButton(false);  
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
      setChatsLoading(true);
      const response = await getChatMessages(receiverId);
      setMessage(response);
    }
    finally{
      setChatsLoading(false);
    }
  }

  const checkIsFriends = async () => {
    const response = await getFriendshipId(receiverId);
    if (response === 'NOT_FRIENDS') {
      setIsFriend(true);
    } 
    else{
      const response2 = await validateFriendship(receiverId);
      if(!response2){
        setIsFriend(false);
      }
      else{
        setIsFriend(true);
      }
    }
  }

  const fetchFriendshipId = async () => {
    const response = await getFriendshipId(receiverId);
    setFriendshipId(response);
  }

  const doMarkAsRead = async () => {
    await markAsRead(receiverId);
    fetchUnreadMessages();
  }

  const fetchSmartReply = async () => {
    try{
      setGenerateReply(true);
      const chatHistory = await getChatHistory(receiverId);
      const response = await getSmartReply(chatHistory);
      setTypedMessage(response);
    }
    finally{
      setGenerateReply(false);
    }
  }

  useEffect(() => {
    doMarkAsRead();
   // setMagicReplyButton(false);
    setIsFriend(true);
  }, [receiverId]); 
  
  useEffect(() => {
    fetchReceiverInfo();
    checkIsFriends();
    fetchFriendshipId();
    setIsFriend(true);
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
                if (lastMessage.type === 'direct' && lastMessage.sender === receiverId) {
                if(lastMessage.sender === receiverId){lastMessage.payload.isSendByMe = false;}
                else {lastMessage.payload.isSendByMe = true;}
                setMessage(prevMessage => [...prevMessage, lastMessage.payload]);
                doMarkAsRead();
                }
              }

              if(lastMessage.action === 'profileService'){
                if(lastMessage.body === receiverId){
                  fetchReceiverInfo();
                }
              }

              if(lastMessage.action === 'friendshipService'){
                if(lastMessage.friendshipId === friendshipId){
                  checkIsFriends();
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
    checkIsFriends();
    fetchFriendshipId();
  }, [receiverId]);

  useEffect(() => {
    fetchChatMessages();
  }, [receiverId]);

  useEffect(() => {
    if (message.length > 0) {
      setTemporalMessage(false);
      setMagicReplyButton(true);
    }
  }, [message]);

  const handleSendMessage = async () => {
    await sendPrivateMessage(receiverId, typedMessage);
    setTemporalMessageContent(typedMessage);
    setTypedMessage('');
  }

  const displayTemporalMessage = () => {
    setTemporalMessage(true);
  }

  useEffect(() => {
    if (message.length > 0 || temporalMessage) {
      const chatContainer = chatRef.current;
      if (chatContainer) {
        chatContainer.scrollTo({
          top: chatContainer.scrollHeight,
          behavior: 'smooth',
        });
      }
    }
  }, [message, temporalMessage]);

  const handleEmojiClick = (emojiData, event) => {
    setTypedMessage(typedMessage + emojiData.emoji);
    setShowEmojiPicker(false);
    inputRef.current.focus();
  };

  const handleEmojiPicker = () => {
    if (!generateReply) {
      setShowEmojiPicker(!showEmojiPicker);
    }
  };

  const handleBackButton = () => {
    setShowMobileRight(false);
    setChatsMenu(true);
    setMarketplaceMenu(false);
  }

  const handleFriendInfo = () => {
    if(isMobile){
      showFriendInfoMenu();
      setShowMobileRight(false);
    }
    else{
      showFriendInfoMenu();
    }
  }

  return (
    <div>
        <div className={`${darkMode ? 'bg-[#262729]' : 'bg-background' } min-h-screen flex flex-col`} >
        <div className={`${darkMode ? 'border-gray-600' : 'border-border'} flex items-center px-4 py-3 border-b`}>
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
                <div onClick={handleFriendInfo} style={{cursor:'pointer'}} className="flex items-center">
                <div className="rounded-full mr-2" style={{ height: '45px', width: '45px', background: `center / cover no-repeat url(${userAvatar})` }}></div>
                <div>
                  <span className={`${darkMode ? 'text-white':'text-black'} text-lg font-semibold`}>
                  {userName}{'   '}
                  {userName === 'VIBEZ' && <i className="ml-1 bi bi-patch-check-fill text-primary"></i>}
                  </span>
                  <p className={`${darkMode ? 'text-gray-400':'text-muted-foreground'} mt-0`}  style={{fontSize:'70%'}}>Click here for contact info</p>
                </div>
                </div>
              </div>
            ) }
            {isMobile && <p onClick={handleBackButton} className="text-primary font-medium text-lg cursor-pointer right-6 absolute">Back</p>}
        </div>
        <div className="p-4" ref={chatRef} style={{height: isMobile ? '82vh' : '78vh', overflowY:'auto', scrollbarWidth:'none', backgroundImage: chatWallpaper, backgroundSize: 'cover'}}>
        {showScrollButton && !isMobile && <i onClick={scrollToBottom} className={`${darkMode ? 'bg-[#262729]' : 'bg-white'} cursor-pointer absolute bi bi-arrow-down-circle-fill text-4xl text-primary`} style={{left: '67%'}}></i>}
          {chatsLoading ? (
            <div className="text-center">
              <CircularProgress size="30px"/>       
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
                Say hello and start the conversation! 😊
              </div>
            )
          )}  
        {temporalMessage && <TemporalMessage message={temporalMessageContent}/> }    
        {!magicReplyButton && 
        <div style={{position:'absolute', bottom: isMobile ? '12%' : '14%', width: isMobile ? '88%' : '59%', display:'flex', justifyContent:'center', alignItems:'center'}}>
          dfdf
        <div onClick={fetchSmartReply} className="absolute cursor-pointer bg-white rounded-full">
          <AnimatedGradientText>
            <span
              className={`inline animate-gradient bg-gradient-to-r from-[#ffaa40] via-[#9c40ff] to-[#ffaa40] bg-[length:200%_100%] bg-clip-text text-transparent`}
            >
              Magic Reply
            </span>
            <ChevronRight className="ml-1 size-3 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5" />
          </AnimatedGradientText>          
        </div>
        </div>}
        </div>
        <div className={`${darkMode ? 'border-gray-600 bg-[#262729]' : 'border-border bg-card'} px-4 py-3  border-t`} style={{display:'flex', alignItems:'center',columnGap:'1rem'}}>
            {isFriend ? (<>
            {showEmojiPicker && 
              <div className="absolute" style={{left: '39%', bottom: '11%'}}>
                <EmojiPicker 
                  skinTonesDisabled
                  theme={darkMode ? 'dark' : 'light'} 
                  onEmojiClick={handleEmojiClick} 
                />
              </div>}
              {!isMobile &&
              <i 
                onClick={() => handleEmojiPicker()} 
                className="bi bi-emoji-smile text-2xl text-primary cursor-pointer"
              ></i>}
              <input 
                ref={inputRef}
                type="text" 
                value={typedMessage} 
                onChange={(e) => setTypedMessage(e.target.value)} 
                placeholder={generateReply ? "Generating reply..." : "Type a message"}
                className={`${darkMode ? 'text-white' : 'bg-input text-black'} focus:border-none focus:outline-none w-full p-2 rounded-lg`} 
                disabled={generateReply} 
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && typedMessage.trim() !== '') { 
                    e.preventDefault(); 
                    handleSendMessage();
                    displayTemporalMessage(); 
                  }
                }}
              />
              {generateReply ? 
              (<div>
                  <DotLoader size={40} color="#1311ff"/>
              </div>) : 
              (<div>
                  <span><i style={{cursor:'pointer'}} onClick={() => { handleSendMessage(); displayTemporalMessage();}} className="bi bi-send-fill text-2xl text-primary"></i></span>
              </div>)}
            </>) : (
              <div className={`${isMobile ? '': 'w-full mt-2'}`}>
                <p className={`${darkMode ? 'text-gray-300' : 'text-black' } text-sm text-center`}>Looks like you're not connected. Please add this user as a friend to chat.</p>
              </div>
            )}
            </div>
        </div>
    </div>
  )
}
