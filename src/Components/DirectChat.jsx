

export default function DirectChat() {
  return (
    <div>
        <div className="bg-background min-h-screen flex flex-col">
        <div className="flex items-center px-4 py-3 border-b border-border">
            <div className="flex items-center">
            <img src="https://placehold.co/40x40" alt="User Avatar" className="rounded-full mr-2" />
            <span className="text-lg font-semibold text-primary">TestUser</span>
            </div>
            <button className="ml-auto p-2 rounded-full bg-secondary text-secondary-foreground hover:bg-secondary/80">📷</button>
        </div>
        <div style={{backgroundColor:'red', height:'78vh', overflowY:'auto', scrollbarWidth:'none'}}>
            
        </div>
        <div className=" px-4 py-3  border-t border-border bg-card">
            <input type="text" placeholder="Type a message" className="w-full p-2 rounded-lg bg-input text-primary" />
        </div>
        </div>
    </div>
  )
}
