import { StyleSheet, Platform } from "react-native";

export const styles = StyleSheet.create({
    /* OVERLAY */

    overlay: {
        position: "absolute",
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        zIndex: 1000,
        backgroundColor: "rgba(0,0,0,0.75)",
        justifyContent: "center",
        alignItems: "center",
        padding: 24,
    },

    /* PLAYER CARD */

    card: {
        width: "100%",
        maxWidth: 640,
        backgroundColor: "#131a2b",
        borderRadius: 20,
        padding: 32,
        borderWidth: 1,
        borderColor: "rgba(255,255,255,0.08)",

        ...Platform.select({
            ios: {
                shadowColor: "#000",
                shadowOpacity: 0.35,
                shadowRadius: 20,
                shadowOffset: { width: 0, height: 10 },
            },
            android: {
                elevation: 10,
            },
        }),
    },

    /* HEADER */

    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },

    meta: {
        flexDirection: "row",
        alignItems: "center",
    },

    /* BADGE */

    badge: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 20,
        backgroundColor: "rgba(102,126,234,0.15)",
    },

    badgeText: {
        color: "#667eea",
        marginLeft: 4,
        fontSize: 11,
        fontWeight: "600",
        textTransform: "uppercase",
    },

    category: {
        marginLeft: 12,
        fontSize: 11,
        fontWeight: "600",
        color: "rgba(255,255,255,0.35)",
        textTransform: "uppercase",
    },

    /* CLOSE BUTTON */

    closeButton: {
        width: 36,
        height: 36,
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(255,255,255,0.06)",
    },

    /* TITLE */

    title: {
        marginTop: 14,
        fontSize: 22,
        fontWeight: "700",
        color: "#fff",
        lineHeight: 28,
    },

    /* MEDIA WRAPPER */

    mediaWrap: {
        marginTop: 18,
        borderRadius: 14,
        overflow: "hidden",
        backgroundColor: "rgba(0,0,0,0.3)",
    },

    /* VIDEO */

    video: {
        width: "100%",
        height: 360,
        borderRadius: 14,
        backgroundColor: "#000",
    },

    /* AUDIO */

    audioWrap: {
        alignItems: "center",
        paddingVertical: 30,
        paddingHorizontal: 20,
    },

    audioArt: {
        width: 120,
        height: 120,
        borderRadius: 60,
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 16,

        ...Platform.select({
            ios: {
                shadowColor: "#000",
                shadowOpacity: 0.35,
                shadowRadius: 16,
                shadowOffset: { width: 0, height: 8 },
            },
            android: {
                elevation: 6,
            },
        }),
    },

    audioPlayer: {
        width: "100%",
        maxWidth: 480,
        height: 44,
        borderRadius: 10,
        backgroundColor: "#000",
    },

    /* EXCERPT */

    excerpt: {
        marginTop: 14,
        fontSize: 14,
        color: "rgba(255,255,255,0.4)",
        lineHeight: 22,
    },

    /* FOOTER */

    footer: {
        marginTop: 16,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingTop: 12,
        borderTopWidth: 1,
        borderTopColor: "rgba(255,255,255,0.06)",
    },

    author: {
        fontSize: 13,
        fontWeight: "600",
        color: "rgba(255,255,255,0.6)",
    },

    date: {
        fontSize: 12,
        color: "rgba(255,255,255,0.3)",
    },
});
