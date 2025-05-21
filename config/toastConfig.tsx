import { BaseToast, ErrorToast } from "react-native-toast-message";

export const toastConfig = {
  success: (props: any) => (
    <BaseToast
      {...props}
      style={{ backgroundColor: "#6C63FF" }}
      contentContainerStyle={{ paddingHorizontal: 15 }}
      text1Style={{
        fontSize: 17,
        fontWeight: "bold",
        color: "white",
        textAlign: "center",
      }}
      text2Style={{
        fontSize: 14,
        color: "#333",
      }}
    />
  ),

  error: (props: any) => (
    <ErrorToast
      {...props}
      style={{ backgroundColor: "#D9534F" }}
      text1Style={{
        fontSize: 17,
        fontWeight: "bold",
        color: "white",
        textAlign: "center",
      }}
      text2Style={{
        fontSize: 14,
        color: "#333",
      }}
    />
  ),

  info: (props: any) => (
    <BaseToast
      {...props}
      style={{ backgroundColor: "#4A90E2" }}
      contentContainerStyle={{ paddingHorizontal: 15 }}
      text1Style={{
        fontSize: 17,
        fontWeight: "bold",
        color: "white",
        textAlign: "center",
      }}
      text2Style={{
        fontSize: 14,
        color: "#333",
      }}
    />
  ),
};
