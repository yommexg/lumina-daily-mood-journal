import "react-native-gesture-handler/jestSetup";

jest.mock("react-native-reanimated", () => {
  const Reanimated = jest.requireActual("react-native-reanimated/mock");

  // Simple shared value mock
  const sharedValue = (initial: any) => {
    let val = initial;
    return {
      get value() {
        return val;
      },
      set value(v) {
        val = v;
      },
    };
  };

  return {
    ...Reanimated,
    // mock useAnimatedRef to return an object with current: null
    useAnimatedRef: () => ({ current: null }),

    // mock useScrollViewOffset to return a shared value object with value property
    useScrollViewOffset: () => sharedValue(0),

    // immediately run the function passed to useAnimatedStyle for testing
    useAnimatedStyle: (fn: any) => fn(),

    // basic linear interpolation mock, returns output based on value relative to inputRange mid-point
    interpolate: jest.fn((value, inputRange, outputRange) => {
      const [, mid] = inputRange;
      if (value <= mid) return outputRange[1];
      return outputRange[2];
    }),

    // call method is needed by some Reanimated internals, mock as noop
    default: {
      ...Reanimated.default,
      call: () => {},
    },
  };
});

jest.mock("expo-router", () => ({
  router: {
    push: jest.fn(),
    replace: jest.fn(),
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

jest.mock("@/components/HapticTab", () => {
  const originalModule = jest.requireActual("@/components/HapticTab");
  return {
    ...originalModule,
    isIOS: jest.fn(), // Mock this before usage
  };
});
