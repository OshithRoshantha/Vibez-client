import { useState,useRef } from 'react';
import './Styles/Column2.css'
import ProductInfo from './ProductInfo';

export default function Marketplace() {
    const [forYouMenu, setForYouMenu] = useState(true);
    const [sellMenu, setSellMenu] = useState(false);
    const [productInfo, setProductInfo] = useState(false);
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
    }

    function showSellMenu(){
        setForYouMenu(false);
        setSellMenu(true);
        setProductInfo(false);
    }

    function showProductInfo(){
        setProductInfo(true);
        setSellMenu(false);
        setForYouMenu(false);
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
        <div className="border-r border-border p-4 chats-column">
                <h2 className="text-lg font-semibold column-header">Marketplace</h2>
                <input type="text" placeholder="Search" className="w-full p-2 border border-border rounded mb-4" />
                <div className="flex space-x-2 mb-4">
                    <button onClick={showSellMenu} className="bg-muted text-muted-foreground px-4 py-2 rounded-full border-none hover:bg-gray-300">Sell</button>
                    <button onClick={showForYouMenu} className="bg-muted text-muted-foreground px-4 py-2 rounded-full border-none hover:bg-gray-300">For you</button>
                </div>
                {forYouMenu && 
                <div className='product-list'>
                    <div className="grid grid-cols-2 gap-x-4 gap-y-0 p-0 w-full">
                    <div className="bg-card rounded-lg shadow-md overflow-hidden" style={{height:'87%', cursor:'pointer'}} onClick={showProductInfo}>
                        <img src="https://placehold.co/400x300?text=Se2" alt="Se2" className="w-full h-30 object-cover" style={{height:'65%'}}/>
                        <div className="pl-4 pr-4 pt-2 pb-2">
                            <h2 className="text-lg font-semibold">{productPrice}</h2>
                            <p className="text-muted-foreground">{productName}</p>
                        </div>
                    </div>
                    </div>
                </div>
            }
            {sellMenu && <div className='sell-products' ref={sellProductsRef}>
                <div className="p-6 pt-1 bg-card text-card-foreground">
                <h2 className="text-lg font-semibold mb-2">Overview</h2>
                <div className="grid grid-cols-2 gap-x-4 gap-y-0 mb-6">
                    <div className="pl-5 pt-2 border border-border rounded-lg" style={{height:'120%'}}>
                        <div style={{display:'flex', fontWeight:'bold', alignItems:'center'}}>
                        <i className="bi bi-chat text-xl"></i>&nbsp;&nbsp;<h3 className="text-xl">{chatToAnswerCount}</h3></div>
                        <p className="text-muted-foreground">Chats to answer</p>
                    </div>
                    <div className="pl-5 pt-2 border border-border rounded-lg" style={{height:'120%'}}>
                    <div style={{display:'flex', fontWeight:'bold', alignItems:'center'}}>
                    <i className="bi bi-tags text-xl"></i>&nbsp;&nbsp;<h3 className="text-xl">{activeListingsCount}</h3></div>
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
                        <p className="text-muted-foreground">
                            This listing is still public but will be hidden from your friends on Vibez.
                        </p>
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
                {productInfo && <div>
                    <ProductInfo productName={productName} productPrice={productPrice} productDescription={productDescription} sellerName={sellerName}/>      
                </div>}
            </div>
    </div>
  )
}
