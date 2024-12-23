import React from 'react'
import './Styles/Column2.css'

export default function Profile() {
  return (
    <div>
        <div className="border-r border-border p-4 chats-column">
                <h2 className="text-lg font-semibold column-header">Profile</h2>
                <div className="flex flex-col items-center p-6 bg-background text-foreground" style={{marginTop:'15%', paddingBottom:'31%'}}>
                <img className="w-40 h-40 rounded-full border-4 border-primary" src="https://placehold.co/128x128" alt="Profile Picture" />
                <div className="mt-4">
                <div className="mt-4">
                    <label className="text-muted-foreground">Your name</label>
                    <h2 className="text-xl font-semibold">OshithRoshantha</h2>
                    <span className="text-muted-foreground text-sm"> This is not your username or PIN. This name will be visible to your WhatsApp contacts. </span>
                </div>
                <div className="mt-6">
                    <span className="text-muted-foreground">About</span>
                    <p>Can't talk, Only Vibez.</p>
                </div>
                </div>
                </div>
            </div>
    </div>
  )
}
