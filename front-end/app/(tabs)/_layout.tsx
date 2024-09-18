import { Tabs } from 'expo-router';
import React from 'react';

import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Receitas',
          tabBarIcon: ({ color, focused }) => (
            <MaterialCommunityIcons size={28} name={focused ? 'food-drumstick' : 'food-drumstick-outline'} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="ingrediente"
        options={{
          title: 'Ingredientes',
          tabBarIcon: ({ color, focused }) => (
            <MaterialCommunityIcons size={28} name={focused ? 'food-apple' : 'food-apple-outline'} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
