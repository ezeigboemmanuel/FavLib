import { create } from "zustand";
import axios from "axios";

const API_URL = "http://localhost:5000/api";

export const useAuthStore = create((set) => ({
  // initial states
  user: null,
  isLoading: false,
  error: null,

  // functions

  signup: async (username, email, password) => {
    set({ isLoading: true, message: null });

    try {
      const response = await axios.post(`${API_URL}/signup`, {
        username,
        email,
        password,
      });

      set({
        user: response.data.user,
        isLoading: false,
      });
    } catch (error) {
      set({
        isLoading: false,
        error: error.response.data.message || "Error signing up.",
      });
      throw error;
    }
  },
}));
