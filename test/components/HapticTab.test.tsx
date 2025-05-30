import { HapticTab } from "@/components/HapticTab";
import { isIOS } from "@/utils/platform";
import { NavigationContainer } from "@react-navigation/native";
import { fireEvent, render } from "@testing-library/react-native";
import * as Haptics from "expo-haptics";
import React from "react";
import { Text } from "react-native";

// 🧠 IMPORTANT: Mock *module* not function
jest.mock("@/utils/platform", () => ({
  isIOS: jest.fn(), // use jest.fn() here
}));

// Mock expo-haptics
jest.mock("expo-haptics", () => ({
  impactAsync: jest.fn(),
  ImpactFeedbackStyle: {
    Light: "light",
  },
}));

describe("HapticTab", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("does NOT call Haptics.impactAsync on non-iOS platforms", () => {
    (isIOS as jest.Mock).mockReturnValue(false); // ✅ now works

    const onPressInMock = jest.fn();

    const { getByTestId } = render(
      <NavigationContainer>
        <HapticTab
          testID="pressable"
          onPressIn={onPressInMock}>
          <Text>Tab</Text>
        </HapticTab>
      </NavigationContainer>
    );

    fireEvent(getByTestId("pressable"), "pressIn");

    expect(Haptics.impactAsync).not.toHaveBeenCalled();
    expect(onPressInMock).toHaveBeenCalled();
  });

  it("calls Haptics.impactAsync on iOS", () => {
    (isIOS as jest.Mock).mockReturnValue(true); // ✅ now works

    const onPressInMock = jest.fn();

    const { getByTestId } = render(
      <NavigationContainer>
        <HapticTab
          testID="pressable"
          onPressIn={onPressInMock}>
          <Text>Tab</Text>
        </HapticTab>
      </NavigationContainer>
    );

    fireEvent(getByTestId("pressable"), "pressIn");

    expect(Haptics.impactAsync).toHaveBeenCalledWith("light");
    expect(onPressInMock).toHaveBeenCalled();
  });
});
