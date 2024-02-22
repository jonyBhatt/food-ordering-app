import { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Image,
  Pressable,
} from "react-native";
import * as ImagePicker from "expo-image-picker";

import Button from "@/src/components/Button";
import Colors from "@/src/constants/Colors";
import { Stack } from "expo-router";
const CreateProductScreen = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [error, setError] = useState("");
  const [image, setImage] = useState<string | null>(null);
  const defaultImage =
    "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/food/deluxe.png";

  const resetFields = () => {
    setName(""), setPrice("");
  };

  const validateInput = () => {
    setError("");
    if (!name) {
      setError("Name is required!");
      return false;
    }
    if (!price) {
      setError("Price is required!");
      return false;
    }
    if (isNaN(parseFloat(price))) {
      setError("Name is required!");
      return false;
    }

    return true;
  };

  const onCreate = () => {
    if (!validateInput()) {
      return;
    }
    console.log("Create: " + name, price);

    // TODO: Add to database

    resetFields();
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      console.log(result);
      setImage(result.assets[0].uri);
    } else {
      alert("You did not select any image.");
    }
  };

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: "Create Dish",
        }}
      />
      <Image
        source={{ uri: image || defaultImage }}
        alt="create image"
        style={styles.image}
      />
      <Pressable
        style={{
          alignItems: "center",
          justifyContent: "center",
          paddingVertical: 12,
          paddingHorizontal: 20,
          borderRadius: 4,
          elevation: 3,
          backgroundColor: "indigo",
          marginVertical: 20,
          width: "50%",
          alignSelf: "center",
        }}
        onPress={pickImage}
      >
        <Text
          style={{
            fontSize: 16,
            lineHeight: 21,
            fontWeight: "bold",
            letterSpacing: 0.25,
            color: "white",
          }}
        >
          Choose a photo
        </Text>
      </Pressable>
      <Text style={styles.label}>Name</Text>
      <TextInput
        placeholder="Title..."
        style={styles.input}
        keyboardType="default"
        value={name}
        onChangeText={setName}
      />

      <Text style={styles.label}>Price</Text>
      <TextInput
        placeholder="price..."
        style={styles.input}
        keyboardType="decimal-pad"
        keyboardAppearance="light"
        value={price}
        onChangeText={setPrice}
      />

      <Text style={{ color: "red", fontSize: 18, fontWeight: "500" }}>
        {error}
      </Text>
      <Button text="Create" onPress={onCreate} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.dark.background,
    justifyContent: "center",
    padding: 15,
  },
  label: {
    color: "honeydew",
  },
  input: {
    backgroundColor: "gainsboro",
    padding: 15,
    borderRadius: 5,
    marginTop: 10,
    marginBottom: 50,
  },
  image: {
    width: "50%",
    aspectRatio: 1,
    alignSelf: "center",
  },
});

export default CreateProductScreen;
