import {useState} from 'react'
import GlobalAlert from './GlobalAlert';

export default function GroupMemberList2({darkMode}) {
  const [exitGroupPopup, setExitGroupPopup] = useState(false);

  function toggleExitGroupPopup(){
    setExitGroupPopup(!exitGroupPopup);
  }

  var groupName = "friends"

  return (
    <div className="mt-0">
        {exitGroupPopup && <GlobalAlert darkMode={darkMode} text={`Exit "${groupName}" group?`} textOP={''} button1={'Cancel'} button2={'Exit group'} btn1Function={toggleExitGroupPopup} btn2Function={toggleExitGroupPopup}/>}
        <div className="flex items-center mb-2">

        <div className="w-8 h-8 rounded-full bg-green-500 mr-2"></div>
        <div>
            <span className={`${darkMode ? 'text-white':''} font-semibold`}>You</span>
            <p className={`${darkMode ? 'text-gray-400':'text-muted-foreground'} text-sm `}>Hey there! I am using Vibez.</p>
        </div>
        <button onClick={toggleExitGroupPopup} className="ml-auto text-sm bg-red-400 text-white hover:bg-red-300 border-none">Exit group</button>
        </div>

        <div className="flex items-center mb-2">
        <div className="w-8 h-8 rounded-full bg-blue-500 mr-2"></div>
        <div>
            <span className={`${darkMode ? 'text-white':''} font-semibold`}>user01</span>
            <p className={`${darkMode ? 'text-gray-400':'text-muted-foreground'} text-sm `}>Available</p>
        </div>
        <p className={`${darkMode ? 'text-gray-400':'text-muted-foreground'} text-sm ml-auto`}>Owner</p>
        </div>
    </div>
  )
}
