import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({

    /* PAGE */

    container: {
        padding: 20,
        paddingBottom: 60,
        backgroundColor: "#0f0f19",
        maxWidth: 1200,
    },

    /* FILTER BAR */

    filtersBar: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 28,
    },

    filtersLeft: {
        flexDirection: "row",
        alignItems: "center",
        flex: 1,
    },

    filterIcon: {
        color: "rgba(255,255,255,0.4)",
        marginRight: 10,
    },

    /* CATEGORY PILLS */

    categoryPillsWrap: {
        flexDirection: "row",
        alignItems: "center",
    },

    pill: {
        paddingVertical: 6,
        paddingHorizontal: 16,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: "rgba(255,255,255,0.08)",
        backgroundColor: "rgba(255,255,255,0.03)",
        marginRight: 8,
    },

    pillActive: {
        backgroundColor: "rgba(102,126,234,0.15)",
        borderColor: "rgba(102,126,234,0.4)",
    },

    pillText: {
        fontSize: 13,
        fontWeight: "500",
        color: "rgba(255,255,255,0.5)",
        textTransform: "capitalize",
    },

    pillTextActive: {
        color: "#667eea",
        fontWeight: "700",
    },

    /* VIEW TOGGLE */

    viewToggle: {
        flexDirection: "row",
        backgroundColor: "rgba(255,255,255,0.03)",
        borderRadius: 10,
        padding: 4,
        borderWidth: 1,
        borderColor: "rgba(255,255,255,0.06)",
    },

    toggleBtn: {
        padding: 8,
        borderRadius: 8,
        marginLeft: 4,
        alignItems: "center",
        justifyContent: "center",
    },

    toggleBtnActive: {
        backgroundColor: "rgba(102,126,234,0.15)",
    },

    /* STORIES GRID */

    storiesList: {
        marginTop: 10,
    },

    storiesGrid: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
    },

    gridItem: {
        width: "32%",   // matches grid-template-columns: repeat(3,1fr)
        marginBottom: 20,
    },

    /* LIST VIEW */

    storiesListColumn: {
        flexDirection: "column",
    },

    listItem: {
        width: "100%",
        marginBottom: 16,
    },

    /* EMPTY STATE */

    emptyState: {
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 60,
    },

    emptyText: {
        marginTop: 10,
        color: "rgba(255,255,255,0.3)",
        fontSize: 14,
        textAlign: "center",
    },

});
