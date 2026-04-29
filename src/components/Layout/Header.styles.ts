import { StyleSheet, Platform } from "react-native";

export const styles = StyleSheet.create({
  header: {
    height: 72,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 32,
    backgroundColor: "#090a13",
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255,255,255,0.08)",
    zIndex: 50,
  },

  left: {
    flex: 1,
    justifyContent: "center",
  },

  title: {
    fontSize: 22,
    fontWeight: "700",
    color: "#ffffff",
  },

  center: {
    width: 420,
    alignItems: "center",
  },

  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    height: 42,
    borderRadius: 12,
    paddingHorizontal: 12,
    backgroundColor: "#171720",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.1)",
  },

  searchInput: {
    marginLeft: 8,
    flex: 1,
    color: "#ffffff",
    fontSize: 14,
    outlineStyle: "none" as any,
  },

  searchIcon: {
    color: "rgba(255,255,255,0.4)",
  },

  right: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
  },

  newStoryBtn: {
    height: 42,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 18,
    borderRadius: 12,
    marginRight: 12,
    backgroundColor: "#7b61d9",

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
      web: {
        boxShadow: "0 4px 15px rgba(102,126,234,0.3)",
      } as any,
    }),
  },

  newStoryText: {
    color: "#ffffff",
    marginLeft: 6,
    fontSize: 14,
    fontWeight: "600",
  },

  iconBtn: {
    width: 42,
    height: 42,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.1)",
    backgroundColor: "#171720",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },

  notificationBtn: {
    position: "relative",
  },

  notificationDot: {
    position: "absolute",
    top: 10,
    right: 10,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#f5576c",
  },

  avatar: {
    width: 42,
    height: 42,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#756df0",
    overflow: "hidden",
  },

  avatarImg: {
    width: 42,
    height: 42,
    borderRadius: 12,
  },

  avatarText: {
    color: "#ffffff",
    fontSize: 14,
    fontWeight: "700",
  },

  logoutBtn: {
    borderColor: "rgba(255,255,255,0.1)",
  },
});
