// import React, { useContext } from "react";
// import { NavigationContainer } from "@react-navigation/native";
// import { Provider as PaperProvider } from "react-native-paper";
// import { FavoritesProvider } from "./src/context/FavoritesContext";
// import { ThemeProvider, ThemeContext } from "./src/context/ThemeContext";
// import TabNavigator from "./src/navigation/TabNavigator";

// function AppContent() {
//   const { colors, isDarkMode } = useContext(ThemeContext);

//   const paperTheme = {
//     dark: isDarkMode,
//     colors: {
//       primary: colors.text,
//       background: colors.background,
//       surface: colors.card,
//       text: colors.text,
//       placeholder: colors.text,
//       onSurfaceVariant: colors.text,
//     },
//   };

//   return (
//     <PaperProvider theme={paperTheme}>
//       <FavoritesProvider>
//         <NavigationContainer>
//           <TabNavigator />
//         </NavigationContainer>
//       </FavoritesProvider>
//     </PaperProvider>
//   );
// }

// export default function App() {
//   return (
//     <ThemeProvider>
//       <AppContent />
//     </ThemeProvider>
//   );
// }




import React, { useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { Provider as PaperProvider } from "react-native-paper";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { FavoritesProvider } from "./src/context/FavoritesContext";
import { ThemeProvider, ThemeContext } from "./src/context/ThemeContext";
import TabNavigator from "./src/navigation/TabNavigator";

function AppContent() {
  const { colors, isDarkMode } = useContext(ThemeContext);

  const paperTheme = {
    dark: isDarkMode,
    colors: {
      primary: colors.text,
      background: colors.background,
      surface: colors.card,
      text: colors.text,
      placeholder: colors.text,
      onSurfaceVariant: colors.text,
    },
  };

  return (
    <PaperProvider theme={paperTheme}>
      <FavoritesProvider>
        <NavigationContainer>
          <TabNavigator />
        </NavigationContainer>
      </FavoritesProvider>
    </PaperProvider>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <AppContent />
      </ThemeProvider>
    </SafeAreaProvider>
  );
}