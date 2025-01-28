import './Styles/Column2.css'
import { getProductDetails, isUserSeller, addClick } from  '../Services/MarketplaceService';
import { useState, useEffect } from 'react';
import { Skeleton } from "@/components/ui/skeleton";
import { useWebSocket } from '../Context/WebSocketContext';
import { sendMessage } from '../Services/ChatService';

export default function ProductInfo({expandingProductId, darkMode, showDirectMessages, setReceiverId}) {

  const { messages } = useWebSocket();
  const [processedMessages, setProcessedMessages] = useState([]);

  const [product, setProduct] = useState(null); 
  const [loading, setLoading] = useState(true); 
  
    const fetchProductInfo = async () => {
      try {
        setLoading(true); 
        const productDetails = await getProductDetails(expandingProductId);
        setProduct(productDetails); 
        await addClick(expandingProductId);
      } finally {
        setLoading(false); 
      }
    };
  
    useEffect(() => {
      if (expandingProductId) {
        fetchProductInfo();
      }
    }, [expandingProductId]);

    useEffect(() => {
        const handleMessages = async () => {
            if (messages.length === 0) {
                return;
            }
            const newMessages = messages.filter(message => !processedMessages.includes(message.id));
            if (newMessages.length === 0) {
                return; 
            }
            for (const lastMessage of newMessages) {
                switch (lastMessage.action) {
                    case 'marketplaceService': {
                        fetchProductInfo();
                        break; 
                    }
                    case 'profileService': {
                        const response = await isUserSeller(lastMessage.body);
                        if(response){
                          fetchProductInfo();
                        }
                        break;  
                    }
                    default:
                        break;
                }
            }
            setProcessedMessages(prevProcessedMessages => [
                ...prevProcessedMessages,
                ...newMessages.map(message => message.id),
            ]);
        };
        handleMessages();
    }, [messages, processedMessages]);  
    
    const handleSendMessage = () => {
        setReceiverId(product.sellerId);
        showDirectMessages();
    }

    const sendMessageToSeller = async () => {
      const typedMessage = `I'm interested in the ${product.productTitle} listed by you at LKR ${product.price}. Is it still available?`;
      await sendMessage(product.sellerId, typedMessage);
    }

  return (
    <div>
        <div className="bg-card text-card-foreground w-full p-4 pt-2 mt-1 product-info"  style={{backgroundColor: darkMode ? '#262729' : ''}}>
                {loading && <>  
                <div>       
                    <div className="grid grid-cols-3 gap-1 mb-4">
                    {Array.from({ length: 3 }).map((_, index) => (
                        <Skeleton key={index} className="h-[150px] w-full rounded-lg" />
                    ))}
                    </div>
                    <Skeleton className="h-6 w-[200px]" />
                    <Skeleton className="h-4 w-[100px] mt-2" />
                    <Skeleton className="h-4 w-[150px] mt-2" />
                    <div className="flex space-x-3 mt-4">
                    <Skeleton className="h-10 w-[120px] rounded-lg" />
                    <Skeleton className="h-10 w-[120px] rounded-lg" />
                    </div>
                    <Skeleton className="h-6 w-[120px] mt-4" />
                    <Skeleton className="h-4 w-full mt-2" />
                    <Skeleton className="h-6 w-[120px] mt-4" />
                    <Skeleton className="h-4 w-[200px] mt-2" />
                    <Skeleton className="h-6 w-[120px] mt-4" />
                    <Skeleton className="h-4 w-[200px] mt-2" />
                    <div className="mt-4">
                    <Skeleton className="h-6 w-[200px]" />
                    <div className="flex items-center mt-2 space-x-2">
                        <Skeleton className="h-10 w-10 rounded-full" />
                        <div>
                        <Skeleton className="h-4 w-[150px]" />
                        <Skeleton className="h-4 w-[100px] mt-1" />
                        </div>
                    </div>
                    </div>
                  </div>        
                </>}
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
                    <p className={`${darkMode ? 'text-gray-400':'text-muted-foreground'} font-bold`}>LRK {new Intl.NumberFormat().format(product.price)}</p>
                    <p className={`${darkMode ? 'text-white':''} text-sm`}>Send seller a message</p>
                    <button onClick={() => { handleSendMessage(); sendMessageToSeller(); }} className="bg-primary text-white  py-2 px-4 rounded-lg mt-2 mr-5">Send Message</button>
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
