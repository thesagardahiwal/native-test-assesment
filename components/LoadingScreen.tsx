import { View, Text, ActivityIndicator } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

const LoadingScreen = () => {
  return (
    <SafeAreaView className='flex-1 bg-black items-center justify-center'>
      <ActivityIndicator color={"#0000ff"} size={"large"}>
      </ActivityIndicator>
    </SafeAreaView>
  )
}

export default LoadingScreen