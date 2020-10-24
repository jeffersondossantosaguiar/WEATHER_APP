import { StatusBar } from "expo-status-bar"
import React, { useState } from "react"
import {
  StyleSheet,
  TextInput,
  View,
  ImageBackground,
  FlatList,
  Text,
  Dimensions
} from "react-native"

import { useNavigation } from "@react-navigation/native"
import axios from "axios"

const windowHeight = Dimensions.get("window").height

interface City {
  AdministrativeArea: {
    ID: string,
  },
  Country: {
    ID: string,
  }
  Key: string,
  LocalizedName: string,
}

export default function WeatherCitySearch() {

  const [cityArray, setCityArray] = useState<City[]>([])
  const navigation = useNavigation()

  function handleNavigateToCityDetails(cityKey: number) {
    navigation.navigate("WeatherCityDetails", { cityKey })
  }

  const Item = ({ city, administrativeArea, country, cityKey }) => (
    <View style={styles.item}>
      <Text
        style={styles.city}
        onPress={() => handleNavigateToCityDetails(cityKey)}
      >
        {city}, {administrativeArea} - {country}
      </Text>
    </View>
  )

  const renderItem = ({ item }) => (
    <Item
      city={item.LocalizedName}
      administrativeArea={item.AdministrativeArea.ID}
      country={item.Country.ID}
      cityKey={item.Key}
    />
  )

  function fetchCity(event: string) {
    axios
      .get(
        `http://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=mWTxlMXwduK0k1GW5G20lzLbuZmRobic&q=${event}&language=pt-BR`
      )
      .then(function (response) {
        setCityArray(response.data)
      })
      .catch(function (error) {
        console.log(error)
      })
  }
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../../assets/bkg.jpg")}
        style={styles.imageBackground}
      >
        <TextInput
          placeholder="Buscar Cidade"
          placeholderTextColor="#FFF"
          onChangeText={(event) => fetchCity(event)}
          style={styles.textInputSearchCity}
        />
        <FlatList
          data={cityArray}
          renderItem={renderItem}
          keyExtractor={(item) => item.Key}
          style={styles.itemsList}
        />
        <StatusBar style="auto" />
      </ImageBackground>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  textInputSearchCity: {
    color: "#FFF",
    height: 50,
    width: 310,
    backgroundColor: "rgba(4, 4, 4, 0.24)",
    borderRadius: 14,
    fontFamily: "Roboto_500Medium",
    fontSize: 18,
    paddingLeft: 27,
    top: 70
  },
  imageBackground: {
    flex: 1,
    alignItems: "center"
  },
  item: {
    height: 50,
    width: "auto",
    backgroundColor: "rgba(4, 4, 4, 0.24)",
    borderRadius: 14,
    padding: 20,
    marginVertical: 1,
    justifyContent: "center"
  },
  city: {
    fontSize: 18,
    fontFamily: "Roboto_500Medium",
    color: "#fff"
  },
  itemsList: {
    top: 80,
    width: 310,
    maxHeight: (windowHeight / 100) * 70
  }
})
