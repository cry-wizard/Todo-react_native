import { View, Text, ActivityIndicator } from 'react-native'
import React from 'react'
import { useTheme } from '@/hooks/useTheme'
import { createHomeStyles } from '@/assets/styles/home.styles'
import { LinearGradient } from 'expo-linear-gradient'

const LoadingSpiner = () => {
    const {colors} = useTheme()

    const homestyles = createHomeStyles(colors)

  return (
    <LinearGradient style={homestyles.container} colors={colors.gradients.background}>
        <View style={homestyles.loadingContainer}>
            <ActivityIndicator size="large" color={colors.primary} />
            <Text style={homestyles.loadingText}>Loading your todo...</Text>
        </View>
    </LinearGradient>
  )
}

export default LoadingSpiner