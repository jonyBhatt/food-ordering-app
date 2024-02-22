import { Stack, useLocalSearchParams } from "expo-router";
import { View, Text } from "react-native";
const ProductDetails = () => {
  const { id } = useLocalSearchParams();
  return (
    <View>
      <Stack.Screen options={{ title: "Details" + id }} />
      <Text>ProductDetails: {id}</Text>
    </View>
  );
};
export default ProductDetails;
