import { createContext, useContext, useState, type ReactNode, useEffect } from "react";
import { type IProduct } from "../api/products";

export interface CartItem {
  product: IProduct;
  quantity: number;
  selectedSize?: string;
}

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (product: IProduct, quantity?: number, selectedSize?: string) => void;
  removeFromCart: (productId: string, selectedSize?: string) => void;
  updateQuantity: (productId: string, quantity: number, selectedSize?: string) => void;
  clearCart: () => void;
  cartCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product: IProduct, quantity = 1, selectedSize?: string) => {
    setCartItems((prev) => {
      const existingItemIndex = prev.findIndex(
        (item) => item.product._id === product._id && item.selectedSize === selectedSize
      );

      if (existingItemIndex > -1) {
        const newCart = [...prev];
        newCart[existingItemIndex].quantity += quantity;
        return newCart;
      }
      return [...prev, { product, quantity, selectedSize }];
    });
  };

  const removeFromCart = (productId: string, selectedSize?: string) => {
    setCartItems((prev) =>
      prev.filter(
        (item) => !(item.product._id === productId && item.selectedSize === selectedSize)
      )
    );
  };

  const updateQuantity = (productId: string, quantity: number, selectedSize?: string) => {
    if (quantity <= 0) {
      removeFromCart(productId, selectedSize);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) =>
        item.product._id === productId && item.selectedSize === selectedSize
          ? { ...item, quantity }
          : item
      )
    );
  };

  const clearCart = () => setCartItems([]);

  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, removeFromCart, updateQuantity, clearCart, cartCount }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
