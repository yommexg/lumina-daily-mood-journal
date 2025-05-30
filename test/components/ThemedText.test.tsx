import { ThemedText } from "@/components/ThemedText";
import * as themeHook from "@/hooks/useThemeColor";
import { render } from "@testing-library/react-native";
import React from "react";

describe("ThemedText", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders with correct color and default style", () => {
    const mockColor = "#ff0000";

    const useThemeColorMock = jest
      .spyOn(themeHook, "useThemeColor")
      .mockReturnValue(mockColor);

    const { getByTestId } = render(
      <ThemedText testID="themed-text">Hello</ThemedText>
    );

    const text = getByTestId("themed-text");

    // Check hook usage
    expect(useThemeColorMock).toHaveBeenCalledWith(
      { light: undefined, dark: undefined },
      "text"
    );

    // Style is an array, check that first element has color
    expect(text.props.style).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ color: mockColor }),
        expect.objectContaining({ fontSize: 16, lineHeight: 24 }), // default
      ])
    );
  });

  it.each([
    ["title", { fontSize: 32, fontWeight: "bold", lineHeight: 32 }],
    ["defaultSemiBold", { fontWeight: "600" }],
    ["subtitle", { fontWeight: "bold", fontSize: 20 }],
    ["link", { fontSize: 16, color: "#0a7ea4" }],
    ["primary", { color: expect.any(String) }], // just check primaryColor is present
  ])('applies "%s" style correctly', (type, expectedStyle) => {
    jest.spyOn(themeHook, "useThemeColor").mockReturnValue("#123456");

    const { getByTestId } = render(
      <ThemedText
        testID="themed-text"
        type={type as any}>
        Text
      </ThemedText>
    );

    const text = getByTestId("themed-text");

    expect(text.props.style).toEqual(
      expect.arrayContaining([expect.objectContaining(expectedStyle)])
    );
  });

  it("merges custom style with theme and type styles", () => {
    jest.spyOn(themeHook, "useThemeColor").mockReturnValue("#abcdef");

    const { getByTestId } = render(
      <ThemedText
        testID="themed-text"
        type="default"
        style={{ marginTop: 10 }}>
        Styled
      </ThemedText>
    );

    const text = getByTestId("themed-text");

    expect(text.props.style).toEqual(
      expect.arrayContaining([
        { color: "#abcdef" },
        expect.objectContaining({ fontSize: 16 }),
        { marginTop: 10 },
      ])
    );
  });
});
