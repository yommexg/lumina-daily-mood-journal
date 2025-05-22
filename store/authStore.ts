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
  loginWithGoogle: (tokenId: string) => Promise<void>;
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
      } else {
        Toast.show({
          type: "error",
          text1: "Server Error",
        });
        console.error("Register Error", error);
      }
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
      } else {
        Toast.show({
          type: "error",
          text1: "Server Error",
        });
        console.error("Register With Google Error", error);
      }
    } finally {
      set({ isLoading: false });
    }
  },

  login: async (email, password) => {
    set({ isLoading: true });
    try {
      const response = await axios.post(`${BASE_URL}/api/auth/login`, {
        email,
        password,
      });

      console.log(response.data);

      // router.replace("/(auth)");

      Toast.show({
        type: "success",
        text1: response.data?.message,
      });
    } catch (error) {
      if (isAxiosError(error)) {
        const errorMSg = error.response?.data?.message;

        Toast.show({
          type: "error",
          text1: errorMSg,
        });
        // console.error("Login error: ", error);
        return;
      } else {
        Toast.show({
          type: "error",
          text1: "Server Error",
        });
        console.error("Login Error", error);
      }
    } finally {
      set({ isLoading: false });
    }
  },

  loginWithGoogle: async (tokenId) => {
    set({ isLoading: true });
    try {
      const response = await axios.post(
        `${BASE_URL}/api/auth/login-with-google`,
        {
          tokenId,
        }
      );

      console.log(response.data);

      // router.replace("/(auth)");

      Toast.show({
        type: "success",
        text1: response.data?.message,
      });
    } catch (error) {
      if (isAxiosError(error)) {
        const errorMSg = error.response?.data?.message;

        Toast.show({
          type: "error",
          text1: errorMSg,
        });
        // console.error("Login With Google error: ", error);
        return;
      } else {
        Toast.show({
          type: "error",
          text1: "Server Error",
        });
        console.error("Login With Google Error", error);
      }
    } finally {
      set({ isLoading: false });
    }
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
