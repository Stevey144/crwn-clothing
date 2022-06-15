import { createContext,useState, useEffect} from "react";

const addCartItem = (cartItems,productToAdd) =>{
    //find if cartitem contains productToAdd
    const existingCartItem = cartItems.find((cartItem) => cartItem.id == productToAdd.id);
    //if  found increment the quantity
    if(existingCartItem){
        alert("item added successfully");
        return cartItems.map((cartItem) =>cartItem.id == productToAdd.id ?
         {...cartItem,quantity:cartItem.quantity + 1}
         : cartItem
         );
    }
    //return new array with modified cart items
    return [...cartItems, {...productToAdd, quantity: 1}];
}

const removeCartItem = (cartItems,cartItemToRemove) =>{
    //find the cart item to remove
    const existingCartItem = cartItems.find((cartItem) => cartItem.id == cartItemToRemove.id);

    //check if quantity is equal to 1, if it is remove that item from cart
    if(existingCartItem.quantity == 1){
        return cartItems.filter(cartItem => cartItem.id != cartItemToRemove.id)
    }

    //return back cartitems with matching cartItem with reduced quantity
    return cartItems.map((cartItem) =>cartItem.id == cartItemToRemove.id ?
    {...cartItem,quantity:cartItem.quantity - 1}
    : cartItem
    );
}

const clearCartItem = (cartItems,cartItemToClear) => {
    return cartItems.filter((cartItem) => cartItem.id != cartItemToClear.id);

}


export const CartContext = createContext({
    isCartOpen:false,
    setIsCartOpen: () =>{},
    cartItems : [],
    addItemToCart: () =>{},
    removeItemFromCart : () =>{},
    clearItemFromCart:() =>{},
    cartCount:0,
    carTotal : 0
});

export const CartProvider = ({ children }) => {
    
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [cartCount, setCartCount] = useState(0);
    const [carTotal, setCartTotal] = useState(0);


    useEffect(() =>{
     const newCartCount = cartItems.reduce((total, cartItem) => total + cartItem.quantity, 0)
     setCartCount(newCartCount);

    }, [cartItems]);

    
    useEffect(() =>{
const newCarTotal = cartItems.reduce((total, cartItem) => total + cartItem.quantity * cartItem.price, 0)
     setCartTotal(newCarTotal);
       }, [cartItems]);

    const addItemToCart = (productToAdd) =>{
        setCartItems(addCartItem(cartItems,productToAdd));
     };

     const removeItemToCart = (cartItemToRemove) =>{
        setCartItems(removeCartItem(cartItems,cartItemToRemove));
     };

     const clearItemFromCart = (cartItemToClear) =>{
        setCartItems(clearCartItem(cartItems, cartItemToClear));
     };

    const value = {isCartOpen,setIsCartOpen,addItemToCart,removeItemToCart,clearItemFromCart,carTotal,cartItems,cartCount};
     return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}