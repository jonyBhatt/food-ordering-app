import { StatusBar } from "expo-status-bar";
import { View, Text, Platform, FlatList } from "react-native";
import { useCart } from "../customHooks/cart-context";
import CartListItem from "../components/Product-List";
import Button from "../components/Button";
import Colors from "../constants/Colors";
const CartScreen = () => {
  const { items, totalPrice } = useCart();
  return (
    <View>
      <FlatList
        data={items}
        renderItem={({ item }) => <CartListItem cartItem={item} />}
        contentContainerStyle={{ gap: 10, padding: 10 }}
      />
      <Text
        style={{
          margin: 10,
          fontSize: 18,
          fontWeight: "500",
          color: Colors.dark.text,
        }}
      >
        Total Price: ${totalPrice}
      </Text>
      <Button text="Purchase" />
    </View>
  );
};
export default CartScreen;
