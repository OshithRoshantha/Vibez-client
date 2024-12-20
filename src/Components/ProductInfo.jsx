import { useState,useRef } from 'react';
import './Styles/Column2.css'

export default function ProductInfo({productName, productPrice, productDescription, sellerName}) {
  return (
    <div>
        <div className="bg-card text-card-foreground w-full p-4 pt-2 mt-1 product-info">
                <div className="grid grid-cols-3 gap-1 mb-4">
                    <img src="https://placehold.co/400x300" alt="Apple 11 Pro" className="rounded-lg mb-0"/>
                </div>
                <h2 className="text-lg font-bold">{productName}</h2>
                <p className="text-muted-foreground">{productPrice}</p>
                <p className="text-sm">Send seller a message</p>
                <button className="bg-secondary text-secondary-foreground hover:bg-secondary/80 py-2 px-4 rounded-lg mt-2">Send Message</button>
                <div className="flex space-x-2 mt-4">
                    <button className="bg-muted text-muted-foreground hover:bg-muted/80 py-1 px-3 rounded-lg">Share offer</button>
                </div>
                <h3 className="mt-4 font-semibold">Description</h3>
                <p className="text-sm text-muted-foreground">{productDescription}</p>
                <div className="mt-4">
                    <h4 className="font-semibold">Seller information</h4>
                    <p className="text-sm">{sellerName}</p>
                </div>
        </div>
    </div>
  )
}
