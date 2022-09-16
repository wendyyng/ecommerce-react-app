import { createContext, useEffect, useState } from "react";

export const addCartItem = (cartItems, productToAdd) => {
    //find if cart items contains productToAdd
    const existingCartItem = cartItems.find(
        (cartItems) => cartItems.id === productToAdd.id
    )
    //if found, increment quantity
    if(existingCartItem) {
        return cartItems.map((cartItem) => cartItem.id === productToAdd.id 
        ? {...cartItem, quantity: cartItem.quantity + 1}
        : cartItem
        )
    }

    //return new array with modified cart Items/new cart item
    return [...cartItems, {...productToAdd, quantity: 1}]
}

const removeCartItem = (cartItems, cartItemToRemove) => {
    //find the cart item to remove
    const existingCartItem = cartItems.find(
        (cartItems) => cartItems.id === cartItemToRemove.id
    )
    // check if quantity = 1, if yes then remove that item from the cart
    if(existingCartItem.quantity === 1){
        return cartItems.filter(cartItem => cartItem.id !== cartItemToRemove.id);
    }
    // return cart items with matching cart item with reduce quantity
       return cartItems.map((cartItem) => cartItem.id === cartItemToRemove.id 
        ? {...cartItem, quantity: cartItem.quantity - 1}
        : cartItem
        )
} 

const clearCartItem = (cartItems, cartItemToClear) => {
    return cartItems.filter(cartItem => cartItem.id !== cartItemToClear.id);
}


export const CartContext = createContext({
    isCartOpen: false,
    setIsCartOpen: () => {},
    cartItems: [],
    addItemToCart: () => {},
    removeItemFromCart: () => {},
    cartCount: 0,
    clearItemFromCart: () => {},
    newCartTotal: 0
})

export const CartProvider = ({children}) => {
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [cartCount, setCartCount] = useState(0)
    const [newCartTotal, setCartTotal] = useState(0)

    //update cartCount whenever cartItems updates
    useEffect(() => {
        const newCartCount = cartItems.reduce((total, cartItem) => {
            return total + cartItem.quantity
        }, 0)
        setCartCount(newCartCount)
        console.log(newCartCount)
    },[cartItems])

    //cart total price
        useEffect(() => {
        const newCartTotal = cartItems.reduce((total, cartItem) => {
            return total + cartItem.price * cartItem.quantity
        }, 0)
        setCartTotal(newCartTotal)
        console.log(newCartTotal)
    },[cartItems])

    const addItemToCart = (productToAdd) => {
        setCartItems(addCartItem(cartItems, productToAdd))
    }
    const removeItemFromCart = (cartItemToRemove) => {
        setCartItems(removeCartItem(cartItems, cartItemToRemove))
    }
    const clearItemFromCart = (cartItemToRemove) => {
        setCartItems(clearCartItem(cartItems, cartItemToRemove))
    }
    const value = { isCartOpen, setIsCartOpen, addItemToCart, removeItemFromCart, cartItems, cartCount, clearItemFromCart, newCartTotal}
    return(
        <CartContext.Provider value={value}>{children}</CartContext.Provider>
    )
}