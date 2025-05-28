import LoginScreen from "@/app/(auth)";
import { useAuthStore } from "@/store/useAuthStore";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { fireEvent, render, waitFor } from "@testing-library/react-native";
import { router } from "expo-router";
import React from "react";
import Toast from "react-native-toast-message";

jest.mock("@/store/useAuthStore");
jest.mock("expo-router");

const mockedUseAuthStore = jest.mocked(useAuthStore);

describe("LoginScreen", () => {
  const mockLogin = jest.fn();
  const mockLoginWithGoogle = jest.fn();

  beforeEach(() => {
    mockedUseAuthStore.mockReturnValue({
      isLoading: false,
      login: mockLogin,
      loginWithGoogle: mockLoginWithGoogle,
    });
  });

  it("renders login screen correctly", () => {
    const { getByPlaceholderText, getByText } = render(<LoginScreen />);
    expect(getByText("Welcome to Lumina")).toBeTruthy();
    expect(getByPlaceholderText("Email")).toBeTruthy();
    expect(getByPlaceholderText("Password")).toBeTruthy();
    expect(getByText("Login")).toBeTruthy();
    expect(getByText("Sign in with Google")).toBeTruthy();
  });

  it("shows toast on empty login fields", () => {
    const { getByText } = render(<LoginScreen />);
    fireEvent.press(getByText("Login"));
    expect(Toast.show).toHaveBeenCalledWith({
      type: "info",
      text1: "Incomplete Login Details",
    });
  });

  it("calls login function when email and password are entered", () => {
    const { getByPlaceholderText, getByText } = render(<LoginScreen />);
    fireEvent.changeText(getByPlaceholderText("Email"), "user@example.com");
    fireEvent.changeText(getByPlaceholderText("Password"), "password123");
    fireEvent.press(getByText("Login"));
    expect(mockLogin).toHaveBeenCalledWith(
      "user@example.com",
      "password123",
      "fake-token"
    );
  });

  it("calls Google Sign-In flow", async () => {
    const { getByText } = render(<LoginScreen />);
    fireEvent.press(getByText("Sign in with Google"));

    await waitFor(() => {
      expect(GoogleSignin.signIn).toHaveBeenCalled();
      expect(mockLoginWithGoogle).toHaveBeenCalledWith(
        "test-id-token",
        "fake-token"
      );
    });
  });

  it("navigates to register screen", () => {
    const { getByText } = render(<LoginScreen />);
    fireEvent.press(getByText(/Create one/i));
    expect(router.push).toHaveBeenCalledWith("/(auth)/register");
  });

  it("logs error if Google Sign-In fails", async () => {
    const mockError = new Error("Google sign-in failed");
    (GoogleSignin.signIn as jest.Mock).mockRejectedValueOnce(mockError);

    const consoleErrorSpy = jest.spyOn(console, "error").mockImplementation();

    const { getByText } = render(<LoginScreen />);
    fireEvent.press(getByText("Sign in with Google"));

    await waitFor(() => {
      expect(GoogleSignin.signIn).toHaveBeenCalled();
      expect(consoleErrorSpy).toHaveBeenCalledWith(
        "Google Sign-In Error",
        mockError
      );
    });

    consoleErrorSpy.mockRestore(); // Clean up after the test
  });
});
