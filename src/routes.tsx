import React from "react"

import { NavigationContainer } from "@react-navigation/native"
import { createStackNavigator } from "@react-navigation/stack"

const { Navigator, Screen } = createStackNavigator()

import WeatherCitySearch from "./pages/WeatherCitySearch"
import WeatherCityDetails from './pages/WeatherCityDetails'

export default function Routes() {
  return (
    <NavigationContainer>
      <Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Screen name="WeatherCitySearch" component={WeatherCitySearch} />
        <Screen name="WeatherCityDetails" component={WeatherCityDetails} />
      </Navigator>
    </NavigationContainer>
  )
}