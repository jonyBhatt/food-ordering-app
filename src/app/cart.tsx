import { StatusBar } from "expo-status-bar";
import { View, Text, Platform } from "react-native";
import { useCart } from "../customHooks/cart-context";
const CartScreen = () => {
  const { items } = useCart();
  return (
    <View>
      <Text>CartScreen </Text>
      {/* <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />; */}
    </View>
  );
};
export default CartScreen;
