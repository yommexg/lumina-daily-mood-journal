import "react-native-gesture-handler/jestSetup";

jest.mock("expo-router", () => ({
  router: {
    push: jest.fn(),
  },
}));

jest.mock("@react-native-google-signin/google-signin", () => ({
  GoogleSignin: {
    hasPlayServices: jest.fn(() => Promise.resolve(true)),
    signIn: jest.fn(() =>
      Promise.resolve({
        data: {
          idToken: "test-id-token",
        },
      })
    ),
    revokeAccess: jest.fn(() => Promise.resolve()),
  },
}));

jest.mock("react-native-toast-message", () => ({
  show: jest.fn(),
}));

jest.mock("@/store/useAuthStore", () => ({
  __esModule: true,
  useAuthStore: jest.fn(),
}));

jest.mock("@/hooks/usePushNotification", () => ({
  usePushNotification: () => ({
    expoPushToken: "fake-token",
  }),
}));

jest.mock("@expo/vector-icons", () => ({
  Ionicons: () => null,
}));

jest.mock("expo-image", () => ({
  Image: () => null,
}));

jest.mock("moti", () => ({
  MotiView: ({ children }: any) => children,
  MotiText: ({ children }: any) => children,
}));

jest.mock("react-native-toast-message", () => ({
  show: jest.fn(),
  hide: jest.fn(),
  Toast: {
    show: jest.fn(),
    hide: jest.fn(),
  },
}));
