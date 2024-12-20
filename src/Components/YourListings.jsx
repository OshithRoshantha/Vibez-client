import './Styles/Column2.css'
import { useState} from 'react';

export default function YourListings({showEditListingMenu}) {
  const [deleteMenu, setDeleteMenu] = useState(true);

  function showDeleteMenu() {
      setDeleteMenu(true);
  }

  function hideDeleteMenu() {
      setDeleteMenu(false);
  }

  return (  
    <div>
        {deleteMenu && <div>
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
              <div className="bg-card rounded-lg p-6 w-80">
                <div className='text-center'>
                    <h2 className="text-lg font-semibold text-foreground">Delete this listing?</h2>
                    <p className="text-muted-foreground mt-2">Are you sure that you want to delete this listing?</p>
                </div>
                <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                  <p className="text-muted-foreground mt-2">LKR57,500</p>
                  <p className="text-muted-foreground">🛒 Phones</p>
                </div>
                <div>
                  <button onClick={hideDeleteMenu} className="bg-primary text-primary-foreground px-4 py-1 rounded-lg w-full mt-3 mb-2">Delete</button>
                  <button onClick={hideDeleteMenu} className="bg-muted text-muted-foreground px-4 py-1 border-none hover:bg-gray-300 w-full">Cancel</button>
                </div>
              </div>
            </div>
          </div>}
        <div className="w-full bg-card rounded-lg py-2" style={{display:'flex',columnGap:'5%',justifyContent:'center',alignItems:'center'}}>
        <img src="https://placehold.co/300x200" alt="9-cube shelf" className="your-listning-img" />
        <div>
            <h2 className="text-sm font-semibold mt-2">9-cube shelf</h2>
            <p className="text-lg font-bold text-primary">$10</p>
            <p className="text-muted-foreground text-sm">Listed on 6/19</p>
            <div className="flex space-x-2 mt-1">
                <button onClick={showEditListingMenu} className="bg-primary text-white hover:bg-secondary/80 px-2 py-1 rounded-lg text-sm"><i className="bi bi-pencil-square"></i>&nbsp;Edit listing</button>
                <button onClick={showDeleteMenu} className="bg-muted text-muted-foreground px-2 py-1 border-none hover:bg-gray-300 text-sm"><i className="bi bi-trash"></i>&nbsp;Delete listing</button>
            </div>
        </div>
        </div>
    </div>
  )
}
