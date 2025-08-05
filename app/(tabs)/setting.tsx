import { createSettingsStyles } from '@/assets/styles/setting.styles'
import DangerZone from '@/components/DangerZone'
import Preferences from '@/components/Preferences'
import ProgressStatus from '@/components/ProgressStatus'
import { useTheme } from '@/hooks/useTheme'
import { Ionicons } from '@expo/vector-icons'
import { LinearGradient } from 'expo-linear-gradient'
import { useState } from 'react'
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native'

const Setting = () => {
  const [isAutoSync, setisAutoSync] = useState(false)
  const [isNoticeficationEnable, setisNoticeficationEnable] = useState(false)
  const {colors}= useTheme()

  const settingStyles = createSettingsStyles(colors)
  return (
    <LinearGradient colors={colors.gradients.background} style={settingStyles.container}>
      <SafeAreaView style={settingStyles.safeArea}>
        <View style={settingStyles.header}>
          <View style={settingStyles.titleContainer}>
            <LinearGradient colors={colors.gradients.primary} style={settingStyles.iconContainer}>
              <Ionicons name='settings-outline' size={28} color={colors.text} />
            </LinearGradient>
            <Text style={settingStyles.title}>Settings</Text>
          </View>
        </View>
        <ScrollView style={settingStyles.scrollView} contentContainerStyle={settingStyles.content} showsVerticalScrollIndicator={false}>
          {/* {Progress Status} */}
          <ProgressStatus/>
          {/* {PREFERENCES} */}
          <Preferences />
           {/* {Danger Zone} */}
          <DangerZone />
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  )
}

export default Setting

const styles = StyleSheet.create({})