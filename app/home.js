import React, { useEffect, useState } from "react";
import { SafeAreaView, ScrollView, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { COLORS, SIZES, icons } from "../constants/theme";
import ScreenHeaderBtn from "../components/ScreenHeaderBtn";
import Welcome from "../components/Welcome";
import PopularMeditation from "../components/PopularMeditation";
import DailyMeditation from "../components/DailyMeditation";

const Home = () => {
    const [userDetails, setUserDetails] = useState(null);

    useEffect(() => {
        loadUserDetails();
    }, []);

    const loadUserDetails = async () => {
        const user = await AsyncStorage.getItem("userDetails");
        console.log("user", user);
        setUserDetails(user);
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
            <View style={{ flexDirection: "row", justifyContent: "space-between", padding: SIZES.medium }}>
                <ScreenHeaderBtn iconUrl={icons.appLogo} handlePress={() => console.log("Logo Pressed")} />
                <ScreenHeaderBtn iconUrl={icons.settings} handlePress={() => console.log("Settings Pressed")} />
            </View>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={{ flex: 1, padding: SIZES.medium }} testID="screensDisplay">
                    <Welcome userDetails={userDetails ? JSON.parse(userDetails) : null} />
                    <PopularMeditation />
                    <DailyMeditation />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default Home;
