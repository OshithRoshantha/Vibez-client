import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@radix-ui/react-accordion';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
  
import './Styles/Column2.css'
import { useState} from 'react';

export default function Settings() {
    const [logoutMenu, setLogoutMenu] = useState(false);

    function showLogoutMenu() {
        setLogoutMenu(true);
    }

    function hideLogoutMenu() {
        setLogoutMenu(false);
    }

  return (
    <div>
        {logoutMenu && <div>
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                <div className="bg-card rounded-lg p-6 shadow-lg">
                    <h2 className="text-lg font-semibold text-foreground">Log out of your account?</h2>
                    <div>
                        <button onClick={hideLogoutMenu} className="bg-primary text-primary-foreground px-4 py-1 rounded-lg w-full mt-3 mb-2">Cancel</button>
                        <button onClick={hideLogoutMenu} className="bg-muted text-muted-foreground px-4 py-1 border-none hover:bg-gray-300 w-full">Log out</button>
                    </div>
                </div>
            </div>    
        </div>}
        <div className="border-r border-border p-4 chats-column">
            <h2 className="text-lg font-semibold column-header">Account Settings</h2>
            <ul className="space-y-2 mt-5">
            <Accordion type="single" collapsible>
                        <AccordionItem value="settings">
                            <AccordionTrigger asChild>
                                <li className="flex items-center p-2 rounded-lg hover:bg-muted transition" style={{ cursor: 'pointer' }}>
                                    <i className="bi bi-gear-fill text-2xl"></i>&nbsp;&nbsp;
                                    <span>Settings</span>
                                </li>
                            </AccordionTrigger>
                            <AccordionContent>
                                <div className="bg-background text-foreground p-4 rounded-lg">    
                                <ul className="space-y-2">
                                    <li className="p-2 py-1 rounded-lg hover:bg-gray-300 cursor-pointer">Delete all chats</li>
                                    <li className="p-2 py-1 rounded-lg hover:bg-gray-300 cursor-pointer">Delete all group chats</li>
                                    <li className="p-2 rounded-lg text-white bg-red-300 cursor-pointer">Delete my account</li>
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
                                Manage your privacy preferences and data settings.
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
                                    <input type="radio" id="on" name="dark-mode" className="mr-2" />
                                </div>
                                <div className="flex justify-between items-center mb-2">
                                    <label htmlFor="off" className="cursor-pointer">Off</label>
                                    <input type="radio" id="off" name="dark-mode" className="mr-2" />
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
            <div className="flex justify-between mb-4 mt-11">
                <button onClick={showLogoutMenu} className="bg-primary text-primary-foreground px-4 py-2 rounded-lg w-full" >Log out</button>
            </div>
        </div>
    </div>
  )
}
