import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "react-native-vector-icons";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import HomeScreen from "./index";
import NotesScreen from "./noteslist";
import SettingsScreen from "./settings";
import { useNavigation } from "@react-navigation/native";

const Tab = createBottomTabNavigator();

export default function TabLayout() {
    const navigation = useNavigation();

    return (
        <View style={{ flex: 1 }}>
            <Tab.Navigator
                screenOptions={({ route }) => ({
                    tabBarIcon: ({ color, size }) => {
                        let iconName: string = "";

                        if (route.name === "Home") {
                            iconName = "home-outline";
                        } else if (route.name === "NotesList") {
                            iconName = "book-outline";
                        } else if (route.name === "Settings") {
                            iconName = "settings-outline";
                        }

                        return <Ionicons name={iconName} size={size} color={color} />;
                    },
                    tabBarActiveTintColor: "#DA498D",
                    tabBarInactiveTintColor: "#B0BEC5",
                    tabBarStyle: {
                        backgroundColor: "white",
                        borderTopWidth: 0,
                        borderTopStartRadius:30,
                        borderTopEndRadius:30,
                        height:60
                    },
                })}
            >
                <Tab.Screen name="Home" component={HomeScreen} />
                <Tab.Screen name="NotesList" component={NotesScreen} />
                <Tab.Screen name="Settings" component={SettingsScreen} />
            </Tab.Navigator>

            <TouchableOpacity
                style={styles.addButton}
                onPress={() => navigation.navigate("AddNote")}
            >
                <Ionicons name="add-circle" size={47} color="white" />
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    addButton: {
        position: "absolute",
        bottom: 75,
        right: 20,
        backgroundColor: "#DA498D",
        borderRadius: 20,
        padding: 15,
        elevation: 10,
    },
});
