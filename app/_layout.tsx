import {Stack} from "expo-router";
import AddNote from "./AddNote";
import TabLayout from "./(tabs)/_layout";
import {Provider} from "react-redux";
import store from "./store";
export default function Layout() {
    return (
        <Provider store={store}>
        <Stack>
            <Stack.Screen name="index" options={{headerShown: false}}/>
            <Stack.Screen name="signup" options={{headerShown: false}}/>
            <Stack.Screen name="(tabs)"  options={{ headerShown: false }} />
            <Stack.Screen name="AddNote" options={{ headerShown: false }} />
        </Stack>
        </Provider>
    );
}
