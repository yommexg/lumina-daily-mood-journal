import { ThemedView } from "@/components/ThemedView";
import * as useThemeColorHook from "@/hooks/useThemeColor";
import { render } from "@testing-library/react-native";
import React from "react";

describe("ThemedView", () => {
  it("renders with the correct background color from useThemeColor", () => {
    // Arrange: Mock the hook
    jest.spyOn(useThemeColorHook, "useThemeColor").mockReturnValue("red");

    // Act: Render component
    const { getByTestId } = render(
      <ThemedView
        testID="themed-view"
        lightColor="white"
        darkColor="black"
      />
    );

    // Assert: Check backgroundColor style
    const view = getByTestId("themed-view");
    expect(view.props.style[0]).toMatchObject({ backgroundColor: "red" });
  });

  it("applies additional styles passed via props", () => {
    jest.spyOn(useThemeColorHook, "useThemeColor").mockReturnValue("blue");

    const { getByTestId } = render(
      <ThemedView
        testID="themed-view"
        style={{ padding: 10 }}
      />
    );

    const view = getByTestId("themed-view");

    // This will check that both backgroundColor and padding are applied
    expect(view.props.style).toEqual([
      { backgroundColor: "blue" },
      { padding: 10 },
    ]);
  });
});
