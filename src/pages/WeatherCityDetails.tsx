import React, { useState, useEffect } from "react"
import { ImageBackground, Text, View, StyleSheet, Dimensions } from "react-native"
import { useRoute } from "@react-navigation/native"
import axios from "axios"

interface CityDetailsRouteParams {
  latitude: number,
  longitude: number
}
interface CityWeatherDetails {
  current: {
    dt: number
    temp: number
  }
}

const windowHeight = Dimensions.get("window").height

export default function WeatherCityDetails() {
/*   const route = useRoute()
  const params = { latitude: -23.4698043, longitude: -47.5768764} as CityDetailsRouteParams
  const [cityWeatherDetails, setCityWeatherDetails] = useState<CityWeatherDetails>() */
  let cityWeatherDetails: CityWeatherDetails = require('../json/jsonCurrentWeather.json') //Teste com arquivo local por conta das chamadas da API
  /* useEffect(() => {
    axios
    .get(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${params.latitude}&lon=${params.longitude}&units=metric&lang=pt_br&appid=7d417155dd6cbc70d9b558daec0d9028`
    )
    .then(function (response) {
      setCityWeatherDetails(response.data)    
    })
    .catch(function (error) {
      console.log(error)
    })
  }), [params.latitude, params.longitude] */

  const todayDate = new Date(cityWeatherDetails.current.dt * 1000)
  var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }

  const day = todayDate.toLocaleDateString('de-DE', options)

  
  if (!cityWeatherDetails) {
    return (
      <View style={styles.container}>
      <ImageBackground
        source={require("../../assets/day.png")}
        style={styles.imageBackground}
      ></ImageBackground>
    </View>
    )
  }

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../../assets/day.png")}
        style={styles.imageBackground}
      >
        <Text style={styles.currentDate}>{day}</Text>
        <Text style={styles.currentTemp}>{cityWeatherDetails.current.temp.toFixed(0)}º</Text>
      </ImageBackground>
      
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
  },
  currentTemp: {
    justifyContent: "center",

    fontFamily: "Roboto_700Bold",
    color: "#FFF",
    fontSize: 96,
    top: (windowHeight / 100) * 40,
    
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: {width: 5, height: 4},
    textShadowRadius: 10
  },
  currentDate: {
    top: (windowHeight / 100) * 40,
  }
})
