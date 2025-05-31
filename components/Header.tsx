import { Image } from "expo-image";
import { StyleSheet, Text, View } from "react-native";

import { ThemedText } from "@/components/ThemedText";
import { blurhash } from "@/constants/BlurHash";
import { primaryColor } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { useUserStore } from "@/store/useUserStore";

export const Header = () => {
  const { userDetails: user } = useUserStore();

  const colorScheme = useColorScheme();

  const backgroundHeaderColor = colorScheme === "dark" ? "#00050F" : "#FFFFFF";

  return (
    <View
      style={[styles.container, { backgroundColor: backgroundHeaderColor }]}>
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

      <View style={styles.profileContainer}>
        <Image
          source={{ uri: user?.avatar || "https://i.pravatar.cc/100" }}
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
    fontSize: 20,
    fontWeight: "600",
    color: primaryColor,
  },
  profileContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  username: {
    fontSize: 14,
    fontStyle: "italic",
  },
  avatar: {
    width: 35,
    height: 35,
    borderRadius: 18,
  },
});
