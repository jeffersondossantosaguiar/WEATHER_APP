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

import axios from "axios"

const windowHeight = Dimensions.get('window').height;

const Item = ({ city,  administrativeArea, country}) => (
  <View style={styles.item}>
    <Text style={styles.city} onPress={() => console.log({city, administrativeArea})}>{city}, {administrativeArea} - {country}</Text>
  </View>
)

export default function WeatherCitySearch() {

  const [cityArray, setCityArray] = useState(null);
  const renderItem = ({ item }) => (
    <Item city={item.LocalizedName} administrativeArea={item.AdministrativeArea.ID} country={item.Country.ID} />
  );
  
  function fetchCity(e) {
    axios
      .get(
        `http://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=mWTxlMXwduK0k1GW5G20lzLbuZmRobic&q=${e}&language=pt-BR`
      )
      .then(function (response) {
        setCityArray(response.data)
        console.log(cityArray)
      })
      .catch(function (error) {
        console.log(error)
      })
  }
  return (
    <View style={styles.container}>
      <ImageBackground source={require('../../assets/bkg.jpg')} style={styles.imageBackground}>
        <TextInput
          placeholder="Buscar Cidade"
          placeholderTextColor="#FFF"
          onChangeText={(e) => fetchCity(e)}
          style={styles.textInputSearchCity}
        />
        <FlatList
        data={cityArray}
        renderItem={renderItem}
        keyExtractor={item => item.Key}
        style={styles.itemsList}
        />
        <StatusBar style="auto" />
      </ImageBackground>
    </View>
  ) 
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    alignItems: "center",
  },
  item: {
    height: 50,
    width: 'auto',
    backgroundColor: "rgba(4, 4, 4, 0.24)",
    borderRadius: 14,
    padding: 20,
    marginVertical: 1,
    justifyContent: 'center'
  },
  city: {
    fontSize: 18,
    fontFamily: "Roboto_500Medium",
    color: '#fff'
  },
  itemsList: {
    top: 80,
    width: 310,
    maxHeight: (windowHeight / 100) * 70
  }
})