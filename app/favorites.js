import React, { useState, useEffect } from "react";
import {
    View, Text, FlatList, TouchableOpacity, Image, StyleSheet
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect, useRouter } from "expo-router";
import { SIZES, COLORS, FONT, SHADOWS } from "../constants";
import ScreenHeaderBtn from "../components/ScreenHeaderBtn";

const Favorites = () => {
    const [favorites, setFavorites] = useState([]);
    const router = useRouter(); // Menggunakan router untuk navigasi

    // Load favorites dari AsyncStorage
    const loadFavorites = async () => {
        try {
            const storedFavorites = await AsyncStorage.getItem("favorites");
            setFavorites(storedFavorites ? JSON.parse(storedFavorites) : []);
        } catch (error) {
            console.error("Error loading favorites:", error);
        }
    };

    // Simpan favorites ke AsyncStorage
    const saveFavorites = async (newFavorites) => {
        try {
            await AsyncStorage.setItem("favorites", JSON.stringify(newFavorites));
            setFavorites(newFavorites);
        } catch (error) {
            console.error("Error saving favorites:", error);
        }
    };

    // Hapus item dari favorites
    const removeFavorite = (id) => {
        const updatedFavorites = favorites.filter((item) => item.id !== id);
        saveFavorites(updatedFavorites);
    };

    // Load favorites saat pertama kali halaman dibuka
    useEffect(() => {
        loadFavorites();
    }, []);

    // Reload favorites saat halaman mendapatkan fokus
    useFocusEffect(
        React.useCallback(() => {
            loadFavorites();
        }, [])
    );

    return (
        <View style={styles.container}>
            {/* App Bar */}
            <ScreenHeaderBtn isAppBar={true} title="My Favorites" />

            {favorites.length === 0 ? (
                <Text style={styles.emptyText}>No Favorites Item Found</Text>
            ) : (
                <FlatList
                    data={favorites}
                    keyExtractor={(item) => item.id.toString()}
                    contentContainerStyle={styles.cardsContainer}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            style={styles.cardContainer}
                            onPress={() => router.push({
                                pathname: "/meditation-details",
                                params: {
                                    id: item.id,
                                    title: item.title,
                                    target: item.target,
                                    duration: item.duration,
                                    image: item.image,
                                }
                            })}
                        >
                            {/* Gambar */}
                            <View style={styles.logoContainer}>
                                <Image source={{ uri: item.image }} style={styles.logoImage} />
                            </View>

                            {/* Detail Item */}
                            <View style={styles.textContainer}>
                                <Text style={styles.meditationTitle}>{item.title}</Text>
                                <Text style={styles.meditationTarget}>Target: {item.target}</Text>
                                <Text style={styles.meditationDuration}>Duration: {item.duration}</Text>
                            </View>

                            {/* Tombol Hapus */}
                            <TouchableOpacity onPress={() => removeFavorite(item.id)} style={{
                                backgroundColor: "orange",
                                padding: 10,
                                borderRadius: 5,
                                marginTop: 20,
                            }}>
                                <Text style={{ color: "white" }}>Remove</Text>
                            </TouchableOpacity>
                        </TouchableOpacity>
                    )}
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: SIZES.xLarge,
        paddingHorizontal: SIZES.medium,
        backgroundColor: COLORS.lightGray,
    },
    headerTitle: {
        fontSize: SIZES.large,
        fontFamily: FONT.medium,
        color: COLORS.primary,
        marginBottom: SIZES.medium,
    },
    emptyText: {
        fontSize: SIZES.medium,
        fontFamily: FONT.medium,
        color: COLORS.gray,
        textAlign: "center",
        marginTop: SIZES.large,
    },
    cardsContainer: {
        marginTop: SIZES.medium,
        gap: SIZES.small,
    },
    cardContainer: {
        flex: 1,
        justifyContent: "space-between",
        padding: SIZES.medium,
        borderRadius: SIZES.small,
        backgroundColor: "#FFF",
        ...SHADOWS.medium,
        shadowColor: COLORS.white,
        marginBottom: SIZES.medium,
    },
    logoContainer: {
        width: "100%",
        height: 150,
        backgroundColor: COLORS.white,
        justifyContent: "center",
        borderRadius: SIZES.medium,
        alignItems: "center",
    },
    logoImage: {
        width: "100%",
        height: "100%",
        borderRadius: SIZES.medium,
    },
    textContainer: {
        flex: 1,
        marginHorizontal: SIZES.medium,
        marginTop: SIZES.medium,
    },
    meditationTitle: {
        fontSize: SIZES.medium,
        fontFamily: "DMBold",
        color: COLORS.primary,
    },
    meditationTarget: {
        fontSize: SIZES.small,
        fontFamily: FONT.regular,
        color: COLORS.gray,
    },
    meditationDuration: {
        fontSize: SIZES.small,
        fontFamily: FONT.regular,
        color: COLORS.darkGray,
    },
});

export default Favorites;
