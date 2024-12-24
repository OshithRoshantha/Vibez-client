import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@radix-ui/react-accordion';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
  
import './Styles/Column2.css'
import { useState} from 'react';

export default function Settings({darkModeOn, darkModeOff, darkMode}) {
    const [logoutMenu, setLogoutMenu] = useState(false);
    const [confirmAccountDeletion, setConfirmAccountDeletion] = useState(false);

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

  return (
    <div>
        {logoutMenu && <div>
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm w-full">
                <h2 className="text-lg font-semibold">Confirm Logout</h2>
                <p className="text-muted-foreground mt-0">Are you sure you want to log out?</p>
                <div className="flex justify-between mt-4">
                <button onClick={hideLogoutMenu} className="bg-muted text-muted-foreground hover:bg-gray-300 px-4 py-2 rounded">
                    CANCEL
                </button>
                <button onClick={hideLogoutMenu} className="bg-primary text-primary-foreground hover:bg-primary/80 px-4 py-2 rounded">
                    OK
                </button>
                </div>
            </div>
            </div>    
        </div>}
        {confirmAccountDeletion && <div>
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
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
                    <input type="email" className="w-full p-2 rounded-lg" />
                </div>
                </div>
                <div className="mt-4">
                <button onClick={hideConfirmAccountDeletion} className="bg-destructive text-destructive-foreground hover:bg-destructive/80 w-full p-2 rounded">Delete my account</button>
                </div>
                <div className="mt-2">
                <button onClick={hideConfirmAccountDeletion}  className="bg-muted text-muted-foreground w-full p-2 rounded hover:bg-gray-300">Log out instead</button>
                </div>
            </div>
            </div>
        </div>}
        <div className="border-r border-border p-4 settings-column">
            <h2 className="text-lg font-semibold column-header">Account Settings</h2>
            <ul className="space-y-2 mt-5">
            <Accordion type="single" collapsible>
                        <AccordionItem value="settings">
                            <AccordionTrigger asChild>
                                <li className="flex items-center p-2 rounded-lg hover:bg-muted transition" style={{ cursor: 'pointer' }}>
                                    <i className="bi bi-gear-fill text-2xl"></i>&nbsp;&nbsp;
                                    <span>Account</span>
                                </li>
                            </AccordionTrigger>
                            <AccordionContent>
                                <div className="bg-background text-foreground p-4 rounded-lg">    
                                <ul className="space-y-2">
                                    <li className="p-2 rounded-lg hover:bg-gray-300 cursor-pointer">Delete all chats</li>
                                    <li className="p-2 rounded-lg hover:bg-gray-300 cursor-pointer">Delete all group chats</li>
                                    <li onClick={showConfirmAccountDeletion} className="p-2 rounded-lg text-white bg-red-300 cursor-pointer">Delete my account</li>
                                </ul>
                                </div>
                            </AccordionContent>
                        </AccordionItem>

                        <AccordionItem value="privacy">
                            <AccordionTrigger asChild>
                                <li className="flex items-center p-2 rounded-lg hover:bg-muted transition" style={{ cursor: 'pointer' }}>
                                    <i className="bi bi-unlock-fill text-2xl"></i>&nbsp;&nbsp;
                                    <span>Privacy Centre</span>
                                </li>
                            </AccordionTrigger>
                            <AccordionContent>
                                <div className="bg-background text-foreground p-4 rounded-lg">
                                    <div className="flex justify-between items-center p-2 rounded">
                                        <span>Profile photo</span>
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild><span className="text-muted-foreground">My friends</span></DropdownMenuTrigger>
                                            <DropdownMenuContent className="w-58 p-2 bg-white border border-gray-300 rounded-lg">
                                                <DropdownMenuItem><span><i className="bi bi-people-fill"></i>&nbsp;&nbsp;My friends</span></DropdownMenuItem>
                                                <DropdownMenuItem><span><i className="bi bi-lock-fill"></i>&nbsp;&nbsp;Only me</span></DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                        
                                    </div>
                                    <div className="flex justify-between items-center p-2 rounded">
                                        <span>About</span>
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild><span className="text-muted-foreground">My friends</span></DropdownMenuTrigger>
                                            <DropdownMenuContent className="w-58 p-2 bg-white border border-gray-300 rounded-lg">
                                                <DropdownMenuItem><span><i className="bi bi-people-fill"></i>&nbsp;&nbsp;My friends</span></DropdownMenuItem>
                                                <DropdownMenuItem><span><i className="bi bi-lock-fill"></i>&nbsp;&nbsp;Only me</span></DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </div>
                                </div>
                            </AccordionContent>
                        </AccordionItem>

                        <AccordionItem value="dark-mode">
                            <AccordionTrigger asChild>
                                <li className="flex items-center p-2 rounded-lg hover:bg-muted transition" style={{ cursor: 'pointer' }}>
                                    <i className="bi bi-moon-fill text-2xl"></i>&nbsp;&nbsp;
                                    <span>Dark mode</span>
                                </li>
                            </AccordionTrigger>
                            <AccordionContent>
                                <div className="bg-background text-foreground p-4 rounded-lg">
                                <div className="flex justify-between items-center mb-2">
                                    <label htmlFor="on" className="cursor-pointer">On</label>
                                    <input type="radio" id="on" name="dark-mode" onChange={darkModeOn} checked={darkMode} className="mr-2" />
                                </div>
                                <div className="flex justify-between items-center mb-2">
                                    <label htmlFor="off" className="cursor-pointer">Off</label>
                                    <input type="radio" id="off" name="dark-mode" onChange={darkModeOff} checked={!darkMode} className="mr-2" />
                                </div>
                                <p className="text-muted-foreground text-sm">Optimize the theme for better readability and eye comfort.</p>
                                </div>
                            </AccordionContent>
                        </AccordionItem>

                        <AccordionItem value="language">
                            <AccordionTrigger asChild>
                                <li className="flex items-center p-2 rounded-lg hover:bg-muted transition" style={{ cursor: 'pointer' }}>
                                    <i className="bi bi-globe2 text-2xl"></i>&nbsp;&nbsp;
                                    <span>App language</span>
                                </li>
                            </AccordionTrigger>
                            <AccordionContent>
                                <div className="bg-background text-foreground p-4 rounded-lg">
                                <div className="flex justify-between items-center mb-2">
                                <DropdownMenu>
                                <DropdownMenuTrigger className="bg-primary">Select Language</DropdownMenuTrigger>
                                <DropdownMenuContent className="w-58 p-2 bg-white border border-gray-300 rounded-lg shadow-lg">
                                    <DropdownMenuItem><span>English</span></DropdownMenuItem>
                                    <DropdownMenuItem disabled><span>Español</span></DropdownMenuItem>
                                    <DropdownMenuItem disabled><span>Français</span></DropdownMenuItem>
                                    <DropdownMenuItem disabled><span>Deutsch</span></DropdownMenuItem>
                                </DropdownMenuContent>
                                </DropdownMenu>
                                </div>
                                <p className="text-muted-foreground mt-2">Please note that only English is currently available.</p>
                                </div>
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
            </ul>
            <div className="flex justify-between mb-12 absolute bottom-0" style={{width: '29%'}}>
                <button onClick={showLogoutMenu} className="bg-primary text-primary-foreground px-4 py-2 rounded-lg w-full" >Log out</button>
            </div>
        </div>
    </div>
  )
}
