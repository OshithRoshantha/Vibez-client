import {useState, useEffect} from 'react'
import GlobalAlert from './GlobalAlert';
import { fetchUserMetaDataById } from '../Services/ProfileService';

export default function FriendInfo({darkMode, receiverId}) {
  const [isFavorite, setIsFavorite] = useState(true);
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

  function setToFavorite() {
    setIsFavorite(true);
  }

  function unsetFromFavorite() {
    setIsFavorite(false);
  }

  function toggleFavorite(){
    if(isFavorite){
      unsetFromFavorite();
    } else {
      setToFavorite();
    }
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

  return (
    <div>
      {blockPopup && <GlobalAlert darkMode={darkMode} text={`Block ${userName}?`} textOP={'Blocked contacts will no longer be able to send you messages.'} button1={'Cancel'} button2={'Block'} btn1Function={toggleBlockPopup} btn2Function={toggleBlockPopup}/>}
      {unfriendPopup && <GlobalAlert darkMode={darkMode} text={`Remove ${userName}?`} textOP={'Removing this contact will remove them from your friends list.'} button1={'Cancel'} button2={'Remove'} btn1Function={toggleUnfriendPopup} btn2Function={toggleUnfriendPopup} />}
      {chatDeletePopup && <GlobalAlert darkMode={darkMode} text={`Delete this chat?`} textOP={''} button1={'Cancel'} button2={'Delete chat'} btn1Function={toggleChatDeletePopup} btn2Function={toggleChatDeletePopup} />}
      <div className={`${darkMode ? 'border-gray-600 border-r border-border':'border-r border-border'}   p-4 info-column`} style={{backgroundColor: darkMode ? '#1c1c1c' : '#f2f3f7', height:'100vh'}}>
      <h2 className={`${darkMode ? 'text-white' : '' } text-lg font-semibold mb-4`}>Friend info</h2>
        <div className="bg-card p-6 w-full" style={{marginTop:'12%', backgroundColor: darkMode ? '#1c1c1c' : '#f2f3f7'}} >
          <div className="flex flex-col items-center">
            <img src={userAvatar} className=" rounded-full flex items-center justify-center mb-4" style={{width:'150px', height:'150px'}}/>
            <h2 className={`${darkMode ? 'text-white' : 'text-foreground'} text-xl font-semibold`}>{userName}</h2>
            <p className={`${darkMode ? 'text-gray-400' : 'text-muted-foreground'}`}>{userEmail}</p>
            <p className={`${darkMode ? 'text-gray-400' : 'text-muted-foreground'} text-sm`}>{userAbout}</p>
          </div>
            <ul className="space-y-2" style={{marginTop:'10%'}} >
              <li className={`${darkMode ? 'text-white hover:bg-gray-700' : 'text-black hover:bg-gray-200' } flex items-center py-2 px-3 rounded-lg`} onClick={toggleFavorite} style={{cursor:'pointer'}}>
                <i className={`bi ${isFavorite ? 'bi-star' : 'bi-star-fill'}`}></i>&nbsp;&nbsp;
                <span>{isFavorite ? 'Remove from favorites' : 'Add to favorites'}</span>        
              </li>
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
