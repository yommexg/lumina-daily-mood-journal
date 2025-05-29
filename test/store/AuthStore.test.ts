import { useAuthStore } from "@/store/useAuthStore";
import { act } from "@testing-library/react-native";
import axios from "axios";
import { router } from "expo-router";
import Toast from "react-native-toast-message";

jest.mock("axios", () => {
  const mockPost = jest.fn();
  const isAxiosError = (error: any): boolean => error?.isAxiosError === true;

  return {
    __esModule: true,
    default: { post: mockPost },
    post: mockPost,
    isAxiosError,
  };
});

jest.mock("@/store/useAuthStore", () => {
  return {
    __esModule: true,
    ...jest.requireActual("@/store/useAuthStore"),
  };
});

beforeEach(() => {
  jest.spyOn(console, "error").mockImplementation(() => {});
});

afterEach(() => {
  (console.error as jest.Mock).mockRestore();
});

describe("Register Store", () => {
  beforeEach(() => jest.clearAllMocks());

  it("successfully registers user and shows success toast", async () => {
    (axios.post as jest.Mock).mockResolvedValueOnce({
      data: { message: "Registration successful" },
    });

    const { register } = useAuthStore.getState();

    await act(async () => {
      await register("John Doe", "john@example.com", "password123", "token123");
    });

    expect(axios.post).toHaveBeenCalledWith(
      expect.stringContaining("/register"),
      expect.objectContaining({
        name: "John Doe",
        email: "john@example.com",
        password: "password123",
        expoPushToken: "token123",
      })
    );
    expect(router.replace).toHaveBeenCalledWith("/(auth)");
    expect(Toast.show).toHaveBeenCalledWith({
      type: "success",
      text1: "Registration successful",
    });
    expect(useAuthStore.getState().isLoading).toBe(false);
  });

  it("handles axios error with message and status 409", async () => {
    const error = {
      isAxiosError: true,
      response: {
        status: 409,
        data: { message: "Email already exists" },
      },
    };

    (axios.post as jest.Mock).mockRejectedValueOnce(error);

    const { register } = useAuthStore.getState();

    await act(async () => {
      await register("Jane", "jane@example.com", "pass", null);
    });

    expect(router.replace).toHaveBeenCalledWith("/(auth)");
    expect(Toast.show).toHaveBeenCalledWith({
      type: "error",
      text1: "Email already exists",
    });
    expect(useAuthStore.getState().isLoading).toBe(false);
  });

  it("handles generic axios error without message", async () => {
    const error = {
      isAxiosError: true,
      response: {},
    };

    (axios.post as jest.Mock).mockRejectedValueOnce(error);

    const { register } = useAuthStore.getState();

    await act(async () => {
      await register("Jane", "jane@example.com", "pass", null);
    });

    expect(Toast.show).toHaveBeenCalledWith({
      type: "error",
      text1: "Network Error",
    });
    expect(useAuthStore.getState().isLoading).toBe(false);
  });

  it("handles non-axios error", async () => {
    (axios.post as jest.Mock).mockRejectedValueOnce(new Error("Fatal"));

    const { register } = useAuthStore.getState();

    await act(async () => {
      await register("Jane", "jane@example.com", "pass", null);
    });

    expect(Toast.show).toHaveBeenCalledWith({
      type: "error",
      text1: "Server Error",
    });
    expect(useAuthStore.getState().isLoading).toBe(false);
  });
});

describe("Register With Google Store", () => {
  beforeEach(() => jest.clearAllMocks());

  it("successfully registers user with google and shows success toast", async () => {
    (axios.post as jest.Mock).mockResolvedValueOnce({
      data: { message: "Google Registration successful" },
    });

    const { registerWithGoogle } = useAuthStore.getState();

    await act(async () => {
      await registerWithGoogle(
        "John Doe",
        "john@example.com",
        "avatar.png",
        "google123",
        "token123"
      );
    });

    expect(axios.post).toHaveBeenCalledWith(
      expect.stringContaining("/register-with-google"),
      expect.objectContaining({
        name: "John Doe",
        email: "john@example.com",
        avatar: "avatar.png",
        googleId: "google123",
        expoPushToken: "token123",
      })
    );
    expect(router.replace).toHaveBeenCalledWith("/(auth)");
    expect(Toast.show).toHaveBeenCalledWith({
      type: "success",
      text1: "Google Registration successful",
    });
    expect(useAuthStore.getState().isLoading).toBe(false);
  });

  it("handles axios error with message and status 409", async () => {
    const error = {
      isAxiosError: true,
      response: {
        status: 409,
        data: { message: "Google account already registered" },
      },
    };

    (axios.post as jest.Mock).mockRejectedValueOnce(error);

    const { registerWithGoogle } = useAuthStore.getState();

    await act(async () => {
      await registerWithGoogle(
        null,
        "jane@example.com",
        null,
        "googleId",
        null
      );
    });

    expect(router.replace).toHaveBeenCalledWith("/(auth)");
    expect(Toast.show).toHaveBeenCalledWith({
      type: "error",
      text1: "Google account already registered",
    });
    expect(useAuthStore.getState().isLoading).toBe(false);
  });

  it("handles generic axios error without message", async () => {
    const error = {
      isAxiosError: true,
      response: {},
    };

    (axios.post as jest.Mock).mockRejectedValueOnce(error);

    const { registerWithGoogle } = useAuthStore.getState();

    await act(async () => {
      await registerWithGoogle(
        null,
        "jane@example.com",
        null,
        "googleId",
        null
      );
    });

    expect(Toast.show).toHaveBeenCalledWith({
      type: "error",
      text1: "Network Error",
    });
    expect(useAuthStore.getState().isLoading).toBe(false);
  });

  it("handles non-axios error", async () => {
    (axios.post as jest.Mock).mockRejectedValueOnce(new Error("Fatal"));

    const { registerWithGoogle } = useAuthStore.getState();

    await act(async () => {
      await registerWithGoogle(
        null,
        "jane@example.com",
        null,
        "googleId",
        null
      );
    });

    expect(Toast.show).toHaveBeenCalledWith({
      type: "error",
      text1: "Server Error",
    });
    expect(useAuthStore.getState().isLoading).toBe(false);
  });
});

