import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { LinearGradient } from 'expo-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function WriteNote() {
    const [note, setNote] = useState('');
    const [currentDateTime, setCurrentDateTime] = useState<string>('');

    // Function to update the current date and time
    const updateDateTime = () => {
        const now = new Date();
        const formattedDate = now.toLocaleString(); // Formats the date and time
        setCurrentDateTime(formattedDate);
    };

    useEffect(() => {
        updateDateTime();
    }, []); // Update only once when the component mounts

    const addNote = async () => {
        if (note) {
            // Get the existing notes from AsyncStorage
            const existingNotes = await AsyncStorage.getItem('notes');
            const parsedNotes = existingNotes ? JSON.parse(existingNotes) : [];

            // Create a new note object with the note and current timestamp
            const newNote = { note, dateTime: currentDateTime };

            // Add the new note to the list
            const updatedNotes = [...parsedNotes, newNote];

            // Save the updated list of notes to AsyncStorage
            await AsyncStorage.setItem('notes', JSON.stringify(updatedNotes));

            // Clear the note input field
            setNote('');
        } else {
            alert('Please write a note');
        }
    };

    return (
        <LinearGradient
            colors={['#ffb6c1', '#ffffff']} // Pink to white gradient
            style={styles.gradientBackground}
        >
            <View style={styles.container}>
                {/* Display the current date and time */}
                <Text style={styles.dateTime}>{currentDateTime}</Text>

                {/* Input Field for Notes */}
                <TextInput
                    placeholder="Write your note..."
                    value={note}
                    onChangeText={setNote}
                    style={styles.input}
                    placeholderTextColor="#b2b2b2"
                    multiline
                    numberOfLines={8} // Increased height of note input field
                />

                {/* Add Note Button with Icon */}
                <TouchableOpacity style={styles.addButton} onPress={addNote}>
                    <Ionicons name="add-circle" size={30} color="white" />
                    <Text style={styles.addButtonText}>Add Note</Text>
                </TouchableOpacity>
            </View>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    gradientBackground: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    container: {
        width: '90%',
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingTop: 50,
    },
    dateTime: {
        fontSize: 16,
        color: '#666',
        marginBottom: 10,
        fontStyle: 'italic',
    },
    input: {
        width: '100%',
        padding: 15,
        borderRadius: 10,
        backgroundColor: '#ffffff',
        marginBottom: 20,
        fontSize: 16,
        color: '#333',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 6,
        height: 380, // Increased height for the note input space
    },
    addButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#ff66b2',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 25,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
    },
    addButtonText: {
        color: '#fff',
        fontSize: 18,
        marginLeft: 10,
        fontWeight: '600',
    },
});
