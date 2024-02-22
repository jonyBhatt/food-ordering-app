import { ReactNode, createContext, useState } from "react";
import { CartItem, Product } from "@/assets/types";

type CartType = {
  items: CartItem[];
  addItem: (product: Product, size: CartItem["size"]) => void;
};

export const CartContext = createContext<CartType>({
  items: [],
  addItem: () => {},
});

const CartProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const addItem = (product: Product, size: CartItem["size"]) => {};
  return (
    <CartContext.Provider value={{ items, addItem }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
