# 🌙 Lumina – Daily Mood Journal App

**Lumina** is a simple and calming mood journaling app that helps you track your emotions, triggers, and habits to better understand your mental well-being.

Built with **Expo**, **React Native**, and **Zustand**, Lumina combines a soothing interface with useful insights to support your daily self-reflection practice.

---

## ✨ Features

- 📝 **Daily Mood Logging** – Record how you feel in seconds
- 🔄 **Trigger & Habit Tracking** – Identify patterns over time
- 📊 **Mood Analytics** – Visualize your emotional trends
- 🌗 **Light & Dark Mode Support**
- 🔔 **Daily Reminders** – Stay consistent with gentle prompts
- 📱 **Minimal, Reflective Design** – A calm space for your thoughts
- 🔓 **Google Sign-In** – One-tap access using Google
- 📬 **Email Verification** – Confirm identity before full access
- 🚨 **Push Notifications** – Stay engaged with reminders and insights

---

## 📷 Screenshots

<div style="display: flex; flex-wrap: wrap; gap: 10px;">

<img src="./screenshots/build.png" alt="Building Process" width="200"/>
<img src="./screenshots/splash.png" alt="Splash" width="200"/>

</div>

---

--

### 🌞 Light Mode

<div style="display: flex; flex-wrap: wrap; gap: 10px;">

<img src="./screenshots/light-view/light-login.png" alt="Light mode - Login screen" width="200"/>
<img src="./screenshots/light-view/light-login-with-google.png" alt="Light mode - Login screen with Google button" width="200"/>
<img src="./screenshots/light-view/light-register.png" alt="Light mode - Register screen" width="200"/>
<img src="./screenshots/light-view/light-loading-state.png" alt="Light mode - Loading state indicator" width="200"/>
<img src="./screenshots/light-view/light-toast-success.png" alt="Light mode - Toast notification for success" width="200"/>
<img src="./screenshots/light-view/light-verify-email-and-push-notification.png" alt="Light mode - Email verification and push notification prompt" width="200"/>
<img src="./screenshots/light-view/light-verify-email.png" alt="Light mode - Verify email screen" width="200"/>
<img src="./screenshots/light-view/light-verify-email-website.png" alt="Light mode - Verify email via website" width="200"/>
<img src="./screenshots/light-view/light-verified-email.png" alt="Light mode - Email successfully verified screen" width="200"/>
<img src="./screenshots/light-view/light-failed-email-verify.png" alt="Light mode - Failed email verification screen" width="200"/>
<img src="./screenshots/light-view/light-push-notifiactions.png" alt="Light mode - Push notifications screen" width="200"/>
<img src="./screenshots/light-view/light-home-page-with-toast-sucess.png" alt="Light mode - Home page with success toast" width="200"/>

</div>

--

### 🌙 Dark Mode

<div style="display: flex; flex-wrap: wrap; gap: 10px;">

<img src="./screenshots/dark-view/dark-login.png" alt="Dark mode - Login screen" width="200"/>
<img src="./screenshots/dark-view/dark-login-with-google.png" alt="Dark mode - Login screen with Google button" width="200"/>
<img src="./screenshots/dark-view/dark-loading-state.png" alt="Dark mode - Loading state indicator" width="200"/>
<img src="./screenshots/dark-view/dark-failed-login.png" alt="Dark mode - Failed Login" width="200"/>
<img src="./screenshots/dark-view/dark-register.png" alt="Dark mode - Register screen" width="200"/>
<img src="./screenshots/dark-view/dark-login-with-toast-success.png" alt="Dark mode - Toast notification for success" width="200"/>
<img src="./screenshots/dark-view/dark-login-with-toast-info.png" alt="Dark mode - Toast notification for info" width="200"/>
<img src="./screenshots/dark-view/dark-login-with-toast-error.png" alt="Dark mode - Toast notification for error" width="200"/>
<img src="./screenshots/dark-view/dark-verify-email-and-push-notification.png" alt="Dark mode - Email verification and push notification prompt" width="200"/>
<img src="./screenshots/dark-view/dark-verify-email.png" alt="Dark mode - Verify email screen" width="200"/>
<img src="./screenshots/dark-view/dark-verify-email-website.png" alt="Dark mode - Verify email via website" width="200"/>
<img src="./screenshots/dark-view/dark-verified-email.png" alt="Dark mode - Email successfully verified screen" width="200"/>
<img src="./screenshots/dark-view/dark-push-notification-verification-success-alert.png" alt="Dark mode - Push notifications for verification screen" width="200"/>
<img src="./screenshots/dark-view/dark-push-notification-success-alert.png" alt="Dark mode - Push notifications for login screen" width="200"/>
<img src="./screenshots/dark-view/dark-home-page-with-toast-sucess.png" alt="Dark mode - Home page with success toast" width="200"/>

</div>

--

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/lumina-daily-mood-journal.git
cd lumina-daily-mood-journal
```

### 2. Install Dependencies

```bash
npm install
# or
yarn
```

### 3. Start the App

```bash
npx expo start
```

## 🧪 Sample `.env`

```env
EXPO_PUBLIC_GOOGLE_AUTH_CLIENT_ID=your-google-client-id.apps.googleusercontent.com
EXPO_PUBLIC_API_URL=https://your-production-backendend.com || http://192.168.x.x:${BACKEND_PORT}(for development)
```

---

## 🫱‍♂️ Tech Stack

- [Expo](https://expo.dev/) (React Native)
- Zustand (State Management)
- React Navigation (Expo Router)
- Expo Image / Font / SplashScreen
- Expo Notifications (Upcoming)

---

## 📁 Project Structure

```
.
├── app/                 # Screens & Routes (expo-router)
├── assets/              # Fonts, images, and icons
├── components/          # Reusable UI components
├── config/              # Configurations for External Providers (Notifications, Toast Messages etc.)
├── constants/           # Constant Values (Colors, BlurHash for expo image etc.)
├── hooks/               # Renders hooks for app usage (useColorScheme, usePushNotifications etc.)
├── providers/           # Generate Context for the app (NotificationProvider etc.)
├── screenshots/         # Stores Snapshots of the application
├── store/               # Zustand store (mood, habits, users etc.)
├── utils/               # Utility functions (types)
├── app.json             # App config (splash, icon, etc.)
├── eas.json             # EAS Build for production, development and preview
└── tsconfig.json        # Typescript Configurations
```

---

## 🔧 Utils Overview

- `utils/types.ts` – # Types for Users, Moods etc

---

## 🎈 Theming

Lumina supports both **light** and **dark** modes using custom `ThemedText`, `ThemedView`, and `ThemedTextInput` components:

```ts
/components / Themedtx.tsx / components /  ThemedTextInput.tsx  / components /ThemedView.tsx;
```

---

## 📦 Key Dependencies

```json
"expo": "~50.x",
"expo-router": "^3.x",
"expo-splash-screen": "~0.20.x",
"expo-font": "~11.x",
"expo-image": "^1.x",
"expo-notifications": "~0.20.x",
"zustand": "^4.x",
"react-native-reanimated": "~3.x",
```

---

## 🔒 License

MIT License © 2025 Boluwatife Yomi-Olugbodi

---

> Lumina is your daily space to reflect, understand, and grow — one mood at a time.
