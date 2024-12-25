import React from 'react'

export default function GroupAddMembers({showAddMemberMenu}) {
    var user = 'User1'
    var about = 'This is user1'
  return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
        <div className="bg-card rounded-lg shadow-lg w-full max-w-md">
            <div className="px-4 flex py-3 border-b border-border justify-between items-center">
                <h2 className="text-lg font-semibold">Add members</h2>
                <i onClick={showAddMemberMenu} className="bi bi-arrow-left-circle-fill text-2xl" style={{cursor:'pointer'}}></i>
            </div>
            <div className="p-4">
                <h3 className="text-sm font-medium text-muted">FRIENDS</h3>
                <div className="mt-2">
                    <label className="flex items-center mb-2">
                    <input type="checkbox" className="mr-2" style={{cursor: 'pointer'}} />
                    <img src="https://openui.fly.dev/openui/24x24.svg?text=👤" className="w-8 h-8 rounded-full mx-2"/>
                    <div>
                        <span className="font-semibold">{user}</span>
                        <p className="text-muted-foreground text-xs">
                        {about}
                        </p>
                    </div>
                    </label>
                </div>
            </div>
            <div className="px-4 py-3 border-t border-border">
            <p className="text-sm text-muted-foreground">
                Only you can add or remove members from this group.
            </p>
            <button onClick={showAddMemberMenu} className="mt-2 bg-gray-300 text-gray-600 hover:bg-gray-200 border-none p-2 rounded-lg w-full">
                Add members
            </button>
            </div>
        </div>
        </div>

  )
}
