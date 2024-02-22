import { Link, Stack, useLocalSearchParams, useRouter } from "expo-router";
import { View, Text, StyleSheet, Image, Pressable } from "react-native";
import { useState } from "react";

import products from "@/assets/data/products";
import Colors from "@/src/constants/Colors";
import { PizzaSize } from "@/assets/types";
import Button from "@/src/components/Button";
import { useCart } from "@/src/customHooks/cart-context";
import { FontAwesome } from "@expo/vector-icons";

const size: PizzaSize[] = ["S", "M", "L", "XL"];
const ProductDetails = () => {
  const router = useRouter();
  const [selectedSize, setSelectedSize] = useState<PizzaSize>("S");
  const { id } = useLocalSearchParams();

  const { addItem } = useCart();

  const product = products.find((p) => p.id.toString() === id);

  if (!product) return <Text>Product not found</Text>;

  const addToCart = () => {
    addItem(product, selectedSize);
    router.push("/cart");
  };

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: product.name,
          headerRight: () => (
            <Link href="/cart" asChild>
              <Pressable>
                {({ pressed }) => (
                  <FontAwesome
                    name="pencil-square-o"
                    size={25}
                    color={Colors.light.tabIconSelected}
                    style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                  />
                )}
              </Pressable>
            </Link>
          ),
        }}
      />
      <Image
        source={{ uri: product.image }}
        alt={product.name}
        style={styles.image}
      />

      <View
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: 12,
          flexDirection: "row",
        }}
      >
        <Text style={styles.title}>{product.name}</Text>
        <Text style={styles.price}>${product.price}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.dark.background,
    padding: 10,
  },
  image: {
    width: "100%",
    aspectRatio: 1,
    alignSelf: "center",
  },
  title: {
    fontWeight: "600",
    fontSize: 20,
  },
  price: {
    // marginTop: "auto",
    fontWeight: "400",
    fontSize: 16,
  },
  button: {
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderRadius: 50,
    backgroundColor: Colors.light.tint,
  },
  sizes: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 20,
  },
  size: {
    backgroundColor: "gainsboro",
    width: 50,
    aspectRatio: 1,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
  },
  sizeText: {
    fontSize: 18,
    fontWeight: "600",
  },
});

export default ProductDetails;
