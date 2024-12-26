import { useState,useRef } from 'react';
import './Styles/Column2.css'
import ProductInfo from './ProductInfo';
import YourListings from './YourListings';
import EditListing from './EditListing';

export default function Marketplace({darkMode}) {
    const [forYouMenu, setForYouMenu] = useState(true);
    const [sellMenu, setSellMenu] = useState(false);
    const [productInfo, setProductInfo] = useState(false);
    const [yourListningMenu, setYourListningMenu] = useState(false);
    const [editListingMenu, setEditListingMenu] = useState(false);
    const sellProductsRef = useRef(null);
    const fileInputRef = useRef(null);
    const [selectedImages, setSelectedImages] = useState([]);
    var chatToAnswerCount = 15;
    var activeListingsCount = 3;
    const productName = "Wireless Headphones";
    const productPrice = "$150";
    const productDescription =
        "High-quality wireless headphones with noise cancellation and up to 20 hours of battery life.";
    const sellerName = "Tech Store";

    function addImages() {
        if (fileInputRef.current) {
            fileInputRef.current.click(); 
        }
    }
    
    function handleFileChange(event) {
        const files = Array.from(event.target.files); 
        const imagePreviews = files.map(function(file) {
            return URL.createObjectURL(file);
        }); 
        setSelectedImages(imagePreviews);
    }
    
    function handleRemoveImage(index) {
        const updatedImages = selectedImages.filter(function(_, i) {
            return i !== index;
        }); 
        setSelectedImages(updatedImages);
    }
    
    function showForYouMenu(){
        setForYouMenu(true);
        setSellMenu(false);
        setProductInfo(false);
        setYourListningMenu(false);
        setEditListingMenu(false);
    }

    function showSellMenu(){
        setForYouMenu(false);
        setSellMenu(true);
        setProductInfo(false);
        setYourListningMenu(false);
        setEditListingMenu(false);
    }

    function showProductInfo(){
        setProductInfo(true);
        setSellMenu(false);
        setForYouMenu(false);
        setYourListningMenu(false);
        setEditListingMenu(false);  
    }

    function showYourListningMenu(){
        setYourListningMenu(true);
        setProductInfo(false);
        setSellMenu(false);
        setForYouMenu(false);
        setEditListingMenu(false);
    }

    function showEditListingMenu(){
        setEditListingMenu(true);
        setProductInfo(false);
        setSellMenu(false);
        setForYouMenu(false);
        setYourListningMenu(false);
    }

    function handlePublishClick() {
        if (sellProductsRef.current) {
            sellProductsRef.current.scrollTo({
                top: 0,
                behavior: "smooth", 
            });
        }
    }
    

  return (
    <div>
        <div className={`${darkMode ? 'border-gray-600 border-r border-border':''}  p-4 chats-column`} style={{backgroundColor: darkMode ? '#262729' : '', height:'100vh'}}>
            <h2 className={`${darkMode ? 'text-white' :'text-black'} text-lg font-semibold column-header`}>Marketplace</h2>
            <input type="text" placeholder="What do you want to buy?" className={`${darkMode ? 'bg-[#3c3d3f] placeholder:text-[#abacae] text-white' : 'bg-gray-200'} w-full px-4 py-2 mb-4 focus:outline-none focus:border-none placeholder:text-gray-500  text-gray-500 `} style={{borderRadius:'20px'}} />
            <i className={`${darkMode ? 'text-[#abacae]':'text-gray-500'} bi absolute text-2xl bi-search`} style={{marginLeft:'-3%', marginTop:'0.2%'}}></i>
                <div className="flex space-x-2 mb-4">
                    <button onClick={showSellMenu} className={`${darkMode ? 'bg-[#223b51] text-[#59abff] hover:bg-[#184e88]':'bg-gray-300 text-gray-600  hover:bg-gray-200'} px-4 py-2 rounded-full border-none`}>Sell</button>
                    <button onClick={showYourListningMenu} className={`${darkMode ? 'bg-[#223b51] text-[#59abff] hover:bg-[#184e88]':'bg-gray-300 text-gray-600  hover:bg-gray-200'} px-4 py-2 rounded-full border-none`}>Your listings</button>
                    <button onClick={showForYouMenu} className={`${darkMode ? 'bg-[#223b51] text-[#59abff] hover:bg-[#184e88]':'bg-gray-300 text-gray-600  hover:bg-gray-200'} px-4 py-2 rounded-full border-none`}>For you</button>
                </div>
            {forYouMenu && 
                <div className='product-list'>
                    <div className="grid grid-cols-2 gap-x-4 gap-y-0 p-0 w-full"> 
                    <div className="bg-card rounded-lg shadow-md overflow-hidden" style={{height:'87%', cursor:'pointer',backgroundColor: darkMode ? '#56585a':''}} onClick={showProductInfo}>
                        <img src="https://placehold.co/400x300?text=Se2" alt="Se2" className="w-full h-30 object-cover" style={{height:'65%'}}/>
                            <div className="pl-4 pr-4 pt-2 pb-2">
                                <h2 className={`${darkMode ? 'text-white':''} text-lg font-semibold`}>{productPrice}</h2>
                                <p className={`${darkMode ? 'text-gray-400':'text-muted-foreground'}`}>{productName}</p>
                            </div>
                    </div>
                    </div>
                </div>
            }
            {sellMenu && 
            <div className='sell-products' ref={sellProductsRef}>
                <div className="p-6 pt-1 bg-card text-card-foreground">
                <h2 className="text-lg font-semibold mb-2">Overview</h2>
                <div className="grid grid-cols-2 gap-x-4 gap-y-0 mb-6">
                    <div className="pl-5 pt-2 border border-border rounded-lg" style={{height:'120%'}}>
                        <div style={{display:'flex', fontWeight:'bold', alignItems:'center'}}>
                            <i className="bi bi-chat text-xl"></i>&nbsp;&nbsp;<h3 className="text-xl">{chatToAnswerCount}</h3>
                        </div>
                        <p className="text-muted-foreground">Total replies</p>
                    </div>
                    <div className="pl-5 pt-2 border border-border rounded-lg" style={{height:'120%', cursor:'pointer'}} onClick={showYourListningMenu}>
                        <div style={{display:'flex', fontWeight:'bold', alignItems:'center'}}>
                            <i className="bi bi-tags text-xl"></i>&nbsp;&nbsp;<h3 className="text-xl">{activeListingsCount}</h3>
                        </div>
                        <p className="text-muted-foreground">Active listings</p>
                    </div>
                </div>
                <h2 className="text-lg font-semibold mb-2 mt-5">New listing</h2>
                <div className="bg-background p-6 rounded-lg w-full">
                <div className="flex flex-col items-center mb-4">
                <div style={{display:'flex',flexDirection:'column', justifyContent:'center', alignItems:'center'}}>
                    <div className="grid grid-cols-3 gap-1 mb-4">
                            {selectedImages.map((image, index) => (
                                <div key={index} className="relative">
                                    <img
                                        src={image}
                                        alt={`Selected ${index + 1}`}
                                        className="w-full h-29 object-cover rounded-lg"
                                    />
                                    <button 
                                        style={{borderRadius:'50%', height:'40px', width:'40px'}}  
                                        onClick={() => handleRemoveImage(index)}
                                        className=" bg-red-400 text-white p-1 absolute top-0 right-0"
                                        title="Remove"
                                    >
                                        <i className="bi bi-trash"></i>
                                    </button>
                                </div>
                            ))}
                    </div>
                    <div style={{display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center'}}>
                        <button onClick={addImages} className="bg-primary text-primary-foreground rounded-full p-3">
                        <i className="bi bi-images text-xl"></i>
                        </button>
                            <input
                                type="file"
                                ref={fileInputRef}
                                style={{ display: "none" }}
                                multiple
                                accept="image/*"
                                onChange={handleFileChange}
                            />
                        <h2 className="text-lg font-semibold mt-2">Add photos</h2>
                        <p className="text-muted-foreground text-sm">Choose your listing's photos.</p>
                    </div>
                </div>
                </div>
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
                    <textarea className="placeholder:text-gray-500 py-2  border rounded-lg p-2 w-full bg-white text-black" style={{ outline: '1px solid #c1c3c7'}}  placeholder="Description" rows="4"></textarea>
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
                    <button className="bg-primary text-primary-foreground px-4 py-2 rounded-lg w-full" onClick={handlePublishClick}>Publish</button>
                </div>
                    <p className="text-muted-foreground mt-4 text-sm">
                        Marketplace items are public and can be seen by anyone on or off Vibez. 
                    </p>
                    <p className="text-muted-foreground text-sm">
                        Marketplace listings must not discriminate. 
                    </p>
                </div>            
            </div>}
            {yourListningMenu && <div className='product-list'><YourListings showEditListingMenu={showEditListingMenu}/></div>}
            {editListingMenu && <div className='sell-products' ref={sellProductsRef}><EditListing showYourListningMenu={showYourListningMenu}/></div>}
            {productInfo && <div>
                    <ProductInfo productName={productName} productPrice={productPrice} productDescription={productDescription} sellerName={sellerName}/>      
            </div>}
            </div>
    </div>
  )
}
