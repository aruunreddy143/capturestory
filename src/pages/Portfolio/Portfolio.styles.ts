import { StyleSheet, Platform } from 'react-native';

export const styles = StyleSheet.create({

    /* CONTAINER */

    container: {
        flex: 1,
        padding: 20,
        paddingBottom: 60,
        backgroundColor: "#0f0f19",
    },

    /* PROFILE HEADER */

    profileHeader: {
        borderRadius: 20,
        overflow: "hidden",
        backgroundColor: "rgba(255,255,255,0.03)",
        borderWidth: 1,
        borderColor: "rgba(255,255,255,0.06)",
        marginBottom: 32,
    },

    profileHeaderBg: {
        height: 140,
        backgroundColor: "#667eea",
        opacity: 0.6,
    },

    profileHeaderContent: {
        flexDirection: "row",
        alignItems: "flex-start",
        paddingHorizontal: 24,
        marginTop: -40,
    },

    /* AVATAR */

    profileAvatarLarge: {
        width: 96,
        height: 96,
        borderRadius: 20,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#667eea",
        borderWidth: 4,
        borderColor: "#0f0f19",
        marginRight: 20,

        ...Platform.select({
            ios: {
                shadowColor: "#000",
                shadowOpacity: 0.3,
                shadowRadius: 20,
                shadowOffset: { width: 0, height: 8 },
            },
            android: {
                elevation: 6,
            },
        }),
    },

    avatarText: {
        fontSize: 34,
        fontWeight: "800",
        color: "#fff",
    },

    /* PROFILE INFO */

    profileInfo: {
        flex: 1,
        paddingTop: 40,
    },

    profileName: {
        fontSize: 24,
        fontWeight: "800",
        color: "#fff",
        marginBottom: 4,
    },

    profileBio: {
        fontSize: 14,
        color: "rgba(255,255,255,0.5)",
        marginBottom: 8,
    },

    profileMeta: {
        flexDirection: "row",
        alignItems: "center",
    },

    metaItem: {
        flexDirection: "row",
        alignItems: "center",
        marginRight: 14,
    },

    metaText: {
        marginLeft: 6,
        fontSize: 12,
        color: "rgba(255,255,255,0.35)",
    },

    /* ACTION BUTTONS */

    profileActions: {
        paddingTop: 40,
    },

    btn: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 16,
        paddingVertical: 10,
        borderRadius: 10,
        marginBottom: 8,
    },

    btnPrimary: {
        backgroundColor: "#667eea",
    },

    btnSecondary: {
        backgroundColor: "#38b2ac",
    },

    btnText: {
        color: "#fff",
        marginLeft: 8,
        fontWeight: "600",
    },

    /* PROFILE STATS */

    profileStatsRow: {
        flexDirection: "row",
        marginTop: 20,
        paddingHorizontal: 24,
        paddingVertical: 18,
        borderTopWidth: 1,
        borderTopColor: "rgba(255,255,255,0.06)",
    },

    profileStat: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
    },

    statTextWrap: {
        marginLeft: 10,
    },

    profileStatValue: {
        fontSize: 18,
        fontWeight: "800",
        color: "#fff",
    },

    profileStatLabel: {
        fontSize: 12,
        color: "rgba(255,255,255,0.4)",
    },

    /* PORTFOLIO */

    portfolioContent: {
        marginTop: 10,
    },

    portfolioSection: {
        marginBottom: 32,
    },

    portfolioSectionHeader: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 16,
    },

    sectionTitle: {
        marginLeft: 8,
        fontSize: 18,
        fontWeight: "700",
        color: "#fff",
        flex: 1,
    },

    countBadge: {
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 20,
        backgroundColor: "rgba(102,126,234,0.15)",
    },

    countText: {
        color: "#667eea",
        fontWeight: "700",
        fontSize: 12,
    },

    /* STORIES GRID */

    portfolioStoriesGrid: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
    },

    storyCardWrapper: {
        width: "32%",
        marginBottom: 16,
    },

    /* EMPTY STATE */

    emptySection: {
        alignItems: "center",
        padding: 40,
        borderRadius: 16,
        backgroundColor: "rgba(255,255,255,0.02)",
        borderWidth: 1,
        borderColor: "rgba(255,255,255,0.06)",
    },

    emptyText: {
        marginTop: 10,
        fontSize: 14,
        color: "rgba(255,255,255,0.35)",
        textAlign: "center",
    },

});
