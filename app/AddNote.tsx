import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { LinearGradient } from "expo-linear-gradient";
import { useDispatch } from 'react-redux';
import { addNote } from './reducers/NoteSlice';
import { router } from "expo-router";

const formatDate = (date: Date) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Intl.DateTimeFormat('en-US', options).format(date);
};

const formatTime = (date: Date) => {
    const options = { hour: "2-digit", minute: "2-digit", second: "2-digit" };
    return new Intl.DateTimeFormat('en-US', options).format(date);
};

export default function Addnote() {
    const [note, setNote] = useState("");
    const [currentDate, setCurrentDate] = useState<string>("");
    const [currentTime, setCurrentTime] = useState<string>("");
    const dispatch = useDispatch();

    useEffect(() => {
        const now = new Date();
        setCurrentDate(formatDate(now));
        setCurrentTime(formatTime(now));
    }, []);

    const addNoteHandler = async () => {
        if (note.trim()) {
            try {
                dispatch(addNote({ content: note, date: currentDate, time: currentTime }));
                setNote("");
                Alert.alert("Success", "Note added successfully!");
                router.back();
            } catch (error) {
                Alert.alert("Error", "Failed to save the note. Please try again.");
            }
        } else {
            Alert.alert("Error", "Please write a note before submitting.");

        }
    };

    return (
        <LinearGradient colors={["#ffb6c1", "#ffffff"]} style={styles.gradientBackground}>
            <View style={styles.container}>
                <TouchableOpacity style={styles.closeButton} onPress={() => router.back()}>
                    <Ionicons name="close" size={35} color="#333" />
                </TouchableOpacity>
                <Text style={styles.dateTime}>{currentDate} {currentTime}</Text>
                <TextInput
                    placeholder="Write your note..."
                    value={note}
                    onChangeText={setNote}
                    style={styles.input}
                    placeholderTextColor="#b2b2b2"
                    multiline
                    numberOfLines={8}
                />
                <TouchableOpacity style={styles.addButton} onPress={addNoteHandler}>
                    <Ionicons name="add-circle" size={35} color="white" />
                    <Text style={styles.addButtonText}>Add Note</Text>
                </TouchableOpacity>
            </View>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    gradientBackground: {
        flex: 1,
        justifyContent: "flex-start",
        alignItems: "center",
    },
    container: {
        width: "90%",
        alignItems: "center",
        justifyContent: "flex-start",
        paddingTop: 50,
    },
    closeButton: {
        position: "absolute",
        top: 20,
        right: 10,
        zIndex: 10,
        backgroundColor: "rgba(255, 255, 255, 0.7)",
        borderRadius: 15,
        padding: 5,
    },
    dateTime: {
        fontSize: 18,
        color: "#444",
        marginTop:25,
        marginBottom: 15,
        fontStyle: "italic",
        fontWeight: "500",
    },
    input: {
        width: "100%",
        padding: 18,
        borderRadius: 12,
        backgroundColor: "#ffffff",
        marginBottom: 20,
        fontSize: 18,
        color: "#333",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 6,
        height: 530,
    },
    addButton: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#ff66b2",
        paddingVertical: 12,
        paddingHorizontal: 25,
        borderRadius: 30,
        shadowColor: "#ff66b2",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.4,
        shadowRadius: 10,
        elevation: 8,
    },
    addButtonText: {
        color: "#fff",
        fontSize: 20,
        marginLeft: 12,
        fontWeight: "bold",
    },
});
