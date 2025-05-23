import { useState,useRef,useEffect } from 'react';
import './Styles/Column2.css'
import ProductInfo from './ProductInfo';
import YourListings from './YourListings';
import EditListing from './EditListing';
import { getActiveListingCount, getMyListings, getTotalClicks, searchProducts} from  '../Services/MarketplaceService';
import PreviewProduct from './PreviewProduct';
import { Skeleton } from "@/components/ui/skeleton";
import { useWebSocket } from '../Context/WebSocketContext';
import { uploadMultipleFiles } from '../Services/s3Service';
import { useIsMobile } from '../hooks/useIsMobile';
import errDark from '@/assets/Icons/listingErdark.png';
import errLight from '@/assets/Icons/listingEr.png';
import { useGlobalStore } from '../States/UseStore';

export default function Marketplace({darkMode, showDirectMessages, setReceiverId, setShowMobileRight}) {

    const isMobile = useIsMobile();
    const { addListing } = useWebSocket();

    const { productList, loadingProducts } = useGlobalStore();
    const [resultsList, setResultsList] = useState([]);
    const [myListings, setMyListings] = useState([]);
    const [editingProductId, setEditingProductId] = useState();
    const [expandingProductId, setExpandingProductId] = useState();
    const [loadingResults, setLoadingResults] = useState(true);
 
    const [forYouMenu, setForYouMenu] = useState(true);
    const [sellMenu, setSellMenu] = useState(false);
    const [productInfo, setProductInfo] = useState(false);
    const [showResults, setShowResults] = useState(false);
    const [yourListningMenu, setYourListningMenu] = useState(false);
    const [editListingMenu, setEditListingMenu] = useState(false);
    const sellProductsRef = useRef(null);
    const fileInputRef = useRef(null);
    const [selectedImages, setSelectedImages] = useState([]);
    const [title, setTitle] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("");
    const [description, setDescription] = useState("");
    const [location, setLocation] = useState("");
    const [hideFromFriends, setHideFromFriends] = useState(false);
    const [errors, setErrors] = useState({});
    const [activeListingsCount, setActiveListingsCount] = useState(0);
    const [totalClicks, setTotalClicks] = useState(0);
    const inputRef = useRef(null);
    const [searchKeyword, setSearchKeyword] = useState('');

    const handleSearchChange = async (e) => {
        const value = e.target.value;
        setSearchKeyword(value); 
        if (value.length > 0) {
            setLoadingResults(true); 
            setShowResults(true);
            setForYouMenu(false);
            setSellMenu(false);
            setProductInfo(false);
            setYourListningMenu(false);
            setEditListingMenu(false);
            await new Promise((resolve) => setTimeout(resolve, 0));
            await fetchSearchResults(); 
            setLoadingResults(false);
        } else {
            setShowResults(false);
            setForYouMenu(true);
            setSellMenu(false);
            setProductInfo(false);
            setYourListningMenu(false);
            setEditListingMenu(false);
        }
    };
    
    const handleIconClick = () => {
        if (searchKeyword !== '') {
        setSearchKeyword(''); 
        setShowResults(false);
        setForYouMenu(true);
        }
    }

    const validateFields = () => {
        const newErrors = {};
        if (!title.trim()) newErrors.title = "Enter a title to continue.";
        if (!category.trim()) newErrors.category = "Select a category to finish your listing.";
        if (!price.trim()) newErrors.price = "Enter a price to continue.";
        return newErrors;
    };
  
    const handleTitleChange = (e) => setTitle(e.target.value);
    const handlePriceChange = (event) => {
        const inputValue = event.target.value;
        const numericValue = inputValue.replace(/^LRK\s*/, "");
        if (/^\d*\.?\d*$/.test(numericValue)) {
          setPrice(numericValue); 
        }
    };
    const handleCategoryChange = (e) => setCategory(e.target.value);
    const handleDescriptionChange = (e) => setDescription(e.target.value);
    const handleLocationChange = (e) => setLocation(e.target.value);
    const toggleHideFromFriends = () => setHideFromFriends((prev) => !prev);

    const handleImageUpload = async () => {
        const files = await Promise.all(
            selectedImages.map(async (image) => {
                const blob = await fetch(image).then(res => res.blob());
                return new File([blob], `marketplaceItem_${title}.png`, { type: "image/png" });
            })
        );
        return await uploadMultipleFiles(files);
    };
    

    const createListing = async () => {
        const validationErrors = validateFields();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            if (sellProductsRef.current) {
                sellProductsRef.current.scrollTo({
                    top: 0,
                    behavior: "smooth", 
                });
            }
            return; 
        }
        const uploadedImageUrls = await handleImageUpload();
        await addListing(title, price, description, uploadedImageUrls, location, hideFromFriends, category);
        if (sellProductsRef.current) {
            sellProductsRef.current.scrollTo({
                top: 0,
                behavior: "smooth", 
            });
        }
        setTitle("");
        setPrice("");
        setCategory("");
        setDescription("");
        setLocation("");
        setHideFromFriends(false);
        setSelectedImages([]);
        setErrors({});
    }

    const autoScroll = () => {
        if (sellProductsRef.current) {
            sellProductsRef.current.scrollTo({
                top: 0,
                behavior: "smooth", 
            });
        }
    }

    function addImages() {
        if (fileInputRef.current) {
            fileInputRef.current.click(); 
        }
    }
    
    const fetchSearchResults = async () => {
        try{
            const response = await searchProducts(searchKeyword);
            setResultsList(response);
            console.log(response);
        } finally{
            setLoadingResults(false);
        }
    }

    const fetchActiveListingCount = async () => {
        const response = await getActiveListingCount();
        setActiveListingsCount(response);
    }

    const fetchTotalClicks = async () => {
        const response = await getTotalClicks();
        setTotalClicks(response);

    }

    const fetchMyListings = async () => {
        const response = await getMyListings();
        setMyListings(response);
    }
    
    useEffect(() => {
        fetchActiveListingCount();
        fetchTotalClicks();
        fetchMyListings();
    }, [productList]);


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
        setYourListningMenu(false);
        setEditListingMenu(false);
        setShowResults(false);
    }

    function showSellMenu(){
        setForYouMenu(false);
        setSellMenu(true);
        setProductInfo(false);
        setYourListningMenu(false);
        setEditListingMenu(false);
        setShowResults(false);
    }

    function showProductInfo(){
        setProductInfo(true);
        setSellMenu(false);
        setForYouMenu(false);
        setYourListningMenu(false);
        setEditListingMenu(false); 
        setShowResults(false); 
    }

    function showYourListningMenu(){
        setYourListningMenu(true);
        setProductInfo(false);
        setSellMenu(false);
        setForYouMenu(false);
        setEditListingMenu(false);
        setShowResults(false);
    }

    function showEditListingMenu(){
        setEditListingMenu(true);
        setProductInfo(false);
        setSellMenu(false);
        setForYouMenu(false);
        setYourListningMenu(false);
        setShowResults(false);
    }

  return (
    <div>
        <div className={`${darkMode ? 'border-gray-600 border-r border-border':'border-r border-border'}  p-4 chats-column`} style={{backgroundColor: darkMode ? '#262729' : '', height: isMobile ? '90vh' : '100vh', width: isMobile ? '100vw' : ''}}>
            <h2 className={`${darkMode ? 'text-white' :'text-black'} text-lg font-semibold column-header`}>Marketplace</h2>
                <input
                    ref={inputRef}
                    type="text"
                    placeholder="What do you want to buy?"
                    value={searchKeyword}
                    onChange={handleSearchChange}
                    className={`${darkMode ? 'bg-[#3c3d3f] placeholder:text-[#abacae] text-white' : 'bg-gray-200'} w-full px-4 py-2 mb-4 focus:outline-none focus:border-none placeholder:text-gray-500  text-gray-500 `}
                    style={{ borderRadius: '20px' }}
                />
                <i
                    className={`${
                    darkMode ? 'text-[#abacae]' : 'text-gray-500'
                    } bi cursor-pointer absolute text-2xl ${
                    searchKeyword === '' ? 'bi-search' : 'bi-x-circle-fill'
                    }`}
                    style={{ marginLeft: isMobile ? '-10%' : '-3%', marginTop: isMobile ? '0.5%': '0.2%' }}
                    onClick={handleIconClick}
                ></i>
                <div className="flex space-x-2 mb-4">
                    <button onClick={showSellMenu} className={`${darkMode ? 'bg-[#223b51] text-[#59abff] hover:bg-[#184e88]':'bg-gray-300 text-gray-600  hover:bg-gray-200'} px-4 py-2 rounded-full border-none`}>Sell</button>
                    <button onClick={showYourListningMenu} className={`${darkMode ? 'bg-[#223b51] text-[#59abff] hover:bg-[#184e88]':'bg-gray-300 text-gray-600  hover:bg-gray-200'} px-4 py-2 rounded-full border-none`}>Your listings</button>
                    <button onClick={showForYouMenu} className={`${darkMode ? 'bg-[#223b51] text-[#59abff] hover:bg-[#184e88]':'bg-gray-300 text-gray-600  hover:bg-gray-200'} px-4 py-2 rounded-full border-none`}>For you</button>
                </div>
            {showResults && <div className='product-list'>
                <div className='product-list' style={{height: isMobile ? '55vh' : ''}}>
                    <div className="grid grid-cols-2 gap-x-4 gap-y-0 p-0 w-full"> 
                        {loadingResults && <>
                            {Array.from({ length: 6 }).map((_, index) => (
                                <div
                                key={index}
                                className="bg-card rounded-lg shadow-md overflow-hidden"
                                style={{
                                    height: '220px',
                                    cursor: 'pointer',
                                    backgroundColor: darkMode ? '#56585a' : '#c9c9c9',
                                    marginBottom: '25px',
                                    width: '95%'
                                }}
                                >
                                <Skeleton className="w-full h-[65%] object-cover" />
                                <div className="pl-2 pr-4 pt-2 pb-2 mt-0">
                                    <Skeleton className="h-6 w-[120px]" />
                                    <Skeleton className="h-4 w-[160px] mt-2" />
                                </div>
                                </div>
                            ))}                  
                        </>}
                        {!loadingResults && <>
                            {resultsList.map((product) => (
                                    <PreviewProduct
                                        key={product.productId}
                                        darkMode={darkMode}
                                        showProductInfo={showProductInfo}
                                        productId = {product.productId}
                                        productPrice={product.price} 
                                        productTitle={product.productTitle}
                                        productImages={product.productPhotos}
                                        setExpandingProductId={setExpandingProductId}
                                    />
                            ))}
                        </>}
                    </div>
                </div>                         
            </div>}
            {forYouMenu && 
                <div className='product-list' style={{height: isMobile ? '55vh' : ''}}>
                    <div className="grid grid-cols-2 gap-x-4 gap-y-5 p-0 w-full"> 
                    {loadingProducts ? (<>
                        {Array.from({ length: 6 }).map((_, index) => (
                            <div
                            key={index}
                            className="bg-card rounded-lg shadow-md overflow-hidden"
                            style={{
                                height: '220px',
                                cursor: 'pointer',
                                backgroundColor: darkMode ? '#56585a' : '#c9c9c9',
                                marginBottom: '25px',
                                width: '95%'
                            }}
                            >
                            <Skeleton className="w-full h-[65%] object-cover" />
                            <div className="pl-2 pr-4 pt-2 pb-2 mt-0">
                                <Skeleton className="h-6 w-[120px]" />
                                <Skeleton className="h-4 w-[160px] mt-2" />
                            </div>
                            </div>
                        ))}                     
                    </>) : (<>
                        {productList.map((product) => (
                            <PreviewProduct
                                key={product.productId}
                                darkMode={darkMode}
                                showProductInfo={showProductInfo}
                                productId = {product.productId}
                                productPrice={product.price} 
                                productTitle={product.productTitle}
                                productImages={product.productPhotos}
                                setExpandingProductId={setExpandingProductId}
                            />
                    ))}</>)}
                    </div>
                </div>
            }
            {sellMenu && 
            <div className='sell-products' ref={sellProductsRef}  style={{height: isMobile ? '55vh' : ''}}>
                <div className="p-6 pt-1 bg-card text-card-foreground" style={{backgroundColor: darkMode ? '#262729' : ''}}>
                <h2 className={`${darkMode ? 'text-white':''} text-lg font-semibold mb-2`}>Overview</h2>
                <div className="grid grid-cols-2 gap-x-4 gap-y-0 mb-6">
                    <div className="pl-5 pt-2 border border-border rounded-lg" style={{height:'120%'}}>
                        <div style={{display:'flex', fontWeight:'bold', alignItems:'center'}}>
                            <i className={`${darkMode ? 'text-white':''} bi bi-mouse text-xl`}></i>&nbsp;&nbsp;<h3 className={`${darkMode ? 'text-white':''} text-xl`}>{totalClicks}</h3>
                        </div>
                        <p className={`${darkMode ? 'text-gray-400':'text-muted-foreground'}`}>Total clicks</p>
                    </div>
                    <div className="pl-5 pt-2 border border-border rounded-lg" style={{height:'120%', cursor:'pointer'}} onClick={showYourListningMenu}>
                        <div style={{display:'flex', fontWeight:'bold', alignItems:'center'}}>
                            <i className={`${darkMode ? 'text-white':''} bi bi-tags text-xl`}></i>&nbsp;&nbsp;<h3 className={`${darkMode ? 'text-white':''} text-xl`}>{activeListingsCount}</h3>
                        </div>
                        <p className={`${darkMode ? 'text-gray-400':'text-muted-foreground'}`}>Active listings</p>
                    </div>
                </div>
                <h2 className={`${darkMode ? 'text-white':''} text-lg font-semibold mb-2 mt-5`}>New listing</h2>
                <div className={`bg-background ${isMobile ? 'py-6 px-1' : 'p-6'} rounded-lg w-full`} style={{backgroundColor: darkMode ? '#262729' : ''}}>
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
                        <h2 className={`${darkMode ? 'text-white':''} text-lg font-semibold mt-2`}>Add photos</h2>
                        <p className={`${darkMode ? 'text-gray-400':'text-muted-foreground'} text-sm`}>Choose your listing's photos.</p>
                    </div>
                </div>
                </div>
                <div className="mb-4">
                    <input type="text" className={`${darkMode ? 'bg-[#262729] text-white placeholder:text-gray-400 ' : ' bg-white text-black placeholder:text-gray-500'} py-2 border rounded-lg p-2 w-full`} style={{ outline: errors.title ? '1px solid #f01e2c' : '1px solid #c1c3c7'}} placeholder="Title" value={title} onChange={handleTitleChange}/>
                    {errors.title && <span style={{ color: "red", fontSize:'85%'}}>{errors.title}</span>}
                </div>
                <div className="mb-4">
                    <input type="text" className={`${darkMode ? 'bg-[#262729] text-white placeholder:text-gray-400 ' : ' bg-white text-black placeholder:text-gray-500'} py-2 border rounded-lg p-2 w-full`} style={{ outline: errors.price ? '1px solid #f01e2c' : '1px solid #c1c3c7'}} placeholder="Price"  value={price ? `LRK ${price}` : ""} onChange={handlePriceChange}/>
                    {errors.price && <span style={{ color: "red", fontSize:'85%'}}>{errors.price}</span>}
                </div>
                <div className="mb-4">
                    <select className={`${darkMode ? 'bg-[#262729] text-gray-400' : 'bg-white text-gray-500'} border rounded-lg p-2 w-full`} style={{ outline: errors.category ? '1px solid #f01e2c' : '1px solid #c1c3c7'}} value={category} onChange={handleCategoryChange}>
                        <option value="" disabled selected>Category</option>
                        <option className={`${darkMode ? 'text-white' : 'text-black'}`}>New</option>
                        <option className={`${darkMode ? 'text-white' : 'text-black'}`}>Used - like new</option>
                        <option className={`${darkMode ? 'text-white' : 'text-black'}`}>Used - good</option>
                        <option className={`${darkMode ? 'text-white' : 'text-black'}`}>Used - fair</option>
                    </select>
                    {errors.category && <span style={{ color: "red", fontSize:'85%'}}>{errors.category}</span>}
                </div>
                <div className="mb-4">
                    <textarea className={`${darkMode ? 'bg-[#262729] text-white placeholder:text-gray-400 ' : ' bg-white text-black placeholder:text-gray-500'} py-2 border rounded-lg p-2 w-full`} style={{ outline: '1px solid #c1c3c7'}}  placeholder="Description" rows="4" value={description} onChange={handleDescriptionChange}></textarea>
                </div>
                <div className="mb-4">
                    <input type="text" className={`${darkMode ? 'bg-[#262729] text-white placeholder:text-gray-400 ' : ' bg-white text-black placeholder:text-gray-500'} py-2 border rounded-lg p-2 w-full`} style={{ outline: '1px solid #c1c3c7'}}  placeholder="Location" value={location} onChange={handleLocationChange}/>
                </div>
                    <h2 className={`${darkMode ? 'text-white':'text-foreground'} text-lg font-semibold`}>Listing Options</h2>
                    <div className="flex items-center justify-between p-4 border-b border-border">
                        <div>
                            <h3 className={`${darkMode ? 'text-white':'text-foreground'} font-medium`}>Hide from friends</h3>
                            <p className={`${darkMode ? 'text-gray-400':'text-muted-foreground'}`}>This listing is still public but will be hidden from your friends on Vibez.</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" className="sr-only peer" checked={hideFromFriends} onChange={toggleHideFromFriends}/>
                            <div className="w-11 h-6 bg-zinc-200 rounded-full peer peer-checked:bg-primary peer-checked:after:translate-x-full peer-checked:after:bg-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:border after:border-zinc-300 after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
                        </label>
                    </div>
                </div>
                <div className="flex justify-between mb-4">
                    <button className="bg-primary text-primary-foreground px-4 py-2 rounded-lg w-full" onClick={createListing}>Publish</button>
                </div>
                    <p className={`${darkMode ? 'text-gray-400':'text-muted-foreground'} mt-4 text-sm`}>
                        Marketplace items are public and can be seen by anyone on or off Vibez. 
                    </p>
                    <p className={`${darkMode ? 'text-gray-400':'text-muted-foreground'} text-sm`}>
                        Marketplace listings must not discriminate. 
                    </p>
                </div>            
            </div>}
            {yourListningMenu && <div className='product-list'  style={{height: isMobile ? '55vh' : ''}}>
                {myListings.length === 0 ? (
                    <div> 
                        <div className="flex flex-col items-center justify-center" style={{ marginTop: '15%', padding: '0 5%' }}>
                            <img
                                aria-hidden="true"
                                alt="document-icon"
                                src={`${darkMode ? errDark : errLight}`}
                                style={{ height: '125px', width: '125px' }}
                            />
                            <h2 className={`${darkMode ? 'text-white' : ''} mt-2 text-lg font-semibold`}>
                            Ready to start selling?
                            </h2>
                            <p className={`${darkMode ? 'text-gray-300' : 'text-muted-foreground'} mt-0 text-center`}>Once you're up and running, use "Your listings" to manage all of your selling activites in one place.</p>
                            <button onClick={showSellMenu} className="bg-primary text-primary-foreground hover:bg-primary/80 px-3 py-2 rounded" style={{marginTop:'20px'}}>Create new listing</button>
                        </div>                        
                    </div>
                ) : (
                    myListings.map((listing) => (
                        <YourListings
                            key={listing.productId}
                            darkMode={darkMode}
                            productId={listing.productId}
                            showEditListingMenu={showEditListingMenu}
                            productTitle={listing.productTitle}
                            productDesc={listing.productDesc}
                            price={listing.price}
                            productPhotos={listing.productPhotos[0]}
                            listedDate={listing.listedDate}
                            setEditingProductId={setEditingProductId}
                        />
                    ))
                )}
            </div>}
            {editListingMenu && <div className='sell-products' ref={sellProductsRef}><EditListing autoScroll={autoScroll} darkMode={darkMode} editingProductId={editingProductId} showYourListningMenu={showYourListningMenu}/></div>}
            {productInfo && <div>
                    <ProductInfo darkMode={darkMode} setReceiverId={setReceiverId} setShowMobileRight={setShowMobileRight} showDirectMessages={showDirectMessages} expandingProductId={expandingProductId}/>      
            </div>}
            </div>
    </div>
  )
}
