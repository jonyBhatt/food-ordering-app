import { Stack, useLocalSearchParams } from "expo-router";
import { View, Text, StyleSheet, Image, Pressable } from "react-native";
import { useState } from "react";

import products from "@/assets/data/products";
import Colors from "@/src/constants/Colors";
import { PizzaSize } from "@/assets/types";
import Button from "@/src/components/Button";

const size = ["S", "M", "L", "XL"];
const ProductDetails = () => {
  const [selectedSize, setSelectedSize] = useState("S");
  const { id } = useLocalSearchParams();
  const product = products.find((p) => p.id.toString() === id);

  if (!product) return <Text>Product not found</Text>;

  const addToCart = () => {
    console.warn("Add to cart");
  };

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: product.name }} />
      <Image
        source={{ uri: product.image }}
        alt={product.name}
        style={styles.image}
      />
      <Text>Select Size</Text>
      <View style={styles.sizes}>
        {size.map((s, i) => (
          <Pressable
            onPress={() => {
              setSelectedSize(s);
            }}
            key={i}
            style={[
              styles.size,
              {
                backgroundColor:
                  selectedSize === s
                    ? "gainsboro"
                    : `${Colors.dark.background}`,
              },
            ]}
          >
            <Text
              style={[
                styles.sizeText,
                {
                  color: selectedSize === s ? "white" : "gray",
                },
              ]}
            >
              {s}
            </Text>
          </Pressable>
        ))}
      </View>

      <Text style={styles.price}>${product.price}</Text>

      <Button text="Add to cart" onPress={addToCart} />
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
  title: {},
  price: {
    marginTop: "auto",
    fontWeight: "bold",
    fontSize: 20,
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
