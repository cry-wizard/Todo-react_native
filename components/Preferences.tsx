import { StyleSheet, Switch, Text, View } from "react-native";
import React, { useState } from "react";
import { useTheme } from "@/hooks/useTheme";
import { createSettingsStyles } from "@/assets/styles/setting.styles";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";

const Preferences = () => {
  const [isAutoSync, setisAutoSync] = useState(false);
  const [isNoticeficationEnable, setisNoticeficationEnable] = useState(false);
  const { colors, isDarkMode, toggleDarkMode } = useTheme();
  const settinfStyles = createSettingsStyles(colors);

  return (
    <LinearGradient
      colors={colors.gradients.surface}
      style={settinfStyles.section}
    >
      <Text style={settinfStyles.sectionTitle}>Preferences</Text>
      {/* {Dark Mode} */}
      <View style={settinfStyles.settingItem}>
        <View style={settinfStyles.settingLeft}>
          <LinearGradient
            colors={colors.gradients.primary}
            style={settinfStyles.iconContainer}
          >
            <Ionicons name="moon" size={18} color={colors.text} />
          </LinearGradient>
          <Text style={settinfStyles.settingText}>Dark Mode</Text>
        </View>
        <Switch
          value={isDarkMode}
          ios_backgroundColor={colors.border}
          onValueChange={toggleDarkMode}
          thumbColor={"#fff"}
          trackColor={{ false: colors.border, true: colors.primary }}
        />
      </View>
      {/* {Notification} */}
      <View style={settinfStyles.settingItem}>
        <View style={settinfStyles.settingLeft}>
          <LinearGradient
            colors={colors.gradients.warning}
            style={settinfStyles.iconContainer}
          >
            <Ionicons name="notifications" size={18} color={colors.text} />
          </LinearGradient>
          <Text style={settinfStyles.settingText}>Notification</Text>
        </View>
        <Switch
          value={isNoticeficationEnable}
          ios_backgroundColor={colors.border}
          onValueChange={()=>setisNoticeficationEnable(!isNoticeficationEnable)}
          thumbColor={"#fff"}
          trackColor={{ false: colors.border, true: colors.warning }}
        />
      </View>

      {/* {Auto-Sync} */}
      <View style={settinfStyles.settingItem}>
        <View style={settinfStyles.settingLeft}>
          <LinearGradient
            colors={colors.gradients.success}
            style={settinfStyles.iconContainer}
          >
            <Ionicons name="sync" size={18} color={colors.text} />
          </LinearGradient>
          <Text style={settinfStyles.settingText}>Auto Sync</Text>
        </View>
        <Switch
          value={isAutoSync}
          ios_backgroundColor={colors.border}
          onValueChange={()=>setisAutoSync(!isAutoSync)}
          thumbColor={"#fff"}
          trackColor={{ false: colors.border, true: colors.success }}
        />
      </View>
    </LinearGradient>
  );
};

export default Preferences;
