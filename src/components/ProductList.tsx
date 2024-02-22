import { Image, StyleSheet, Text, View, Pressable } from "react-native";
import { Link, useSegments } from "expo-router";
import Colors from "@/src/constants/Colors";
import { Product } from "@/assets/types";

interface ProductListProps {
  product: Product;
}

export default function ProductList({ product }: ProductListProps) {
  const segments = useSegments();
  // console.log(segments[0]);
  return (
    <Link href={`/${segments[0]}/menu/${product.id}`} asChild>
      <Pressable style={styles.container}>
        <Image
          source={{ uri: product.image || "" }}
          style={styles.productImage}
          resizeMode="contain"
        />
        <Text style={styles.title}>{product.name}</Text>
        <Text style={styles.price}>${product.price}</Text>
      </Pressable>
    </Link>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    borderRadius: 20,
    backgroundColor: Colors.dark.background,
    flex: 1,
    // margin: 10,
    maxWidth: "50%",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginVertical: 10,
  },

  price: {
    color: Colors.dark.tint,
    fontWeight: "bold",
    marginTop: "auto",
  },
  productImage: {
    width: 150,
    aspectRatio: 1,
    alignSelf: "center",
  },
  link: {
    marginVertical: 10,
    color: Colors.light.tint,
  },
});
