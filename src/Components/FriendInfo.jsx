import {useState} from 'react'

export default function FriendInfo() {
  const [isFavorite, setIsFavorite] = useState(true);

  function setToFavorite() {
    setIsFavorite(true);
  }

  function unsetFromFavorite() {
    setIsFavorite(false);
  }

  function toggleFavorite(){
    if(isFavorite){
      unsetFromFavorite();
    } else {
      setToFavorite();
    }
  }

  var user = "testUser"
  return (
    <div>
      <div className="border-r border-border p-4 info-column" style={{backgroundColor:'#f2f3f7'}}>
      <h2 className="text-lg font-semibold mb-4">Friend info</h2>
        <div className="bg-card p-6 w-full" style={{marginTop:'12%', backgroundColor:'#f2f3f7'}} >
          <div className="flex flex-col items-center">
            <div className=" rounded-full flex items-center justify-center mb-4" style={{backgroundColor:'red', width:'150px', height:'150px'}}>
              
            </div>
            <h2 className="text-xl font-semibold text-foreground">{user}</h2>
            <p className="text-muted-foreground">email</p>
            <p className="text-muted-foreground text-sm">about</p>
          </div>
            <ul className="space-y-2" style={{marginTop:'10%'}} >
              <li className="flex items-center py-2 px-3 text-black rounded-lg hover:bg-gray-200 " onClick={toggleFavorite} style={{cursor:'pointer'}}>
                <i className={`bi ${isFavorite ? 'bi-star' : 'bi-star-fill'}`}></i>&nbsp;&nbsp;
                <span>{isFavorite ? 'Remove from favorites' : 'Add to favorites'}</span>        
              </li>
              <li className="flex items-center py-2 px-3 text-destructive rounded-lg hover:bg-gray-200 "  style={{cursor:'pointer'}}>
                <i className="bi bi-ban"></i>&nbsp;&nbsp;
                <span>Block {user}</span>
              </li>
              <li className="flex items-center py-2 px-3 text-destructive rounded-lg hover:bg-gray-200 "  style={{cursor:'pointer'}}>
                <i className="bi bi-hand-thumbs-down"></i>&nbsp;&nbsp;
                <span>Unfriend {user}</span>
              </li>
              <li className="flex items-center py-2 px-3 text-destructive rounded-lg hover:bg-gray-200 "  style={{cursor:'pointer'}}>
                <i className="bi bi-trash"></i>&nbsp;&nbsp;
                <span>Delete chat</span>
              </li>
            </ul>
        </div>
      </div>
    </div>
  )
}
