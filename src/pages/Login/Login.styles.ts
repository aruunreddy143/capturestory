import { StyleSheet, Platform } from "react-native";

export const styles = StyleSheet.create({
  /* PAGE */

  page: {
    flex: 1,
    backgroundColor: "#0a0a14",
    justifyContent: "center",
    alignItems: "center",
    padding: 32,
    position: "relative",
    overflow: "hidden",
  },

  /* CARD */

  card: {
    width: "100%",
    maxWidth: 420,
    paddingVertical: 48,
    paddingHorizontal: 40,
    borderRadius: 24,

    backgroundColor: "rgba(255,255,255,0.04)",

    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
   
    ...(Platform.OS === "web"
      ? {
          backdropFilter: "blur(30px)", // stronger glass effect
        }
      : {}),

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
    boxShadow: "0 8px 30px rgba(102, 126, 234, 0.35)",
    borderRadius: 18,
    overflow: "hidden",
    marginBottom: 26,
    justifyContent: "center",
    alignItems: "center",

    ...Platform.select({
      ios: {
        shadowColor: "#667eea",
        shadowOpacity: 0.35,
        shadowRadius: 30,
        shadowOffset: { width: 0, height: 10 },
      },
      android: {
        elevation: 8,
      },
    }),
  },

  brandGradient: {
    width: "100%",
    height: "100%",
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
  },

  title: {
    fontSize: 26,
    fontWeight: "800",
    color: "#fff",
    marginBottom: 16,
    letterSpacing: -0.5,
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
    lineHeight: 18,
  },

  /* BUTTON GROUP */

  buttons: {
    marginBottom: 16,
  },

  /* 🔥 GOOGLE BUTTON */

  ssoBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",

    paddingVertical: 8,
    paddingHorizontal: 24,

    borderRadius: 14,

    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.12)",

    backgroundColor: "rgba(255,255,255,0.06)",


    gap: 12,
  },

  googleHover: {
    borderColor: "rgba(66,133,244,0.4)",
    shadowColor: "#4285F4",
    shadowOpacity: 0.3,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
  },

  btnPressed: {
    transform: [{ translateY: -1 }],
    opacity: 0.95,
  },

  btnDisabled: {
    opacity: 0.5,
  },

  /* GOOGLE ICON */

  googleIcon: {
    width: 35,
    height: 35,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },

  ssoText: {
    color: "rgba(255,255,255,0.85)",
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
    color: "rgba(255,255,255,0.25)",
  },
});