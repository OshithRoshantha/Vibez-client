import {useState} from 'react'
import GlobalAlert from './GlobalAlert';


export default function GroupMemberList() {
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
        {deleteGroupPopup && <GlobalAlert text={`Delete "${groupName}" group?`} textOP={'Deleting this group will remove it permanently for all members. '} button1={'Cancel'} button2={'Delete group'} btn1Function={toggleDeleteGroupPopup} btn2Function={toggleDeleteGroupPopup}/>}
        {removeMemberPopup && <GlobalAlert text={`Remove ${memberName} from "${groupName}" group?`} textOP={'This action cannot be undone. '} button1={'Cancel'} button2={'Remove'} btn1Function={toggleRemoveMemberPopup} btn2Function={toggleRemoveMemberPopup}/>}
        <div className="flex items-center mb-2">

        <div className="w-8 h-8 rounded-full bg-green-500 mr-2"></div>
        <div>
            <span className="font-semibold">You</span>
            <p className="text-sm text-muted-foreground">Hey there! I am using Vibez.</p>
        </div>
        <button onClick={toggleDeleteGroupPopup} className="ml-auto text-sm bg-red-300 text-white hover:bg-red-200 border-none">Delete group</button>
        </div>

        <div className="flex items-center mb-2">
        <div className="w-8 h-8 rounded-full bg-blue-500 mr-2"></div>
        <div>
            <span className="font-semibold">user01</span>
            <p className="text-sm text-muted-foreground">Available</p>
        </div>
        <button onClick={toggleRemoveMemberPopup} className="ml-auto text-sm bg-gray-300 text-gray-600 hover:bg-gray-200 border-none">Remove</button>
        </div>
    </div>
  )
}
