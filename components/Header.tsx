import { Image } from "expo-image";
import { StyleSheet, Text, View } from "react-native";

import { ThemedText } from "@/components/ThemedText";
import { blurhash } from "@/constants/BlurHash";
import { primaryColor } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";

const Header = () => {
  const colorScheme = useColorScheme();
  const backgroundHeaderColor = colorScheme === "dark" ? "#00050F" : "#FFFFFF";

  return (
    <View
      style={[styles.container, { backgroundColor: backgroundHeaderColor }]}>
      {/* Left Section */}
      <View style={styles.leftSection}>
        <Image
          source={require("@/assets/images/icon.png")}
          style={styles.logo}
          contentFit="contain"
          placeholder={blurhash}
        />

        <View>
          <Text style={styles.title}>Energy Funding Service</Text>
          <ThemedText
            style={styles.subtitle}
            numberOfLines={1}
            ellipsizeMode="tail">
            Welcome,
          </ThemedText>
        </View>
      </View>

      {/* Right Section */}
      <View style={styles.rightSection}>
        {/* You can add user image here later */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingTop: 64,
    paddingBottom: 16,
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
    backgroundColor: "transparent",
    shadowColor: "black",
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  leftSection: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  logo: {
    width: 60,
    height: 60,
    borderRadius: 4,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    letterSpacing: 1,
    color: primaryColor,
  },
  subtitle: {
    fontSize: 12,
    fontStyle: "italic",
    marginTop: 4,
    textTransform: "capitalize",
    maxWidth: 100,
  },
  rightSection: {
    flexDirection: "row",
    alignItems: "center",
    columnGap: 20,
  },
});

export default Header;
