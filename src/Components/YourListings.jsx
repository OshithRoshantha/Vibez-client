import './Styles/Column2.css'
import { useState} from 'react';

export default function YourListings({productId, showEditListingMenu, darkMode, productTitle, productDesc, productPhotos, price, listedDate, setEditingProductId}) {
  const [deleteMenu, setDeleteMenu] = useState(false);

  function showDeleteMenu() {
      setDeleteMenu(true);
  }

  function hideDeleteMenu() {
      setDeleteMenu(false);
  }

  const handleEdit = () =>{
    setEditingProductId(productId);
    showEditListingMenu();
  }


  return (  
    <div>
        {deleteMenu && <div>
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50" style={{zIndex:'100'}}>
              <div className={`${darkMode ? 'bg-[#262729]' : 'bg-white bg-card '} rounded-lg p-6 w-80 shadow-lg`}>
                <div className='text-center'>
                    <h2 className={`${darkMode ? 'text-white':'text-foreground'} text-lg font-semibold`} >Delete this listing?</h2>
                    <p className={`${darkMode ? 'text-gray-300' : 'text-muted-foreground'} mt-2`}>Are you sure that you want to delete this listing?</p>
                </div>
                <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                  <p className={`${darkMode ? 'text-gray-200' : 'text-muted-foreground'} mt-2`}>LKR {price}</p>
                  <p className={`${darkMode ? 'text-gray-200' : 'text-muted-foreground'}`}>🛒 {productTitle}</p>
                </div>
                <div>
                  <button style={{cursor:'pointer'}} onClick={hideDeleteMenu} className="bg-primary text-primary-foreground px-4 py-1 rounded-lg w-full mt-3 mb-2">Delete</button>
                  <button style={{cursor:'pointer'}} onClick={hideDeleteMenu} className={`${darkMode ? 'bg-[#6a6b6d] text-white hover:bg-[#545454]':'bg-muted text-muted-foreground hover:bg-gray-300'} px-4 py-1 border-none w-full`}>Cancel</button>
                </div>
              </div>
            </div>
          </div>}
        <div className="w-full bg-card rounded-lg py-2" style={{display:'flex',columnGap:'5%',justifyContent:'center',alignItems:'center', backgroundColor: darkMode ? '#262729' : ''}}>
        <img src={productPhotos} alt="product-image" className="your-listning-img" />
        <div>
            <h2 className={`${darkMode ? 'text-white':''} text-sm font-semibold mt-2`}>{productTitle}</h2>
            <p className="text-lg font-bold text-primary">LRK {price}</p>
            <p className={`${darkMode ? 'text-gray-400':'text-muted-foreground'} text-sm`}>Listed on {listedDate}</p>
            <div className="flex space-x-2 mt-1">
                <button onClick={handleEdit} className="bg-primary text-white hover:bg-secondary/80 px-2 py-1 rounded-lg text-sm"><i className="bi bi-pencil-square"></i>&nbsp;Edit listing</button>
                <button onClick={showDeleteMenu} className={`${darkMode ? 'bg-[#6a6b6d] text-white hover:bg-[#545454]':'bg-muted text-muted-foreground hover:bg-gray-300'}  px-2 py-1 text-sm border-none`}><i className="bi bi-trash"></i>&nbsp;Delete listing</button>
            </div>
        </div>
        </div>
    </div>
  )
}
