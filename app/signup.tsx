import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import { useState } from "react";
import { useRouter } from "expo-router";
import { useDispatch } from "react-redux";
import { register } from "./reducers/UserSlice"; // Import the register action from the slice

export default function Signup() {
    const router = useRouter();
    const dispatch = useDispatch();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState(""); // Added username field

    const handleSignup = () => {
        if (email && password && username) {
            const user = { userName: username, password: password };
            dispatch(register(user)).then(() => {
                    alert("Account created! Please log in.");
                    router.replace("/login");
                })
                .catch((error) => {
                    alert("Error creating account: " + error.message);
                });
        } else {
            alert("Please enter username, email, and password!");
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Sign Up</Text>
            <TextInput
                placeholder="Username"
                value={username}
                onChangeText={setUsername}
                style={styles.input}
            />
            <TextInput
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                style={styles.input}
            />
            <TextInput
                placeholder="Password"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
                style={styles.input}
            />
            <Button title="Sign Up" onPress={handleSignup} />
            <Text style={styles.text}>Already have an account?</Text>
            <Button title="Sign In" onPress={() => router.push("/login")} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 20,
    },
    input: {
        width: "100%",
        padding: 10,
        borderWidth: 1,
        marginBottom: 10,
        borderRadius: 5,
    },
    text: {
        marginTop: 10,
        fontSize: 16,
    },
});
