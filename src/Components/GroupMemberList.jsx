import {useState} from 'react'
import GlobalAlert from './GlobalAlert';


export default function GroupMemberList({darkMode}) {
  const [deleteGroupPopup, setDeleteGroupPopup] = useState(false);
  const [removeMemberPopup, setRemoveMemberPopup] = useState(false);

  function toggleDeleteGroupPopup(){
    setDeleteGroupPopup(!deleteGroupPopup);
  }

  function toggleRemoveMemberPopup(){
    setRemoveMemberPopup(!removeMemberPopup);
  }

  var groupName = "friends"
  var memberName = "user01"

  return (
    <div className="mt-0">
        {deleteGroupPopup && <GlobalAlert darkMode={darkMode} text={`Delete "${groupName}" group?`} textOP={'Deleting this group will remove it permanently for all members. '} button1={'Cancel'} button2={'Delete group'} btn1Function={toggleDeleteGroupPopup} btn2Function={toggleDeleteGroupPopup}/>}
        {removeMemberPopup && <GlobalAlert darkMode={darkMode} text={`Remove ${memberName} from "${groupName}" group?`} textOP={'This action cannot be undone. '} button1={'Cancel'} button2={'Remove'} btn1Function={toggleRemoveMemberPopup} btn2Function={toggleRemoveMemberPopup}/>}
        <div className="flex items-center mb-2">

        <div className="w-8 h-8 rounded-full bg-green-500 mr-2"></div>
        <div>
            <span className={`${darkMode ? 'text-white':''} font-semibold`}>You</span>
            <p className={`${darkMode ? 'text-gray-400':'text-muted-foreground'} text-sm `}>Hey there! I am using Vibez.</p>
        </div>
        <button onClick={toggleDeleteGroupPopup} className="ml-auto text-sm bg-red-400 text-white hover:bg-red-300 border-none">Delete group</button>
        </div>

        <div className="flex items-center mb-2">
        <div className="w-8 h-8 rounded-full bg-blue-500 mr-2"></div>
        <div>
            <span className={`${darkMode ? 'text-white':''} font-semibold`}>user01</span>
            <p className={`${darkMode ? 'text-gray-400':'text-muted-foreground'} text-sm `}>Available</p>
        </div>
        <button onClick={toggleRemoveMemberPopup} className={`${darkMode ? 'bg-[#6a6b6d] text-white hover:bg-[#545454]':'bg-gray-300 text-gray-600 hover:bg-gray-200'} border-none ml-auto text-sm`}>Remove</button>
        </div>
    </div>
  )
}
