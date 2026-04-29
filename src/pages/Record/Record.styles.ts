import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    page: {
        flex: 1,
        padding: 20,
        backgroundColor: "#0f0f19",
    },

    modeSelector: {
        flexDirection: "row",
        marginBottom: 20,
    },

    modeBtn: {
        flex: 1,
        backgroundColor: "#222",
        padding: 14,
        borderRadius: 12,
        alignItems: "center",
        marginRight: 10,
    },

    modeBtnActive: {
        backgroundColor: "#667eea",
    },

    modeText: {
        color: "#fff",
        marginTop: 6,
        fontWeight: "600",
    },

    recordingStage: {
        alignItems: "center",
        padding: 40,
        borderRadius: 20,
        backgroundColor: "#181825",
    },

    timerDisplay: {
        fontSize: 42,
        color: "#fff",
        marginBottom: 30,
    },

    recordBtn: {
        padding: 20,
        borderRadius: 40,
    },

    recordBtnStart: {
        backgroundColor: "#667eea",
    },

    recordBtnStop: {
        backgroundColor: "#f5576c",
    },

    controlGroup: {
        flexDirection: "row",
        gap: 20,
    },

    controlBtn: {
        padding: 14,
        backgroundColor: "#333",
        borderRadius: 10,
    },

    saveBtn: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#43e97b",
        paddingHorizontal: 18,
        paddingVertical: 10,
        borderRadius: 10,
    },

    saveText: {
        color: "#fff",
        marginLeft: 8,
    },

    saveError: {
        marginTop: 10,
        color: "#f5576c",
    },

    playbackVideo: {
        marginTop: 20,
        width: "100%",
        height: 300,
        backgroundColor: "#000",
    },

    uploadSection: {
        marginTop: 30,
        alignItems: "center",
    },

    uploadTitle: {
        color: "#fff",
        marginTop: 10,
    },
});
