import RegisterScreen from "@/app/(auth)/register";
import { useAuthStore } from "@/store/useAuthStore";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { fireEvent, render, waitFor } from "@testing-library/react-native";
import { router } from "expo-router";
import React from "react";
import Toast from "react-native-toast-message";

const mockedUseAuthStore = jest.mocked(useAuthStore);

describe("RegisterScreen", () => {
  const mockRegister = jest.fn();
  const mockRegisterWithGoogle = jest.fn();

  beforeEach(() => {
    mockedUseAuthStore.mockReturnValue({
      isLoading: false,
      register: mockRegister,
      registerWithGoogle: mockRegisterWithGoogle,
    });
    (GoogleSignin.hasPlayServices as jest.Mock).mockResolvedValue(true);
    (GoogleSignin.signIn as jest.Mock).mockResolvedValue({
      data: {
        user: {
          givenName: "Test",
          email: "test@example.com",
          photo: "test-photo-url",
          id: "google-id",
        },
      },
    });
  });

  it("renders register screen correctly", () => {
    const { getByText, getByPlaceholderText } = render(<RegisterScreen />);
    expect(getByText("Create your Lumina account")).toBeTruthy();
    expect(getByPlaceholderText("Username")).toBeTruthy();
    expect(getByPlaceholderText("Email")).toBeTruthy();
    expect(getByPlaceholderText("Password")).toBeTruthy();
    expect(getByPlaceholderText("Confirm Password")).toBeTruthy();
  });

  it("shows toast if fields are empty", () => {
    const { getByText } = render(<RegisterScreen />);
    fireEvent.press(getByText("Register"));

    expect(Toast.show).toHaveBeenCalledWith({
      type: "info",
      text1: "Incomplete Details",
    });
  });

  it("shows toast if passwords do not match", () => {
    const { getByPlaceholderText, getByText } = render(<RegisterScreen />);
    fireEvent.changeText(getByPlaceholderText("Username"), "John");
    fireEvent.changeText(getByPlaceholderText("Email"), "john@example.com");
    fireEvent.changeText(getByPlaceholderText("Password"), "pass123");
    fireEvent.changeText(getByPlaceholderText("Confirm Password"), "pass456");

    fireEvent.press(getByText("Register"));

    expect(Toast.show).toHaveBeenCalledWith({
      type: "info",
      text1: "Passwords do not match",
    });
  });

  it("calls register when input is valid", () => {
    const { getByPlaceholderText, getByText } = render(<RegisterScreen />);
    fireEvent.changeText(getByPlaceholderText("Username"), "John");
    fireEvent.changeText(getByPlaceholderText("Email"), "john@example.com");
    fireEvent.changeText(getByPlaceholderText("Password"), "pass123");
    fireEvent.changeText(getByPlaceholderText("Confirm Password"), "pass123");

    fireEvent.press(getByText("Register"));

    expect(mockRegister).toHaveBeenCalledWith(
      "John",
      "john@example.com",
      "pass123",
      expect.anything() // expoPushToken from hook
    );
  });

  it("handles Google Sign-Up successfully", async () => {
    const { getByText } = render(<RegisterScreen />);
    fireEvent.press(getByText("Sign up with Google"));

    await waitFor(() => {
      expect(GoogleSignin.signIn).toHaveBeenCalled();
      expect(mockRegisterWithGoogle).toHaveBeenCalledWith(
        "Test",
        "test@example.com",
        "test-photo-url",
        "google-id",
        expect.anything() // expoPushToken
      );
    });
  });

  it("logs error on Google Sign-In failure", async () => {
    const error = new Error("Google Error");
    (GoogleSignin.signIn as jest.Mock).mockRejectedValueOnce(error);
    const consoleSpy = jest.spyOn(console, "log").mockImplementation();

    const { getByText } = render(<RegisterScreen />);
    fireEvent.press(getByText("Sign up with Google"));

    await waitFor(() => {
      expect(consoleSpy).toHaveBeenCalledWith(
        "Google Sign-In Error",
        undefined,
        error.message
      );
    });

    consoleSpy.mockRestore();
  });

  it("navigates to login screen", () => {
    const { getByText } = render(<RegisterScreen />);
    fireEvent.press(getByText(/Log in/i));
    expect(router.replace).toHaveBeenCalledWith("/(auth)");
  });
});
