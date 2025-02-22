import React from "react";
import { TouchableOpacity, Image, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { COLORS, FONT, SIZES, SHADOWS } from "../constants/theme";

const ScreenHeaderBtn = ({ iconUrl, handlePress }) => {
    return (
        <TouchableOpacity onPress={handlePress} style={{ marginRight: 10 }}>
            <Image
                source={iconUrl}
                resizeMode="contain"
                style={{ width: 24, height: 24 }}
            />
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({

    container: (selectedMeditation, item) => ({
        width: 270,
        padding: SIZES.xLarge,
        marginHorizontal: SIZES.small,
        marginTop: SIZES.xLarge,
        backgroundColor: selectedMeditation === item.id ? COLORS.primary : "#FFF",
        borderRadius: SIZES.medium,
        justifyContent: "space-between",
        ...SHADOWS.medium,
        shadowColor: COLORS.white,
    }),

    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    headerTitle: {
        fontSize: SIZES.large,
        fontFamily: FONT.medium,
        color: COLORS.primary,
    },
    headerBtn: {
        fontSize: SIZES.medium,
        fontFamily: FONT.medium,
        color: COLORS.gray,
    },


    cardsContainer: {
        marginTop: SIZES.medium,
    },

    logoContainer: (selectedMeditation, item) => ({
        width: "100%",
        height: 140,
        borderRadius: SIZES.medium,
        justifyContent: "center",
        alignItems: "center",
    }),
    logoImage: {
        width: "100%",
        height: "100%",
        borderRadius: SIZES.large,
    },

    tabsContainer: {
        paddingVertical: SIZES.small / 2,
        paddingHorizontal: SIZES.small,
        marginTop: SIZES.medium,
        width: "100%",
    },
    companyName: {
        fontSize: SIZES.small,
        fontFamily: FONT.regular,
        color: "#B3AEC6",
        marginTop: SIZES.small / 1.5,
        paddingVertical: SIZES.small / 2.5,
        paddingHorizontal: SIZES.small,
        borderRadius: SIZES.medium,
        borderWidth: 1,
        borderColor: COLORS.gray2,
    },

    infoContainer: {
        marginTop: SIZES.large,
    },
    meditationName: (selectedMeditation, item) => ({
        fontSize: SIZES.large,
        fontFamily: FONT.medium,
        color: selectedMeditation === item.id ? COLORS.white : COLORS.primary,
    }),
    infoWrapper: {
        flexDirection: "row",
        marginTop: 5,
        justifyContent: "flex-start",
        alignItems: "center",
    },
    publisher: (selectedMeditation, item) => ({
        fontSize: SIZES.medium - 2,
        fontFamily: FONT.regular,
        color: selectedMeditation === item.id ? COLORS.white : COLORS.primary,
    }),
    location: {
        fontSize: SIZES.medium - 2,
        fontFamily: FONT.regular,
        color: "#B3AEC6",
        marginTop: SIZES.small,
    },
});

export default ScreenHeaderBtn;
