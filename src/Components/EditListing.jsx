import './Styles/Column2.css'

export default function EditListing({handlePublishClick}) {
  return (
    <div className="p-6 pt-1 bg-card text-card-foreground">
        <h2 className="text-lg font-semibold mb-4">Edit listing</h2>
        <div className="bg-background px-4 py-0 rounded-lg w-full">
            <div className="mb-4">
                <label className="block text-muted-foreground">Title</label>
                <input type="text" className="border border-border rounded-lg p-2 w-full" placeholder="Title" />
            </div>
            <div className="mb-4">
                <label className="block text-muted-foreground">Price</label>
                <input type="text" className="border border-border rounded-lg p-2 w-full" placeholder="Price" />
            </div>
            <div className="mb-4">
                <label className="block text-muted-foreground">Condition</label>
                <select className="border border-border rounded-lg p-2 w-full">
                    <option>New</option>
                    <option>Used - like new</option>
                    <option>Used - good</option>
                    <option>Used - fair</option>
                </select>
            </div>
            <div className="mb-4">
                <label className="block text-muted-foreground">Description</label>
                <textarea className="border border-border rounded-lg p-2 w-full" placeholder="Description" rows="4"></textarea>
            </div>
            <div className="mb-4">
                <label className="block text-muted-foreground">Location</label>
                <input type="text" className="border border-border rounded-lg p-2 w-full" placeholder="Location" />
            </div>
            <h2 className="text-lg font-semibold text-foreground">Listing Options</h2>
            <div className="flex items-center justify-between p-4 border-b border-border">
                <div>
                    <h3 className="font-medium text-foreground">Hide from friends</h3>
                    <p className="text-muted-foreground">This listing is still public but will be hidden from your friends on Vibez.</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" />
                    <div className="w-11 h-6 bg-zinc-200 rounded-full peer peer-checked:bg-primary peer-checked:after:translate-x-full peer-checked:after:bg-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:border after:border-zinc-300 after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
                </label>
            </div>
        </div>
        <div className="flex justify-between mb-4">
                <button onClick={handlePublishClick} className="bg-primary text-primary-foreground px-4 py-2 rounded-lg w-full" >Update</button>
        </div>
    </div>
  )
}
