import React, { useState } from "react"

import Routes from "./src/routes"

import { useFonts } from "expo-font"
import { Roboto_500Medium, Roboto_700Bold } from "@expo-google-fonts/roboto"
import { AppLoading } from "expo"

export default function App() {
  const [fontsLoaded] = useFonts({
    Roboto_500Medium,
    Roboto_700Bold
  })

  if (!fontsLoaded) {
    return <AppLoading />
  } else {
    return <Routes />
  }
}
