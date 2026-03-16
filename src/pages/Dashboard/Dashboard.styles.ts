import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({

    container: {
        flex: 1,
        padding: 24,
    },

    welcomeSection: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingVertical: 32,
        paddingHorizontal: 40,
        borderRadius: 20,
        backgroundColor: "rgba(102,126,234,0.12)",
        borderWidth: 1,
        borderColor: "rgba(102,126,234,0.15)",
        marginBottom: 32,
    },

    welcomeTitle: {
        fontSize: 28,
        fontWeight: "800",
        color: "#fff",
        marginBottom: 6,
    },

    gradientText: {
        color: "#667eea",
    },

    welcomeSubtitle: {
        color: "rgba(255,255,255,0.5)",
        fontSize: 15,
    },

    welcomeActions: {
        flexDirection: "row",
    },

    btn: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 12,
        marginLeft: 12,
    },

    btnPrimary: {
        backgroundColor: "#667eea",
    },

    btnSecondary: {
        backgroundColor: "rgba(255,255,255,0.06)",
        borderWidth: 1,
        borderColor: "rgba(255,255,255,0.1)",
    },

    btnText: {
        color: "#fff",
        fontSize: 14,
        fontWeight: "600",
        marginLeft: 6,
    },

    statsGrid: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
        marginBottom: 40,
    },

    statCard: {
        width: "48%",
        padding: 24,
        borderRadius: 16,
        backgroundColor: "rgba(255,255,255,0.03)",
        borderWidth: 1,
        borderColor: "rgba(255,255,255,0.06)",
        marginBottom: 16,
    },

    statCardHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 12,
    },

    statIcon: {
        width: 44,
        height: 44,
        borderRadius: 12,
        justifyContent: "center",
        alignItems: "center",
    },

    statValue: {
        fontSize: 32,
        fontWeight: "800",
        color: "#fff",
        marginBottom: 4,
    },

    statLabel: {
        fontSize: 14,
        color: "rgba(255,255,255,0.45)",
    },

    statChange: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 6,
    },

    statChangeText: {
        color: "#43e97b",
        fontSize: 12,
        marginLeft: 4,
    },

    section: {
        marginBottom: 40,
    },

    sectionHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 16,
    },

    sectionTitle: {
        fontSize: 20,
        fontWeight: "700",
        color: "#fff",
    },

    link: {
        color: "#667eea",
        fontWeight: "600",
    },

    storiesGrid: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
    },

    storytellerCard: {
        flexDirection: "row",
        alignItems: "center",
        padding: 20,
        borderRadius: 16,
        backgroundColor: "rgba(255,255,255,0.03)",
        borderWidth: 1,
        borderColor: "rgba(255,255,255,0.06)",
        marginBottom: 12,
    },

    storytellerAvatar: {
        width: 48,
        height: 48,
        borderRadius: 14,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f5576c",
        marginRight: 16,
    },

    storytellerAvatarText: {
        color: "#fff",
        fontWeight: "700",
    },

    storytellerName: {
        fontSize: 15,
        fontWeight: "700",
        color: "#fff",
    },

    storytellerBio: {
        fontSize: 13,
        color: "rgba(255,255,255,0.4)",
    },

    storytellerStats: {
        fontSize: 12,
        color: "rgba(255,255,255,0.35)",
    },

    btnFollow: {
        paddingVertical: 8,
        paddingHorizontal: 20,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "#667eea",
    },

    btnFollowText: {
        color: "#667eea",
        fontWeight: "600",
    },

});
