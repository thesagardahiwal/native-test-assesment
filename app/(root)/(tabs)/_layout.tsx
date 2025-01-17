import { View, Text } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'
import Icon from "@expo/vector-icons/AntDesign";


const AppLayout = () => {
  return (
    <Tabs screenOptions={{tabBarStyle: {backgroundColor: "black"}}}>
      <Tabs.Screen name='index' options={{headerShown: false, title: "", tabBarIcon: (props) => <IconApp {...props} title='Home' iconName="home" />}}/>
      <Tabs.Screen name='search' options={{headerShown: false, title: "", tabBarIcon: (props) => <IconApp {...props} title='Search' iconName='search1' />}}/>
    </Tabs>
  )
}

export default AppLayout;


const IconApp = ({ focused, color, size, iconName, title} : { focused: boolean; color: string; size: number; iconName: 'search1' | 'home'; title: string }) => {
    return (
        <View className={`w-20 h-12 justify-center mt-4 items-center`}>
            <Icon name={iconName} size={23} color={focused ? "#fff" : "#64748b"} />
            <Text className={`${focused ? "text-white" : "text-slate-500"} text-sm`}>{title}</Text>
        </View>
    )
};