import React from 'react'

export default function PreviewProduct({darkMode, showProductInfo, productImages, productPrice, productTitle, productId, setClickedProduct}) {

    const handleClick = () => {
        setClickedProduct();
        showProductInfo(productId);
    }

  return (
    <>
    <div className="bg-card rounded-lg shadow-md overflow-hidden" style={{height:'87%', cursor:'pointer',backgroundColor: darkMode ? '#56585a':''}} onClick={handleClick}>
        <img src={productImages[0]} alt="Se2" className="w-full h-30 object-cover" style={{height:'65%'}}/>
        <div className="pl-4 pr-4 pt-2 pb-2">
            <h2 className={`${darkMode ? 'text-white':''} text-lg font-semibold`}>{productPrice}</h2>
            <p className={`${darkMode ? 'text-gray-400':'text-muted-foreground'}`}>{productTitle}</p>
        </div>
    </div>
    </>
  )
}
