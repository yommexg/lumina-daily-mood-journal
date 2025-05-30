import { Collapsible } from "@/components/Collapsible";
import { fireEvent, render } from "@testing-library/react-native";
import React from "react";
import { Text } from "react-native";

jest.mock("@/hooks/useColorScheme", () => ({
  useColorScheme: jest.fn(() => "light"),
}));

describe("Collapsible", () => {
  it("renders title and toggles content visibility", () => {
    const { getByText, queryByText } = render(
      <Collapsible title="My Section">
        <Text>Collapsible Content</Text>
      </Collapsible>
    );

    const title = getByText("My Section");
    expect(title).toBeTruthy();

    expect(queryByText("Collapsible Content")).toBeNull();

    fireEvent.press(title);
    expect(getByText("Collapsible Content")).toBeTruthy();

    fireEvent.press(title);
    expect(queryByText("Collapsible Content")).toBeNull();
  });
});
