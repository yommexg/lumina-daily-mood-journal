import axios from "axios";
import { create } from "zustand";

import { User } from "@/utils/types";
import { router } from "expo-router";
import { BASE_URL } from "./baseApi";

interface UserState {
  userDetails: User | null;
  isLoading: boolean;
  getUser: (token: string) => Promise<void>;
}

export const useUserStore = create<UserState>((set) => ({
  userDetails: null,
  isLoading: false,

  getUser: async (token) => {
    if (!token) {
      return;
    }

    set({ isLoading: true });

    try {
      const response = await axios.get(`${BASE_URL}/api/user/details`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      set({ userDetails: response.data.data });

      router.replace("/(user)");
    } catch (error) {
      console.log("Get User Details", error);
    } finally {
      set({ isLoading: false });
    }
  },
}));
