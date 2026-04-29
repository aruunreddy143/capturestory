import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    /* APP LAYOUT */

    container: {
        flex: 1,
        flexDirection: "row", // sidebar + main content
        backgroundColor: "#fff",
    },

    /* MAIN CONTENT AREA */

    mainContent: {
        flex: 1,
        flexDirection: "column",
        marginLeft: 260, // same as Vite sidebar width
    },

    /* PAGE CONTENT */

    pageContent: {
        flex: 1,
        padding: 32, // same as 2rem in Vite
    },
});
