import { ReactNode, createContext, useState } from "react";
import { randomUUID } from "expo-crypto";
import { CartItem, Product } from "@/assets/types";

type CartType = {
  items: CartItem[];
  addItem: (product: Product, size: CartItem["size"]) => void;
  updateQuantity: (itemId: string, amount: -1 | 1) => void;
};

export const CartContext = createContext<CartType>({
  items: [],
  addItem: () => {},
  updateQuantity: () => {},
});

const CartProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const addItem = (product: Product, size: CartItem["size"]) => {
    // TODO: If item already in a cart, increment quantity
    const existProduct = items.find(
      (item) => item.product === product && item.size === size
    );

    if (existProduct) {
      updateQuantity(existProduct.id, 1);
      return;
    }

    const newCartItem: CartItem = {
      id: randomUUID(),
      product,
      product_id: product.id,
      size,
      quantity: 1,
    };

    setItems([newCartItem, ...items]);

    console.log(items);
  };
  // TODO: Update quantity
  const updateQuantity = (itemId: string, amount: -1 | 1) => {
    // console.log(itemId, amount);
    const updateItems = items.map((item) =>
      item.id !== itemId
        ? item
        : {
            ...item,
            quantity:
              item.quantity > 0 ? item.quantity + amount : item.quantity,
          }
    );

    setItems(updateItems);
    console.log(updateItems);
  };

  return (
    <CartContext.Provider value={{ items, addItem, updateQuantity }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
