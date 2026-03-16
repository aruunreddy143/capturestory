import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({

    /* PAGE */

    page: {
        flexGrow: 1,
        padding: 20,
        backgroundColor: "#0f0f19",
    },

    /* MAIN LAYOUT */

    container: {
        flexDirection: "row",
        alignItems: "flex-start",
    },

    editorContainer: {
        flex: 1,
        minWidth: 0,
        maxWidth: 900,
        backgroundColor: "rgba(255,255,255,0.02)",
        borderRadius: 16,
        borderWidth: 1,
        borderColor: "rgba(255,255,255,0.06)",
        padding: 20,
    },

    /* HEADER */

    editorHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 16,
    },

    editorMeta: {
        flexDirection: "row",
        alignItems: "center",
    },

    /* CATEGORY */

    categorySelector: {},

    categoryTrigger: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "rgba(255,255,255,0.08)",
        backgroundColor: "rgba(255,255,255,0.04)",
    },

    categoryDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: "#667eea",
        marginRight: 8,
    },

    categoryText: {
        color: "rgba(255,255,255,0.7)",
        fontSize: 13,
        fontWeight: "500",
        textTransform: "capitalize",
    },

    categoryDropdown: {
        marginTop: 6,
        backgroundColor: "#191928",
        borderRadius: 12,
        borderWidth: 1,
        borderColor: "rgba(255,255,255,0.1)",
        padding: 8,
    },

    categoryOption: {
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 8,
    },

    categoryOptionActive: {
        backgroundColor: "rgba(102,126,234,0.1)",
    },

    categoryOptionText: {
        color: "rgba(255,255,255,0.6)",
        textTransform: "capitalize",
    },

    categoryOptionTextActive: {
        color: "#667eea",
        fontWeight: "600",
    },

    /* STATS */

    editorStats: {
        marginLeft: 12,
        fontSize: 12,
        color: "rgba(255,255,255,0.3)",
    },

    /* ACTIONS */

    editorActions: {
        flexDirection: "row",
        alignItems: "center",
    },

    btn: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 8,
        paddingHorizontal: 14,
        borderRadius: 10,
    },

    btnGhost: {
        borderWidth: 1,
        borderColor: "rgba(255,255,255,0.08)",
        backgroundColor: "transparent",
        marginRight: 8,
    },

    btnPublish: {
        backgroundColor: "#667eea",
    },

    btnText: {
        marginLeft: 6,
        color: "rgba(255,255,255,0.7)",
        fontWeight: "500",
    },

    btnTextPublish: {
        color: "#fff",
        fontWeight: "600",
    },

    errorText: {
        color: "#f5576c",
        marginRight: 10,
    },

    /* TOOLBAR */

    editorToolbar: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 12,
        backgroundColor: "rgba(255,255,255,0.03)",
        borderWidth: 1,
        borderColor: "rgba(255,255,255,0.06)",
        marginBottom: 16,
    },

    toolbarGroup: {
        flexDirection: "row",
    },

    toolbarBtn: {
        width: 36,
        height: 36,
        borderRadius: 8,
        alignItems: "center",
        justifyContent: "center",
        marginRight: 6,
    },

    toolbarDivider: {
        width: 1,
        height: 24,
        backgroundColor: "rgba(255,255,255,0.08)",
        marginHorizontal: 8,
    },

    /* WRITING AREA */

    writingArea: {
        padding: 24,
        borderRadius: 16,
        backgroundColor: "rgba(255,255,255,0.02)",
        borderWidth: 1,
        borderColor: "rgba(255,255,255,0.06)",
    },

    titleInput: {
        fontSize: 28,
        fontWeight: "800",
        color: "#fff",
        marginBottom: 20,
    },

    contentInput: {
        minHeight: 400,
        fontSize: 16,
        color: "rgba(255,255,255,0.8)",
        lineHeight: 28,
    },

    /* SIDE PANEL */

    sidePanel: {
        width: 280,
        marginLeft: 20,
    },

    panelSection: {
        marginBottom: 20,
    },

    panelTitle: {
        fontSize: 13,
        fontWeight: "600",
        color: "rgba(255,255,255,0.6)",
        marginBottom: 10,
    },

    coverPreview: {
        borderRadius: 12,
        borderWidth: 2,
        borderColor: "rgba(255,255,255,0.08)",
        borderStyle: "dashed",
        padding: 20,
        alignItems: "center",
    },

    coverPlaceholder: {
        alignItems: "center",
    },

    coverText: {
        marginTop: 8,
        color: "rgba(255,255,255,0.3)",
    },

    tipsCard: {
        padding: 12,
        borderRadius: 10,
        backgroundColor: "rgba(255,255,255,0.03)",
        borderWidth: 1,
        borderColor: "rgba(255,255,255,0.04)",
        marginBottom: 8,
    },

    tip: {
        fontSize: 13,
        color: "rgba(255,255,255,0.45)",
        lineHeight: 20,
    },

});
