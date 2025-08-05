import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Link } from 'expo-router'
import { ScreenContentWrapper } from 'react-native-screens'

const index = () => {
  return (
    <ScreenContentWrapper style={styles.continer}>
      <Text>Edit To Home</Text>
      <Link  href="/todo">About Screen</Link>
    </ScreenContentWrapper>
  )
}

export default index

const styles = StyleSheet.create({
  continer:{
    flex:1,
    justifyContent:'center',
    alignItems:'center'
  }
})