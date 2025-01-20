import GroupReceiveMessage from "./GroupReceiveMessage";
import GroupSendMessage from "./GroupSendMessage";
import { useState, useEffect, useRef } from "react";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import AnimatedGradientText from "@/components/ui/animated-gradient-text";
import { getGroupInfo, isGroupRelated, getGroupMessages, sendMessage, markGroupMessagesAsRead } from '../Services/GroupsService';
import { Skeleton } from "@/components/ui/skeleton";
import { useWebSocket } from '../Context/WebSocketContext';
import TemporalMessage from "./TemporalMessage";
import CircularProgress from '@mui/material/CircularProgress';

export default function GroupChat({ showGroupInfoMenu, darkMode, groupId, fetchUnreadGroupMessages}) {

  const { messages } = useWebSocket();
  const [processedMessages, setProcessedMessages] = useState([]);

  const chatRef = useRef(null);
  const [groupName, setGroupName] = useState('');
  const [groupAvatar, setGroupAvatar] = useState('');
  const [loading, setLoading] = useState(true);
  const [chatsLoading, setChatsLoading] = useState(true);
  const [showScrollButton, setShowScrollButton] = useState(false);
  const chatWallpaper = darkMode ? 'url(./src/assets/Wallpapers/dark.png)' : 'url(./src/assets/Wallpapers/light.png)';
  const [magicReplyButton, setMagicReplyButton] = useState(false);
  const [removedFromGroup, setRemovedFromGroup] = useState(false);
  const [typedMessage, setTypedMessage] = useState('');
  const [temporalMessage, setTemporalMessage] = useState(false);
  const [temporalMessageContent, setTemporalMessageContent] = useState('');
  const [message, setMessage] = useState([]);

  const fetchGroupInfo = async () => {
    try{
      const response = await getGroupInfo(groupId);
      setGroupName(response.groupName);
      setGroupAvatar(response.groupIcon);
    } finally{
      setLoading(false);
    }
  }

  const fetchChatMessages = async () => {
    try{
      const response = await getGroupMessages(groupId);
      setMessage(response);
    }
    finally{
      setChatsLoading(false);
    }
  }
  
  const markMessagesAsRead = async () => {
    await markGroupMessagesAsRead(groupId);
    fetchUnreadGroupMessages();
  }

  const handleShowGroupInfoMenu = () => {
    if(!removedFromGroup){
      showGroupInfoMenu();
    }
  }

    useEffect(() => {
          const handleMessages = async () => {
              if (messages.length === 0) {
                  return;
              }
              const newMessages = messages.filter(message => !processedMessages.includes(message.id));
              if (newMessages.length === 0) {
                  return; 
              }
              for (const lastMessage of newMessages) {
                  switch (lastMessage.action) {
                      case 'groupService': {
                          const isRelated = await isGroupRelated(lastMessage.groupId);
                          if (isRelated) {
                              fetchGroupInfo();
                          }
                          if (lastMessage.groupId === groupId && !isRelated) {
                              setRemovedFromGroup(true);
                          }
                          break;
                      }
                      case 'messageService': {
                          if(lastMessage.type === 'group'){
                            const isRelated = await isGroupRelated(lastMessage.groupId);
                            if (isRelated) {
                              fetchChatMessages();
                              markMessagesAsRead();
                            }
                          }                        
                        break;
                      }
                      default:
                          break;
                  }
              }
              setProcessedMessages(prevProcessedMessages => [
                  ...prevProcessedMessages,
                  ...newMessages.map(message => message.id),
              ]);
          };
          handleMessages();
    }, [messages, processedMessages]);

  useEffect(() => {
    markMessagesAsRead();
    fetchGroupInfo();
    fetchChatMessages();
  }, []);

  useEffect(() => {
    markMessagesAsRead();
    fetchGroupInfo();
    fetchChatMessages();
  }, [groupId]);

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

  const handleSendMessage = async () => {
    await sendMessage(groupId, typedMessage);
    setTemporalMessageContent(typedMessage);
    setTypedMessage('');
  }
  
  const displayTemporalMessage = () => {
    setTemporalMessage(true);
  }  

  useEffect(() => {
    if (message.length > 0) {
      setTemporalMessage(false);
      setMagicReplyButton(true);
    }
  }, [message]); 
  
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

  return (
    <div>
      <div className={`${darkMode ? 'bg-[#262729]' : 'bg-background'} min-h-screen flex flex-col`}>
        <div onClick={handleShowGroupInfoMenu} style={{ cursor: 'pointer' }} className={`${darkMode ? 'border-gray-600' : 'border-border'} flex items-center px-4 py-3 border-b`}>
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
                  <div className="rounded-full mr-2" style={{ height: '45px', width: '45px', background: `center / cover no-repeat url(${groupAvatar})` }}></div>
                  <div>
                    <span className={`${darkMode ? 'text-white' : 'text-black'} text-lg font-semibold`}>{groupName}</span>
                    <p className={`${darkMode ? 'text-gray-400' : 'text-muted-foreground'} mt-0`} style={{ fontSize: '70%' }}>Click here for group info</p>
                  </div>
                </div>
              </div>
            ) }
        </div>
        <div className="p-4" ref={chatRef} style={{ height: '78vh', overflowY: 'auto', scrollbarWidth: 'none', backgroundImage: chatWallpaper, backgroundSize: 'cover' }}>
          {showScrollButton && <i onClick={scrollToBottom} className={`${darkMode ? 'bg-[#262729]' : 'bg-white'} cursor-pointer absolute bi bi-arrow-down-circle-fill text-4xl text-primary`} style={{ left: '67%' }}></i>}
          {chatsLoading ? (
            <div className="text-center">
              <CircularProgress size="30px"/>       
            </div>
          ) : (
            message.length > 0 ? (
              message.map((message, index) =>
                message.isSendByMe ? (
                  <GroupSendMessage
                    key={index}
                    time={message.timestamp}
                    message={message.message}
                  />
                ) : (
                  <GroupReceiveMessage
                    key={index}
                    time={message.timestamp}
                    message={message.message}
                    senderName={message.sender}
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
        </div>
        <div className={`${darkMode ? 'border-gray-600 bg-[#262729]' : 'border-border bg-card'} px-4 py-3 border-t`} style={{ display: 'flex', alignItems: 'center', columnGap: '1rem' }}>
          {removedFromGroup ? (<div className="w-full mt-2">
            <p className={`${darkMode ? 'text-gray-300' : 'text-black' } text-sm text-center`}>You can't send messages to this group beacuse you're no longer a member.</p>
          </div>) : (<>
            <input value={typedMessage} onChange={(e) => setTypedMessage(e.target.value)} type="text" placeholder="Type a message" className={`${darkMode ? 'text-white' : 'bg-input text-black'} focus:border-none focus:outline-none w-full p-2 rounded-lg`} />
            <span><i style={{ cursor: 'pointer' }} onClick={() => { handleSendMessage(); displayTemporalMessage();}} className="bi bi-send-fill text-2xl text-primary"></i></span>
          </>)}
        </div>
      </div>
    </div>
  )
}
