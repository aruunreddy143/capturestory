import { StyleSheet, Platform } from 'react-native';

export const styles = StyleSheet.create({

    /* PAGE */

    page: {
        flex: 1,
        backgroundColor: "#0a0a14",
        justifyContent: "center",
        alignItems: "center",
        padding: 32,
    },

    /* CARD */

    card: {
        width: "100%",
        maxWidth: 420,
        paddingVertical: 48,
        paddingHorizontal: 40,
        borderRadius: 24,
        backgroundColor: "rgba(255,255,255,0.03)",
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
                elevation: 8,
            },
        }),
    },

    /* BRAND */

    brand: {
        alignItems: "center",
        marginBottom: 40,
    },

    brandIcon: {
        width: 64,
        height: 64,
        borderRadius: 18,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#667eea",
        marginBottom: 20,

        ...Platform.select({
            ios: {
                shadowColor: "#667eea",
                shadowOpacity: 0.35,
                shadowRadius: 20,
                shadowOffset: { width: 0, height: 8 },
            },
            android: {
                elevation: 6,
            },
        }),
    },

    title: {
        fontSize: 28,
        fontWeight: "800",
        color: "#fff",
        marginBottom: 6,
    },

    subtitle: {
        fontSize: 14,
        color: "rgba(255,255,255,0.45)",
        textAlign: "center",
    },

    /* ERROR */

    errorBox: {
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderRadius: 12,
        backgroundColor: "rgba(245,87,108,0.1)",
        borderWidth: 1,
        borderColor: "rgba(245,87,108,0.25)",
        marginBottom: 20,
    },

    errorText: {
        color: "#f5576c",
        fontSize: 13,
    },

    /* BUTTON GROUP */

    buttons: {
        marginBottom: 16,
    },

    /* SSO BUTTON */

    ssoBtn: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",

        paddingVertical: 14,
        paddingHorizontal: 24,

        borderRadius: 14,

        backgroundColor: "rgba(255,255,255,0.05)",
        borderWidth: 1,
        borderColor: "rgba(255,255,255,0.1)",

        marginBottom: 12,
    },

    googleBtn: {
        backgroundColor: "#4285F4",
    },

    btnPressed: {
        opacity: 0.9,
    },

    btnDisabled: {
        opacity: 0.6,
    },

    /* GOOGLE ICON */

    googleIcon: {
        width: 28,
        height: 28,
        borderRadius: 6,
        backgroundColor: "#fff",
        justifyContent: "center",
        alignItems: "center",
        marginRight: 12,
    },

    googleG: {
        color: "#4285F4",
        fontWeight: "700",
        fontSize: 14,
    },

    ssoText: {
        color: "#fff",
        fontSize: 15,
        fontWeight: "600",
    },

    loadingIndicator: {
        marginLeft: 10,
    },

    /* DIVIDER */

    divider: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 20,
    },

    dividerLine: {
        flex: 1,
        height: 1,
        backgroundColor: "rgba(255,255,255,0.06)",
    },

    dividerText: {
        marginHorizontal: 12,
        fontSize: 12,
        color: "rgba(255,255,255,0.3)",
    },

});
