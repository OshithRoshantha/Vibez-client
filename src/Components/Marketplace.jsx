import React from 'react'
import './Styles/Column2.css'

export default function Marketplace() {
  return (
    <div>
        <div className="border-r border-border p-4 chats-column">
                <h2 className="text-lg font-semibold column-header">Marketplace</h2>
                <input type="text" placeholder="Search" className="w-full p-2 border border-border rounded mb-4" />
                <div className="flex space-x-2 mb-4">
                    <button className="bg-muted text-muted-foreground px-4 py-2 rounded-full border-none hover:bg-gray-300">Sell</button>
                    <button className="bg-muted text-muted-foreground px-4 py-2 rounded-full border-none hover:bg-gray-300">For you</button>
                </div>
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
            </div>
    </div>
  )
}
