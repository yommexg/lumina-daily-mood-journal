import axios, { isAxiosError } from "axios";
import { router } from "expo-router";
import Toast from "react-native-toast-message";
import { create } from "zustand";

import { BASE_URL } from "./baseApi";

interface AuthState {
  user: string;
  token: string | null;
  isLoading: boolean;
  register: (name: string, email: string, password: string) => Promise<void>;
  registerWithGoogle: (
    name: string | null | undefined,
    email: string,
    avatar: string | null,
    googleId: string
  ) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  loadToken: () => Promise<void>;
}

export const authStore = create<AuthState>((set) => ({
  user: "",
  token: null,
  isLoading: false,

  register: async (name, email, password) => {
    set({ isLoading: true });
    try {
      const response = await axios.post(`${BASE_URL}/api/auth/register`, {
        name,
        email,
        password,
      });

      router.replace("/(auth)");

      Toast.show({
        type: "success",
        text1: response.data?.message,
      });
    } catch (error) {
      if (isAxiosError(error)) {
        const errorMSg = error.response?.data?.message;

        if (error.response?.status === 409) {
          router.replace("/(auth)");
        }

        Toast.show({
          type: "error",
          text1: errorMSg,
        });
        // console.error("Register error: ", error);
        return;
      }
      Toast.show({
        type: "error",
        text1: "Server Error",
      });
      //   console.error(error);
    } finally {
      set({ isLoading: false });
    }
  },

  registerWithGoogle: async (name, email, avatar, googleId) => {
    set({ isLoading: true });
    try {
      const response = await axios.post(
        `${BASE_URL}/api/auth/register-with-google`,
        {
          name,
          email,
          avatar,
          googleId,
        }
      );

      router.replace("/(auth)");

      Toast.show({
        type: "success",
        text1: response.data?.message,
      });
    } catch (error) {
      if (isAxiosError(error)) {
        const errorMSg = error.response?.data?.message;

        if (error.response?.status === 409) {
          router.replace("/(auth)");
        }

        Toast.show({
          type: "error",
          text1: errorMSg,
        });
        // console.error("Register With Google error: ", error);
        return;
      }
      Toast.show({
        type: "error",
        text1: "Server Error",
      });
      //   console.error(error);
    } finally {
      set({ isLoading: false });
    }
  },

  login: async (user, password) => {
    // set({ isLoading: true });
    // try {
    //   if (!user || !password) {
    //     Alert.alert(
    //       "Missing Credentials",
    //       "Please enter both user and password."
    //     );
    //     set({ isLoading: false });
    //     return;
    //   }
    //   const response = await fetch(`${BASE_URL}/api/Auth/login`, {
    //     method: "POST",
    //     headers: { "Content-Type": "application/json" },
    //     body: JSON.stringify({ Username: user, Password: password }),
    //   });
    //   const data = await response.json();
    //   if (response.ok) {
    //     await AsyncStorage.setItem("token", data.token);
    //     await AsyncStorage.setItem("user", user);
    //     set({ user, token: data.token });
    //     router.replace("/(tabs)/(songs)");
    //   } else {
    //     Alert.alert("Login Failed", "Oops !!, Something went wrong");
    //     // throw new Error(data.message || "Login failed");
    //   }
    // } catch (error) {
    //   Alert.alert("Login Failed", "Oops !!, Something went wrong");
    //   //   console.error("Login error:", error);
    // } finally {
    //   set({ isLoading: false });
    // }
  },

  logout: async () => {
    // await AsyncStorage.removeItem("token");
    // set({ token: null });
    // router.push("/login");
  },

  loadToken: async () => {
    // const token = await AsyncStorage.getItem("token");
    // const user = await AsyncStorage.getItem("user");
    // if (token) {
    //   set({ token, user: user ?? "User" });
    // } else {
    //   router.replace("/(auth)/login");
    // }
  },
}));
