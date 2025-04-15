import { createContext, useContext, useEffect, useState } from "react";

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState([]);
  const[wishlistCount,setWishlistCount] = useState(0)
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("Wishlist")) || [];
    setWishlist(stored);
  }, []);
  
  useEffect(()=>{
   setWishlistCount(wishlist.length)
  },[wishlist])
  const isInWishlist = (serviceId) =>
    wishlist.some((item) => item.serviceId === serviceId);

  const toggleWishlist = (service) => {
    const exists = isInWishlist(service.serviceId);
    let updated;
 
    if (exists) {
      updated = wishlist.filter((item) => item.serviceId !== service.serviceId);
    } else {
      updated = [...wishlist, service];
    }

    localStorage.setItem("Wishlist", JSON.stringify(updated));
    setWishlist(updated);
    return !exists;
  };
  
  return (
    <WishlistContext.Provider value={{ wishlist, isInWishlist, toggleWishlist,wishlistCount }}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => useContext(WishlistContext);
