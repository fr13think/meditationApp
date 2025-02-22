import React from "react";
import { TouchableOpacity, Image, StyleSheet } from "react-native";

const ScreenHeaderBtn = ({ iconUrl, handlePress }) => {
    return (
        <TouchableOpacity style={styles.btnContainer} onPress={handlePress}>
            <Image source={iconUrl} style={styles.image} />
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    btnContainer: {
        padding: 10,
        borderRadius: 8,
        backgroundColor: "#FFF",
        alignItems: "center",
        justifyContent: "center",
    },
    image: {
        width: 24,
        height: 24,
    },
});

export default ScreenHeaderBtn;
