import { SafeAreaView } from "react-native-safe-area-context";

import { Header } from "@/components/Header";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { primaryColor } from "@/constants/Colors";
import { useAuthStore } from "@/store/useAuthStore";
import { TouchableOpacity, View } from "react-native";

export default function ProfileScreen() {
  const { logout } = useAuthStore();

  return (
    <ThemedView style={{ flex: 1 }}>
      <SafeAreaView style={{ flex: 1 }}>
        <Header />
        <View style={{ gap: 20, padding: 20 }}>
          <ThemedText
            style={{ fontWeight: "bold", fontSize: 20, textAlign: "center" }}>
            Profile Page
          </ThemedText>
          <TouchableOpacity
            onPress={logout}
            style={{
              backgroundColor: primaryColor,
              paddingVertical: 10,
              marginHorizontal: 20,
            }}>
            <ThemedText style={{ textAlign: "center", fontSize: 16 }}>
              Log Out
            </ThemedText>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </ThemedView>
  );
}
