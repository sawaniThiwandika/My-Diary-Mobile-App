import {View, Text, Button, Alert, BackHandler} from "react-native";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Profile() {
    const router = useRouter();

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

    return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <Text>Profile Page</Text>
            <Button title="Logout" onPress={handleLogout} />
        </View>
    );
}
