import { useState,useRef } from 'react';
import './Styles/Column2.css'

export default function Marketplace() {
    const [forYouMenu, setForYouMenu] = useState(true);
    const [sellMenu, setSellMenu] = useState(false);
    const [productInfo, setProductInfo] = useState(false);
    const sellProductsRef = useRef(null);
    const fileInputRef = useRef(null);
    const [selectedImages, setSelectedImages] = useState([]);

    const addImages = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click(); 
        }
    };

    const handleFileChange = (event) => {
        const files = Array.from(event.target.files); 
        const imagePreviews = files.map(file => URL.createObjectURL(file)); 
        setSelectedImages(imagePreviews);
    };

    const handleRemoveImage = (index) => {
        const updatedImages = selectedImages.filter((_, i) => i !== index); 
        setSelectedImages(updatedImages);
    };

    function showForYouMenu(){
        setForYouMenu(true);
        setSellMenu(false);
    }

    function showSellMenu(){
        setForYouMenu(false);
        setSellMenu(true);
    }

    function showProductInfo(){
        setProductInfo(true);
        setSellMenu(false);
        setForYouMenu(false);
    }

    const handlePublishClick = () => {
        if (sellProductsRef.current) {
            sellProductsRef.current.scrollTo({
                top: 0,
                behavior: "smooth", 
            });
        }
    };

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
                            <h2 className="text-lg font-semibold">LKR23,000</h2>
                            <p className="text-muted-foreground">Se2</p>
                        </div>
                    </div>
                    <div className="bg-card rounded-lg shadow-md overflow-hidden" style={{height:'87%'}}>
                        <img src="https://placehold.co/400x300?text=Headphones" alt="Original High-Quality Headphones" className="w-full h-30 object-cover"  style={{height:'65%'}}/>
                        <div className="pl-4 pr-4 pt-2 pb-2">
                            <h2 className="text-lg font-semibold">LKR2,200</h2>
                            <p className="text-muted-foreground">Original High-Quality Headphones</p>
                        </div>
                    </div>
                    <div className="bg-card rounded-lg shadow-md overflow-hidden" style={{height:'87%'}}>
                        <img src="https://placehold.co/400x300?text=Graphics+Cards" alt="Used Gaming Graphics Cards" className="w-full h-30 object-cover"  style={{height:'65%'}}/>
                        <div className="pl-4 pr-4 pt-2 pb-2">
                            <h2 className="text-lg font-semibold">LKR26,500</h2>
                            <p className="text-muted-foreground">USED GAMING GRAPHICS CARDS</p>
                        </div>
                    </div>
                    <div className="bg-card rounded-lg shadow-md overflow-hidden" style={{height:'87%'}}>
                        <img src="https://placehold.co/400x300?text=Shoes" alt="Men's Shoes" className="w-full h-30 object-cover"  style={{height:'65%'}}/>
                        <div className="pl-4 pr-4 pt-2 pb-2">
                        <h2 className="text-lg font-semibold">
                            LKR1,800 <span className="line-through text-muted-foreground">LKR2,100</span>
                        </h2>
                        <p className="text-muted-foreground">Men's Shoes</p>
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
                        <div style={{display:'flex', fontWeight:'bold', alignItems:'center', columnGap:'73%'}}>
                        <h3 className="text-xl">0</h3><i className="bi bi-chat text-xl"></i></div>
                        <p className="text-muted-foreground">Chats to answer</p>
                    </div>
                    <div className="pl-5 pt-2 border border-border rounded-lg" style={{height:'120%'}}>
                    <div style={{display:'flex', fontWeight:'bold', alignItems:'center', columnGap:'73%'}}>
                        <h3 className="text-xl">0</h3><i className="bi bi-tags text-xl"></i></div>
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
                    <p className="text-muted-foreground mt-4">
                        Marketplace items are public and can be seen by anyone on or off Vibez. 
                    </p>
                    <p className="text-muted-foreground">
                        Marketplace listings must not discriminate. 
                    </p>
                </div>            
                </div>}
                {productInfo && <div>
                    <div className="bg-card text-card-foreground w-full p-4 pt-2 mt-1 product-info">
                    <div className="grid grid-cols-3 gap-1 mb-4">
                        <img src="https://placehold.co/400x300" alt="Apple 11 Pro" className="rounded-lg mb-0"/>
                    </div>
                    <h2 className="text-lg font-bold">Apple 11 pro 64GB</h2>
                    <p className="text-muted-foreground">LKR 57,500</p>
                    <p className="text-sm">Send seller a message</p>
                    <button className="bg-secondary text-secondary-foreground hover:bg-secondary/80 py-2 px-4 rounded-lg mt-2">Send Message</button>
                    <div className="flex space-x-2 mt-4">
                        <button className="bg-muted text-muted-foreground hover:bg-muted/80 py-1 px-3 rounded-lg">Share offer</button>
                    </div>
                    <h3 className="mt-4 font-semibold">Description</h3>
                    <p className="text-sm text-muted-foreground">Apple 11 pro 64GB ... LKR 57500/ 0743620212.</p>

                    <div className="mt-4">
                        <h4 className="font-semibold">Seller information</h4>
                        <p className="text-sm">Sadun Lakshan</p>
                    </div>
                    </div>      
                </div>}
            </div>
    </div>
  )
}
