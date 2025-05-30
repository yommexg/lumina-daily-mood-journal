import { Platform } from "react-native";

export function mockPlatformOS(os: typeof Platform.OS) {
  Object.defineProperty(Platform, "OS", {
    get: () => os,
  });
}
