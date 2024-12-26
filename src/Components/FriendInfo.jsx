import {useState} from 'react'
import GlobalAlert from './GlobalAlert';

export default function FriendInfo() {
  const [isFavorite, setIsFavorite] = useState(true);
  const [blockPopup, setBlockPopup] = useState(false);
  const [unfriendPopup, setUnfriendPopup] = useState(false);
  const [chatDeletePopup, setChatDeletePopup] = useState(false);

  var friendName = "testUser"

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

  var user = "testUser"
  return (
    <div>
      {blockPopup && <GlobalAlert text={`Block ${friendName}?`} textOP={'Blocked contacts will no longer be able to send you messages.'} button1={'Cancel'} button2={'Block'} btn1Function={toggleBlockPopup} btn2Function={toggleBlockPopup}/>}
      {unfriendPopup && <GlobalAlert text={`Remove ${friendName}?`} textOP={'Removing this contact will remove them from your friends list.'} button1={'Cancel'} button2={'Remove'} btn1Function={toggleUnfriendPopup} btn2Function={toggleUnfriendPopup} />}
      {chatDeletePopup && <GlobalAlert text={`Delete this chat?`} textOP={''} button1={'Cancel'} button2={'Delete chat'} btn1Function={toggleChatDeletePopup} btn2Function={toggleChatDeletePopup} />}
      <div className="border-r border-border p-4 info-column" style={{backgroundColor:'#f2f3f7'}}>
      <h2 className="text-lg font-semibold mb-4">Friend info</h2>
        <div className="bg-card p-6 w-full" style={{marginTop:'12%', backgroundColor:'#f2f3f7'}} >
          <div className="flex flex-col items-center">
            <div className=" rounded-full flex items-center justify-center mb-4" style={{backgroundColor:'red', width:'150px', height:'150px'}}>
              
            </div>
            <h2 className="text-xl font-semibold text-foreground">{user}</h2>
            <p className="text-muted-foreground">email</p>
            <p className="text-muted-foreground text-sm">about</p>
          </div>
            <ul className="space-y-2" style={{marginTop:'10%'}} >
              <li className="flex items-center py-2 px-3 text-black rounded-lg hover:bg-gray-200 " onClick={toggleFavorite} style={{cursor:'pointer'}}>
                <i className={`bi ${isFavorite ? 'bi-star' : 'bi-star-fill'}`}></i>&nbsp;&nbsp;
                <span>{isFavorite ? 'Remove from favorites' : 'Add to favorites'}</span>        
              </li>
              <li onClick={toggleBlockPopup} className="flex items-center py-2 px-3 text-destructive rounded-lg hover:bg-gray-200 "  style={{cursor:'pointer'}}>
                <i className="bi bi-ban"></i>&nbsp;&nbsp;
                <span>Block {user}</span>
              </li>
              <li onClick={toggleUnfriendPopup} className="flex items-center py-2 px-3 text-destructive rounded-lg hover:bg-gray-200 "  style={{cursor:'pointer'}}>
                <i className="bi bi-hand-thumbs-down"></i>&nbsp;&nbsp;
                <span>Unfriend {user}</span>
              </li>
              <li onClick={toggleChatDeletePopup} className="flex items-center py-2 px-3 text-destructive rounded-lg hover:bg-gray-200 "  style={{cursor:'pointer'}}>
                <i className="bi bi-trash"></i>&nbsp;&nbsp;
                <span>Delete chat</span>
              </li>
            </ul>
        </div>
      </div>
    </div>
  )
}
