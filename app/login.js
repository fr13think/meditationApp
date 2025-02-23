import React, { useState, useEffect } from "react";
import {
  View,
  SafeAreaView,
  Image,
  Alert,
  Text,
  TextInput,
  TouchableOpacity
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Stack, useRouter } from "expo-router";
import { COLORS, icons, SHADOWS } from "../constants";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  useEffect(() => {
    // Add dummy user data to AsyncStorage for testing
    const addDummyData = async () => {
      const dummyUser = {
        userName: "yudhae",
        email: "yudhae@mail.com",
        password: "123123",
        token: "sample-token"
      };
      await AsyncStorage.setItem("userDetails", JSON.stringify(dummyUser));
    };
    addDummyData();
  }, []);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Validation Error", "Please fill in all fields.");
      return;
    }
    try {
      const storedUser = await AsyncStorage.getItem("userDetails");
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
        if (email === parsedUser.email && password === parsedUser.password) {
          router.push("/home");
        } else {
          Alert.alert("Error", "Incorrect email or password.");
        }
      } else {
        Alert.alert("Error", "No user details found. Please sign up first.");
      }
    } catch (error) {
      console.error("Error accessing AsyncStorage", error);
      Alert.alert("Error", "An error occurred while logging in.");
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: COLORS.lightWhite },
          headerShadowVisible: false,
          headerLeft: () => <></>,
          headerTitle: "",
        }}
      />
      <View style={{ padding: 20 }}>
        <View
          style={{
            padding: 20,
            marginLeft: "auto",
            marginRight: "auto",
            backgroundColor: "#f0f0f0",
            borderRadius: 50,
            height: 90,
            ...SHADOWS.medium,
            shadowColor: COLORS.white,
          }}
        >
          <Image
            source={icons.menu}
            style={{ width: 50, height: 50, marginBottom: 20 }}
          />
        </View>
        <View style={{ marginTop: 20 }}>
          <View style={{ marginBottom: 20 }}>
            <TextInput
              style={{
                borderWidth: 1,
                borderColor: "#ccc",
                padding: 10,
                borderRadius: 5,
                marginBottom: 10,
              }}
              value={email}
              onChangeText={setEmail}
              placeholder="Email"
            />
            <TextInput
              style={{
                borderWidth: 1,
                borderColor: "#ccc",
                padding: 10,
                borderRadius: 5,
                marginBottom: 10,
              }}
              value={password}
              secureTextEntry={true}
              onChangeText={setPassword}
              placeholder="Password"
            />
          </View>
          <TouchableOpacity
            style={{
              backgroundColor: COLORS.primary,
              padding: 15,
              borderRadius: 5,
              alignItems: "center",
            }}
            onPress={handleLogin}
          >
            <Text style={{ color: "#fff", fontWeight: "bold" }}>Login</Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            margin: 10,
          }}
        >
          <Text style={{ marginRight: 5 }}>Don't have an account?</Text>
          <TouchableOpacity onPress={() => router.push("/signup")}>
            <Text style={{ color: "blue" }}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Login;