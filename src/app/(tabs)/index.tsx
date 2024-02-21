import { Image, StyleSheet, Text, View, FlatList } from "react-native";
import Colors from "@/src/constants/Colors";
import products from "@/assets/data/products";
import ProductList from "@/src/components/ProductList";

export default function TabOneScreen() {
  return (
    <View style={styles.container}>
      {/* <ProductList product={products[0]} /> */}
      <FlatList
        data={products}
        renderItem={({ item }) => <ProductList product={item} />}
        numColumns={2}
        contentContainerStyle={{ gap: 10, padding: 10 }}
        columnWrapperStyle={{ gap: 10 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
});
