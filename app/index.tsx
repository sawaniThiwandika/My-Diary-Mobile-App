import { View, Text, TextInput, Button, StyleSheet, ImageBackground, TouchableOpacity } from "react-native";
import {useEffect, useState} from "react";
import { useRouter } from "expo-router";
import {User} from "./model/UserModel";
import {login} from "./reducers/UserSlice";
import {useDispatch, useSelector} from "react-redux";

export default function Login() {
    const isAuthenticated = useSelector(
        (state:any) => state.user.isAuthenticated);

    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
     const dispatch=useDispatch();
    const handleLogin = () => {
        if (email && password) {
            const user: User = { userName: email,password: password }
            dispatch(login(user));


        } else {
            alert("Enter email and password!");
        }
    };
    useEffect(() => {
        if (isAuthenticated) {
            router.replace("/(tabs)");
        }
    }, [isAuthenticated])

    return (
        <View style={styles.container}>
            <ImageBackground
                source={require("../assets/Transparent_Feather_Pen_Png.png")}
                style={styles.imageBackground}
            >
                {/* Colored background layer on top of the image */}
                <View style={styles.bottomLayer}>
                    <Text style={styles.title}>Sign In</Text>

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

                    <TouchableOpacity
                        style={styles.loginButton}
                        onPress={handleLogin}
                    >
                        <Text style={styles.loginButtonText}>Login</Text>
                    </TouchableOpacity>

                    <View style={styles.textContainer}>
                        <Text style={styles.text}>Don't have an account? </Text>
                        <TouchableOpacity onPress={() => router.push("/signup")}>
                            <Text style={styles.signUpText}>Sign Up</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ImageBackground>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    imageBackground: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#FFDFEF",
    },
    bottomLayer: {
        backgroundColor: "rgba(255, 255, 255, 0.3)",
        padding: 20,
        borderRadius: 15,
        width: "90%",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 20,
        height: 500,
    },
    title: {
        fontSize: 30,
        fontWeight: "bold",
        marginBottom: 20,
        color: "#FF3B6A",
    },
    input: {
        width: "100%",
        padding: 12,
        borderWidth: 1,
        borderRadius: 8,
        backgroundColor: "#fff",
        marginBottom: 15,
        borderColor: "#FF7F7F",
        fontSize: 16,
        color: "#333",
    },
    loginButton: {
        backgroundColor: "#FF7F7F",
        paddingVertical: 15,
        paddingHorizontal: 40,
        borderRadius: 8,
        width: "60%",
        marginBottom: 15,
        alignItems: "center",
    },
    loginButtonText: {
        fontSize: 18,
        color: "#fff",
        fontWeight: "bold",
    },
    textContainer: {
        flexDirection: "row",
        marginTop: 15,
    },
    text: {
        fontSize: 16,
        color: "#333",
    },
    signUpText: {
        fontSize: 16,
        color: "#FF7F7F",
        fontWeight: "bold",
    },
});
