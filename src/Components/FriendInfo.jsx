import {useState, useEffect} from 'react'
import GlobalAlert from './GlobalAlert';
import { fetchUserMetaDataById } from '../Services/ProfileService';
import { useWebSocket } from '../Context/WebSocketContext';
import { getFriendshipId } from '../Services/FriendshipService';
import { deleteDirectChat } from '../Services/ProfileService';
import { useIsMobile } from '../hooks/useIsMobile';

export default function FriendInfo({darkMode, receiverId, setShowMobileRight, showChatsMenu}) {

  const isMobile = useIsMobile();
  const { messages, unFriend } = useWebSocket();
  const [processedMessages, setProcessedMessages] = useState([]);

  const [blockPopup, setBlockPopup] = useState(false);
  const [unfriendPopup, setUnfriendPopup] = useState(false);
  const [chatDeletePopup, setChatDeletePopup] = useState(false);
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userAbout, setUserAbout] = useState('');
  const [userAvatar, setUserAvatar] = useState('');

  const fetchReceiverInfo = async () => {
    const response = await fetchUserMetaDataById(receiverId);
    setUserName(response.userName);
    setUserEmail(response.email);
    setUserAbout(response.about);
    setUserAvatar(response.profilePicture);
  }  

  useEffect(() => {
    fetchReceiverInfo();
  }, []);

  const deleteChat = async () => {
    await deleteDirectChat(receiverId);
    setChatDeletePopup(!chatDeletePopup);
  }
  
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
  
                if(lastMessage.action === 'profileService'){
                  if(lastMessage.body === receiverId){
                    fetchReceiverInfo();
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

  const handleUnfriend = async () => {
    const response = await getFriendshipId(receiverId);
    await unFriend(response);
    setUnfriendPopup(!unfriendPopup);
  }

  const handleBlock = async () => {
    const response = await getFriendshipId(receiverId);
    await unFriend(response);
    setBlockPopup(!blockPopup);
  }


  function toggleBlockPopup(){
    setBlockPopup(!blockPopup);
  }

  function toggleUnfriendPopup(){
    setUnfriendPopup(!unfriendPopup);
  }

  function toggleChatDeletePopup(){
    setChatDeletePopup(!chatDeletePopup);
  }

  const handleBackButton = () => {
    setShowMobileRight(true);
    showChatsMenu();
  }

  return (
    <div>
      {blockPopup && <GlobalAlert darkMode={darkMode} text={`Block ${userName}?`} textOP={'Blocked contacts will no longer be able to send you messages.'} button1={'Cancel'} button2={'Block'} btn1Function={toggleBlockPopup} btn2Function={handleBlock}/>}
      {unfriendPopup && <GlobalAlert darkMode={darkMode} text={`Remove ${userName}?`} textOP={'Removing this contact will remove them from your friends list.'} button1={'Cancel'} button2={'Remove'} btn1Function={toggleUnfriendPopup} btn2Function={handleUnfriend} />}
      {chatDeletePopup && <GlobalAlert darkMode={darkMode} text={`Delete this chat?`} textOP={''} button1={'Cancel'} button2={'Delete chat'} btn1Function={toggleChatDeletePopup} btn2Function={deleteChat} />}
      <div className={`${darkMode ? 'border-gray-600 border-r border-border':'border-r border-border'}  ${isMobile ? '':'p-4'} info-column`} style={{backgroundColor: darkMode ? '#1c1c1c' : '#f2f3f7', height:'100vh', width: isMobile ? '100%' : '', paddingTop: isMobile ? '30%' : ''}}>
      <h2 className={`${darkMode ? 'text-white' : '' } text-lg font-semibold mb-4`} style={{marginLeft: isMobile ? '12%':''}}>Friend info</h2>
      {isMobile && <p onClick={handleBackButton} className="text-primary font-medium text-lg cursor-pointer right-10 top-10 absolute">Back</p>}
        <div className="bg-card p-6 w-full" style={{marginTop: isMobile ? '':'12%', backgroundColor: darkMode ? '#1c1c1c' : '#f2f3f7'}} >
          <div className="flex flex-col items-center">
            <div className="rounded-full flex items-center justify-center mb-4" style={{ width: '150px', height: '150px', background: `center / cover no-repeat url(${userAvatar})` }}></div>
            <h2 className={`${darkMode ? 'text-white' : 'text-foreground'} text-xl font-semibold`}>
            {userName}{'   '}
            {userName === 'VIBEZ' && <i className="ml-1 bi bi-patch-check-fill text-primary"></i>}
            </h2>
            <p className={`${darkMode ? 'text-gray-400' : 'text-muted-foreground'}`}>{userEmail}</p>
            <p className={`${darkMode ? 'text-gray-400' : 'text-muted-foreground'} text-sm`}>{userAbout}</p>
          </div>
            <ul className="space-y-2" style={{marginTop:'10%'}} >
              <li onClick={toggleBlockPopup} className={`${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-200' } flex items-center py-2 px-3 rounded-lg text-destructive`} style={{cursor:'pointer'}}>
                <i className="bi bi-ban"></i>&nbsp;&nbsp;
                <span>Block {userName}</span>
              </li>
              <li onClick={toggleUnfriendPopup} className={`${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-200' } flex items-center py-2 px-3 rounded-lg text-destructive`}  style={{cursor:'pointer'}}>
                <i className="bi bi-hand-thumbs-down"></i>&nbsp;&nbsp;
                <span>Unfriend {userName}</span>
              </li>
              <li onClick={toggleChatDeletePopup} className={`${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-200' } flex items-center py-2 px-3 rounded-lg text-destructive`}  style={{cursor:'pointer'}}>
                <i className="bi bi-trash"></i>&nbsp;&nbsp;
                <span>Delete chat</span>
              </li>
            </ul>
        </div>
      </div>
    </div>
  )
}
