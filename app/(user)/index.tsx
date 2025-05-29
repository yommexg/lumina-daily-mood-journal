import { Image } from "expo-image";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";

export default function HomeScreen() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ParallaxScrollView
        headerImage={
          <Image
            source={require("@/assets/images/logo.png")}
            style={styles.headerImage}
            contentFit="contain"
          />
        }
        headerBackgroundColor={{
          light: "#fff",
          dark: "#000",
        }}>
        {/* <ExternalLink
          href="https://expo.dev"
          style={{ color: "red", marginVertical: 20, fontSize: 16 }}>
          Visit Expo.dev
        </ExternalLink> */}
        <ThemedText style={styles.title}>
          Welcome to the Lumina Home Page!!
        </ThemedText>
        <ThemedText>
          Scroll down to see the parallax effect in action.
        </ThemedText>
        {/* Add some extra content to enable scrolling */}
        {Array.from({ length: 40 }, (_, i) => (
          <ThemedText key={i}>Item {i + 1}</ThemedText>
        ))}
      </ParallaxScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    width: "100%",
    height: "100%",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
});
