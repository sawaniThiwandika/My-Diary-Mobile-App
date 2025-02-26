import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "react-native-vector-icons";
import { View } from "react-native";
import HomeScreen from "./index";
import NotesScreen from "./noteslist";
import ProfileScreen from "./profile";

const Tab = createBottomTabNavigator();

export default function TabLayout() {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ color, size }) => {
                    let iconName: string = "";

                    if (route.name === "Home") {
                        iconName = "home-outline";
                    } else if (route.name === "Notes") {
                        iconName = "book-outline";
                    } else if (route.name === "Profile") {
                        iconName = "person-outline";
                    }

                    return <Ionicons name={iconName} size={size} color={color} />;
                },
            })}
        >
            <Tab.Screen name="Home" component={HomeScreen} />
            <Tab.Screen name="NotesList" component={NotesScreen} />
            <Tab.Screen name="Profile" component={ProfileScreen} />
        </Tab.Navigator>
    );
}
