import { useRef, useState} from 'react';
import './Styles/Column2.css'
import AvatarEditor from 'react-avatar-editor'
import Slider from '@mui/material/Slider';

export default function Profile() {
    const [isEditingName, setIsEditingName] = useState(false);
    const [isEditingAbout, setIsEditingAbout] = useState(false);
    const [profilePicHover, setProfilePicHover] = useState(false);
    const [editPictureForm, setEditPictureForm] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const [cropFactor, setCropFactor] = useState(1);
    const [cropedImage, setCropedImage] = useState(null);
    const fileInputRef = useRef(null);
    const avatarEditorRef = useRef(null);  
    const [name, setName] = useState("TestUser");
    const [about, setAbout] = useState("Can't talk, Vibez only.");

    const defaultImage = "./src/assets/groupDefault.jpg"; //user current profile picture
  
    function handleNameClick() {
        setIsEditingName(true);
    }
      
    function handleAboutClick() {
        setIsEditingAbout(true);
    }
      
    function handleNameBlur() {
        setIsEditingName(false);
    }
      
    function handleAboutBlur() {
        setIsEditingAbout(false);
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
        <div className="border-r border-border p-4 chats-column">
                {editPictureForm && <div className='edit-picture-form2' style={{marginTop:'8%'}}>
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
                <h2 className="text-lg font-semibold column-header">Profile</h2>
                <div className="flex flex-col items-center p-6 bg-background text-foreground" style={{marginTop:'17%', paddingBottom:'31%'}}>
                <div onClick={uploadImg} onMouseEnter={showProfilePicHover} onMouseLeave={hideProfilePicHover} style={{cursor:'pointer', backgroundImage: cropedImage ? `url(${cropedImage})` : `url(${defaultImage})`, backgroundSize: 'cover', backgroundPosition: 'center'}} className="profile-pic w-40 h-40 rounded-full border-4 border-primary text-center">
                    {profilePicHover && <div>
                        <span className='camera-icon'><i className="bi bi-camera-fill"></i></span>CHANGE PROFILE PICTURE    
                    </div>}
                </div>
                <input
                    type='file'
                    accept='image/*'
                    ref={fileInputRef}
                    style={{ display: 'none' }}
                    onChange={handleFileChange}
                />
                <div className="mt-4">
                <div className="mt-4">
                    <label className="text-muted-foreground">Your name</label>
                    <div style={{display:'flex', alignItems:'center',columnGap:'50%'}}>
                    {isEditingName ? (
                    <input
                        className="w-full text-xl font-semibold py-0 mb-0 bg-transparent text-foreground placeholder:text-muted-foreground focus:outline-none"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        autoFocus
                    />
                    ) : (
                    <h2
                        className="text-xl font-semibold"
                        
                    >
                    {name}
                    </h2>
                    )}
                    {!isEditingName && <i onClick={handleNameClick} className="absolute bi bi-pencil-fill" style={{marginLeft:'24%', cursor:'pointer'}}></i>} 
                    {isEditingName && <i onClick={handleNameBlur} className="absolute bi bi-check2" style={{marginLeft:'24%', cursor:'pointer', fontSize:'125%'}}></i>}  
                    </div>
                    <span className="text-muted-foreground text-sm mt-2"> This is not your username or PIN. This name will be visible to your Vibez contacts. </span>
                </div>
                <div className="mt-6">
                    <span className="text-muted-foreground">About</span>
                    <div style={{display:'flex', alignItems:'center',columnGap:'50%'}}>
                    {isEditingAbout ? (
                    <input
                        className="w-full py-0 mb-0 bg-transparent text-foreground placeholder:text-muted-foreground focus:outline-none"
                        value={about}
                        onChange={(e) => setAbout(e.target.value)}
                        autoFocus
                    />
                    ) : (
                    <p
                        className="mt-0"
                        
                    >
                    {about}
                    </p>
                    )}
                    {!isEditingAbout && <i onClick={handleAboutClick} className="absolute bi bi-pencil-fill" style={{marginLeft:'24%', cursor:'pointer'}}></i>}
                    {isEditingAbout && <i onClick={handleAboutBlur} className="absolute bi bi-check2" style={{marginLeft:'24%', cursor:'pointer', fontSize:'125%'}}></i>}
                    </div>
                </div>
                </div>
                </div>
            </div>
    </div>
  )
}
