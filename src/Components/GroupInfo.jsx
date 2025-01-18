import { useRef, useState, useEffect} from 'react';
import GroupMemberList from './GroupMemberList';
import GroupMemberList2 from './GroupMemberList2';
import GroupAddMembers from './GroupAddMembers';
import AvatarEditor from 'react-avatar-editor'
import Slider from '@mui/material/Slider';
import { checkAdmin, getGroupInfo, updateGroup, isGroupRelated } from '../Services/GroupsService';
import { fetchUserMetaDataById } from '../Services/ProfileService';
import { useWebSocket } from '../Context/WebSocketContext';

export default function GroupInfo({darkMode, groupId}) {

  const { messages } = useWebSocket();
  const [processedMessages, setProcessedMessages] = useState([]);

  const [isAmAdmin, setIsAmAdmin] = useState(true);
  const [addMemberMenu, setAddMemberMenu] = useState(false);
  const [profilePicHover, setProfilePicHover] = useState(false);
  const [editPictureForm, setEditPictureForm] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [cropFactor, setCropFactor] = useState(1);
  const [cropedImage, setCropedImage] = useState(null);
  const fileInputRef = useRef(null);
  const avatarEditorRef = useRef(null);
  const [isEditingDescp, setIsEditingDescp] = useState(false);
  const [isEditingName, setIsEditingName] = useState(false);
  const [removedFromGroup, setRemovedFromGroup] = useState(false);

  const [name, setName] = useState('');
  const [descp, setDescp] = useState('');
  const [memberCount, setMemberCount] = useState(0);
  const [avatar, setAvatar] = useState('');
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [creator, setCreator] = useState('');

  const checkAdminStatus = async () => {
    if(!removedFromGroup){
      const response = await checkAdmin(groupId);
      setIsAmAdmin(response);
    }
  }

  const updateGroupInfo = async () => {
    await updateGroup(groupId, name, cropedImage, descp);
  }

  const fetchGroupInfo = async () => {
    if(!removedFromGroup){
      try{
          const response = await getGroupInfo(groupId);
          setName(response.groupName);
          setDescp(response.groupDesc);
          setMemberCount(response.memberIds.length);
          setAvatar(response.groupIcon);
          setCreator(response.creatorId);
          const memberPromises = response.memberIds.map(userId => fetchUserMetaDataById(userId));
          const memberData = await Promise.all(memberPromises);
          setMembers(memberData);
      } finally{
        setLoading(false);
      }
    }
  }  

  useEffect(() => {
      checkAdminStatus();
      fetchGroupInfo();
  }, []);

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
                case 'profileService': {
                  if(members.some(member => member.userId === lastMessage.body)){
                    fetchGroupInfo();
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

  function handleNameClick() {
      setIsEditingName(true);
  }
    
  function handleDescpClick() {
      setIsEditingDescp(true);
  }
    
  function handleNameBlur() {
      setIsEditingName(false);
      updateGroupInfo();
  }
    
  function handleDescpBlur() {
      setIsEditingDescp(false);
      updateGroupInfo();
  }

  function showAddMemberMenu() {
    setAddMemberMenu(!addMemberMenu)
  }

  function showProfilePicHover() {
      setProfilePicHover(true);
  }

  function hideProfilePicHover() {
      setProfilePicHover(false);
  }

  function editPictureFormHandler() {
      setEditPictureForm(!editPictureForm);
  }
    
  function handleSliderChange(event, newValue) {
      setCropFactor(newValue);
  }
    
  function uploadImg() {
      fileInputRef.current.click();
  }
    
  function handleFileChange(event) {
      const file = event.target.files[0];
      if (file) {
        const imageUrl = URL.createObjectURL(file);
        setSelectedImage(imageUrl);
        editPictureFormHandler();
      }
  }
    
  function handleCrop() {
      if (avatarEditorRef.current) {
        const canvas = avatarEditorRef.current.getImageScaledToCanvas();
        const croppedImageUrl = canvas.toDataURL();
        setSelectedImage(croppedImageUrl);
        setCropedImage(croppedImageUrl);
        editPictureFormHandler();
        updateGroupInfo();
      }
  }

  return (
<div>
      {addMemberMenu && <GroupAddMembers darkMode={darkMode} groupId={groupId} showAddMemberMenu={showAddMemberMenu}/>}
      <div className={`${darkMode ? 'border-gray-600 border-r border-border':'border-r border-border'}   p-4 info-column`} style={{backgroundColor: darkMode ? '#1c1c1c' : '#f2f3f7'}}>
        {editPictureForm && <div className='edit-picture-form2 shadow-lg bg-white' style={{marginTop:'8%'}}>
                                <AvatarEditor
                                    ref={avatarEditorRef}
                                    image={selectedImage}
                                    width={180}
                                    height={180}
                                    border={0}
                                    borderRadius={150}
                                    color={[0, 0, 0, 0.5]} 
                                    scale={cropFactor}
                                />
                                <Slider defaultValue={[1]} min={1} max={10} step={1} style={{ width: '70%'}} onChange={handleSliderChange} value={cropFactor}/>
                                <div className='edit-picture-buttons'>
                                    <button onClick={editPictureFormHandler} className='border-none  bg-gray-300 text-gray-600 hover:bg-gray-200' style={{width:'20%',borderRadius: '20px'}}>Back</button>
                                    <button onClick={handleCrop} className='border-none' style={{width:'20%',borderRadius: '20px',backgroundColor: '#0d6efd',color: 'white'}}>Crop</button>
                                </div>
        </div>}
        {removedFromGroup ? (<><div className='bg-yellow-200 py-2 pl-4 mb-4' style={{borderRadius:'10px'}}><i className=" text-gray-600 bi bi-exclamation-triangle"></i>   You're no longer a member in this group.</div></>) : (<> <h2 className={`${darkMode ? 'text-white' : '' } text-lg font-semibold mb-4`}>Group info</h2></>)}
        <div className="bg-card p-6 w-full" style={{backgroundColor: darkMode ? '#1c1c1c' : '#f2f3f7'}} >
          <div className="flex flex-col items-center mb-5" style={{marginTop:'-5%'}}>
            {isAmAdmin && 
              <div onClick={uploadImg} onMouseEnter={showProfilePicHover} onMouseLeave={hideProfilePicHover} className=" rounded-full flex items-center justify-center mb-1 text-xs" style={{border: '1px solid rgb(104, 104, 104)', width:'150px', height:'150px', cursor:'pointer', marginTop:'-5%',backgroundImage: cropedImage ? `url(${cropedImage})` : `url(${avatar})`, backgroundSize: 'cover', backgroundPosition: 'center'}}>
                {profilePicHover && <div style={{display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center'}} >
                        <span className='camera-icon'><i className="bi bi-camera-fill"></i></span>CHANGE GROUP ICON
                </div>}
              </div>
            }
            <input
                type='file'
                accept='image/*'
                ref={fileInputRef}
                style={{ display: 'none' }}
                onChange={handleFileChange}
            />            
            {!isAmAdmin &&
              <img src={avatar} className=" rounded-full flex items-center justify-center mb-1" style={{width:'150px', height:'150px', marginTop:'-5%', border: '1px solid rgb(104, 104, 104)'}}/>  
            }
            {isAmAdmin && (
              <>
            {isEditingName ? (
                <input
                    className={`${darkMode ? 'text-white' : 'text-foreground'} text-xl text-center font-semibold mt-4 bg-transparent focus:outline-none`}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    autoFocus
                />
            ) : (<h2 className={`${darkMode ? 'text-white' : 'text-foreground'} text-xl font-semibold mt-4`}>{name}</h2>)}
            {!isEditingName && !removedFromGroup && <i onClick={handleNameClick} className={`${darkMode ? 'text-white' : ''} absolute bi bi-pencil-fill`} style={{cursor:'pointer', marginTop:'10.3%', marginLeft:'25%'}}></i>} 
            {isEditingName && !removedFromGroup &&  <i onClick={handleNameBlur} className={`${darkMode ? 'text-white' : ''} absolute bi bi-check2`} style={{cursor:'pointer', fontSize:'125%', marginTop:'10.3%', marginLeft:'25%'}}></i>}
            </>
            )}
            {!isAmAdmin && <h2 className={`${darkMode ? 'text-white' : 'text-foreground'} text-xl font-semibold mt-4`}>{name}</h2>}
            <div className={`${darkMode ? 'text-gray-400' : 'text-muted-foreground '}`} style={{display:'flex', justifyContent:'center', alignItems:'center', columnGap:'3px'}}>
              <p className="text-sm">Group</p>
              <i className="bi bi-dot"></i>
              <p>{memberCount} members</p>
            </div>
            {!isAmAdmin && <p className={`${darkMode ? 'text-gray-400' : 'text-muted-foreground'}`}>{descp}</p>}
            {isAmAdmin && (
              <>
            {isEditingDescp ? (
                <input
                    className={`${darkMode ? 'text-gray-400' : 'text-muted-foreground'} text-center bg-transparent focus:outline-none`}	
                    value={descp}
                    onChange={(e) => setDescp(e.target.value)}
                    autoFocus
                />
            ) : (<p className={`${darkMode ? 'text-gray-400' : 'text-muted-foreground'}`}>{descp}</p>)}
            {!isEditingDescp && !removedFromGroup &&  <i onClick={handleDescpClick} className={`${darkMode ? 'text-white' : ''} absolute bi bi-pencil-fill`} style={{cursor:'pointer', marginTop:'13.7%', marginLeft:'25%'}}></i>} 
            {isEditingDescp && !removedFromGroup &&  <i onClick={handleDescpBlur} className={`${darkMode ? 'text-white' : ''} absolute bi bi-check2`}  style={{cursor:'pointer', fontSize:'125%', marginTop:'13.7%', marginLeft:'25%'}}></i>}
              </>
            )}
          </div>
          <h2 className={`${darkMode ? 'text-white' : ''} text-lg font-semibold mb-4`} style={{marginTop:'-5%'}}>{memberCount} members</h2>
          {isAmAdmin && <div>
            <div className="flex items-center mb-1">
              <button disabled={removedFromGroup} onClick={showAddMemberMenu} className={`${darkMode ? 'bg-[#3b3c3e]' : 'bg-gray-300 text-gray-600 hover:bg-gray-200'} mr-2`} style={{borderRadius:'50%', width:'38px', height:'38px', display:'flex', justifyContent:'center', alignItems:'center', border:'none'}}>
                <i className={`${darkMode ? 'text-white':''} bi bi-person-fill-add`}></i>
              </button>
              <span className={`${darkMode ? 'text-white' : 'text-base'}`}>Add member</span>
            </div>
            <div className={`${darkMode ? 'border-gray-700' : 'border-border'} border-b  my-4`}></div>
            </div>}
          <div className={`w-full  ${isAmAdmin ? 'h-[25vh]' : 'h-[38vh]'}`} style={{overflowY:'auto', scrollbarWidth:'none'}}>
            {isAmAdmin ? <GroupMemberList removedFromGroup={removedFromGroup} loading={loading} groupId={groupId} members={members} groupName={name} darkMode={darkMode}/> : <GroupMemberList2 removedFromGroup={removedFromGroup} loading={loading} creator={creator} groupId={groupId} members={members} groupName={name} darkMode={darkMode}/>}
          </div>
        </div>
      </div>
    </div>
  )
}
