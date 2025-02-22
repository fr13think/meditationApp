import React, { useEffect } from "react";
import { View, Text, Image, Share } from "react-native";
import { useNavigation } from "@react-navigation/native";
import ScreenHeaderBtn from "../../components/ScreenHeaderBtn";
import { icons } from "../../constants/icons"; // Pastikan ini benar

const MeditationDetails = ({ route }) => {
    const { title, duration, image } = route.params;
    const navigation = useNavigation();

    const onShare = async () => {
        try {
            await Share.share({
                message: `Coba sesi meditasi "${title}" selama ${duration}! 🌿`,
            });
        } catch (error) {
            console.error("Gagal berbagi sesi:", error);
        }
    };

    useEffect(() => {
        navigation.setOptions({
            headerShown: true,
            headerTitle: () => (
                <Image
                    source={icons.appLogo}
                    style={{ width: 100, height: 30, resizeMode: "contain" }}
                />
            ),
            headerLeft: () => (
                <ScreenHeaderBtn
                    iconUrl={icons.back}
                    handlePress={() => navigation.goBack()}
                    customStyle={{ marginLeft: 10 }}
                />
            ),
            headerRight: () => (
                <ScreenHeaderBtn
                    iconUrl={icons.share}
                    handlePress={onShare}
                    customStyle={{ marginRight: 10 }}
                />
            ),
        });
    }, [navigation]);

    return (
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
            <Text style={{ fontSize: 22, fontWeight: "bold" }}>{title}</Text>
            <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />
            <Text style={{ marginTop: 10 }}>Durasi: {duration}</Text>
        </View>
    );
};

export default MeditationDetails;
