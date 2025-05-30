import { ExternalLink } from "@/components/ExternalLink";
import { fireEvent, render } from "@testing-library/react-native";
import { openBrowserAsync } from "expo-web-browser";
import { Text } from "react-native";
import { mockPlatformOS } from "../mocks/utils/mockPlatform";

jest.mock("expo-web-browser", () => ({
  openBrowserAsync: jest.fn(),
}));

describe("ExternalLink", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("calls openBrowserAsync and prevents default on iOS", () => {
    mockPlatformOS("ios");

    const href = "https://example.com";
    const { getByText } = render(
      <ExternalLink href={href}>
        <Text>Visit</Text>
      </ExternalLink>
    );

    const preventDefault = jest.fn();
    fireEvent.press(getByText("Visit"), { preventDefault });

    expect(preventDefault).toHaveBeenCalled();
    expect(openBrowserAsync).toHaveBeenCalledWith(href);
  });

  it("does not call openBrowserAsync on web", () => {
    mockPlatformOS("web");

    const href = "https://example.com";
    const { getByText } = render(
      <ExternalLink href={href}>
        <Text>Visit</Text>
      </ExternalLink>
    );

    const preventDefault = jest.fn();
    fireEvent.press(getByText("Visit"), { preventDefault });

    expect(preventDefault).not.toHaveBeenCalled();
    expect(openBrowserAsync).not.toHaveBeenCalled();
  });
});
