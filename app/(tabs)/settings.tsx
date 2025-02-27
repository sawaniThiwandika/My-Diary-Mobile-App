import { View, Text, Button, Alert, BackHandler, ImageBackground } from "react-native";
import { Picker } from "@react-native-picker/picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React from "react";
import { StyleSheet } from "react-native";

export default function Settings() {

    const [selectedTheme, setSelectedTheme] = React.useState('Spring');
    const [fontSize, setFontSize] = React.useState("Medium");

    const themes = {
        Spring: {
            backgroundImage: require('../../assets/SKY-1.jpg'),
            text: '#0288d1',
            cardBackground: '#81d4fa',
            textColor: '#455a64',
            buttonColor: '#4caf50',
        },
        Summer: {
            backgroundImage: require('../../assets/themes/Summer.jpg'),
            text: '#f57f17',
            cardBackground: '#ffcc80',
            textColor: '#bf360c',
            buttonColor: '#f44336',
        },
        Autumn: {
            backgroundImage: require("../../assets/themes/Autumn.jpg"),
            text: '#bf360c',
            cardBackground: '#ffd54f',
            textColor: '#3e2723',
            buttonColor: '#8d6e63',
        },
        Winter: {
            backgroundImage: require("../../assets/themes/Winter.jpg"),
            text: '#1976d2',
            cardBackground: '#64b5f6',
            textColor: '#ffffff',
            buttonColor: '#03a9f4',
        }
    };

    const theme = themes[selectedTheme];

    const handleLogout = async () => {
        await AsyncStorage.removeItem("userToken");
        Alert.alert(
            "Logout",
            "Are you sure you want to exit?",
            [
                { text: "Cancel", style: "cancel" },
                { text: "Exit", onPress: () => BackHandler.exitApp() }
            ]
        );
    };

    const handleThemeChange = (themeName) => {
        setSelectedTheme(themeName);
        AsyncStorage.setItem("selectedTheme", themeName);
    };

    const handleFontSizeChange = (size) => {
        setFontSize(size);
    };

    const handleClearDiary = async () => {
        Alert.alert("Diary Cleared", "All diary entries have been deleted.");
    };

    return (
        <ImageBackground source={theme.backgroundImage} style={styles.imageBackground}>
            <View style={[styles.container, { backgroundColor: theme.background }]}>
                <View style={[styles.card, { backgroundColor: `${theme.cardBackground}CC` }]}>
                    <Text style={[styles.header, { color: theme.text }]} >Diary Settings</Text>

                    <View style={styles.pickerContainer}>
                        <Text style={[styles.text, { color: theme.textColor }]}>Select Theme</Text>
                        <Picker
                            selectedValue={selectedTheme}
                            style={[styles.picker, { backgroundColor: theme.cardBackground }]}
                            onValueChange={handleThemeChange}
                        >
                            <Picker.Item label="Spring" value="Spring" />
                            <Picker.Item label="Summer" value="Summer" />
                            <Picker.Item label="Autumn" value="Autumn" />
                            <Picker.Item label="Winter" value="Winter" />
                        </Picker>
                    </View>

                    <View style={styles.pickerContainer}>
                        <Text style={[styles.text, { color: theme.textColor }]}>Font Size</Text>
                        <Picker
                            selectedValue={fontSize}
                            style={[styles.picker, { backgroundColor: theme.cardBackground }]}
                            onValueChange={handleFontSizeChange}
                        >
                            <Picker.Item label="Small" value="Small" />
                            <Picker.Item label="Medium" value="Medium" />
                            <Picker.Item label="Large" value="Large" />
                        </Picker>
                    </View>

                    <Button title="Clear Diary Entries" onPress={handleClearDiary} color={theme.buttonColor} />

                    <View style={styles.logoutButton}>
                        <Button title="Logout" onPress={handleLogout} color={theme.buttonColor} />
                    </View>
                </View>
            </View>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    imageBackground: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
    },
    card: {
        padding: 30,
        borderRadius: 12,
        elevation: 10,
        width: '90%',
        maxWidth: 400,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 6
    },
    header: {
        fontSize: 28,
        fontWeight: '600',
        marginBottom: 25,
        textAlign: 'center',
    },
    pickerContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 25,
        justifyContent: 'space-between',
        width: '100%',
    },
    text: {
        fontSize: 16,
        marginRight: 10,
    },
    picker: {
        height: 50,
        width: 150,
        borderColor: '#ddd',
        borderWidth: 1,
        borderRadius: 5
    },
    logoutButton: {
        marginTop: 20
    }
});
