import React, { createContext, useContext, useReducer } from 'react';

const CartContext = createContext();

const initialState = {
  cartItems: [],
};

// Reducer to handle cart actions
function cartReducer(state, action) {
  switch (action.type) {
    case 'ADD_ITEM':
      // Check if item already in cart
      const existingIndex = state.cartItems.findIndex(item => item.id === action.payload.id);
      if (existingIndex >= 0) {
        // Increase quantity if exists
        const updatedItems = [...state.cartItems];
        updatedItems[existingIndex].quantity += 1;
        return { ...state, cartItems: updatedItems };
      } else {
        // Add new item with quantity 1
        return { ...state, cartItems: [...state.cartItems, { ...action.payload, quantity: 1 }] };
      }

    case 'REMOVE_ITEM':
      return {
        ...state,
        cartItems: state.cartItems.filter(item => item.id !== action.payload),
      };

    case 'CLEAR_CART':
      return {
        ...state,
        cartItems: [],
      };

    case 'INCREASE_QUANTITY':
      return {
        ...state,
        cartItems: state.cartItems.map(item =>
          item.id === action.payload ? { ...item, quantity: item.quantity + 1 } : item
        ),
      };

    case 'DECREASE_QUANTITY':
      return {
        ...state,
        cartItems: state.cartItems
          .map(item =>
            item.id === action.payload ? { ...item, quantity: item.quantity - 1 } : item
          )
          .filter(item => item.quantity > 0),
      };

    default:
      return state;
  }
}

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  const addItem = item => dispatch({ type: 'ADD_ITEM', payload: item });
  const removeItem = id => dispatch({ type: 'REMOVE_ITEM', payload: id });
  const clearCart = () => dispatch({ type: 'CLEAR_CART' });
  const increaseQuantity = id => dispatch({ type: 'INCREASE_QUANTITY', payload: id });
  const decreaseQuantity = id => dispatch({ type: 'DECREASE_QUANTITY', payload: id });

  const value = {
    cartItems: state.cartItems,
    addItem,
    removeItem,
    clearCart,
    increaseQuantity,
    decreaseQuantity,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

// Custom hook for easier usage
export function useCart() {
  return useContext(CartContext);
}
