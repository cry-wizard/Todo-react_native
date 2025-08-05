import { View, Text, Alert, TouchableOpacity } from "react-native";
import React from "react";
import { useTheme } from "@/hooks/useTheme";
import { createSettingsStyles } from "@/assets/styles/setting.styles";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";

const DangerZone = () => {
  const { colors } = useTheme();
  const SettingStyle = createSettingsStyles(colors);
  const clearTodo = useMutation(api.todos.clearAllTodos);

  const handleReset = async () => {
    Alert.alert(
      "Reset App",
      "⚠️Are you sure you want to reset the app? This will clear all your data.",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete All",
          style: "destructive",
          onPress: async () => {
            try {
              const result = await clearTodo();
              Alert.alert("Success", "All todos have been deleted.");
            } catch (error) {
              Alert.alert("Error", "Something went wrong.");
            }
          },
        },
      ]
    );
  };
  return (
    <LinearGradient
      colors={colors.gradients.surface}
      style={SettingStyle.section}
    >
      <Text style={SettingStyle.sectionTitleDanger}>Danger Zone</Text>
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={handleReset}
        style={SettingStyle.actionButton}
      >
        <View style={SettingStyle.actionLeft}>
            <LinearGradient colors={colors.gradients.danger} style={SettingStyle.iconContainer}>
                <Ionicons name="trash" size={18} color={colors.text} />
            </LinearGradient>
            <Text style={SettingStyle.actionTextDanger}>Reset App</Text>
        </View>
        <Ionicons name="chevron-forward" size={18} color={colors.textMuted} />
      </TouchableOpacity>
    </LinearGradient>
  );
};

export default DangerZone;
