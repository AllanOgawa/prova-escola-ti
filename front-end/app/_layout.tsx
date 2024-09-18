import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="(receita)/edit/[id]/index" options={{ headerTitle: "Editar Receita" }} />
        <Stack.Screen name="(receita)/create/index" options={{ headerTitle: "Cadastrar Receita" }} />
        <Stack.Screen name="(receita)/updateIngrediente/[id]/index" options={{ headerTitle: "Alterar Ingredientes da Receita" }} />
        <Stack.Screen name="(ingrediente)/edit/[id]/index" options={{ headerTitle: "Editar Ingrediente" }} />
        <Stack.Screen name="(ingrediente)/create/index" options={{ headerTitle: "Cadastrar Ingrediente" }} />
        <Stack.Screen name="+not-found" />
      </Stack>
    </ThemeProvider>
  );
}
