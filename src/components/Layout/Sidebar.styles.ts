import { StyleSheet, Platform } from "react-native";

export const styles = StyleSheet.create({
  sidebar: {
    width: 260,
    height: "100%",
    backgroundColor: "rgba(15,15,25,0.95)",
    borderRightWidth: 1,
    borderRightColor: "rgba(255,255,255,0.06)",
    display: "flex",
    flexDirection: "column",
    paddingTop: 28,
    paddingBottom: 24,
    zIndex: 100,
  },

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
      web: {
        backgroundImage: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        boxShadow: "0 4px 15px rgba(102,126,234,0.4)",
        backdropFilter: "blur(20px)",
      } as any,
    }),
  },

  brandText: {
    marginLeft: 12,
    fontSize: 20,
    fontWeight: "700",
    color: "#667eea",
    letterSpacing: -0.4,

    ...Platform.select({
      web: {
        backgroundImage: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        backgroundClip: "text",
      } as any,
    }),
  },

  nav: {
    flex: 1,
    paddingHorizontal: 12,
  },

  navItem: {
    position: "relative",
    overflow: "hidden",
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    marginBottom: 4,
  },

  navText: {
    marginLeft: 12,
    fontSize: 14,
    fontWeight: "500",
    color: "rgba(255,255,255,0.5)",
  },

  activeItem: {
    backgroundColor: "rgba(102,126,234,0.15)",
  },

  activeText: {
    color: "#ffffff",
  },

  activeIndicator: {
    position: "absolute",
    left: 0,
    top: 12,
    width: 3,
    height: 24,
    borderTopRightRadius: 3,
    borderBottomRightRadius: 3,
    backgroundColor: "#667eea",
  },

  footer: {
    paddingHorizontal: 12,
    paddingTop: 16,
    marginTop: 8,
    borderTopWidth: 1,
    borderTopColor: "rgba(255,255,255,0.06)",
  },
});
