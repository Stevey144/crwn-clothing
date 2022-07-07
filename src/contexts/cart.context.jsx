import { createContext,useReducer} from "react";
import { useState } from "react";
import createAction from "../utils/reducer/reducer.utils";



const addCartItem = (cartItems,productToAdd) =>{
    //find if cartitem contains productToAdd
    const existingCartItem = cartItems.find((cartItem) => cartItem.id == productToAdd.id);
    //if  found increment the quantity
    if(existingCartItem){
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
    if(existingCartItem.quantity === 1){
        return cartItems.filter(cartItem => cartItem.id !== cartItemToRemove.id)
    }

    //return back cartitems with matching cartItem with reduced quantity
    return cartItems.map((cartItem) =>cartItem.id === cartItemToRemove.id ?
    {...cartItem,quantity:cartItem.quantity - 1}
    : cartItem
    );
}

const clearCartItem = (cartItems,cartItemToClear) => {
    return cartItems.filter((cartItem) => cartItem.id !== cartItemToClear.id);
}

export const CartContext = createContext({
    isCartOpen:false,
    setIsCartOpen: () =>{},
    cartItems : [],
    addItemToCart: () =>{},
    removeItemFromCart : () =>{},
    clearItemFromCart:() =>{},
    cartCount:0,
    cartTotal:0
});

const INITIAL_STATE = {
    isCartOpen:false,
    cartItems : [],
    cartCount:0,
    cartTotal:0
}

const CART_ACTION_TYPES = {
    SET_CART_ITEMS : 'SET_CART_ITEMS',
    SET_IS_CART_OPEN : 'SET_IS_CART_OPEN'
}

const cartReducer = (state, action) => {
    const {type, payload} = action;

    switch(type){
        case CART_ACTION_TYPES.SET_CART_ITEMS:
            return {
                ...state,
                ...payload //MEANS THE ACTION TO BE TAKEN
            };

            case CART_ACTION_TYPES.SET_IS_CART_OPEN:
                return {
                    ...state,
                    isCartOpen:payload,
                };
        default:
            throw new Error(`unhandled type of ${type} in cartReducer`)
    }
}



export const CartProvider = ({ children }) => {
   
    //destructing of cart variables, these variables are shipped out via the value in line 117 
    const [{cartItems,isCartOpen,cartCount,cartTotal}, dispatch] = useReducer(cartReducer,INITIAL_STATE);

      const updateCartItemsReducer = (newCartItems) => {
        const newCartCount = newCartItems.reduce((total, cartItem) => total + cartItem.quantity, 0);
        const newCartTotal = newCartItems.reduce((total, cartItem) => total + cartItem.quantity * cartItem.price, 0);

      dispatch(
            createAction(CART_ACTION_TYPES.SET_CART_ITEMS,{ cartItems:newCartItems,cartTotal:newCartTotal, cartCount:newCartCount,}));
       };

      

     const addItemToCart = (productToAdd) =>{
       const newCartItems = addCartItem(cartItems,productToAdd);

       const toggleModal = (isOpen,setIsOpen) =>{
        setIsOpen(!isOpen);
       }
       
       updateCartItemsReducer(newCartItems);

     };
     

     const removeItemToCart = (cartItemToRemove) =>{
        const newCartItems = removeCartItem(cartItems,cartItemToRemove);
        updateCartItemsReducer(newCartItems);
     };


     const clearItemFromCart = (cartItemToClear) =>{
        const newCartItems = clearCartItem(cartItems, cartItemToClear);
        updateCartItemsReducer(newCartItems);
     };

     const setIsCartOpen = (bool) =>{
        //we use dispatch() to trigger state change in react,While action types allow you tell your reducer what action it should take, the payload is the data that your reducer will use to update the state.
        dispatch(createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN,bool));
     }

    const value = {isCartOpen,setIsCartOpen,addItemToCart,removeItemToCart,clearItemFromCart,cartTotal,cartItems,cartCount};
    return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}