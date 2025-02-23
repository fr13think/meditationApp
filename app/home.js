import React, { useEffect, useState, useCallback } from "react";
import { SafeAreaView, ScrollView, View, StyleSheet, TouchableOpacity, Image } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { COLORS, SIZES, icons } from "../constants/theme";
import Welcome from "../components/Welcome";
import DailyQuote from "../components/DailyQuote";  // Menambahkan komponen DailyQuote
import PopularMeditation from "../components/PopularMeditation";
import DailyMeditation from "../components/DailyMeditation";
import { useRouter } from "expo-router"; // Import router untuk navigasi
import { useTheme } from "../context/ThemeContext";

const Home = () => {
    const [userDetails, setUserDetails] = useState(null);
    const router = useRouter(); // Menggunakan router

    const loadUserDetails = useCallback(async () => {
        try {
            const user = await AsyncStorage.getItem("userDetails");
            console.log("User Details:", user);
            setUserDetails(user ? JSON.parse(user) : null);
        } catch (error) {
            console.error("Error loading user details:", error);
        }
    }, []);

    useEffect(() => {
        loadUserDetails();
    }, [loadUserDetails]);

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
            {/* App Bar */}
            <View style={styles.appBar}>
                {/* Logo */}
                <View style={styles.titleContainer}>
                    <Image source={icons.appLogo} style={styles.logo} />
                </View>

                {/* Tombol Settings */}
                <TouchableOpacity style={styles.btnContainer} onPress={() => router.push("/settings")}>
                    <Image source={icons.settings} style={styles.image} />
                </TouchableOpacity>
            </View>

            {/* Main Content */}
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={{ flex: 1, padding: SIZES.medium }} testID="screensDisplay">
                    <Welcome userDetails={userDetails} />
                    <DailyQuote />  {/* Tambahkan Daily Quote */}
                    <PopularMeditation />
                    <DailyMeditation />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};


const styles = StyleSheet.create({
    appBar: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: COLORS.white,
        paddingVertical: 10,
        paddingHorizontal: SIZES.medium,
        elevation: 3, // Memberikan efek bayangan untuk tampilan lebih bagus
    },
    btnContainer: {
        padding: 10,
        borderRadius: 8,
        backgroundColor: "transparent",
        alignItems: "center",
        justifyContent: "center",
    },
    image: {
        width: 24,
        height: 24,
        tintColor: COLORS.primary, // Warna ikon
    },
    logo: {
        width: 100,
        height: 30,
        resizeMode: "contain",
    },
    titleContainer: {
        flexDirection: "row",
        alignItems: "center",
    },
});

export default Home;
