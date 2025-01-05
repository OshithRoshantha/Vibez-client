import React from 'react'

export default function PopupNotifiter({darkMode, profileImage, profileName, notifiacton}) {
  return (
    <div className="absolute bottom-8 right-7 fixed flex items-center justify-center " style={{zIndex: '100'}}>
        <div className={`${darkMode ? 'bg-[#262729]' : 'bg-white'} p-3 px-4 rounded-lg shadow-lg text-left`}>
            <div className="flex items-center">
                <img className="w-12 h-12 rounded-full mr-4" src={profileImage} alt="User Profile Picture"/>
                <div>
                    <h2 className={`${darkMode ? 'text-white':'text-black'} text-sm font-semibold mb-0`}>{profileName}</h2>
                    <p className={`${darkMode ? 'text-gray-300' : 'text-muted-foreground'} text-sm`}>{notifiacton}</p>
                </div>
            </div>

        </div>
    </div>
  )
}
