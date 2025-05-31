import axios from "axios";
import { create } from "zustand";

import { User } from "@/utils/types";
import { BASE_URL } from "./baseApi";

interface UserState {
  userDetails: User | null;
  isLoading: boolean;
  getUser: (token: string) => Promise<boolean>;
}

export const useUserStore = create<UserState>((set) => ({
  userDetails: null,
  isLoading: false,
  getUser: async (token) => {
    if (!token) {
      return false;
    }

    set({ isLoading: true });

    try {
      const response = await axios.get(`${BASE_URL}/api/user/details`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      set({ userDetails: response.data.data });

      return true;
    } catch (error) {
      console.log("Get User Details", error);
      return false;
    } finally {
      set({ isLoading: false });
    }
  },
}));
