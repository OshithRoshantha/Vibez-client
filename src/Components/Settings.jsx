import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@radix-ui/react-accordion';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
  
import './Styles/Column2.css'
import { useState} from 'react';
import GlobalAlert from './GlobalAlert';

export default function Settings({darkModeOn, darkModeOff, darkMode}) {
    const [logoutMenu, setLogoutMenu] = useState(false);
    const [confirmAccountDeletion, setConfirmAccountDeletion] = useState(false);
    const [deleteAllChatsPopup, setDeleteAllChatsPopup] = useState(false);
    const [deleteAllGroupChatsPopup, setDeleteAllGroupChatsPopup] = useState(false);
    const [selectProfilePrivacy, setSelectProfilePrivacy] = useState('My friends');
    const [selectAboutPrivacy, setSelectAboutPrivacy] = useState('My friends');

    const icon1 = darkMode ? './src/assets/Icons/icon1dark.png' : './src/assets/Icons/icon1.png';
    const icon2 = darkMode ? './src/assets/Icons/icon2dark.png' : './src/assets/Icons/icon2.png';
    const icon3 = darkMode ? './src/assets/Icons/icon3dark.png' : './src/assets/Icons/icon3.png';
    const icon4 = darkMode ? './src/assets/Icons/icon4dark.png' : './src/assets/Icons/icon4.png';

    function handleProfilePrivacy(value) {
        setSelectProfilePrivacy(value);
    }

    function handleAboutPrivacy(value) {
        setSelectAboutPrivacy(value);
    }

    function showLogoutMenu() {
        setLogoutMenu(true);
    }

    function hideLogoutMenu() {
        setLogoutMenu(false);
    }

    function showConfirmAccountDeletion() {
        setConfirmAccountDeletion(true);
    }

    function hideConfirmAccountDeletion() {
        setConfirmAccountDeletion(false);
    }

    function toggleDeleteAllChatsPopup() {
        setDeleteAllChatsPopup(!deleteAllChatsPopup);
    }

    function toggleDeleteAllGroupChatsPopup() {
        setDeleteAllGroupChatsPopup(!deleteAllGroupChatsPopup);
    }

  return (
    <div>
        {deleteAllChatsPopup && <GlobalAlert text={`Delete All Chats?`} textOP={'This action will permanently delete all your chats.'} button1={'Cancel'} button2={'Delete all'} btn1Function={toggleDeleteAllChatsPopup} btn2Function={toggleDeleteAllChatsPopup}/>}
        {deleteAllGroupChatsPopup && <GlobalAlert text={`Delete All Group Chats?`} textOP={'This action will permanently delete all your group chats.'} button1={'Cancel'} button2={'Delete all'} btn1Function={toggleDeleteAllGroupChatsPopup} btn2Function={toggleDeleteAllGroupChatsPopup}/>}
        {logoutMenu && <div>
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50" style={{zIndex: '100'}}>
            <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm w-full">	
                <h2 className="text-lg font-semibold">Confirm Logout</h2>
                <p className="text-muted-foreground mt-0">Are you sure you want to log out?</p>
                <div className="flex justify-between mt-4">
                <button style={{cursor:'pointer'}} onClick={hideLogoutMenu} className="bg-muted border-none text-muted-foreground hover:bg-gray-300 px-4 py-2 rounded">
                    Stay logged in
                </button>
                <button style={{cursor:'pointer'}}  onClick={hideLogoutMenu} className="bg-primary text-primary-foreground hover:bg-primary/80 px-4 py-2 rounded">
                    Log out
                </button>
                </div>
            </div>
            </div>    
        </div>}
        {confirmAccountDeletion && <div>
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50" style={{zIndex: '100'}}>
            <div className="bg-card text-card-foreground rounded-lg shadow-lg p-6 w-96">
                <div className="flex justify-between items-center">
                    <h2 className="text-lg font-semibold">Delete my account</h2>
                    <i onClick={hideConfirmAccountDeletion} className="bi bi-arrow-left-circle-fill text-2xl" style={{cursor:'pointer'}}></i>
                </div>
                <div className="mt-4">
                <div className="flex items-center text-red-500">
                    <span className="mr-2"><i className="bi bi-exclamation-circle-fill"></i></span>
                    <span>Deleting your account will:</span>
                </div>
                <ul className="list-disc list-inside text-muted-foreground mt-2">
                    <li>Delete your Vibez account and informations</li>
                    <li>Delete you from all Vibez groups</li>
                </ul>
                </div>
                <div className="mt-4">
                <label className="block text-sm">Enter your email address:</label>
                <div className="flex items-center border border-border rounded mt-1">
                <input type="text" className="placeholder:text-gray-500 py-2 border rounded-lg p-2 w-full bg-white text-black" style={{ outline: '1px solid #c1c3c7'}} placeholder="Your email" />
                </div>
                </div>
                <div className="mt-4">
                <button onClick={hideConfirmAccountDeletion} className="bg-destructive border-none text-destructive-foreground hover:bg-destructive/80 w-full p-2 rounded">Delete my account</button>
                </div>
                <div className="mt-2">
                <button onClick={hideConfirmAccountDeletion}  className="bg-muted border-none text-muted-foreground w-full p-2 rounded hover:bg-gray-300">Log out instead</button>
                </div>
            </div>
            </div>
        </div>}
        <div className={`${darkMode ? 'border-gray-600 border-r border-border':''}  p-4 settings-column`} style={{backgroundColor: darkMode ? '#1c1c1c' : '#f2f3f7', height:'100vh'}}>
            <h2 className={`${darkMode ? 'text-white' :'text-black'} text-lg font-semibold column-header`}>Settings & Privacy</h2>
            <ul className="space-y-2 mt-5">
            <Accordion type="single" collapsible>
                        <AccordionItem value="settings">
                            <AccordionTrigger asChild>
                                <li className={`${darkMode ? 'bg-[#333333] text-white' : 'bg-white text-gray-700'} items-center p-2 rounded-lg flex mb-1 transition`} style={{ cursor: 'pointer' }}>
                                    <img style={{display:'inline', height:'10%', width:'10%'}} src={icon1}/>
                                    <span>Account</span>
                                </li>
                            </AccordionTrigger>
                            <AccordionContent>
                                <div className="bg-background text-foreground p-4 rounded-lg" style={{backgroundColor: darkMode ? '#1c1c1c' : '#f2f3f7'}}>    
                                <ul className="space-y-2">
                                    <li onClick={toggleDeleteAllChatsPopup} className={`${darkMode ? 'text-white hover:bg-gray-700':'hover:bg-gray-300'} p-2 rounded-lg cursor-pointer`}>Delete all chats</li>
                                    <li onClick={toggleDeleteAllGroupChatsPopup}  className={`${darkMode ? 'text-white hover:bg-gray-700':'hover:bg-gray-300'} p-2 rounded-lg cursor-pointer`}>Delete all group chats</li>
                                    <li onClick={showConfirmAccountDeletion} className={`${darkMode ? '':''} bg-red-300 hover:bg-red-400 text-black p-2 rounded-lg cursor-pointer`}>Delete my account</li>
                                </ul>
                                </div>
                            </AccordionContent>
                        </AccordionItem>

                        <AccordionItem value="privacy">
                            <AccordionTrigger asChild>
                                <li className={`${darkMode ? 'bg-[#333333] text-white' : 'bg-white text-gray-700'} items-center p-2 rounded-lg flex mb-1 transition`} style={{ cursor: 'pointer' }}>
                                <img style={{display:'inline', height:'10%', width:'10%'}} src={icon2}/>
                                    <span>Privacy Centre</span>
                                </li>
                            </AccordionTrigger>
                            <AccordionContent>
                                <div className="bg-background text-foreground p-4 rounded-lg" style={{backgroundColor: darkMode ? '#1c1c1c' : '#f2f3f7'}}>
                                    <div className={`${darkMode ? 'text-white':''} flex justify-between items-center p-2 rounded`}>
                                        <span>Profile photo</span>
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild><span className={`${darkMode ? 'text-gray-400':'text-muted-foreground'}`}>{selectProfilePrivacy}</span></DropdownMenuTrigger>
                                            <DropdownMenuContent className={`${darkMode ? 'bg-[#262729]':'bg-white'} border border-gray-300 rounded-lg`}>	
                                                <DropdownMenuItem  onClick={() => handleProfilePrivacy('My friends')} className={`${darkMode ? 'text-gray-200':''} cursor-pointer`}><span><i className="bi bi-people-fill"></i>&nbsp;&nbsp;My friends</span></DropdownMenuItem>
                                                <DropdownMenuItem  onClick={() => handleProfilePrivacy('Only me')}  className={`${darkMode ? 'text-gray-200':''} cursor-pointer`}><span><i className="bi bi-lock-fill"></i>&nbsp;&nbsp;Only me</span></DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                        
                                    </div>
                                    <div className={`${darkMode ? 'text-white':''} flex justify-between items-center p-2 rounded`}>
                                        <span>About</span>
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild><span  className={`${darkMode ? 'text-gray-400':'text-muted-foreground'}`}>{selectAboutPrivacy}</span></DropdownMenuTrigger>
                                            <DropdownMenuContent className={`${darkMode ? 'bg-[#262729]':'bg-white'} border border-gray-300 rounded-lg`}>
                                                <DropdownMenuItem onClick={() => handleAboutPrivacy('My friends')} className={`${darkMode ? 'text-gray-200':''} cursor-pointer`}><span><i className="bi bi-people-fill"></i>&nbsp;&nbsp;My friends</span></DropdownMenuItem>
                                                <DropdownMenuItem onClick={() => handleAboutPrivacy('Only me')} className={`${darkMode ? 'text-gray-200':''} cursor-pointer`}><span><i className="bi bi-lock-fill"></i>&nbsp;&nbsp;Only me</span></DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </div>
                                </div>
                            </AccordionContent>
                        </AccordionItem>

                        <AccordionItem value="dark-mode">
                            <AccordionTrigger asChild>
                                <li className={`${darkMode ? 'bg-[#333333] text-white' : 'bg-white text-gray-700'} items-center p-2 rounded-lg flex mb-1 transition`} style={{ cursor: 'pointer' }}>
                                <img style={{display:'inline', height:'10%', width:'10%'}} src={icon3}/>
                                    <span>Dark mode</span>
                                </li>
                            </AccordionTrigger>
                            <AccordionContent>
                                <div className="bg-background text-foreground p-4 rounded-lg" style={{backgroundColor: darkMode ? '#1c1c1c' : '#f2f3f7'}}>
                                <div className="flex justify-between items-center mb-2">
                                    <label htmlFor="on" className={`${darkMode ? 'text-white' : ''} cursor-pointer`}>On</label>
                                    <input type="radio" id="on" name="dark-mode" onChange={darkModeOn} checked={darkMode} className="mr-2 cursor-pointer" />
                                </div>
                                <div className="flex justify-between items-center mb-2">
                                    <label htmlFor="off" className={`${darkMode ? 'text-white' : ''} cursor-pointer`}>Off</label>
                                    <input type="radio" id="off" name="dark-mode" onChange={darkModeOff} checked={!darkMode} className="mr-2 cursor-pointer" />
                                </div>
                                <p className={`${darkMode ? 'text-gray-400' : 'text-muted-foreground'} text-sm `}>Optimize the theme for better readability and eye comfort.</p>
                                </div>
                            </AccordionContent>
                        </AccordionItem>

                        <AccordionItem value="language">
                            <AccordionTrigger asChild>
                                <li className={`${darkMode ? 'bg-[#333333] text-white' : 'bg-white text-gray-700'} items-center p-2 rounded-lg flex mb-1 transition`} style={{ cursor: 'pointer' }}>
                                <img style={{display:'inline', height:'10%', width:'10%'}} src={icon4}/>
                                    <span>App language</span>
                                </li>
                            </AccordionTrigger>
                            <AccordionContent>
                                <div className="bg-background text-foreground p-4 rounded-lg" style={{backgroundColor: darkMode ? '#1c1c1c' : '#f2f3f7'}}>
                                <div className="flex justify-between items-center mb-2">
                                <DropdownMenu>
                                <DropdownMenuTrigger className={`${darkMode ? 'bg-[#6a6b6d] text-white hover:bg-[#545454]' : 'bg-gray-300 hover:bg-gray-400'} border-none`}>Select Language</DropdownMenuTrigger>
                                <DropdownMenuContent className={`${darkMode ? 'bg-[#262729]' : 'bg-white'} w-58 p-2 border-gray-300 rounded-lg shadow-lg`}>
                                    <DropdownMenuItem className={`${darkMode ? 'text-gray-200':''} cursor-pointer`}><span>English</span></DropdownMenuItem>
                                    <DropdownMenuItem className={`${darkMode ? 'text-gray-200':''} cursor-pointer`} disabled><span>Español</span></DropdownMenuItem>
                                    <DropdownMenuItem className={`${darkMode ? 'text-gray-200':''} cursor-pointer`} disabled><span>Français</span></DropdownMenuItem>
                                    <DropdownMenuItem className={`${darkMode ? 'text-gray-200':''} cursor-pointer`} disabled><span>Deutsch</span></DropdownMenuItem>
                                </DropdownMenuContent>
                                </DropdownMenu>
                                </div>
                                <p className={`${darkMode ? 'text-gray-400' : 'text-muted-foreground'} mt-2 `}>Please note that only English is currently available.</p>
                                </div>
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
            </ul>
            <div className="flex justify-between mb-12 absolute bottom-0" style={{width: '29%'}}>
                <button onClick={showLogoutMenu} className={`${darkMode ? 'bg-[#6a6b6d] text-white hover:bg-[#545454]':'bg-gray-300 hover:bg-gray-400'} border-none px-4 py-2 rounded-lg w-full`}>Log out</button>
            </div>
        </div>
    </div>
  )
}