describe("Login Store", () => {
  beforeEach(() => jest.clearAllMocks());

  it("logs in successfully and shows success toast", async () => {
    (axios.post as jest.Mock).mockResolvedValueOnce({
      data: { message: "Login successful" },
    });

    const { login } = useAuthStore.getState();

    await act(async () => {
      await login("john@example.com", "password123", "token123");
    });

    expect(axios.post).toHaveBeenCalledWith(
      expect.stringContaining("/login"),
      expect.objectContaining({
        email: "john@example.com",
        password: "password123",
        expoPushToken: "token123",
      })
    );
    expect(router.replace).toHaveBeenCalledWith("/(user)");
    expect(Toast.show).toHaveBeenCalledWith({
      type: "success",
      text1: "Login successful",
    });
    expect(useAuthStore.getState().isLoading).toBe(false);
  });

  it("handles axios error with message", async () => {
    const error = {
      isAxiosError: true,
      response: {
        data: { message: "Invalid credentials" },
      },
    };

    (axios.post as jest.Mock).mockRejectedValueOnce(error);

    const { login } = useAuthStore.getState();

    await act(async () => {
      await login("jane@example.com", "wrongpass", null);
    });

    expect(Toast.show).toHaveBeenCalledWith({
      type: "error",
      text1: "Invalid credentials",
    });
    expect(useAuthStore.getState().isLoading).toBe(false);
  });

  it("handles generic axios error without message", async () => {
    const error = {
      isAxiosError: true,
      response: {},
    };

    (axios.post as jest.Mock).mockRejectedValueOnce(error);

    const { login } = useAuthStore.getState();

    await act(async () => {
      await login("jane@example.com", "wrongpass", null);
    });

    expect(Toast.show).toHaveBeenCalledWith({
      type: "error",
      text1: "Network Error",
    });
    expect(useAuthStore.getState().isLoading).toBe(false);
  });

  it("handles non-axios error", async () => {
    (axios.post as jest.Mock).mockRejectedValueOnce(new Error("Fatal"));

    const { login } = useAuthStore.getState();

    await act(async () => {
      await login("jane@example.com", "wrongpass", null);
    });

    expect(Toast.show).toHaveBeenCalledWith({
      type: "error",
      text1: "Server Error",
    });
    expect(useAuthStore.getState().isLoading).toBe(false);
  });
});

describe("Login With Google Store", () => {
  beforeEach(() => jest.clearAllMocks());

  it("logs in with google and shows success toast", async () => {
    (axios.post as jest.Mock).mockResolvedValueOnce({
      data: { message: "Google login successful" },
    });

    const { loginWithGoogle } = useAuthStore.getState();

    await act(async () => {
      await loginWithGoogle("googleTokenId", "token123");
    });

    expect(axios.post).toHaveBeenCalledWith(
      expect.stringContaining("/login-with-google"),
      expect.objectContaining({
        tokenId: "googleTokenId",
        expoPushToken: "token123",
      })
    );
    expect(router.replace).toHaveBeenCalledWith("/(user)");
    expect(Toast.show).toHaveBeenCalledWith({
      type: "success",
      text1: "Google login successful",
    });
    expect(useAuthStore.getState().isLoading).toBe(false);
  });

  it("handles axios error with message", async () => {
    const error = {
      isAxiosError: true,
      response: {
        data: { message: "Google token invalid" },
      },
    };

    (axios.post as jest.Mock).mockRejectedValueOnce(error);

    const { loginWithGoogle } = useAuthStore.getState();

    await act(async () => {
      await loginWithGoogle("badToken", null);
    });

    expect(Toast.show).toHaveBeenCalledWith({
      type: "error",
      text1: "Google token invalid",
    });
    expect(useAuthStore.getState().isLoading).toBe(false);
  });

  it("handles generic axios error without message", async () => {
    const error = {
      isAxiosError: true,
      response: {},
    };

    (axios.post as jest.Mock).mockRejectedValueOnce(error);

    const { loginWithGoogle } = useAuthStore.getState();

    await act(async () => {
      await loginWithGoogle("badToken", null);
    });

    expect(Toast.show).toHaveBeenCalledWith({
      type: "error",
      text1: "Network Error",
    });
    expect(useAuthStore.getState().isLoading).toBe(false);
  });

  it("handles non-axios error", async () => {
    (axios.post as jest.Mock).mockRejectedValueOnce(new Error("Fatal"));

    const { loginWithGoogle } = useAuthStore.getState();

    await act(async () => {
      await loginWithGoogle("badToken", null);
    });

    expect(Toast.show).toHaveBeenCalledWith({
      type: "error",
      text1: "Server Error",
    });
    expect(useAuthStore.getState().isLoading).toBe(false);
  });
});
