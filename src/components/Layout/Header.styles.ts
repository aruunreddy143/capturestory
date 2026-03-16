import { StyleSheet, Platform } from "react-native";

export const styles = StyleSheet.create({
    /* HEADER */

    header: {
        height: 72,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 20,
        backgroundColor: "rgba(15,15,25,0.9)",
        borderBottomWidth: 1,
        borderBottomColor: "rgba(255,255,255,0.06)",
        zIndex: 50,
    },

    /* LEFT */

    left: {
        flex: 1,
        justifyContent: "center",
    },

    title: {
        fontSize: 22,
        fontWeight: "700",
        color: "#fff",
    },

    /* CENTER */

    center: {
        flex: 2,
        alignItems: "center",
    },

    searchBar: {
        flexDirection: "row",
        alignItems: "center",
        width: "100%",
        maxWidth: 420,
        height: 42,
        borderRadius: 12,
        paddingHorizontal: 12,
        backgroundColor: "rgba(255,255,255,0.05)",
        borderWidth: 1,
        borderColor: "rgba(255,255,255,0.08)",
    },

    searchInput: {
        marginLeft: 8,
        flex: 1,
        color: "#fff",
        fontSize: 14,
    },

    searchIcon: {
        color: "rgba(255,255,255,0.4)",
    },

    /* RIGHT */

    right: {
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
    },

    /* NEW STORY BUTTON */

    newStoryBtn: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 12,

        backgroundColor: "#667eea",

        ...Platform.select({
            ios: {
                shadowColor: "#667eea",
                shadowOpacity: 0.3,
                shadowRadius: 8,
                shadowOffset: { width: 0, height: 4 },
            },
            android: {
                elevation: 4,
            },
        }),
    },

    newStoryText: {
        color: "#fff",
        marginLeft: 6,
        fontSize: 14,
        fontWeight: "600",
    },

    /* ICON BUTTON */

    iconBtn: {
        width: 42,
        height: 42,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: "rgba(255,255,255,0.08)",
        backgroundColor: "rgba(255,255,255,0.05)",
        justifyContent: "center",
        alignItems: "center",
    },

    /* NOTIFICATION */

    notificationBtn: {
        position: "relative",
    },

    notificationDot: {
        position: "absolute",
        top: 8,
        right: 8,
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: "#f5576c",
    },

    /* AVATAR */

    avatar: {
        width: 42,
        height: 42,
        borderRadius: 12,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#667eea",
    },

    avatarImg: {
        width: 42,
        height: 42,
        borderRadius: 12,
    },

    avatarText: {
        color: "#fff",
        fontWeight: "700",
    },

    /* LOGOUT BUTTON */

    logoutBtn: {
        borderColor: "rgba(245,87,108,0.25)",
    },
});
