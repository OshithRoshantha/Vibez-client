import './Styles/Column2.css'
import { useRef, useState, useEffect} from 'react';
import './Styles/SignupElement.css'
import AvatarEditor from 'react-avatar-editor'
import Slider from '@mui/material/Slider';
import GroupChatPreview from './GroupChatPreview';
import { Skeleton } from "@/components/ui/skeleton";
import { getAllGroups, getGroupInfo } from '../Services/GroupsService';

export default function GroupChats({showGroupMessages, darkMode}) {

    const [groups, setGroups] = useState([]);

    const [addMembersMenu, setAddMembersMenu] = useState(false);
    const [finishCreateGroup, setFinishCreateGroup] = useState(false);
    const [groupChats, setGroupChats] = useState(true);
    const [isAdded, setIsAdded] = useState(false);
    const [editPictureForm, setEditPictureForm] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const [cropFactor, setCropFactor] = useState(1);
    const [cropedImage, setCropedImage] = useState(null);
    const fileInputRef = useRef(null);
    const avatarEditorRef = useRef(null);  
    const [loading, setLoading] = useState(true);  

    const defaultImage = "./src/assets/groupDefault.jpg";

    const fetchAllGroups = async () => {
        try{
            const groupIds = await getAllGroups();
            const groupPreviews = await Promise.all(
                groupIds.map(async (groupId) => {
                    const groupPreview = await getGroupInfo(groupId);
                    return groupPreview;
                })
            );
            setGroups(groupPreviews);
        } 
        finally{
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchAllGroups();
    }, []);    

    function clearCropedImage() {
        setCropedImage(null);
    }

    function handleAddClick() {
        setIsAdded(true);
      }
      
    function handleRemoveClick() {
        setIsAdded(false);
    }
      
    function showAddMembersMenu(){
        setAddMembersMenu(true);
        setGroupChats(false);
        setFinishCreateGroup(false);
    }

    function hideAddMembersMenu(){
        setAddMembersMenu(false);
        setGroupChats(true);
    }

    function showGroupChats(){
        setGroupChats(true);
        setAddMembersMenu(false);
        setFinishCreateGroup(false);
    }

    function showFinishCreateGroup(){
        setFinishCreateGroup(true);
        setAddMembersMenu(false);
        setGroupChats(false);
    }

    function hideFinishCreateGroup(){
        setFinishCreateGroup(false);
        setGroupChats(true);
        setAddMembersMenu(false);
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
        }
    }

    var user = "testUser";

  return (
    <div>
    <div>
        <div className={`${darkMode ? 'border-gray-600 border-r border-border':'border-r border-border'}  p-4 chats-column`} style={{backgroundColor: darkMode ? '#262729' : '', height:'100vh'}}>
                <h2 className={`${darkMode ? 'text-white' :'text-black'} text-lg font-semibold column-header`}>Groups</h2>
                <input type="text" placeholder="Search groups" className={`${darkMode ? 'bg-[#3c3d3f] placeholder:text-[#abacae] text-white' : 'bg-gray-200'} w-full px-4 py-2 mb-4 focus:outline-none focus:border-none placeholder:text-gray-500  text-gray-500 `} style={{borderRadius:'20px'}} />
                <i className={`${darkMode ? 'text-[#abacae]':'text-gray-500'} bi absolute text-2xl bi-search`} style={{marginLeft:'-3%', marginTop:'0.2%'}}></i>
                <div className="flex space-x-2 mb-4">
                    <button onClick={showGroupChats} className={`${darkMode ? 'bg-[#223b51] text-[#59abff] hover:bg-[#184e88]':'bg-gray-300 text-gray-600  hover:bg-gray-200'} px-4 py-2 rounded-full border-none`}>Your groups</button>
                    <button onClick={showAddMembersMenu} className={`${darkMode ? 'bg-[#223b51] text-[#59abff] hover:bg-[#184e88]':'bg-gray-300 text-gray-600  hover:bg-gray-200'} px-4 py-2 rounded-full border-none`}><i className="bi bi-plus-lg"></i></button>
                </div>
                <div className='chat-list'>
                {addMembersMenu && <div>
                    <h2 className={`${darkMode ? 'text-white' : ''} text-lg font-semibold mb-2`}>Add group members</h2>
                    <div className='group-op'>
                    <div className="space-y-4">
                        <div className="flex items-center justify-between border-border py-2">
                        <div className="flex items-center">
                            <img src="https://placehold.co/40x40" className="rounded-full mr-2 w-55 h-55" />
                            <div>
                                <p className={`${darkMode ? 'text-white':''} font-medium`}>{user}</p>
                                <p className={`${darkMode ? 'text-gray-400':'text-muted-foreground'} text-sm `}>About</p>
                            </div>
                        </div>
                        <div className='btn-container'>
                            <button
                                  className={`px-3 py-1 mr-2 rounded text-primary-foreground ${isAdded ? "bg-blue-300" : "bg-primary"}`}
                                onClick={handleAddClick}
                                disabled={isAdded}
                            >
                                {isAdded ? "Added" : "Add"}
                            </button>
                            {isAdded &&
                            <button
                                className={`${darkMode ? 'bg-[#6a6b6d] text-white hover:bg-[#545454]':'bg-muted text-muted-foreground hover:bg-gray-300'} border-none px-3 py-1 rounded`}
                                onClick={() => {
                                    handleRemoveClick();
                                  }}
                            >
                                Remove
                            </button>}
                        </div>
                        </div>
                    </div>
                    </div>
                    <div className="flex items-center justify-center">
                    <button onClick={showFinishCreateGroup} className="bg-primary text-white absolute" style={{cursor: 'pointer', borderRadius:'50%', height:'54px', width:'54px', marginTop:'80px'}} >
                        <i className="bi bi-arrow-right"></i>
                    </button>
                    </div>
                </div>}
                {finishCreateGroup && <div style={{backgroundColor: darkMode ? '#262729' : ''}}>	
                    {editPictureForm && <div className={`bg-white edit-picture-form2 shadow-lg`}>
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
                    <div className={`${darkMode ? 'bg-[#262729]':'bg-card'} flex flex-col items-center  p-6`}>
                    <div className="relative mb-4">
                        <div className='profile-pic' onClick={uploadImg}  
                        style={{
                            backgroundImage: cropedImage ? `url(${cropedImage})` : `url(${defaultImage})`, 
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                        }}>
                            <span className='camera-icon'><i className="bi bi-camera-fill"></i></span>ADD GROUP ICON
                        </div>
                        <input
                            type='file'
                            accept='image/*'
                            ref={fileInputRef}
                            style={{ display: 'none' }}
                            onChange={handleFileChange}
                        />
                    </div>
                    <input
                        type="text"
                        placeholder="Group subject"
                        className={`${darkMode ? 'border-[#3c3d3f] placeholder:text-[#abacae] text-white' : 'border-muted text-foreground placeholder:text-muted-foreground'} border-b  w-full py-2 mb-4 bg-transparent  focus:outline-none`}
                    />              
                    <input
                        type="text"
                        placeholder="Group description (optional)"
                        className={`${darkMode ? 'border-[#3c3d3f] placeholder:text-[#abacae] text-white' : 'border-muted text-foreground placeholder:text-muted-foreground'} border-b  w-full py-2 mb-4 bg-transparent  focus:outline-none`}
                    />
                    <button onClick={() => {hideFinishCreateGroup(); clearCropedImage();}} className="bg-primary text-white absolute" style={{cursor: 'pointer', borderRadius:'50%', height:'54px', width:'54px', marginTop:'340px'}} >
                        <i className="bi bi-check2"></i>
                    </button>
                    </div>           
                </div>}
                {groupChats && <div>
                    {loading ? (
                            <div>
                            {[...Array(6)].map((_, index) => (
                              <div key={index} className="space-y-2">
                                <div className={`flex items-center p-2 rounded`}>
                                  <Skeleton className="h-12 w-12 rounded-full mr-2" />
                                  <div className="flex-1 space-y-1">
                                    <Skeleton className="h-4 w-[150px]" />
                                    <Skeleton className="h-4 w-[200px]" />
                                  </div>
                                  <Skeleton className="h-4 w-16" />
                                </div>
                              </div>
                            ))}
                          </div>
                        ) : (
                            groups
                                .sort((a, b) => new Date(b.lastUpdate) - new Date(a.lastUpdate))
                                .map((group) => {
                                    const now = new Date();
                                    const date = new Date(group.lastUpdate);
                                    let formattedTime;

                                    if (
                                        now.getFullYear() === date.getFullYear() &&
                                        now.getMonth() === date.getMonth() &&
                                        now.getDate() === date.getDate()
                                    ) {
                                        formattedTime = `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
                                    } else if (
                                        now.getFullYear() === date.getFullYear() &&
                                        now.getMonth() === date.getMonth() &&
                                        now.getDate() - date.getDate() === 1
                                    ) {
                                        formattedTime = 'Yesterday';
                                    } else {
                                        formattedTime = `${date.getFullYear()}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getDate().toString().padStart(2, '0')}`;
                                    }

                                    return (
                                        <GroupChatPreview
                                            key={group.friendId}
                                            friendId={group.friendId}
                                            friendName={group.friendName}
                                            friendAvatar={group.friendAvatar}
                                            lastMessage={group.lastMessage}
                                            lastMessageSender={group.lastMessageSender}
                                            lastActiveTime={formattedTime}
                                            showGroupMessages={showGroupMessages}
                                            darkMode={darkMode}
                                            chatId={group.chatId}
                                        />
                                    );
                            })
                        )}
                </div>}
                </div>
            </div>
    </div>
    </div>
  )
}
