import './Styles/Column2.css'
import { useRef, useState} from 'react';
import './Styles/SignupElement.css'
import AvatarEditor from 'react-avatar-editor'
import Slider from '@mui/material/Slider';

export default function GroupChats() {
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

    const defaultImage = "./src/assets/groupDefault.jpg";

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
        <div className="border-r border-border p-4 chats-column">
                <h2 className="text-lg font-semibold column-header">Groups</h2>
                <input type="text" placeholder="Search" className="w-full p-2 border border-border rounded mb-4" />
                <div className="flex space-x-2 mb-4">
                    <button onClick={showGroupChats} className="bg-muted text-muted-foreground px-4 py-2 rounded-full border-none hover:bg-gray-300">Your groups</button>
                    <button onClick={showAddMembersMenu} className="bg-muted text-muted-foreground px-4 py-2 rounded-full border-none hover:bg-gray-300"><i className="bi bi-plus-lg"></i></button>
                </div>
                <div className='chat-list'>
                {addMembersMenu && <div>
                    <h2 className="text-lg font-semibold mb-2">Add group members</h2>
                    <div className='group-op'>
                    <div className="space-y-4">
                        <div className="flex items-center justify-between border-border py-2">
                        <div className="flex items-center">
                            <img src="https://placehold.co/40x40" className="rounded-full mr-2 w-55 h-55" />
                            <div>
                                <p className="font-medium">{user}</p>
                                <p className="text-muted-foreground text-sm">About</p>
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
                                className="px-3 py-1 rounded bg-muted text-muted-foreground border-none hover:bg-gray-300"
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
                {finishCreateGroup && <div>
                    {editPictureForm && <div className='edit-picture-form2'>
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
                                <button onClick={editPictureFormHandler} style={{width:'20%',borderRadius: '20px'}}>Back</button>
                                <button onClick={handleCrop} style={{width:'20%',borderRadius: '20px',backgroundColor: '#0d6efd',color: 'white'}}>Crop</button>
                            </div>
                        </div>}
                    <div className="flex flex-col items-center bg-card p-6">
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
                        className="border-b border-muted w-full text-lg py-2 mb-4 bg-transparent text-foreground placeholder:text-muted-foreground focus:outline-none"
                    />              
                    <input
                        type="text"
                        placeholder="Group description (optional)"
                        className="border-b border-muted w-full text-lg py-2 mb-4 bg-transparent text-foreground placeholder:text-muted-foreground focus:outline-none"
                    />
                    <button onClick={() => {hideFinishCreateGroup(); clearCropedImage();}} className="bg-primary text-white absolute" style={{cursor: 'pointer', borderRadius:'50%', height:'54px', width:'54px', marginTop:'340px'}} >
                        <i className="bi bi-check2"></i>
                    </button>
                    </div>           
                </div>}
                {groupChats && <div>
                <div className="space-y-2" style={{cursor: 'pointer'}}>
                    <div className="flex items-center p-2 hover:bg-muted rounded">
                        <img src="https://placehold.co/40x40" alt="User" className="rounded-full mr-2 w-18 h-18" />
                        <div>
                            <div className="font-medium">GroupName</div>
                            <div className="text-sm text-muted-foreground">User1: Lorem ipsum dolor sit amet.</div>
                        </div>
                        <span className="ml-auto text-xs">13:14</span>
                    </div>
                </div>
                </div>}
                </div>
            </div>
    </div>
    </div>
  )
}
