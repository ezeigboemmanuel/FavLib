import { create } from "zustand";
import axios from "axios";

const API_URL = "http://localhost:5000/api";
axios.defaults.withCredentials = true;

export const useAuthStore = create((set) => ({
  // initial states
  user: null,
  isLoading: false,
  error: null,
  fetchingUser: true,

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

  login: async (username, password) => {
    set({ isLoading: true, message: null });

    try {
      const response = await axios.post(`${API_URL}/login`, {
        username,
        password,
      });

      console.log("Response: ", response.data.user);

      const { user, message } = response.data;
      set({
        user,
        isLoading: false,
        message,
      });

      return { user, message };
    } catch (error) {
      set({
        error: error.response.data.message || "Error logging in",
        isLoading: false,
      });

      throw error;
    }
  },

  fetchUser: async () => {
    set({ fetchingUser: true, error: null });

    try {
      const response = await axios.get(`${API_URL}/fetch-user`);

      set({ user: response.data.user, fetchingUser: false });
    } catch (error) {
      set({
        error: error.response.data.message || "Error fetching user.",
        fetchingUser: false,
        user: null,
      });
      throw error;
    }
  },

  logout: async () => {
    set({ isLoading: true, error: null });
    try {
      await axios.post(`${API_URL}/logout`);
      set({
        isLoading: false,
        user: null,
        error: null,
      });
    } catch (error) {
      set({
        error: error.response.data.message || "Error logging out",
        isLoading: false,
      });

      throw error;
    }
  },
}));
