import ParallaxScrollView from "@/components/ParallaxScrollView";
import { render } from "@testing-library/react-native";
import React from "react";
import { Text, View } from "react-native";

jest.mock("@react-navigation/bottom-tabs", () => {
  const actual = jest.requireActual("@react-navigation/bottom-tabs");
  return {
    ...actual,
    useBottomTabBarHeight: () => 0,
  };
});

jest.mock("@/components/ui/TabBarBackground", () => ({
  useBottomTabOverflow: () => 0,
}));

jest.mock("@/hooks/useColorScheme", () => ({
  useColorScheme: () => "light",
}));

describe("ParallaxScrollView", () => {
  it("renders headerImage and children correctly", () => {
    const headerImage = <MockHeader />;
    const children = <MockContent />;

    const { getByTestId, getByText } = render(
      <ParallaxScrollView
        headerImage={headerImage}
        headerBackgroundColor={{ light: "white", dark: "black" }}>
        {children}
      </ParallaxScrollView>
    );

    expect(getByTestId("mock-header")).toBeTruthy();
    expect(getByText("Content")).toBeTruthy();
  });
});

// Mock components
const MockHeader = () => <View testID="mock-header" />;
const MockContent = () => <Text>Content</Text>;
