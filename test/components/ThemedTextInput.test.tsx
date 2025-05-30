import { ThemedTextInput } from "@/components/ThemedTextInput";
import * as themeHook from "@/hooks/useThemeColor";
import { render } from "@testing-library/react-native";
import React from "react";

describe("ThemedTextInput", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders with background and text color from useThemeColor", () => {
    // Arrange: Mock useThemeColor to return background and text color
    const useThemeColorMock = jest
      .spyOn(themeHook, "useThemeColor")
      .mockImplementation((colors, key) => {
        if (key === "inputBackground") return "bg-color";
        if (key === "text") return "text-color";
        return "";
      });

    // Act
    const { getByTestId } = render(<ThemedTextInput testID="themed-input" />);

    // Assert
    const input = getByTestId("themed-input");
    expect(useThemeColorMock).toHaveBeenCalledTimes(2);
    expect(useThemeColorMock).toHaveBeenCalledWith(
      { light: undefined, dark: undefined },
      "inputBackground"
    );
    expect(useThemeColorMock).toHaveBeenCalledWith(
      { light: undefined, dark: undefined },
      "text"
    );
    expect(input.props.style).toEqual([
      { backgroundColor: "bg-color", color: "text-color" },
      undefined,
    ]);
  });

  it("applies custom style prop in addition to theme styles", () => {
    jest
      .spyOn(themeHook, "useThemeColor")
      .mockReturnValueOnce("custom-bg")
      .mockReturnValueOnce("custom-text");

    const { getByTestId } = render(
      <ThemedTextInput
        testID="themed-input"
        style={{ borderWidth: 1 }}
      />
    );

    const input = getByTestId("themed-input");

    expect(input.props.style).toEqual([
      { backgroundColor: "custom-bg", color: "custom-text" },
      { borderWidth: 1 },
    ]);
  });
});
