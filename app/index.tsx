import { router } from "expo-router";
import { useEffect } from "react";

const App = () => {
  useEffect(() => {
    router.replace("/(auth)/login");
  }, []);

  return;
};

export default App;
