import { StatusBar } from "expo-status-bar";
import { View, Text, Platform } from "react-native";
const CartScreen = () => {
  <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />;

  return (
    <View>
      <Text>CartScreen</Text>
    </View>
  );
};
export default CartScreen;
