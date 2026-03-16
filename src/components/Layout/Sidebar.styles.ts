import { StyleSheet, Platform } from "react-native";

export const styles = StyleSheet.create({
    /* SIDEBAR */

    sidebar: {
        width: 260,
        height: "100%",
        backgroundColor: "rgba(15,15,25,0.95)",
        borderRightWidth: 1,
        borderRightColor: "rgba(255,255,255,0.06)",
        paddingTop: 24,
        paddingBottom: 16,
        zIndex: 100,
    },

    /* BRAND */

    brand: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 24,
        marginBottom: 40,
    },

    brandIcon: {
        width: 42,
        height: 42,
        borderRadius: 12,
        justifyContent: "center",
        alignItems: "center",

        backgroundColor: "#667eea",

        ...Platform.select({
            ios: {
                shadowColor: "#667eea",
                shadowOpacity: 0.4,
                shadowRadius: 8,
                shadowOffset: { width: 0, height: 4 },
            },
            android: {
                elevation: 4,
            },
        }),
    },

    brandText: {
        marginLeft: 12,
        fontSize: 20,
        fontWeight: "700",
        color: "#fff",
    },

    /* NAVIGATION */

    nav: {
        flex: 1,
        paddingHorizontal: 12,
    },

    navItem: {
        flexDirection: "row",
        alignItems: "center",
        gap: 12,
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderRadius: 12,
        marginBottom: 4,
    },

    navText: {
        fontSize: 14,
        fontWeight: "500",
        color: "rgba(255,255,255,0.55)",
    },

    /* ACTIVE NAV ITEM */

    activeItem: {
        backgroundColor: "rgba(102,126,234,0.15)",
    },

    activeText: {
        color: "#fff",
    },

    /* ACTIVE INDICATOR */

    activeIndicator: {
        position: "absolute",
        left: 0,
        width: 3,
        height: 24,
        borderTopRightRadius: 3,
        borderBottomRightRadius: 3,
        backgroundColor: "#667eea",
    },

    /* FOOTER */

    footer: {
        paddingHorizontal: 12,
        paddingTop: 16,
        borderTopWidth: 1,
        borderTopColor: "rgba(255,255,255,0.06)",
    },
});
