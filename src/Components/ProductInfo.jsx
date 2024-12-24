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
                <button className="bg-primary text-white  py-2 px-4 rounded-lg mt-2 mr-5">Send Message</button>
                <button className="bg-muted text-muted-foreground hover:bg-muted/80 py-2 px-4 rounded-lg">Share offer</button>
                <h3 className="mt-4 font-semibold">Description</h3>
                <p className="text-sm text-muted-foreground">{productDescription}</p>
                <div className="mt-4">
                    <h4 className="font-semibold">Seller information</h4>
                    <div className="flex items-center mt-2">
                        <img src="https://placehold.co/40x40" className="rounded-full mr-2 w-55 h-55" />
                        <div>
                            <p className="text-sm">{sellerName}</p>
                        </div>
                    </div>
                </div>
        </div>
    </div>
  )
}
