import {useState} from 'react'
import GlobalAlert from './GlobalAlert';

export default function GroupMemberList2() {
  const [exitGroupPopup, setExitGroupPopup] = useState(false);

  function toggleExitGroupPopup(){
    setExitGroupPopup(!exitGroupPopup);
  }

  var groupName = "friends"

  return (
    <div className="mt-0">
        {exitGroupPopup && <GlobalAlert text={`Exit "${groupName}" group?`} textOP={''} button1={'Cancel'} button2={'Exit group'} btn1Function={toggleExitGroupPopup} btn2Function={toggleExitGroupPopup}/>}
        <div className="flex items-center mb-2">

        <div className="w-8 h-8 rounded-full bg-green-500 mr-2"></div>
        <div>
            <span className="font-semibold">You</span>
            <p className="text-sm text-muted-foreground">Hey there! I am using Vibez.</p>
        </div>
        <button onClick={toggleExitGroupPopup} className="ml-auto text-sm bg-red-300 text-white hover:bg-red-200 border-none">Exit group</button>
        </div>

        <div className="flex items-center mb-2">
        <div className="w-8 h-8 rounded-full bg-blue-500 mr-2"></div>
        <div>
            <span className="font-semibold">user01</span>
            <p className="text-sm text-muted-foreground">Available</p>
        </div>
        <p className="ml-auto text-sm text-muted-foreground">Owner</p>
        </div>
    </div>
  )
}
