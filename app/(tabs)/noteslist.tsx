import React, { useEffect } from "react";
import { View, Text, FlatList, StyleSheet, ImageBackground } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "expo-router";
import { setNotes } from '../reducers/NoteSlice';

export default function NotesList() {
    const notes = useSelector((state) => state.notes.notes);
    const dispatch = useDispatch();

    useEffect(() => {}, [dispatch]);

    return (
        <ImageBackground
            source={require("../../assets/SKY-1.jpg")}
            style={styles.backgroundImage}
        >
            <View style={styles.container}>
                <Text style={styles.header}>Your Notes</Text>

                {notes.length === 0 ? (
                    <Text style={styles.noNotes}>No notes available. Add some!</Text>
                ) : (
                    <FlatList
                        data={notes}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item }) => (
                            <View style={styles.noteContainer}>
                                <Text style={styles.dateTime}>{item.date} {item.time}</Text>
                                <Text style={styles.noteText}>{item.content}</Text>
                            </View>
                        )}
                    />
                )}
            </View>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    backgroundImage: {
        flex: 1,
        resizeMode: "cover",
        justifyContent: "center",
    },
    container: {
        flex: 1,
        padding: 20,
       // backgroundColor: "rgba(255, 245, 247, 0.35)",
    },
    header: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 20,
        textAlign: "center",
        color: "#E5989B",
    },
    noNotes: {
        fontSize: 18,
        textAlign: "center",
        color: "#888",
        marginTop: 50,
    },
    noteContainer: {
        backgroundColor: "rgba(170,96,200, 0.2)",
        padding: 15,
        marginBottom: 10,
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    dateTime: {
        fontSize: 14,
        color: "#666",
        fontStyle: "italic",
        marginBottom: 5,
    },
    noteText: {
        fontSize: 16,
        color: "#3D3D3D",
    },
});
