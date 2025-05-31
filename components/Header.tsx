import { Image } from "expo-image";
import { StyleSheet, Text, View } from "react-native";

import { ThemedText } from "@/components/ThemedText";
import { blurhash } from "@/constants/BlurHash";
import { Colors, primaryColor } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { useUserStore } from "@/store/useUserStore";

export const Header = () => {
  const { userDetails: user } = useUserStore();

  const colorScheme = useColorScheme();
  const themeColors = Colors[colorScheme ?? "light"];

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: themeColors.barBackground },
      ]}>
      <View style={styles.logoContainer}>
        <Image
          source={require("@/assets/images/icon.png")}
          style={styles.logo}
          contentFit="contain"
          placeholder={blurhash}
        />
        <View style={{ gap: 2 }}>
          <Text style={styles.title}>Lumina</Text>
          <ThemedText style={styles.username}>
            Hi, {user?.name?.split(" ")[0] || "User"}
          </ThemedText>
        </View>
      </View>

      <View
        style={[
          styles.profileContainer,
          colorScheme === "light" && {
            backgroundColor: "#F2F2F2",
            padding: 4,
            borderRadius: 20,
          },
        ]}>
        <Image
          source={
            user && user.avatar
              ? { uri: user.avatar }
              : require("@/assets/images/unknown_user.png")
          }
          style={styles.avatar}
          contentFit="contain"
          placeholder={blurhash}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    paddingRight: 20,
    paddingLeft: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  logoContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  logo: {
    width: 60,
    height: 60,
    marginRight: 4,
  },
  title: {
    fontSize: 26,
    fontWeight: "600",
    color: primaryColor,
  },
  profileContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  username: {
    fontSize: 13,
    fontStyle: "italic",
  },
  avatar: {
    width: 35,
    height: 35,
    borderRadius: 35,
  },
});
