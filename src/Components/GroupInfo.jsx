import { useRef, useState} from 'react';
import GroupMemberList from './GroupMemberList';
import GroupMemberList2 from './GroupMemberList2';
import GroupAddMembers from './GroupAddMembers';
import AvatarEditor from 'react-avatar-editor'
import Slider from '@mui/material/Slider';

export default function GroupInfo() {
  var groupName = 'friends'
  var groupDescp = 'This is a group of friends'
  var memberCount = 5
  const [isAmAdmin, setIsAmAdmin] = useState(true);
  const [addMemberMenu, setAddMemberMenu] = useState(false);
  const [profilePicHover, setProfilePicHover] = useState(false);
  const [editPictureForm, setEditPictureForm] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [cropFactor, setCropFactor] = useState(1);
  const [cropedImage, setCropedImage] = useState(null);
  const fileInputRef = useRef(null);
  const avatarEditorRef = useRef(null);

  const defaultImage = "./src/assets/groupDefault.jpg"; //user current group picture

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
      }
  }

  return (
<div>
      {addMemberMenu && <GroupAddMembers showAddMemberMenu={showAddMemberMenu}/>}
      <div className="border-r border-border p-4 info-column" style={{backgroundColor:'#f2f3f7'}}>
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
      <h2 className="text-lg font-semibold mb-4">Group info</h2>
        <div className="bg-card p-6 w-full" style={{backgroundColor:'#f2f3f7'}} >
          <div className="flex flex-col items-center mb-5" style={{marginTop:'-5%'}}>
            {isAmAdmin && 
              <div onClick={uploadImg} onMouseEnter={showProfilePicHover} onMouseLeave={hideProfilePicHover} className=" rounded-full flex items-center justify-center mb-1 text-xs" style={{border: '1px solid rgb(104, 104, 104)', width:'150px', height:'150px', cursor:'pointer', marginTop:'-5%',backgroundImage: cropedImage ? `url(${cropedImage})` : `url(${defaultImage})`, backgroundSize: 'cover', backgroundPosition: 'center'}}>
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
              <img src={defaultImage} className=" rounded-full flex items-center justify-center mb-1" style={{width:'150px', height:'150px', marginTop:'-5%', border: '1px solid rgb(104, 104, 104)'}}/>  
            } 
            <h2 className="text-xl font-semibold text-foreground mt-4">{groupName}</h2>
            <div style={{display:'flex', justifyContent:'center', alignItems:'center', columnGap:'3px'}}>
              <p className="text-muted-foreground text-sm">Group</p>
              <i className="bi bi-dot"></i>
              <p className="text-muted-foreground">{memberCount} members</p>
            </div>
            <p className="text-muted-foreground">{groupDescp}</p>
          </div>
          <h2 className="text-lg font-semibold mb-4" style={{marginTop:'-5%'}}>{memberCount} members</h2>
          {isAmAdmin && <div>
            <div className="flex items-center mb-1">
              <button onClick={showAddMemberMenu} className="bg-gray-300 text-gray-600 hover:bg-gray-200 mr-2" style={{borderRadius:'50%', width:'38px', height:'38px', display:'flex', justifyContent:'center', alignItems:'center', border:'none'}}>
                <i className="bi bi-person-fill-add"></i>
              </button>
              <span className="text-base">Add member</span>
            </div>
            <div className="border-b border-border my-4"></div>
            </div>}
          <div className={`w-full  ${isAmAdmin ? 'h-[25vh]' : 'h-[38vh]'}`} style={{overflowY:'auto', scrollbarWidth:'none'}}>
            {isAmAdmin ? <GroupMemberList/> : <GroupMemberList2/>}
          </div>
        </div>
      </div>
    </div>
  )
}
