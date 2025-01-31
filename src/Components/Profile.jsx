import { useRef, useState, useEffect} from 'react';
import './Styles/Column2.css'
import AvatarEditor from 'react-avatar-editor'
import Slider from '@mui/material/Slider';
import { fetchUserMetaData, updateUserMetaData } from '../Services/ProfileService';
import { uploadFile } from '../Services/s3Service';
import { useIsMobile } from '../hooks/useIsMobile';

export default function Profile({darkMode, setUserPicture}) {
    
    const isMobile = useIsMobile();
    const [isEditingName, setIsEditingName] = useState(false);
    const [isEditingAbout, setIsEditingAbout] = useState(false);
    const [profilePicHover, setProfilePicHover] = useState(false);
    const [editPictureForm, setEditPictureForm] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const [cropFactor, setCropFactor] = useState(1);
    const [cropedImage, setCropedImage] = useState(null);
    const fileInputRef = useRef(null);
    const avatarEditorRef = useRef(null);  
    const [name, setName] = useState('');
    const [about, setAbout] = useState('');
    const [email, setEmail] = useState('');
    const [profilePicture, setProfilePicture] = useState('');

    useEffect(() => {
        const fetchUser = async () => {
            const response = await fetchUserMetaData();
            setName(response.userName);
            setAbout(response.about);
            setEmail(response.email);
            setProfilePicture(response.profilePicture);
        };
        fetchUser();
    }, []);    

    const handleImageUpload = async () => {
        const blob = await fetch(selectedImage).then(res => res.blob());
        const file = new File([blob], `user_${email}.png`, { type: "image/png" });
        return await uploadFile(file);
    }
        
    const updateUser = async () => {
        const uploadedImageUrl = await handleImageUpload();
        await updateUserMetaData(name, about, uploadedImageUrl);
    }

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
          setUserPicture(croppedImageUrl);
          editPictureFormHandler();
        }
    }
      
  return (
    <div>
        <div className={`${darkMode ? 'border-gray-600 border-r border-border':'border-r border-border'}  p-4 chats-column`} style={{backgroundColor: darkMode ? '#262729' : '', height: isMobile ? '90vh' : '100vh', width: isMobile ? '100vw' : ''}}>
                {editPictureForm && <div className='edit-picture-form2 shadow-lg bg-white' style={{width: isMobile ? '85%' : '', marginTop: isMobile ? '25%':'8%'}}>
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
                                    <button onClick={() => { handleCrop(); updateUser();}} className='border-none' style={{width:'20%',borderRadius: '20px',backgroundColor: '#0d6efd',color: 'white'}}>Crop</button>
                                </div>
                </div>}
                <h2 className={`${darkMode ? 'text-white' :'text-black'} text-lg font-semibold column-header`}>Profile</h2>
                <div className="flex flex-col items-center p-6 bg-background text-foreground" style={{marginTop:'17%', paddingBottom:'31%', backgroundColor: darkMode ? '#262729' : ''}}>
                <div onClick={uploadImg} onMouseEnter={showProfilePicHover} onMouseLeave={hideProfilePicHover} style={{cursor:'pointer', backgroundImage: cropedImage ? `url(${cropedImage})` : `url(${profilePicture})`, backgroundSize: 'cover', backgroundPosition: 'center', border: '1px solid rgb(104, 104, 104)',}} className="profile-pic w-40 h-40 rounded-full  text-center">
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
                    <label className={`${darkMode ? 'text-gray-200':'text-muted-foreground'}`}>Your name</label>
                    <div style={{display:'flex', alignItems:'center',columnGap:'50%'}}>
                    {isEditingName ? (
                    <input
                        className={`${darkMode ? 'text-white':'text-foreground placeholder:text-muted-foreground'} w-full text-xl font-semibold py-0 mb-0 bg-transparent focus:outline-none`}
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        autoFocus
                    />
                    ) : (
                    <h2
                        className={`${darkMode ? 'text-gray-100':''} text-xl font-semibold`}
                        
                    >
                    {name}
                    </h2>
                    )}
                    {!isEditingName && <i onClick={handleNameClick} className={`${darkMode ? 'text-white':''} absolute bi bi-pencil-fill`} style={{marginLeft: isMobile ? '70%' : '24%', cursor:'pointer'}}></i>} 
                    {isEditingName && <i onClick={() => { handleNameBlur(); updateUser();}} className={`${darkMode ? 'text-white':''} absolute bi bi-check2`} style={{marginLeft: isMobile ? '70%' : '24%', cursor:'pointer', fontSize:'125%'}}></i>}  
                    </div>
                    <span className={`${darkMode ? 'text-gray-400':'text-muted-foreground'} text-sm mt-2`} > This is not your username or PIN. This name will be visible to your Vibez contacts. </span>
                </div>
                <div className="mt-6">
                    <span className={`${darkMode ? 'text-gray-200':'text-muted-foreground'}`}>About</span>
                    <div style={{display:'flex', alignItems:'center',columnGap:'50%'}}>
                    {isEditingAbout ? (
                    <input
                        className={`${darkMode ? 'text-white':'text-foreground placeholder:text-muted-foreground'} w-full py-0 mb-0 bg-transparent focus:outline-none`}
                        value={about}
                        onChange={(e) => setAbout(e.target.value)}
                        autoFocus
                    />
                    ) : (
                    <p
                    className={`${darkMode ? 'text-gray-100':''} mt-0`}
                        
                    >
                    {about}
                    </p>
                    )}
                    {!isEditingAbout && <i onClick={handleAboutClick} className={`${darkMode ? 'text-white':''} absolute bi bi-pencil-fill`} style={{marginLeft: isMobile ? '70%' : '24%', cursor:'pointer'}}></i>}
                    {isEditingAbout && <i onClick={() => { handleAboutBlur(); updateUser();}} className={`${darkMode ? 'text-white':''} absolute bi bi-check2`} style={{marginLeft: isMobile ? '70%' : '24%', cursor:'pointer', fontSize:'125%'}}></i>}
                    </div>
                </div>
                </div>
                </div>
            </div>
    </div>
  )
}
