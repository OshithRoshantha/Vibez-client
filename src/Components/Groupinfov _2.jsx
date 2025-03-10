import { useRef, useState } from 'react';
import GroupMemberList from './GroupMemberList';
import GroupMemberList2 from './GroupMemberList2';
import GroupAddMembers from './GroupAddMembers';
import AvatarEditor from 'react-avatar-editor';
import Slider from '@mui/material/Slider';

export default function GroupInfo({ darkMode }) {
  // State Management
  const [isAmAdmin, setIsAmAdmin] = useState(true);
  const [addMemberMenu, setAddMemberMenu] = useState(false);
  const [profilePicHover, setProfilePicHover] = useState(false);
  const [editPictureForm, setEditPictureForm] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [cropFactor, setCropFactor] = useState(1);
  const [croppedImage, setCroppedImage] = useState(null);
  const [isEditingName, setIsEditingName] = useState(false);
  const [isEditingDescp, setIsEditingDescp] = useState(false);
  const [name, setName] = useState('friends');
  const [descp, setDescp] = useState('This is a group of friends');

  // References
  const fileInputRef = useRef(null);
  const avatarEditorRef = useRef(null);

  const defaultImage = './src/assets/groupDefault.jpg'; // Current group picture
  const memberCount = 5;

  // Handlers
  const toggleAddMemberMenu = () => setAddMemberMenu(!addMemberMenu);
  const toggleProfilePicHover = (state) => setProfilePicHover(state);
  const toggleEditPictureForm = () => setEditPictureForm(!editPictureForm);
  const handleSliderChange = (_, newValue) => setCropFactor(newValue);

  const handleNameClick = () => setIsEditingName(true);
  const handleNameBlur = () => setIsEditingName(false);

  const handleDescpClick = () => setIsEditingDescp(true);
  const handleDescpBlur = () => setIsEditingDescp(false);

  const uploadImg = () => fileInputRef.current.click();
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setSelectedImage(imageUrl);
      toggleEditPictureForm();
    }
  };

  const handleCrop = () => {
    if (avatarEditorRef.current) {
      const canvas = avatarEditorRef.current.getImageScaledToCanvas();
      const croppedImageUrl = canvas.toDataURL();
      setCroppedImage(croppedImageUrl);
      toggleEditPictureForm();
    }
  };

  return (
    <div>
      {/* Add Member Menu */}
      {addMemberMenu && <GroupAddMembers darkMode={darkMode} toggleAddMemberMenu={toggleAddMemberMenu} />}

      <div
        className={`p-4 info-column ${darkMode ? 'border-gray-600 border-r' : 'border-r'} `}
        style={{ backgroundColor: darkMode ? '#1c1c1c' : '#f2f3f7' }}
      >
        {/* Edit Picture Form */}
        {editPictureForm && (
          <div className="edit-picture-form2 shadow-lg bg-white" style={{ marginTop: '8%' }}>
            <AvatarEditor
              ref={avatarEditorRef}
              image={selectedImage}
              width={180}
              height={180}
              border={0}
              borderRadius={150}
              scale={cropFactor}
            />
            <Slider
              min={1}
              max={10}
              step={1}
              style={{ width: '70%' }}
              onChange={handleSliderChange}
              value={cropFactor}
            />
            <div className="edit-picture-buttons">
              <button
                onClick={toggleEditPictureForm}
                className="bg-gray-300 text-gray-600 hover:bg-gray-200"
                style={{ width: '20%', borderRadius: '20px' }}
              >
                Back
              </button>
              <button
                onClick={handleCrop}
                className="border-none"
                style={{
                  width: '20%',
                  borderRadius: '20px',
                  backgroundColor: '#0d6efd',
                  color: 'white',
                }}
              >
                Crop
              </button>
            </div>
          </div>
        )}

        {/* Group Info */}
        <h2 className={`${darkMode ? 'text-white' : ''} text-lg font-semibold mb-4`}>Group Info</h2>
        <div
          className="bg-card p-6 w-full"
          style={{ backgroundColor: darkMode ? '#1c1c1c' : '#f2f3f7' }}
        >
          {/* Group Image */}
          <div className="flex flex-col items-center mb-5" style={{ marginTop: '-5%' }}>
            {isAmAdmin && (
              <div
                onClick={uploadImg}
                onMouseEnter={() => toggleProfilePicHover(true)}
                onMouseLeave={() => toggleProfilePicHover(false)}
                className="rounded-full flex items-center justify-center mb-1 text-xs"
                style={{
                  border: '1px solid rgb(104, 104, 104)',
                  width: '150px',
                  height: '150px',
                  cursor: 'pointer',
                  marginTop: '-5%',
                  backgroundImage: `url(${croppedImage || defaultImage})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              >
                {profilePicHover && (
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <span className="camera-icon">
                      <i className="bi bi-camera-fill"></i>
                    </span>
                    CHANGE GROUP ICON
                  </div>
                )}
              </div>
            )}
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              style={{ display: 'none' }}
              onChange={handleFileChange}
            />
            {/* Name and Description */}
            {isEditingName ? (
              <input
                className={`${
                  darkMode ? 'text-white' : 'text-foreground'
                } text-xl text-center font-semibold mt-4 bg-transparent focus:outline-none`}
                value={name}
                onChange={(e) => setName(e.target.value)}
                autoFocus
              />
            ) : (
              <h2 className={`${darkMode ? 'text-white' : 'text-foreground'} text-xl font-semibold mt-4`}>
                {name}
              </h2>
            )}
            {!isEditingName && (
              <i
                onClick={handleNameClick}
                className={`${darkMode ? 'text-white' : ''} bi bi-pencil-fill`}
                style={{ cursor: 'pointer', marginTop: '10.3%', marginLeft: '25%' }}
              ></i>
            )}
          </div>

          {/* Member List */}
          <h2 className={`${darkMode ? 'text-white' : ''} text-lg font-semibold mb-4`} style={{ marginTop: '-5%' }}>
            {memberCount} members
          </h2>
          <div
            className={`w-full ${isAmAdmin ? 'h-[25vh]' : 'h-[38vh]'}`}
            style={{ overflowY: 'auto', scrollbarWidth: 'none' }}
          >
            {isAmAdmin ? <GroupMemberList darkMode={darkMode} /> : <GroupMemberList2 darkMode={darkMode} />}
          </div>
        </div>
      </div>
    </div>
  );
}
