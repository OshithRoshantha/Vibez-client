

export default function DirectChat() {
  return (
    <div>
        <div className="bg-background min-h-screen flex flex-col">
        <header className="flex items-center p-4 border-b border-border">
            <div className="flex items-center">
            <img src="https://placehold.co/40x40" alt="User Avatar" className="rounded-full mr-2" />
            <span className="text-lg font-semibold text-primary">TestUser</span>
            </div>
            <button className="ml-auto p-2 rounded-full bg-secondary text-secondary-foreground hover:bg-secondary/80">📷</button>
        </header>

        <main className="flex-1 overflow-y-auto p-4 bg-zinc-900">
            <div className="flex items-start mb-4">
            <div className="bg-zinc-800 text-white p-2 rounded-lg max-w-xs">
                <p>Test Message1</p>
                <span className="text-xs text-muted-foreground">00:26</span>
            </div>
            </div>

            <div className="flex items-start mb-4">
            <div className="bg-zinc-800 text-white p-2 rounded-lg max-w-xs">
                <p>Test Message2</p>
                <span className="text-xs text-muted-foreground">00:26</span>
            </div>
            </div>

            <div className="flex items-start mb-4">
            <div className="bg-zinc-800 text-white p-2 rounded-lg max-w-xs">
                <p>Test Message3</p>
                <span className="text-xs text-muted-foreground">00:27</span>
            </div>
            </div>

            <div className="flex items-start mb-4 ml-auto">
            <div className="bg-teal-500 text-white p-2 rounded-lg max-w-xs">
                <p>Test Message4</p>
                <span className="text-xs text-muted-foreground">00:28</span>
            </div>
            </div>

            <div className="flex items-start mb-4 ml-auto">
            <div className="bg-teal-500 text-white p-2 rounded-lg max-w-xs">
                <p>Test Message5</p>
                <span className="text-xs text-muted-foreground">00:28</span>
            </div>
            </div>
        </main>

        <footer className="p-4 border-t border-border bg-card">
            <input type="text" placeholder="Type a message" className="w-full p-2 rounded-lg bg-input text-primary" />
        </footer>
        </div>
    </div>
  )
}
