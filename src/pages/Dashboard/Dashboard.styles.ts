import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 44,
    backgroundColor: "#090a13",
  },

  welcomeSection: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 56,
    paddingHorizontal: 58,
    borderRadius: 24,
    backgroundColor: "#151629",
    borderWidth: 1,
    borderColor: "rgba(102,126,234,0.28)",
    marginBottom: 46,
  },

  welcomeTitle: {
    fontSize: 28,
    fontWeight: "800",
    color: "#ffffff",
    marginBottom: 14,
  },

  gradientText: {
    color: "#756df0",
  },

  welcomeSubtitle: {
    color: "rgba(255,255,255,0.55)",
    fontSize: 15,
    maxWidth: 720,
  },

  welcomeActions: {
    flexDirection: "row",
    alignItems: "center",
  },

  btn: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    paddingHorizontal: 26,
    borderRadius: 14,
    marginLeft: 16,
  },

  btnPrimary: {
    backgroundColor: "#7068ee",
  },

  btnSecondary: {
    backgroundColor: "rgba(255,255,255,0.07)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.14)",
  },

  btnText: {
    color: "#ffffff",
    fontSize: 14,
    fontWeight: "700",
    marginLeft: 8,
  },

  statsGrid: {
    flexDirection: "row",
    flexWrap: "nowrap",
    justifyContent: "space-between",
    marginBottom: 62,
  },

  statCard: {
    width: "23.4%",
    minHeight: 230,
    padding: 34,
    borderRadius: 18,
    backgroundColor: "#12131d",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.09)",
  },

  statCardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 24,
  },

  statIcon: {
    width: 62,
    height: 62,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
  },

  statValue: {
    fontSize: 32,
    fontWeight: "800",
    color: "#ffffff",
    marginBottom: 6,
  },

  statLabel: {
    fontSize: 14,
    color: "rgba(255,255,255,0.42)",
  },

  statChange: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 24,
  },

  statChangeText: {
    color: "#35f27b",
    fontSize: 12,
    marginLeft: 6,
  },

  section: {
    marginBottom: 44,
  },

  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 32,
  },

  sectionTitle: {
    fontSize: 19,
    fontWeight: "800",
    color: "#ffffff",
  },

  link: {
    color: "#6c7cff",
    fontSize: 14,
    fontWeight: "700",
  },

  storiesGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },

  storytellerCard: {
    flexDirection: "row",
    alignItems: "center",
    padding: 22,
    borderRadius: 18,
    backgroundColor: "#12131d",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.09)",
    marginBottom: 14,
  },

  storytellerAvatar: {
    width: 52,
    height: 52,
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
    color: "rgba(255,255,255,0.45)",
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
    fontSize: 13,
    fontWeight: "600",
  },
});
