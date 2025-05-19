import { useThemeColor } from "@/hooks/useThemeColor";
import { TextInput, type TextInputProps } from "react-native";

export type ThemedTextInputProps = TextInputProps & {
  lightColor?: string;
  darkColor?: string;
  lightTextColor?: string;
  darkTextColor?: string;
};

export function ThemedTextInput({
  style,
  lightColor,
  darkColor,
  lightTextColor,
  darkTextColor,
  ...otherProps
}: ThemedTextInputProps) {
  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    "inputBackground"
  );
  const color = useThemeColor(
    { light: lightTextColor, dark: darkTextColor },
    "text"
  );

  return (
    <TextInput
      style={[{ backgroundColor, color }, style]}
      {...otherProps}
    />
  );
}
