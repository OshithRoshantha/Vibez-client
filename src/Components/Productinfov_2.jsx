import './Styles/Column2.css';

export default function ProductInfo({ productName, productPrice, productDescription, sellerName, darkMode }) {
  return (
    <div>
      <div
        className={`bg-card text-card-foreground w-full p-4 pt-2 mt-1 product-info rounded-lg`}
        style={{ backgroundColor: darkMode ? '#262729' : '#ffffff' }}
      >
        <div className="grid grid-cols-3 gap-1 mb-4">
          <img
            src="https://placehold.co/400x300"
            alt={productName || 'Product Image'}
            className="rounded-lg mb-0"
          />
        </div>
        <h2 className={`${darkMode ? 'text-white' : 'text-black'} text-lg font-bold`}>
          {productName}
        </h2>
        <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{productPrice}</p>
        <p className={`${darkMode ? 'text-white' : 'text-black'} text-sm`}>Send seller a message</p>
        <div className="flex items-center mt-2">
          <button className="bg-primary text-white py-2 px-4 rounded-lg mr-5 hover:bg-primary/80">
            Send Message
          </button>
          <button
            className={`${
              darkMode
                ? 'bg-gray-600 text-white hover:bg-gray-500'
                : 'bg-gray-200 text-black hover:bg-gray-300'
            } py-2 px-4 rounded-lg`}
          >
            Share Offer
          </button>
        </div>
        <h3 className={`${darkMode ? 'text-white' : 'text-black'} mt-4 font-semibold`}>
          Description
        </h3>
        <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'} text-sm`}>
          {productDescription}
        </p>
        <div className="mt-4">
          <h4 className={`${darkMode ? 'text-white' : 'text-black'} font-semibold`}>
            Seller Information
          </h4>
          <div className="flex items-center mt-2">
            <img
              src="https://placehold.co/40x40"
              alt={`${sellerName || 'Seller'} Profile`}
              className="rounded-full mr-2 w-10 h-10"
            />
            <div>
              <p className={`${darkMode ? 'text-white' : 'text-black'} text-sm`}>{sellerName}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
