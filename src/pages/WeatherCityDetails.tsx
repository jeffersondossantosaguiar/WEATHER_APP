import React, { Component } from "react"
import { ImageBackground, Text, View, StyleSheet } from "react-native"
import { useRoute } from "@react-navigation/native"

interface CityDetailsRouteParams {
  cityKey: number
}

export default function WeatherCityDetails() {
  const route = useRoute()

  const params = route.params as CityDetailsRouteParams
  console.log(params.cityKey)

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../../assets/day.png")}
        style={styles.imageBackground}
      ></ImageBackground>
      
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  imageBackground: {
    flex: 1,
    alignItems: "center"
  }
})
