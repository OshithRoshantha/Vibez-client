import React from 'react'

export default function GroupChatPreview({darkMode, groupId, showGroupMessages, groupName, groupAvatar, lastMessageSender, lastActiveTime, lastMessage, setGroupId}) {
  
  const handleClick = () => {
    setGroupId(groupId);
    showGroupMessages();
  }
  
  return (
    <div onClick={handleClick} className="space-y-2" style={{cursor: 'pointer'}}>
    <div className={`${darkMode ? 'hover:bg-[#2d3243]' : 'hover:bg-muted'} flex items-center p-2 rounded`}>
        <img src={groupAvatar} alt="User" className="rounded-full mr-2 w-18 h-18" style={{height:'45px'}} />
        <div>
            <div className={`${darkMode ? 'text-white':''} font-medium`}>{groupName}</div>
            <div className={`${darkMode ? 'text-gray-400':'text-muted-foreground'} text-sm `}>{lastMessageSender}: {lastMessage}</div>
        </div>
        <span className={`${darkMode ? 'text-gray-400':''} ml-auto text-xs`}>{lastActiveTime}</span>
    </div>
</div>
  )
}
