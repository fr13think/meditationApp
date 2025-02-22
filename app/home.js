import React, { useEffect, useState, useCallback } from "react";
import { SafeAreaView, ScrollView, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { COLORS, SIZES, icons } from "../constants/theme";
import ScreenHeaderBtn from "../components/ScreenHeaderBtn";
import Welcome from "../components/Welcome";
import DailyQuote from "../components/DailyQuote";
import PopularMeditation from "../components/PopularMeditation";
import DailyMeditation from "../components/DailyMeditation";

const Home = () => {
    const [userDetails, setUserDetails] = useState(null);

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
            <View style={{ flexDirection: "row", justifyContent: "space-between", padding: SIZES.medium }}>
                <ScreenHeaderBtn iconUrl={icons?.appLogo} handlePress={() => console.log("Logo Pressed")} />
                <ScreenHeaderBtn iconUrl={icons?.settings} handlePress={() => console.log("Settings Pressed")} />
            </View>

            {/* Main Content */}
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={{ flex: 1, padding: SIZES.medium }} testID="screensDisplay">
                    <Welcome userDetails={userDetails} />
                    <DailyQuote />
                    <PopularMeditation />
                    <DailyMeditation />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default Home;
