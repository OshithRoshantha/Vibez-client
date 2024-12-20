import './Styles/Column2.css'

export default function YourListings({showEditListingMenu}) {
  return (  
        <div className="w-full bg-card rounded-lg py-2" style={{display:'flex',columnGap:'5%',justifyContent:'center',alignItems:'center'}}>
        <img src="https://placehold.co/300x200" alt="9-cube shelf" className="your-listning-img" />
        <div>
            <h2 className="text-sm font-semibold mt-2">9-cube shelf</h2>
            <p className="text-lg font-bold text-primary">$10</p>
            <p className="text-muted-foreground text-sm">Listed on 6/19</p>
            <div className="flex space-x-2 mt-1">
                <button onClick={showEditListingMenu} className="bg-primary text-white hover:bg-secondary/80 px-2 py-1 rounded-lg text-sm"><i className="bi bi-pencil-square"></i>&nbsp;Edit listing</button>
                <button className="bg-muted text-muted-foreground px-2 py-1 border-none hover:bg-gray-300 text-sm"><i className="bi bi-trash"></i>&nbsp;Delete listing</button>
            </div>
        </div>
        </div>
  )
}
