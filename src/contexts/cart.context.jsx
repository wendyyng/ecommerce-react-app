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



export const CartContext = createContext({
    isCartOpen: false,
    setIsCartOpen: () => {},
    cartItems: [],
    addItemToCart: () => {},
    cartCount: 0
})

export const CartProvider = ({children}) => {
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [cartCount, setCartCount] = useState(0)

    //update cartCount whenever cartItems updates
    useEffect(() => {
        const newCartCount = cartItems.reduce((total, cartItem) => {
            return total + cartItem.quantity
        }, 0)
        setCartCount(newCartCount)
        console.log(newCartCount)
    },[cartItems])

    const addItemToCart = (productToAdd) => {
        setCartItems(addCartItem(cartItems, productToAdd))
    }
    const value = { isCartOpen, setIsCartOpen, addItemToCart, cartItems, cartCount}
    return(
        <CartContext.Provider value={value}>{children}</CartContext.Provider>
    )
}