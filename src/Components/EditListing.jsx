import './Styles/Column2.css'
import { useState, useEffect } from 'react';
import { getProductDetails } from  '../Services/MarketplaceService';

export default function EditListing({showYourListningMenu, darkMode, editingProductId, autoScroll}) {

    const [title, setTitle] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("");
    const [description, setDescription] = useState("");
    const [location, setLocation] = useState("");
    const [hideFromFriends, setHideFromFriends] = useState(false);
    const [errors, setErrors] = useState({});

    const validateFields = () => {
        const newErrors = {};
        if (!title.trim()) newErrors.title = "Enter a title to continue.";
        if (!category.trim()) newErrors.category = "Select a category to finish your listing.";
        if (!price.trim()) newErrors.price = "Enter a price to continue.";
        return newErrors;
    };

    const handleTitleChange = (e) => setTitle(e.target.value);
    const handlePriceChange = (event) => {
        const inputValue = event.target.value;
        const numericValue = inputValue.replace(/^LRK\s*/, "");
        if (/^\d*\.?\d*$/.test(numericValue)) {
          setPrice(numericValue); 
        }
    };

    const fetchProductInfo = async () => {
        const productDetails = await getProductDetails(editingProductId);
        console.log(productDetails);
        setTitle(productDetails.productTitle);
        setPrice(productDetails.price);
        setCategory(productDetails.condition);
        setDescription(productDetails.productDesc);
        setLocation(productDetails.location);
        setHideFromFriends(productDetails.visibleToFriends);
    };
  
    useEffect(() => {
      if (editingProductId) {
        fetchProductInfo();
      }
    }, [editingProductId]);

    const handleCategoryChange = (e) => setCategory(e.target.value);
    const handleDescriptionChange = (e) => setDescription(e.target.value);
    const handleLocationChange = (e) => setLocation(e.target.value);
    const toggleHideFromFriends = () => setHideFromFriends((prev) => !prev);

    const updateListing = async () => {
        const validationErrors = validateFields();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            autoScroll();
            return; 
        }
        // Send the data to the server
        showYourListningMenu();
    }

  return (
    <div className="p-6 pt-1 bg-card text-card-foreground" style={{backgroundColor: darkMode ? '#262729' : ''}}>
        <h2 className={`${darkMode ? 'text-white':''} text-lg font-semibold mb-4`}>Edit listing</h2>
        <div className="bg-background px-4 py-0 rounded-lg w-full" style={{backgroundColor: darkMode ? '#262729' : ''}}>
                <div className="mb-4">
                    <input type="text" className={`${darkMode ? 'bg-[#262729] text-white placeholder:text-gray-400 ' : ' bg-white text-black placeholder:text-gray-500'} py-2 border rounded-lg p-2 w-full`} style={{ outline: errors.title ? '1px solid #f01e2c' : '1px solid #c1c3c7'}} placeholder="Title" value={title} onChange={handleTitleChange}/>
                    {errors.title && <span style={{ color: "red", fontSize:'85%'}}>{errors.title}</span>}
                </div>
                <div className="mb-4">
                    <input type="text" className={`${darkMode ? 'bg-[#262729] text-white placeholder:text-gray-400 ' : ' bg-white text-black placeholder:text-gray-500'} py-2 border rounded-lg p-2 w-full`} style={{ outline: errors.price ? '1px solid #f01e2c' : '1px solid #c1c3c7'}} placeholder="Price"  value={price ? `LRK ${price}` : ""} onChange={handlePriceChange}/>
                    {errors.price && <span style={{ color: "red", fontSize:'85%'}}>{errors.price}</span>}
                </div>
                <div className="mb-4">
                    <select className={`${darkMode ? 'bg-[#262729] text-gray-400' : 'bg-white text-gray-500'} border rounded-lg p-2 w-full`} style={{ outline: errors.category ? '1px solid #f01e2c' : '1px solid #c1c3c7'}} value={category} onChange={handleCategoryChange}>
                        <option value="" disabled selected>Category</option>
                        <option className={`${darkMode ? 'text-white' : 'text-black'}`}>New</option>
                        <option className={`${darkMode ? 'text-white' : 'text-black'}`}>Used - like new</option>
                        <option className={`${darkMode ? 'text-white' : 'text-black'}`}>Used - good</option>
                        <option className={`${darkMode ? 'text-white' : 'text-black'}`}>Used - fair</option>
                    </select>
                    {errors.category && <span style={{ color: "red", fontSize:'85%'}}>{errors.category}</span>}
                </div>
                <div className="mb-4">
                    <textarea className={`${darkMode ? 'bg-[#262729] text-white placeholder:text-gray-400 ' : ' bg-white text-black placeholder:text-gray-500'} py-2 border rounded-lg p-2 w-full`} style={{ outline: '1px solid #c1c3c7'}}  placeholder="Description" rows="4" value={description} onChange={handleDescriptionChange}></textarea>
                </div>
                <div className="mb-4">
                    <input type="text" className={`${darkMode ? 'bg-[#262729] text-white placeholder:text-gray-400 ' : ' bg-white text-black placeholder:text-gray-500'} py-2 border rounded-lg p-2 w-full`} style={{ outline: '1px solid #c1c3c7'}}  placeholder="Location" value={location} onChange={handleLocationChange}/>
                </div>
            <h2 className={`${darkMode ? 'text-white':'text-foreground'} text-lg font-semibold`}>Listing Options</h2>
            <div className="flex items-center justify-between p-4 border-b border-border">
                <div>
                    <h3 className={`${darkMode ? 'text-white':'text-foreground'} font-medium`}>Hide from friends</h3>
                    <p className={`${darkMode ? 'text-gray-400':'text-muted-foreground'}`}>This listing is still public but will be hidden from your friends on Vibez.</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" checked={hideFromFriends} onChange={toggleHideFromFriends}/>
                    <div className="w-11 h-6 bg-zinc-200 rounded-full peer peer-checked:bg-primary peer-checked:after:translate-x-full peer-checked:after:bg-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:border after:border-zinc-300 after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
                </label>
            </div>
        </div>
        <div className="flex justify-between mb-4 mt-4">
                <button onClick={updateListing} className="bg-primary text-primary-foreground px-4 py-2 rounded-lg w-full" >Update</button>
        </div>
    </div>
  )
}
