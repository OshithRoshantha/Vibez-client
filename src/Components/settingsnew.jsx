import React, { useState } from "react";
import { RiArrowRightSLine, RiArrowDownSLine } from "react-icons/ri";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@radix-ui/react-dropdown-menu";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@radix-ui/react-accordion";
import GlobalAlert from "./GlobalAlert";

const Settings = ({ darkMode, darkModeOn, darkModeOff }) => {
    const [logoutMenu, setLogoutMenu] = useState(false);
    const [confirmAccountDeletion, setConfirmAccountDeletion] = useState(false);
    const [deleteAllChatsPopup, setDeleteAllChatsPopup] = useState(false);
    const [deleteAllGroupChatsPopup, setDeleteAllGroupChatsPopup] = useState(false);
    const [selectProfilePrivacy, setSelectProfilePrivacy] = useState("Everyone");
    const [selectAboutPrivacy, setSelectAboutPrivacy] = useState("Everyone");

    function toggleDeleteAllChatsPopup() {
        setDeleteAllChatsPopup(!deleteAllChatsPopup);
    }

    function toggleDeleteAllGroupChatsPopup() {
        setDeleteAllGroupChatsPopup(!deleteAllGroupChatsPopup);
    }

    function handleProfilePrivacy(value) {
        setSelectProfilePrivacy(value);
    }

    function handleAboutPrivacy(value) {
        setSelectAboutPrivacy(value);
    }

    return (
        <div className={`${darkMode ? "bg-black text-white" : "bg-white text-black"} p-5 h-full overflow-y-auto`}>
            <h1 className="text-2xl font-bold mb-5">Settings</h1>
            <Accordion type="multiple">
                {/* Account Settings */}
                <AccordionItem value="settings">
                    <AccordionTrigger asChild>
                        <li className="cursor-pointer p-3 text-lg font-medium flex justify-between items-center border-b">
                            Account <RiArrowDownSLine size={20} />
                        </li>
                    </AccordionTrigger>
                    <AccordionContent>
                        <ul>
                            <li onClick={() => setLogoutMenu(true)}>Logout</li>
                            <li onClick={toggleDeleteAllChatsPopup}>Delete all chats</li>
                            <li onClick={toggleDeleteAllGroupChatsPopup}>Delete all group chats</li>
                            <li onClick={() => setConfirmAccountDeletion(true)}>Delete account</li>
                        </ul>
                    </AccordionContent>
                </AccordionItem>

                {/* Privacy Centre */}
                <AccordionItem value="privacy-centre">
                    <AccordionTrigger asChild>
                        <li className="cursor-pointer p-3 text-lg font-medium flex justify-between items-center border-b">
                            Privacy Centre <RiArrowDownSLine size={20} />
                        </li>
                    </AccordionTrigger>
                    <AccordionContent>
                        <ul>
                            <li>
                                Profile Privacy: 
                                <DropdownMenu>
                                    <DropdownMenuTrigger>{selectProfilePrivacy}</DropdownMenuTrigger>
                                    <DropdownMenuContent>
                                        <DropdownMenuItem onSelect={() => handleProfilePrivacy("Everyone")}>Everyone</DropdownMenuItem>
                                        <DropdownMenuItem onSelect={() => handleProfilePrivacy("My Contacts")}>My Contacts</DropdownMenuItem>
                                        <DropdownMenuItem onSelect={() => handleProfilePrivacy("No one")}>No one</DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </li>
                            <li>
                                About Privacy:
                                <DropdownMenu>
                                    <DropdownMenuTrigger>{selectAboutPrivacy}</DropdownMenuTrigger>
                                    <DropdownMenuContent>
                                        <DropdownMenuItem onSelect={() => handleAboutPrivacy("Everyone")}>Everyone</DropdownMenuItem>
                                        <DropdownMenuItem onSelect={() => handleAboutPrivacy("My Contacts")}>My Contacts</DropdownMenuItem>
                                        <DropdownMenuItem onSelect={() => handleAboutPrivacy("No one")}>No one</DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </li>
                        </ul>
                    </AccordionContent>
                </AccordionItem>

                {/* Dark Mode */}
                <AccordionItem value="dark-mode">
                    <AccordionTrigger asChild>
                        <li className="cursor-pointer p-3 text-lg font-medium flex justify-between items-center border-b">
                            Dark Mode <RiArrowDownSLine size={20} />
                        </li>
                    </AccordionTrigger>
                    <AccordionContent>
                        <div>
                            <button onClick={darkModeOn}>Enable Dark Mode</button>
                            <button onClick={darkModeOff}>Disable Dark Mode</button>
                        </div>
                    </AccordionContent>
                </AccordionItem>

                {/* App Language */}
                <AccordionItem value="language">
                    <AccordionTrigger asChild>
                        <li className="cursor-pointer p-3 text-lg font-medium flex justify-between items-center border-b">
                            App Language <RiArrowDownSLine size={20} />
                        </li>
                    </AccordionTrigger>
                    <AccordionContent>
                        <ul>
                            <li>English (default)</li>
                        </ul>
                    </AccordionContent>
                </AccordionItem>
            </Accordion>

            {/* Modals and Alerts */}
            {logoutMenu && (
                <GlobalAlert
                    darkMode={darkMode}
                    text="Are you sure you want to logout?"
                    button1="Cancel"
                    button2="Logout"
                    btn1Function={() => setLogoutMenu(false)}
                    btn2Function={() => setLogoutMenu(false)}
                />
            )}

            {confirmAccountDeletion && (
                <GlobalAlert
                    darkMode={darkMode}
                    text="Confirm account deletion. Please enter your email."
                    button1="Cancel"
                    button2="Delete Account"
                    btn1Function={() => setConfirmAccountDeletion(false)}
                    btn2Function={() => setConfirmAccountDeletion(false)}
                />
            )}

            {deleteAllChatsPopup && (
                <GlobalAlert
                    darkMode={darkMode}
                    text="Delete All Chats?"
                    button1="Cancel"
                    button2="Delete all"
                    btn1Function={toggleDeleteAllChatsPopup}
                    btn2Function={toggleDeleteAllChatsPopup}
                />
            )}

            {deleteAllGroupChatsPopup && (
                <GlobalAlert
                    darkMode={darkMode}
                    text="Delete All Group Chats?"
                    button1="Cancel"
                    button2="Delete all"
                    btn1Function={toggleDeleteAllGroupChatsPopup}
                    btn2Function={toggleDeleteAllGroupChatsPopup}
                />
            )}
        </div>
    );
};

export default Settings;
