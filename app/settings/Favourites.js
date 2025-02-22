import React, { useState } from "react";
import {
    SafeAreaView,
    ScrollView,
    View,
    Text,
    ActivityIndicator,
    StyleSheet,
} from "react-native";
import { useFocusEffect } from "expo-router";
import { COLORS, FONT, SIZES } from "../../constants";
import { getUserActions } from "../../utils/storage";
import ScreenHeaderBtn from "../../components/ScreenHeaderBtn";
import DailyMeditation from "../../components/DailyMeditation";

const Favourites = () => {
    const [favorites, setFavorites] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    // Load favorite items
    const loadFavorites = async () => {
        try {
            const storedFavorites = await getUserActions();
            setFavorites(storedFavorites);
        } catch (error) {
            console.error("Error loading favorites:", error);
        } finally {
            setIsLoading(false);
        }
    };

    useFocusEffect(
        React.useCallback(() => {
            loadFavorites();
        }, [])
    );

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
            <ScreenHeaderBtn />
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.container}>
                    {isLoading ? (
                        <ActivityIndicator size="large" color={COLORS.primary} />
                    ) : favorites.length === 0 ? (
                        <Text style={styles.headerTitle}>No favorite items found.</Text>
                    ) : (
                        <>
                            <Text style={styles.headerTitle}>My Favourite Exercises</Text>
                            <DailyMeditation meditations={favorites} />
                        </>
                    )}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        marginTop: SIZES.xLarge,
        padding: SIZES.medium,
    },
    headerTitle: {
        fontSize: SIZES.large,
        fontFamily: FONT.medium,
        color: COLORS.primary,
        textAlign: "center",
        marginTop: 20,
    },
});

export default Favourites;
