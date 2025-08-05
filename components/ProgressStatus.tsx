import { View, Text } from "react-native";
import React from "react";
import { useTheme } from "@/hooks/useTheme";
import { createSettingsStyles } from "@/assets/styles/setting.styles";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";

const ProgressStatus = () => {
  const { colors } = useTheme();
  const settingStyles = createSettingsStyles(colors);
  const todo = useQuery(api.todos.getTodos);
  const totaltodos = todo ? todo.length : 0;
  const completedTodos = todo
    ? todo.filter((item) => item.isCompleted).length
    : 0;
  const activeTodos = totaltodos - completedTodos;
  return (
    <LinearGradient
      colors={colors.gradients.surface}
      style={settingStyles.section}
    >
      <Text style={settingStyles.sectionTitle}>Progress Status</Text>
      <View style={settingStyles.statsContainer}>
        <LinearGradient
          colors={colors.gradients.background}
          style={[settingStyles.statCard, { borderLeftColor: colors.primary }]}
        >
          <View style={settingStyles.statIconContainer}>
            <LinearGradient
              colors={colors.gradients.primary}
              style={settingStyles.statIcon}
            >
              <Ionicons
                name="list-outline"
                size={20}
                color={colors.text}
              />
            </LinearGradient>
          </View>
          <View>
            <Text style={settingStyles.statNumber}>{totaltodos}</Text>
            <Text style={settingStyles.statLabel}>Total Todo</Text>
          </View>
        </LinearGradient>

        <LinearGradient
          colors={colors.gradients.background}
          style={[settingStyles.statCard, { borderLeftColor: colors.success }]}
        >
          <View style={settingStyles.statIconContainer}>
            <LinearGradient
              colors={colors.gradients.success}
              style={settingStyles.statIcon}
            >
              <Ionicons
                name="checkmark-circle"
                size={20}
                color={colors.text}
              />
            </LinearGradient>
          </View>
          <View>
            <Text style={settingStyles.statNumber}>{completedTodos}</Text>
            <Text style={settingStyles.statLabel}>Completed</Text>
          </View>
        </LinearGradient>

        <LinearGradient
          colors={colors.gradients.background}
          style={[settingStyles.statCard, { borderLeftColor: colors.warning }]}
        >
          <View style={settingStyles.statIconContainer}>
            <LinearGradient
              colors={colors.gradients.warning}
              style={settingStyles.statIcon}
            >
              <Ionicons
                name="time"
                size={20}
                color={colors.text}
              />
            </LinearGradient>
          </View>
          <View>
            <Text style={settingStyles.statNumber}>{activeTodos}</Text>
            <Text style={settingStyles.statLabel}>Active</Text>
          </View>
        </LinearGradient>
      </View>
    </LinearGradient>
  );
};

export default ProgressStatus;
