import GroupReceiveMessage from "./GroupReceiveMessage";
import GroupSendMessage from "./GroupSendMessage";
import { useState, useEffect, useRef } from "react";
import { getGroupInfo, getGroupMessages, markGroupMessagesAsRead, isGroupRelated } from '../Services/GroupsService';
import { Skeleton } from "@/components/ui/skeleton";
import { useWebSocket } from '../Context/WebSocketContext';
import TemporalMessage from "./TemporalMessage";
import CircularProgress from '@mui/material/CircularProgress';
import EmojiPicker from 'emoji-picker-react';
import { useIsMobile } from '../hooks/useIsMobile';
import mainDark from '@/assets/Wallpapers/dark.png';
import mainLight from '@/assets/Wallpapers/light.png';

export default function GroupChat({ showGroupInfoMenu, darkMode, groupId, fetchUnreadGroupMessages, setShowMobileRight, setGroupsMenu}) {

  const isMobile = useIsMobile();
  const { messages, sendGroupMessage } = useWebSocket();
  const [processedMessages, setProcessedMessages] = useState([]);

  const chatRef = useRef(null);
  const [groupName, setGroupName] = useState('');
  const [groupAvatar, setGroupAvatar] = useState('');
  const [loading, setLoading] = useState(true);
  const [chatsLoading, setChatsLoading] = useState(true);
  const [showScrollButton, setShowScrollButton] = useState(false);
  const [magicReplyButton, setMagicReplyButton] = useState(false);
  const [removedFromGroup, setRemovedFromGroup] = useState(false);
  const [typedMessage, setTypedMessage] = useState('');
  const [temporalMessage, setTemporalMessage] = useState(false);
  const [temporalMessageContent, setTemporalMessageContent] = useState('');
  const [message, setMessage] = useState([]);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const inputRef = useRef(null);
  const [customText, setCustomText] = useState('');

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
      setChatsLoading(true);
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
                          fetchGroupInfo();
                          const isRelated = await isGroupRelated(lastMessage.groupId);
                          if (lastMessage.groupId === groupId && !isRelated) {
                              setCustomText("You can't send messages to this group beacuse you're no longer a member.");
                              setRemovedFromGroup(true);
                          }
                          break;
                      }
                      case 'messageService': {
                          if(lastMessage.type === 'group' && lastMessage.groupId === groupId){
                            if (lastMessage.sender === sessionStorage.getItem('userId')) {lastMessage.payload.isSendByMe = true;} 
                            else {lastMessage.payload.isSendByMe = false; lastMessage.payload.sender = lastMessage.payload.senderName;} 
                            setMessage(prevMessage => [...prevMessage, lastMessage.payload]);
                            markMessagesAsRead();
                          }                        
                        break;
                      }
                      case 'accountDelete':{
                        if(lastMessage.typeOfAction == 'groupChat' && lastMessage.deletedGroups.includes(groupId)){
                            setCustomText("You can't send messages to this group beacuse this group no longer available.");
                            setRemovedFromGroup(true);
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
    setRemovedFromGroup(false);
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
    await sendGroupMessage(groupId, typedMessage);
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

  const handleEmojiClick = (emojiData, event) => {
    setTypedMessage(typedMessage + emojiData.emoji);
    setShowEmojiPicker(false);
    inputRef.current.focus();
  };

  const handleBackButton = () => {
    setShowMobileRight(false);
    setGroupsMenu(true);
  }

  const handleGroupInfo = () => {
    if(isMobile){
      handleShowGroupInfoMenu();
      setShowMobileRight(false);
    }
    else{
      handleShowGroupInfoMenu();
    }
  }

  return (
    <div>
      <div className={`${darkMode ? 'bg-[#262729]' : 'bg-background'} min-h-screen flex flex-col`}>
        <div className={`${darkMode ? 'border-gray-600' : 'border-border'} flex items-center px-4 py-3 border-b`} style={{ height: isMobile ? '10vh' : ''}}>
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
                <div onClick={handleGroupInfo} style={{ cursor: 'pointer'}}  className="flex items-center">
                  <div className="rounded-full mr-2" style={{ height: '45px', width: '45px', background: `center / cover no-repeat url(${groupAvatar})` }}></div>
                  <div>
                    <span className={`${darkMode ? 'text-white' : 'text-black'} text-lg font-semibold`}>
                      {isMobile && groupName.length > 25 ? `${groupName.substring(0, 25)}...` : groupName}
                    </span>
                    <p className={`${darkMode ? 'text-gray-400' : 'text-muted-foreground'} mt-0`} style={{ fontSize: '70%' }}>Click here for group info</p>
                  </div>
                </div>
              </div>
            ) }
            {isMobile && <p onClick={handleBackButton} className="text-primary font-medium text-lg cursor-pointer right-6 absolute">Back</p>}
        </div>
        <div className="p-4" ref={chatRef} style={{ height: isMobile ? '80vh' : '78vh', overflowY: 'auto', scrollbarWidth: 'none', backgroundImage: `url(${darkMode ? mainDark : mainLight})`, backgroundSize: 'cover' }}>
          {showScrollButton && !isMobile && <i onClick={scrollToBottom} className={`${darkMode ? 'bg-[#262729]' : 'bg-white'} cursor-pointer absolute bi bi-arrow-down-circle-fill text-4xl text-primary`} style={{ left: '67%' }}></i>}
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
        <div className={`${darkMode ? 'border-gray-600 bg-[#262729]' : 'border-border bg-card'} px-4 py-3 border-t`} style={{ display: 'flex', alignItems: 'center', columnGap: '1rem' , height: isMobile ? '10vh':''}}>
          {removedFromGroup ? (<div className={`${isMobile ? '': 'w-full mt-2'}`}>
            <p className={`${darkMode ? 'text-gray-300' : 'text-black' } text-sm text-center`}>You can't send messages to this group beacuse you're no longer a member.</p>
          </div>) : 
          (<>
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
                onClick={() => setShowEmojiPicker(!showEmojiPicker)} 
                className="bi bi-emoji-smile text-2xl text-primary cursor-pointer"
              ></i>}      
            <input 
                ref={inputRef}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && typedMessage.trim() !== '') { 
                    e.preventDefault(); 
                    handleSendMessage();
                    displayTemporalMessage(); 
                  }
                }} 
                value={typedMessage} 
                onChange={(e) => setTypedMessage(e.target.value)} 
                type="text" placeholder="Type a message" 
                className={`${darkMode ? 'text-white' : 'bg-input text-black'} focus:border-none focus:outline-none w-full p-2 rounded-lg`} 
              />
            <span><i style={{ cursor: 'pointer' }} onClick={() => { 
                    if (!chatsLoading) {
                        handleSendMessage(); 
                        displayTemporalMessage();
                    }
                }}  className={`bi bi-send-fill text-2xl ${chatsLoading ? 'text-blue-200' : 'text-primary'} `}></i></span>
          </>)}
        </div>
      </div>
    </div>
  )
}
