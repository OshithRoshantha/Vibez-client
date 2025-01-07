import './Styles/Column2.css'
import { getProductDetails } from  '../Services/MarketplaceService';
import { useState, useEffect } from 'react';

export default function ProductInfo({expandingProductId, darkMode}) {

    const [product, setProduct] = useState(null); 
    const [loading, setLoading] = useState(true); 
  
    const fetchProductInfo = async () => {
      try {
        setLoading(true); 
        const productDetails = await getProductDetails(expandingProductId);
        console.log(productDetails);
        setProduct(productDetails); 
      } finally {
        setLoading(false); 
      }
    };
  
    useEffect(() => {
      if (expandingProductId) {
        fetchProductInfo();
      }
    }, [expandingProductId]);

  return (
    <div>
        <div className="bg-card text-card-foreground w-full p-4 pt-2 mt-1 product-info"  style={{backgroundColor: darkMode ? '#262729' : ''}}>
                {loading && <></>}
                {!loading && <>
                    <div className="grid grid-cols-3 gap-1 mb-4">
                        {product.productPhotos?.map((photo, index) => (
                            <img
                            key={index}
                            src={photo}
                            alt={`Product Image ${index + 1}`}
                            className="rounded-lg mb-0"
                            />
                        ))}
                    </div>
                    <h2 className={`${darkMode ? 'text-white':''} text-lg font-bold`}>{product.productTitle}</h2>
                    <p className={`${darkMode ? 'text-gray-400':'text-muted-foreground'}`}>LRK {product.price}</p>
                    <p className={`${darkMode ? 'text-white':''} text-sm`}>Send seller a message</p>
                    <button className="bg-primary text-white  py-2 px-4 rounded-lg mt-2 mr-5">Send Message</button>
                    <button className={`${darkMode ? 'bg-[#6a6b6d] text-white hover:bg-[#545454]':'bg-muted text-muted-foreground hover:bg-gray-300'} py-2 px-4 rounded-lg border-none`}>Share offer</button>
                    <h3 className={`${darkMode ? 'text-white':''} mt-4 font-semibold`}>Description</h3>
                    <p className={`${darkMode ? 'text-gray-300':'text-muted-foreground'} text-sm`}>{product.productDesc || 'Contact seller for details.'}</p>
                    <h3 className={`${darkMode ? 'text-white':''} mt-4 font-semibold`}>Condition</h3>
                    <p className={`${darkMode ? 'text-gray-300':'text-muted-foreground'} text-sm`}>{product.condition}</p>
                    <h3 className={`${darkMode ? 'text-white':''} mt-4 font-semibold`}>Location</h3>
                    <p className={`${darkMode ? 'text-gray-300':'text-muted-foreground'} text-sm`}>{product.location || 'Contact seller for location'}</p>
                    <div className="mt-4">
                        <h4 className={`${darkMode ? 'text-white':''} font-semibold`}>Seller information</h4>
                        <div className="flex items-center mt-2">
                            <img src={product.sellerProfilePicture} className="rounded-full mr-2 w-55 h-55" style={{height:'35px', width:'35px'}} />
                            <div>
                                <p className={`${darkMode ? 'text-white':''} text-sm`}>{product.sellerName}</p>
                            </div>
                        </div>
                    </div>
                </>}
        </div>
    </div>
  )
}
