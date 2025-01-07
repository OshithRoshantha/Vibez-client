import './Styles/Column2.css';
import './Styles/SignupElement.css';
import { useRef, useState } from 'react';
import AvatarEditor from 'react-avatar-editor';
import Slider from '@mui/material/Slider';

export default function GroupChats({ showGroupMessages, darkMode }) {
  const [addMembersMenu, setAddMembersMenu] = useState(false);
  const [finishCreateGroup, setFinishCreateGroup] = useState(false);
  const [groupChats, setGroupChats] = useState(true);
  const [isAdded, setIsAdded] = useState(false);
  const [editPictureForm, setEditPictureForm] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [cropFactor, setCropFactor] = useState(1);
  const [croppedImage, setCroppedImage] = useState(null);

  const fileInputRef = useRef(null);
  const avatarEditorRef = useRef(null);

  const defaultImage = './src/assets/groupDefault.jpg';

  const toggleState = (stateSetter, value) => stateSetter(value);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setSelectedImage(imageUrl);
      toggleState(setEditPictureForm, true);
    }
  };

  const handleCrop = () => {
    if (avatarEditorRef.current) {
      const canvas = avatarEditorRef.current.getImageScaledToCanvas();
      const croppedImageUrl = canvas.toDataURL();
      setCroppedImage(croppedImageUrl);
      toggleState(setEditPictureForm, false);
    }
  };

  return (
    <div>
      <div className={`${darkMode ? 'border-gray-600' : 'border-gray-200'} border-r p-4 chats-column`} style={{ backgroundColor: darkMode ? '#262729' : '', height: '100vh' }}>
        <h2 className={`${darkMode ? 'text-white' : 'text-black'} text-lg font-semibold column-header`}>Groups</h2>
        <input
          type="text"
          placeholder="Search groups"
          className={`${darkMode ? 'bg-[#3c3d3f] placeholder:text-[#abacae] text-white' : 'bg-gray-200'} w-full px-4 py-2 mb-4 placeholder:text-gray-500 text-gray-500 rounded-full`}
        />
        <div className="flex space-x-2 mb-4">
          <button
            onClick={() => toggleState(setGroupChats, true)}
            className={`${darkMode ? 'bg-[#223b51] text-[#59abff] hover:bg-[#184e88]' : 'bg-gray-300 text-gray-600 hover:bg-gray-200'} px-4 py-2 rounded-full`}
          >
            Your groups
          </button>
          <button
            onClick={() => toggleState(setAddMembersMenu, true)}
            className={`${darkMode ? 'bg-[#223b51] text-[#59abff] hover:bg-[#184e88]' : 'bg-gray-300 text-gray-600 hover:bg-gray-200'} px-4 py-2 rounded-full`}
          >
            <i className="bi bi-plus-lg"></i>
          </button>
        </div>

        <div className="chat-list">
          {addMembersMenu && (
            <div>
              <h2 className={`${darkMode ? 'text-white' : ''} text-lg font-semibold mb-2`}>Add group members</h2>
              {/* Add Member Component */}
              <div className="space-y-4">
                <div className="flex items-center justify-between border-border py-2">
                  <div className="flex items-center">
                    <img src="https://placehold.co/40x40" className="rounded-full mr-2 w-55 h-55" />
                    <div>
                      <p className={`${darkMode ? 'text-white' : ''} font-medium`}>Test User</p>
                      <p className={`${darkMode ? 'text-gray-400' : 'text-muted-foreground'} text-sm`}>About</p>
                    </div>
                  </div>
                  <button
                    onClick={() => toggleState(setIsAdded, !isAdded)}
                    className={`${isAdded ? 'bg-blue-300' : 'bg-primary'} text-white px-3 py-1 rounded`}
                  >
                    {isAdded ? 'Remove' : 'Add'}
                  </button>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <button onClick={() => toggleState(setFinishCreateGroup, true)} className="bg-primary text-white rounded-full p-4">
                  <i className="bi bi-arrow-right"></i>
                </button>
              </div>
            </div>
          )}

          {finishCreateGroup && (
            <div>
              <div className="flex flex-col items-center p-6">
                <div className="relative mb-4">
                  <div
                    className="profile-pic"
                    onClick={() => fileInputRef.current.click()}
                    style={{
                      backgroundImage: croppedImage ? `url(${croppedImage})` : `url(${defaultImage})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                    }}
                  >
                    <span className="camera-icon">
                      <i className="bi bi-camera-fill"></i>
                    </span>
                    ADD GROUP ICON
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    ref={fileInputRef}
                    style={{ display: 'none' }}
                    onChange={handleFileChange}
                  />
                </div>
                <input
                  type="text"
                  placeholder="Group subject"
                  className={`${darkMode ? 'border-[#3c3d3f] text-white' : 'border-gray-200'} w-full py-2 mb-4`}
                />
                <input
                  type="text"
                  placeholder="Group description (optional)"
                  className={`${darkMode ? 'border-[#3c3d3f] text-white' : 'border-gray-200'} w-full py-2 mb-4`}
                />
                <button onClick={() => toggleState(setFinishCreateGroup, false)} className="bg-primary text-white rounded-full p-4">
                  <i className="bi bi-check2"></i>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
