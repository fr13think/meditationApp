import { View, Text, Share, Image } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { icons } from "../../constants";
import ScreenHeaderBtn from "../../components/ScreenHeaderBtn";

export default function MeditationDetails() {
    const params = useLocalSearchParams();
    const navigation = useNavigation();

    // Fungsi untuk berbagi sesi meditasi
    const onShare = async () => {
        try {
            await Share.share({
                message: `Coba sesi meditasi "${params.title}" selama ${params.duration}! 🌿`,
            });
        } catch (error) {
            console.error("Gagal berbagi sesi:", error);
        }
    };

    useEffect(() => {
        console.log("Setting header options..."); // Log untuk debugging
        navigation.setOptions({
            headerShown: true,
            headerTitle: () => (
                <Image
                    source={require("../../assets/icons/1_logo.png")}
                    style={{ width: 100, height: 30, resizeMode: "contain" }}
                />
            ),
            headerRight: () => (
                <TouchableOpacity onPress={onShare} style={{ marginRight: 15 }}>
                    <Image
                        source={icons.share}
                        style={{ width: 24, height: 24, tintColor: "black" }}
                    />
                </TouchableOpacity>
            ),
        });
    }, [navigation]);


    return (
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
            <Text style={{ fontSize: 22, fontWeight: "bold" }}>{params.title}</Text>
            <Image source={{ uri: params.image }} style={{ width: 200, height: 200 }} />
            <Text style={{ marginTop: 10 }}>Durasi: {params.duration}</Text>
        </View>
    );
}
