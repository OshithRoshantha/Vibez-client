import React from 'react'

export default function SearchResult({darkMode, profileName, profileAbout, profileImage, profileId}) {
  return (
    <div className="flex items-center justify-between border-border ">
    <div className="flex items-center">
        <img className="w-12 h-12 rounded-full mr-4" src={profileImage} alt="User Profile Picture" />
        <div>
            <h2 className={`${darkMode ? 'text-white':''}`}>{profileName}</h2>
            <p className={`${darkMode ? 'text-gray-400':'text-muted-foreground'}`}>{profileAbout}</p>
        </div>
    </div>
    <div className='btn-container'>
        <button className="border-none hover:border-none bg-primary text-white p-2 px-3 rounded">Add friend</button>
    </div>
    </div>
  )
}
