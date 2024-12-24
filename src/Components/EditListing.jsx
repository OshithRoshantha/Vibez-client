import './Styles/Column2.css'

export default function EditListing({showYourListningMenu}) {
  return (
    <div className="p-6 pt-1 bg-card text-card-foreground">
        <h2 className="text-lg font-semibold mb-4">Edit listing</h2>
        <div className="bg-background px-4 py-0 rounded-lg w-full">
                <div className="mb-4">
                    <input type="text" className="placeholder:text-gray-500 py-2 border rounded-lg p-2 w-full bg-white text-black" style={{ outline: '1px solid #c1c3c7'}} placeholder="Title" />
                </div>
                <div className="mb-4">
                    <input type="text" className="placeholder:text-gray-500 py-2 border rounded-lg p-2 w-full bg-white text-black" style={{ outline: '1px solid #c1c3c7'}} placeholder="Price" />
                </div>
                <div className="mb-4">
                    <select className=" bg-white border rounded-lg p-2 w-full text-gray-500" style={{ outline: '1px solid #c1c3c7'}}>
                        <option value="" disabled selected>Category</option>
                        <option className='text-black'>New</option>
                        <option className='text-black'>Used - like new</option>
                        <option className='text-black'>Used - good</option>
                        <option className='text-black'>Used - fair</option>
                    </select>
                </div>
                <div className="mb-4">
                    <textarea className="placeholder:text-gray-500 py-2 border rounded-lg p-2 w-full bg-white text-black" style={{ outline: '1px solid #c1c3c7'}}  placeholder="Description" rows="4"></textarea>
                </div>
                <div className="mb-4">
                    <input type="text" className="placeholder:text-gray-500 py-2 border rounded-lg p-2 w-full bg-white text-black" style={{ outline: '1px solid #c1c3c7'}}  placeholder="Location" />
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
                <button onClick={showYourListningMenu} className="bg-primary text-primary-foreground px-4 py-2 rounded-lg w-full" >Update</button>
        </div>
    </div>
  )
}
