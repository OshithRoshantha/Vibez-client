import { useState } from 'react';
import './Styles/Column2.css'

export default function Profile() {
    const [isEditingName, setIsEditingName] = useState(false);
    const [isEditingAbout, setIsEditingAbout] = useState(false);
    const [profilePicHover, setProfilePicHover] = useState(false);
    const [name, setName] = useState("OshithRoshantha");
    const [about, setAbout] = useState("Can't talk, Vibez only.");
  
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
      
  return (
    <div>
        <div className="border-r border-border p-4 chats-column">
                <h2 className="text-lg font-semibold column-header">Profile</h2>
                <div className="flex flex-col items-center p-6 bg-background text-foreground" style={{marginTop:'12%', paddingBottom:'31%'}}>
                <div onMouseEnter={showProfilePicHover} onMouseLeave={hideProfilePicHover} style={{cursor:'pointer'}} className="profile-pic w-40 h-40 rounded-full border-4 border-primary text-center">
                    {profilePicHover && <div>
                        <span className='camera-icon'><i className="bi bi-camera-fill"></i></span>CHANGE PROFILE PICTURE    
                    </div>}
                </div>
                <div className="mt-4">
                <div className="mt-4">
                    <label className="text-muted-foreground">Your name</label>
                    <div style={{display:'flex', alignItems:'center',columnGap:'50%'}}>
                    {isEditingName ? (
                    <input
                        className="w-full text-xl font-semibold py-0 mb-0 bg-transparent text-foreground placeholder:text-muted-foreground focus:outline-none"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        onBlur={handleNameBlur}
                        autoFocus
                    />
                    ) : (
                    <h2
                        className="text-xl font-semibold"
                        
                    >
                        {name}
                    </h2>
                    )}
                    <i onClick={handleNameClick} className="absolute bi bi-pencil-fill" style={{marginLeft:'24%', cursor:'pointer'}}></i>
                    </div>
                    <span className="text-muted-foreground text-sm mt-2"> This is not your username or PIN. This name will be visible to your Vibez contacts. </span>
                </div>
                <div className="mt-6">
                    <span className="text-muted-foreground">About</span>
                    <div style={{display:'flex', alignItems:'center',columnGap:'50%'}}>
                    {isEditingAbout ? (
                    <input
                        className="mt-2 w-full py-0 mb-0 bg-transparent text-foreground placeholder:text-muted-foreground focus:outline-none"
                        value={about}
                        onChange={(e) => setAbout(e.target.value)}
                        onBlur={handleAboutBlur}
                        autoFocus
                    />
                    ) : (
                    <p
                        className="mt-0"
                        
                    >
                        {about}
                    </p>
                    )}
                    <i onClick={handleAboutClick} className="absolute bi bi-pencil-fill" style={{marginLeft:'24%', cursor:'pointer'}}></i>
                    </div>
                </div>
                </div>
                </div>
            </div>
    </div>
  )
}
