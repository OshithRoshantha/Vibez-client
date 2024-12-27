import './Styles/Column2.css'

export default function ProductInfo({productName, productPrice, productDescription, sellerName, darkMode}) {
  return (
    <div>
        <div className="bg-card text-card-foreground w-full p-4 pt-2 mt-1 product-info"  style={{backgroundColor: darkMode ? '#262729' : ''}}>
                <div className="grid grid-cols-3 gap-1 mb-4">
                    <img src="https://placehold.co/400x300" alt="Apple 11 Pro" className="rounded-lg mb-0"/>
                </div>
                <h2 className={`${darkMode ? 'text-white':''} text-lg font-bold`}>{productName}</h2>
                <p className={`${darkMode ? 'text-gray-400':'text-muted-foreground'}`}>{productPrice}</p>
                <p className={`${darkMode ? 'text-white':''} text-sm`}>Send seller a message</p>
                <button className="bg-primary text-white  py-2 px-4 rounded-lg mt-2 mr-5">Send Message</button>
                <button className={`${darkMode ? 'bg-[#6a6b6d] text-white hover:bg-[#545454]':'bg-muted text-muted-foreground hover:bg-gray-300'} py-2 px-4 rounded-lg border-none`}>Share offer</button>
                <h3 className={`${darkMode ? 'text-white':''} mt-4 font-semibold`}>Description</h3>
                <p className={`${darkMode ? 'text-gray-300':'text-muted-foreground'} text-sm`}>{productDescription}</p>
                <div className="mt-4">
                    <h4 className={`${darkMode ? 'text-white':''} font-semibold`}>Seller information</h4>
                    <div className="flex items-center mt-2">
                        <img src="https://placehold.co/40x40" className="rounded-full mr-2 w-55 h-55" />
                        <div>
                            <p className={`${darkMode ? 'text-white':''} text-sm`}>{sellerName}</p>
                        </div>
                    </div>
                </div>
        </div>
    </div>
  )
}
