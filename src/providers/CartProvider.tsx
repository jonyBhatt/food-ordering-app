import { ReactNode, createContext, useState } from "react";
import { randomUUID } from "expo-crypto";
import { CartItem, Product } from "@/assets/types";

type CartType = {
  items: CartItem[];
  addItem: (product: Product, size: CartItem["size"]) => void;
  updateQuantity: (itemId: string, amount: -1 | 1) => void;
  totalPrice: number;
};

export const CartContext = createContext<CartType>({
  items: [],
  addItem: () => {},
  updateQuantity: () => {},
  totalPrice: 0,
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

    // TODO: Add products to items

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

  // TODO: Calculate total price
  const totalPrice = items.reduce(
    (sum, item) => (sum += item.product.price * item.quantity),
    0
  );

  return (
    <CartContext.Provider
      value={{ items, addItem, updateQuantity, totalPrice }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
