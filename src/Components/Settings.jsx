import { useState} from 'react';
import './Styles/Column2.css'

export default function Settings() {
  return (
    <div>
        <div className="border-r border-border p-4 chats-column">
            <h2 className="text-lg font-semibold column-header">Account Settings</h2>
            <ul className="space-y-2 mt-5">
                <li className="flex items-center p-2 rounded-lg hover:bg-muted transition" style={{cursor: 'pointer'}}>
                    <i className="bi bi-gear-fill text-2xl"></i>&nbsp;&nbsp;
                    <span>Settings</span>
                </li>
                <li className="flex items-center p-2 rounded-lg hover:bg-muted transition" style={{cursor: 'pointer'}}>
                    <i className="bi bi-unlock-fill text-2xl"></i>&nbsp;&nbsp;
                    <span>Privacy Centre</span>
                </li>
                <li className="flex items-center p-2 rounded-lg hover:bg-muted transition" style={{cursor: 'pointer'}}>
                    <i className="bi bi-moon-fill text-2xl"></i>&nbsp;&nbsp;
                    <span>Dark mode</span>
                </li>
                <li className="flex items-center p-2 rounded-lg hover:bg-muted transition" style={{cursor: 'pointer'}}>
                    <i className="bi bi-globe2 text-2xl"></i>&nbsp;&nbsp;
                    <span>App language</span>
                </li>
            </ul>
            <div className="flex justify-between mb-4 mt-11">
                <button className="bg-primary text-primary-foreground px-4 py-2 rounded-lg w-full" >Log out</button>
            </div>
        </div>
    </div>
  )
}
