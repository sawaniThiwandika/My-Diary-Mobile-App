import React from "react";
import { StyleSheet } from "react-native";
import { Calendar } from "react-native-calendars";

const getCurrentDate = (): string => {
    const today = new Date();
    const year = today.getFullYear();
    const month = (today.getMonth() + 1).toString().padStart(2, "0");
    const day = today.getDate().toString().padStart(2, "0");
    return `${year}-${month}-${day}`;
};

const CalendarComponent = ({ onDayPress }: { onDayPress: (date: string) => void }) => {
    const currentDate = getCurrentDate();

    return (
        <Calendar
            onDayPress={(day) => onDayPress(day.dateString)}
            markedDates={{
                [currentDate]: { selected: true, marked: true, selectedColor: '#D17D98' },
            }}
            style={styles.calendar}
        />
    );
};

const styles = StyleSheet.create({
    calendar: {
        marginBottom: 20,
        borderRadius: 10,
    },
});

export default CalendarComponent;
