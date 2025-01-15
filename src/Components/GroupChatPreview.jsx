import React from 'react'

export default function GroupChatPreview({darkMode, showGroupMessages}) {
  return (
    <div onClick={showGroupMessages} className="space-y-2" style={{cursor: 'pointer'}}>
    <div className={`${darkMode ? 'hover:bg-[#2d3243]' : 'hover:bg-muted'} flex items-center p-2 rounded`}>
        <img src="https://placehold.co/40x40" alt="User" className="rounded-full mr-2 w-18 h-18" />
        <div>
            <div className={`${darkMode ? 'text-white':''} font-medium`}>GroupName</div>
            <div className={`${darkMode ? 'text-gray-400':'text-muted-foreground'} text-sm `}>User1: Lorem ipsum dolor sit amet.</div>
        </div>
        <span className={`${darkMode ? 'text-gray-400':''} ml-auto text-xs`}>13:14</span>
    </div>
</div>
  )
}
