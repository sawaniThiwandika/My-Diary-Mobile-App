import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import { useState } from "react";
import { useRouter } from "expo-router";

export default function signup() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSignup = () => {
        if (email && password) {
            alert("Account created! Please log in.");
            router.replace("/login");
        } else {
            alert("Enter email and password!");
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Sign Up</Text>
            <TextInput placeholder="Email" value={email} onChangeText={setEmail} style={styles.input} />
            <TextInput placeholder="Password" secureTextEntry value={password} onChangeText={setPassword} style={styles.input} />
            <Button title="Sign Up" onPress={handleSignup} />
            <Text style={styles.text}>Already have an account?</Text>
            <Button title="Sign In" onPress={() => router.push("/login")} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: "center", alignItems: "center", padding: 20 },
    title: { fontSize: 24, fontWeight: "bold", marginBottom: 20 },
    input: { width: "100%", padding: 10, borderWidth: 1, marginBottom: 10, borderRadius: 5 },
    text: { marginTop: 10, fontSize: 16 },
});
