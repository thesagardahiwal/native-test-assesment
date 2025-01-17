import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import Icon from "@expo/vector-icons/AntDesign"
import { router } from 'expo-router'

const Navigation = () => {
  return (
    <View className='flex-row bg-white/10 p-2 items-center w-full'>
        <TouchableOpacity>
          <Text className='font-semibold text-white text-2xl'>Logo</Text>
        </TouchableOpacity>
        <View className='flex-row flex-1 justify-center items-center gap-3'>
          <TouchableOpacity>
              <Text className='font-medium text-white text-lg'>TV Shows</Text>
          </TouchableOpacity>
          <TouchableOpacity>
              <Text className='font-medium text-white text-lg'>Movies</Text>
          </TouchableOpacity>
          <TouchableOpacity>
              <Text className='font-medium text-white text-lg'>My List</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
            onPress={() => router.navigate("/(root)/(tabs)/search")}
            >
          <Text className='text-white'>
            <Icon name={'search1'} size={33} color={"white"} />
          </Text>
        </TouchableOpacity>
      </View>
  )
}

export default Navigation