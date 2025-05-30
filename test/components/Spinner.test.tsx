import Spinner from "@/components/Spinner";
import { render } from "@testing-library/react-native";
import React from "react";

describe("Spinner", () => {
  it("renders an ActivityIndicator inside a styled overlay container", () => {
    const { getByTestId, toJSON } = render(<Spinner />);

    // Find the ActivityIndicator by its type
    const activityIndicator = getByTestId("spinner-activity-indicator");
    expect(activityIndicator).toBeTruthy();

    // Snapshot test to validate structure and styles
    expect(toJSON()).toMatchSnapshot();
  });
});
