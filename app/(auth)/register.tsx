import { Ionicons } from "@expo/vector-icons";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { Image } from "expo-image";
import { router } from "expo-router";
import { MotiText, MotiView } from "moti";
import { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import Toast from "react-native-toast-message";

import Spinner from "@/components/Spinner";
import { ThemedText } from "@/components/ThemedText";
import { ThemedTextInput } from "@/components/ThemedTextInput";
import { ThemedView } from "@/components/ThemedView";
import { primaryColor } from "@/constants/Colors";
import { usePushNotification } from "@/hooks/usePushNotification";
import { useAuthStore } from "@/store/useAuthStore";
import { SafeAreaView } from "react-native-safe-area-context";

export default function RegisterScreen() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { expoPushToken } = usePushNotification();
  const { isLoading, register, registerWithGoogle } = useAuthStore();

  const handleRegister = () => {
    if (!name || !email || !password || !confirmPassword) {
      Toast.show({
        type: "info",
        text1: "Incomplete Details",
      });
      return;
    }

    if (password !== confirmPassword) {
      Toast.show({
        type: "info",
        text1: "Passwords do not match",
      });
      return;
    }

    register(name, email, password, expoPushToken);
  };

  const signUpWithGoogle = async () => {
    try {
      await GoogleSignin.hasPlayServices({
        showPlayServicesUpdateDialog: true,
      });
      const userInfo = await GoogleSignin.signIn();
      const user = userInfo.data?.user;

      if (user?.email) {
        await registerWithGoogle(
          user?.givenName,
          user?.email,
          user?.photo,
          user.id,
          expoPushToken
        );
      }
    } catch (error: any) {
      console.log("Google Sign-In Error", error.code, error.message);
    }
    await GoogleSignin.revokeAccess();
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={{ flex: 1 }}>
        {isLoading && <Spinner />}
        <ThemedView style={styles.container}>
          <MotiView
            from={{ opacity: 0, translateY: -20 }}
            animate={{ opacity: 1, translateY: 0 }}
            transition={{ type: "timing", duration: 1000 }}
            style={styles.header}>
            <Image
              source={require("@/assets/images/logo.png")}
              style={styles.logo}
              contentFit="contain"
            />
            <MotiText>
              <ThemedText style={styles.title}>
                Create your Lumina account
              </ThemedText>
            </MotiText>
            <MotiText style={styles.subtitle}>
              Let’s get started on your mood journey.
            </MotiText>
          </MotiView>

          <MotiView
            from={{ opacity: 0, translateY: 20 }}
            animate={{ opacity: 1, translateY: 0 }}
            transition={{ delay: 600 }}
            style={styles.form}>
            <ThemedTextInput
              placeholder="Username"
              placeholderTextColor="grey"
              value={name}
              onChangeText={setName}
              style={styles.input}
            />
            <ThemedTextInput
              placeholder="Email"
              placeholderTextColor="grey"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              style={styles.input}
            />
            <ThemedTextInput
              placeholder="Password"
              placeholderTextColor="grey"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              style={styles.input}
            />
            <ThemedTextInput
              placeholder="Confirm Password"
              placeholderTextColor="grey"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry
              style={styles.input}
            />
            <TouchableOpacity
              onPress={handleRegister}
              style={styles.registerButton}>
              <Text style={styles.registerButtonText}>Register</Text>
            </TouchableOpacity>
          </MotiView>

          <ThemedText style={styles.orText}>or</ThemedText>

          {/* Google Signup */}
          <TouchableOpacity
            style={styles.googleButton}
            onPress={signUpWithGoogle}>
            <Ionicons
              name="logo-google"
              size={20}
              color={primaryColor}
            />
            <ThemedText style={styles.googleButtonText}>
              Sign up with Google
            </ThemedText>
          </TouchableOpacity>

          {/* Link to Login */}
          <TouchableOpacity onPress={() => router.replace("/(auth)")}>
            <ThemedText style={styles.createAccountText}>
              Already have an account?{" "}
              <Text style={styles.createLink}>Log in</Text>
            </ThemedText>
          </TouchableOpacity>
        </ThemedView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
  },
  header: {
    alignItems: "center",
    marginBottom: 32,
  },
  logo: {
    width: 200,
    height: 200,
  },
  title: {
    fontSize: 26,
    fontWeight: "600",
    marginTop: 16,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 12,
    color: "grey",
    marginTop: 8,
    fontStyle: "italic",
    textAlign: "center",
    paddingHorizontal: 16,
  },
  form: {
    width: "100%",
    gap: 16,
  },
  input: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#2C2C2E",
    fontSize: 15,
  },
  registerButton: {
    backgroundColor: primaryColor,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
  },
  registerButtonText: {
    color: "#FFF",
    fontWeight: "600",
    fontSize: 16,
  },
  orText: {
    fontSize: 16,
    marginVertical: 20,
  },
  googleButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
    paddingHorizontal: 28,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#2C2C2E",
  },
  googleButtonText: {
    marginLeft: 10,
    fontSize: 20,
    fontWeight: "500",
  },
  createAccountText: {
    marginTop: 24,
    fontSize: 14,
    textAlign: "center",
    color: "grey",
  },
  createLink: {
    color: primaryColor,
    fontWeight: "600",
  },
});
