import { useState,useRef } from 'react';
import './Styles/Column2.css'

export default function Marketplace() {
    const [forYouMenu, setForYouMenu] = useState(true);
    const [sellMenu, setSellMenu] = useState(false);
    const sellProductsRef = useRef(null);

    function showForYouMenu(){
        setForYouMenu(true);
        setSellMenu(false);
    }

    function showSellMenu(){
        setForYouMenu(false);
        setSellMenu(true);
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
                    <div className="bg-card rounded-lg shadow-md overflow-hidden" style={{height:'87%'}}>
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
                        <button className="bg-primary text-primary-foreground rounded-full p-4">
                        <img aria-hidden="true" alt="add-photo-icon" src="https://openui.fly.dev/openui/24x24.svg?text=➕" />
                        </button>
                        <h2 className="text-lg font-semibold mt-2">Add photos</h2>
                        <p className="text-muted-foreground text-sm">Choose your listing's main photo.</p>
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
                    </div>
                <div className="flex justify-between mb-4">
                    <button className="bg-primary text-primary-foreground px-4 py-2 rounded-lg w-full" onClick={handlePublishClick}>Publish</button>
                </div>
                </div>            
                </div>}
            </div>
    </div>
  )
}
