import React from 'react'
import { SafeAreaView, StatusBar } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native'
import { BoardContainer, StartupContainer } from '@/Containers'
import { useTheme } from '@/Hooks'
import { navigationRef } from './utils'
import { useMemo } from 'react'
import { useSelector } from 'react-redux'

const Stack = createStackNavigator()

// @refresh reset
const ApplicationNavigator = () => {
  const { Layout, darkMode, NavigationTheme } = useTheme()
  const isComputer = useSelector(state => state.game.isComputer)
  const backgroundColor = useMemo(() => {
    return darkMode ? '#000' : '#fff'
  }, [darkMode])

  const headerTintColor = useMemo(
    () => (darkMode ? '#fff' : '#000'),
    [darkMode],
  )
  return (
    <SafeAreaView style={[Layout.fill, { backgroundColor }]}>
      <NavigationContainer theme={NavigationTheme} ref={navigationRef}>
        <StatusBar
          translucent
          barStyle={darkMode ? 'light-content' : 'dark-content'}
          backgroundColor={headerTintColor}
        />
        <Stack.Navigator
          screenOptions={{ headerShown: true, headerBackTitleVisible: false }}
          initialRouteName={'Select Player'}
        >
          <Stack.Screen
            name="Tic Tac Toe"
            options={{
              headerStyle: {
                backgroundColor,
              },
              headerTintColor,
              headerTitleStyle: {
                fontWeight: 'bold',
              },
            }}
            component={BoardContainer}
          />
          <Stack.Screen
            name="Select Player"
            options={{
              headerStyle: {
                backgroundColor,
              },
              headerTintColor,
              headerTitleStyle: {
                fontWeight: 'bold',
              },
              title: isComputer ? 'Select Player' : 'Select Mode',
            }}
            component={StartupContainer}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  )
}

export default ApplicationNavigator
