import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createHomeStyles } from "@/assets/styles/home.styles";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useTheme } from "@/hooks/useTheme";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";

const Header = () => {
  const { colors } = useTheme();
  const homestyles = createHomeStyles(colors);

  const todo = useQuery(api.todos.getTodos);

  const completedCount = todo
    ? todo.filter((todo) => todo.isCompleted).length
    : 0;
  const totalCount = todo ? todo.length : 0;
  const progressPercentage =
    totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  return (
    <View style={homestyles.header}>
      <View style={homestyles.titleContainer}>
        <LinearGradient
          colors={colors.gradients.primary}
          style={homestyles.iconContainer}
        >
          <Ionicons name="flash-outline" size={28} color="#ffffff" />
        </LinearGradient>
        <View style={homestyles.titleTextContainer}>
          <Text style={homestyles.title}>Today&apos;s Task 👀</Text>
          <Text style={homestyles.subtitle}>
            {completedCount} of {totalCount} complete
          </Text>
        </View>
      </View>
        <View style={homestyles.progressContainer}>
          <View style={homestyles.progressBarContainer}>
            <View style={homestyles.progressBar}>
              <LinearGradient
                colors={colors.gradients.success}
                style={[
                  homestyles.progressFill,
                  { width: `${progressPercentage}%` },
                ]}
              />
            </View>
            <Text style={homestyles.progressText}>
              {progressPercentage}%
            </Text>
          </View>
        </View>
    </View>
  );
};

export default Header;