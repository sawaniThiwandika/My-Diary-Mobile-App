import React, { useEffect, useRef, useState } from "react";
import { View, Text, StyleSheet, FlatList, ScrollView, ImageBackground } from "react-native";
import { useSelector } from "react-redux";
import CalendarComponent from "../components/CalenderComponent";
import {useFonts} from "expo-font";

const formatDate = (date: string) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const dateObj = new Date(date);
    return dateObj.toLocaleDateString('en-US', options);
};

export default function Home() {
    const [selectedDate, setSelectedDate] = useState<string>("");
    const [filteredNotes, setFilteredNotes] = useState<any[]>([]);
    const notes = useSelector((state) => state.notes.notes);
    const scrollViewRef = useRef<ScrollView>(null);

    useEffect(() => {
        if (selectedDate) {
            const formattedDate = formatDate(selectedDate);
            const filtered = notes.filter((note: any) => note.date === formattedDate);
            setFilteredNotes(filtered);
        }
        if (scrollViewRef.current) {
            scrollViewRef.current.scrollToEnd({ animated: true });
        }
    }, [selectedDate, notes]);

    const handleDayPress = (date: string) => {
        setSelectedDate(date);
    };

    return (
        <ImageBackground source={require("../../assets/SKY-1.jpg")} style={styles.background}>
            <ScrollView
                ref={scrollViewRef}
                style={styles.scrollContainer}
                contentContainerStyle={{ flexGrow: 1 }}
                showsVerticalScrollIndicator={false}
            >
                <View style={styles.container}>
                    <Text style={styles.welcomeText}>Welcome to My Diary!</Text>
                    <CalendarComponent onDayPress={handleDayPress} />

                    {selectedDate && (
                        <View style={styles.notesContainer}>
                            <Text style={styles.selectedDateText}>Notes for {selectedDate}:</Text>

                            {filteredNotes.length === 0 ? (
                                <Text style={styles.noNotes}>No notes for this day.</Text>
                            ) : (
                                <FlatList
                                    data={filteredNotes}
                                    keyExtractor={(item, index) => index.toString()}
                                    renderItem={({ item }) => (
                                        <View style={styles.noteContainer}>
                                            <Text style={styles.noteDate}>{item.time}</Text>
                                            <Text style={styles.noteText}>{item.content}</Text>
                                        </View>
                                    )}
                                    scrollEnabled={false}
                                />
                            )}
                        </View>
                    )}
                </View>
            </ScrollView>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        resizeMode: "cover",
       // backgroundColor: "#f0f4f8",
    },
    scrollContainer: {
        flex: 1,
    },
    container: {
        flex: 1,
        justifyContent: "flex-start",
        alignItems: "center",
        padding: 20,
    },
    welcomeText: {
        fontSize: 30,
        fontWeight: "bold",
        marginBottom: 20,
        color: "#4A4A4A",
        fontFamily: "Quicksand-Regular",
        textAlign: "center",
    },
    selectedDateText: {
        fontSize: 22,
        marginBottom: 10,
        fontWeight: "bold",
        color: "#6B6E70",
        fontFamily: "Lora-Regular",
        textAlign: "center",
    },
    noNotes: {
        fontSize: 18,
        color: "#A1A1A1",
        textAlign: "center",
        marginTop: 10,
        fontStyle: "italic",
        fontFamily: "Lora-Regular",
    },
    notesContainer: {
        width: "100%",
    },
    noteContainer: {
        backgroundColor: "#EABDE6",
        padding: 14,
        marginVertical: 6,
        borderRadius: 15,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.15,
        shadowRadius: 5,

    },
    noteDate: {
        fontSize: 15,
        color: "#AA60C8",
        fontStyle: "italic",
        fontFamily: "Roboto-Regular",
    },
    noteText: {
        fontSize: 18,
        color: "#3D3D3D",
        fontWeight: "500",
        fontFamily: "Lora-Regular",
        lineHeight: 24,
    },
});
