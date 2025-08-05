import React from "react";
import { Tabs } from "expo-router";
import {Ionicons} from "@expo/vector-icons";
import { useTheme } from "@/hooks/useTheme";

const Layout = () => {
  const { colors } = useTheme();
  return (
      <Tabs
    screenOptions={{
      tabBarActiveTintColor: colors.primary,
      headerShown: false,
      tabBarInactiveTintColor: colors.textMuted,
      tabBarStyle: { backgroundColor: colors.surface,
        borderTopColor: colors.border,
        borderTopWidth: 1,
        height: 80,
        paddingTop: 10,
        paddingBottom: 30,
       },
       tabBarLabelStyle: { fontSize: 16,fontWeight:"600" },
    }}>
      <Tabs.Screen
        name="todo"
        options={{
          title: "Todo",
          tabBarIcon: ({color}) => <Ionicons name="checkmark-done-circle" size={24} color={color} />,
        }}
      />
      <Tabs.Screen name="setting" options={{ title: "Setting",
        tabBarIcon:({color})=><Ionicons name="settings" size={24} color={color} />
       }} />
    </Tabs>
  );
};

export default Layout;
