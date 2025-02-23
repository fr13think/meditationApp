import React, { useState } from "react";
import {
    View,
    SafeAreaView,
    Image,
    Alert,
    TextInput,
    Text,
    TouchableOpacity,
    ActivityIndicator,
    StyleSheet
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Stack, useRouter } from "expo-router";
import { COLORS, icons, SHADOWS } from "../constants";

const SignUp = () => {
    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const router = useRouter();

    const validateEmail = (email) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

    const handleRegister = async () => {
        let validationErrors = {};
        if (!userName) {
            validationErrors.userName = "Please enter your username.";
        }
        if (!email) {
            validationErrors.email = "Please enter your email.";
        } else if (!validateEmail(email)) {
            validationErrors.email = "Please enter a valid email address.";
        }
        if (!password) {
            validationErrors.password = "Please enter your password.";
        } else if (password.length < 6) {
            validationErrors.password = "Password must be at least 6 characters.";
        }

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        setLoading(true);
        const userDetails = { userName, email, password, token: "sample-token" };
        try {
            await AsyncStorage.setItem("userDetails", JSON.stringify(userDetails));
            setLoading(false);
            console.log("User registered:", userDetails);
            router.push("/home");
        } catch (error) {
            setLoading(false);
            console.error("Error saving user details", error);
            Alert.alert("Error", "An error occurred while registering.");
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
            <View style={{ padding: 20 }} testID="signupContainer">
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
                    testID="imageIcon"
                >
                    <Image source={icons.menu} style={{ width: 50, height: 50 }} />
                </View>
                <View style={{ marginTop: 30 }} testID="formData">
                    <View style={{ marginBottom: 10 }} testID="userName">
                        <TextInput
                            style={[
                                styles.input,
                                errors.userName && { borderColor: "red" }
                            ]}
                            value={userName}
                            onChangeText={setUserName}
                            placeholder="UserName"
                        />
                        {errors.userName && <Text style={styles.errorText}>{errors.userName}</Text>}
                    </View>
                    <View style={{ marginBottom: 10 }} testID="email">
                        <TextInput
                            style={[
                                styles.input,
                                errors.email && { borderColor: "red" }
                            ]}
                            value={email}
                            onChangeText={setEmail}
                            placeholder="Email"
                        />
                        {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
                    </View>
                    <View style={{ marginBottom: 20 }} testID="password">
                        <TextInput
                            style={[
                                styles.input,
                                errors.password && { borderColor: "red" }
                            ]}
                            value={password}
                            onChangeText={setPassword}
                            secureTextEntry={true}
                            placeholder="Password"
                        />
                        {errors.password && <Text style={styles.errorText}>{errors.password}</Text>}
                    </View>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={handleRegister}
                        disabled={loading}
                        testID="handleRegister"
                    >
                        {loading ? (
                            <ActivityIndicator color="#fff" />
                        ) : (
                            <Text style={styles.buttonText}>Sign Up</Text>
                        )}
                    </TouchableOpacity>
                </View>
                <View
                    style={styles.loginContainer}
                    testID="textData"
                >
                    <Text style={{ marginRight: 5 }}>Already have an account?</Text>
                    <TouchableOpacity onPress={() => router.push("/login")}>
                        <Text style={{ color: "blue" }}>Login</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    input: {
        borderColor: "#ccc",
        borderWidth: 1,
        padding: 10,
        borderRadius: 5,
        marginBottom: 10,
    },
    errorText: {
        color: "red",
        fontSize: 12,
        marginTop: -10,
        marginBottom: 10,
    },
    button: {
        backgroundColor: COLORS.primary,
        padding: 15,
        borderRadius: 5,
        alignItems: "center",
        marginBottom: 10,
    },
    buttonText: {
        color: "#fff",
        fontWeight: "bold",
    },
    loginContainer: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 5,
    },
});

export default SignUp;