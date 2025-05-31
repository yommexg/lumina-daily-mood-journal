import AsyncStorage from "@react-native-async-storage/async-storage";
import axios, { isAxiosError } from "axios";
import { router } from "expo-router";
import Toast from "react-native-toast-message";
import { create } from "zustand";

import { BASE_URL } from "./baseApi";
import { useUserStore } from "./useUserStore";

interface AuthState {
  isLoading: boolean;
  register: (
    name: string,
    email: string,
    password: string,
    expoPushToken: string | null | undefined
  ) => Promise<void>;
  registerWithGoogle: (
    name: string | null | undefined,
    email: string,
    avatar: string | null,
    googleId: string,
    expoPushToken: string | null | undefined
  ) => Promise<void>;
  login: (
    email: string,
    password: string,
    expoPushToken: string | null | undefined
  ) => Promise<void>;
  loginWithGoogle: (
    tokenId: string,
    expoPushToken: string | null | undefined
  ) => Promise<void>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  isLoading: false,

  register: async (name, email, password, expoPushToken) => {
    set({ isLoading: true });
    try {
      const response = await axios.post(`${BASE_URL}/api/auth/register`, {
        name,
        email,
        password,
        expoPushToken: expoPushToken ?? undefined,
      });

      router.replace("/(auth)/login");

      Toast.show({
        type: "success",
        text1: response.data?.message,
      });
    } catch (error) {
      if (isAxiosError(error)) {
        const errorMSg = error.response?.data?.message;

        if (error.response?.status === 409) {
          router.replace("/(auth)/login");
        }

        Toast.show({
          type: "error",
          text1: errorMSg ?? "Network Error",
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

  registerWithGoogle: async (name, email, avatar, googleId, expoPushToken) => {
    set({ isLoading: true });
    try {
      const response = await axios.post(
        `${BASE_URL}/api/auth/register-with-google`,
        {
          name,
          email,
          avatar,
          googleId,
          expoPushToken: expoPushToken ?? undefined,
        }
      );

      router.replace("/(auth)/login");

      Toast.show({
        type: "success",
        text1: response.data?.message,
      });
    } catch (error) {
      if (isAxiosError(error)) {
        const errorMSg = error.response?.data?.message;

        if (error.response?.status === 409) {
          router.replace("/(auth)/login");
        }

        Toast.show({
          type: "error",
          text1: errorMSg ?? "Network Error",
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

  login: async (email, password, expoPushToken) => {
    set({ isLoading: true });
    try {
      const response = await axios.post(`${BASE_URL}/api/auth/login`, {
        email,
        password,
        expoPushToken: expoPushToken ?? undefined,
      });

      const token = response.data?.token;
      if (token) {
        await AsyncStorage.setItem("authToken", token);
        const success = await useUserStore.getState().getUser(token);
        if (success) {
          router.replace("/(user)/(home)");
        }
      }

      Toast.show({
        type: "success",
        text1: response.data?.message,
      });
    } catch (error) {
      if (isAxiosError(error)) {
        const errorMSg = error.response?.data?.message;

        Toast.show({
          type: "error",
          text1: errorMSg ?? "Network Error",
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

  loginWithGoogle: async (tokenId, expoPushToken) => {
    set({ isLoading: true });
    try {
      const response = await axios.post(
        `${BASE_URL}/api/auth/login-with-google`,
        {
          tokenId,
          expoPushToken: expoPushToken ?? undefined,
        }
      );

      const token = response.data?.token;
      if (token) {
        await AsyncStorage.setItem("authToken", token);
        const success = await useUserStore.getState().getUser(token);
        if (success) {
          router.replace("/(user)/(home)");
        }
      }

      Toast.show({
        type: "success",
        text1: response.data?.message,
      });
    } catch (error) {
      if (isAxiosError(error)) {
        const errorMSg = error.response?.data?.message;

        Toast.show({
          type: "error",
          text1: errorMSg ?? "Network Error",
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
    set({ isLoading: true });
    await AsyncStorage.removeItem("authToken");
    router.replace("/(auth)/login");
    set({ isLoading: false });
  },
}));
