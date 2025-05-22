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
import { authStore } from "@/store/authStore";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { isLoading, login, loginWithGoogle } = authStore();

  const handleEmailLogin = () => {
    if (!email || !password) {
      Toast.show({
        type: "info",
        text1: "Incomplete Login Details",
      });
      return;
    }

    login(email, password);
  };

  const signInWithGoogle = async () => {
    try {
      await GoogleSignin.hasPlayServices({
        showPlayServicesUpdateDialog: true,
      });
      const userInfo = await GoogleSignin.signIn();

      if (userInfo.data?.idToken) {
        await loginWithGoogle(userInfo.data?.idToken);
      }
    } catch (error: any) {
      console.log("Google Sign-In Error", error.code, error.message);
    }

    await GoogleSignin.revokeAccess();
  };

  return (
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
            <ThemedText style={styles.title}>Welcome to Lumina</ThemedText>
          </MotiText>
          <MotiText style={styles.subtitle}>
            Reflect, track, and understand your mood.
          </MotiText>
        </MotiView>

        {/* Email Login */}

        <MotiView
          from={{ opacity: 0, translateY: 20 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ delay: 600 }}
          style={styles.form}>
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
          <TouchableOpacity
            onPress={handleEmailLogin}
            style={styles.loginButton}>
            <Text style={styles.loginButtonText}>Login</Text>
          </TouchableOpacity>
        </MotiView>

        <ThemedText style={styles.orText}>or</ThemedText>

        {/* Google Login */}
        <TouchableOpacity
          style={styles.googleButton}
          onPress={signInWithGoogle}>
          <Ionicons
            name="logo-google"
            size={20}
            color={primaryColor}
          />
          <ThemedText style={styles.googleButtonText}>
            Sign in with Google
          </ThemedText>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.push("/(auth)/register")}>
          <ThemedText style={styles.createAccountText}>
            Don’t have an account?{" "}
            <Text style={styles.createLink}>Create one</Text>
          </ThemedText>
        </TouchableOpacity>
      </ThemedView>
    </KeyboardAvoidingView>
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
    fontSize: 30,
    fontWeight: "600",
    marginTop: 16,
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
  loginButton: {
    backgroundColor: primaryColor,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
  },
  loginButtonText: {
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
