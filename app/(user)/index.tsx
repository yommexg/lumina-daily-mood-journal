import { Image } from "expo-image";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { Collapsible } from "@/components/Collapsible";
import { ExternalLink } from "@/components/ExternalLink";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { primaryColor } from "@/constants/Colors";

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
        <ExternalLink
          href="https://expo.dev"
          style={{ color: primaryColor, marginVertical: 20, fontSize: 16 }}>
          Visit Expo.dev
        </ExternalLink>
        <Collapsible title="Section 1: Introduction">
          <ThemedText>
            This is the content for section 1. You can place any text or
            components here.
          </ThemedText>
        </Collapsible>

        <Collapsible title="Section 2: Details">
          <ThemedText>
            Here are more details about the topic. You can even nest other
            components if needed.
          </ThemedText>
        </Collapsible>

        <Collapsible title="Section 3: More Info">
          <ThemedText>
            This is another collapsible section. Tapping the title will toggle
            visibility.
          </ThemedText>
        </Collapsible>
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
