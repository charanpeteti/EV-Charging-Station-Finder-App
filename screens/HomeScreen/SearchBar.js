import { View, Text } from 'react-native'
import React from 'react'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'
import 'react-native-get-random-values'
import Colors from '../../utils/Colors'
import { Ionicons } from '@expo/vector-icons'

export default function SearchBar({searchedLocation}) {
    
  return (
    <View style ={{
        display:'flex',
        flexDirection:'row',
        paddingHorizontal:5,
        backgroundColor: Colors.WHITE,
        borderRadius:6
    }}>
        <Ionicons name="location-sharp" size={24}
        color={Colors.GRAY} style={{paddingTop:10}}/>
      <GooglePlacesAutocomplete
      placeholder='Search Station'
      fetchDetails={true}
      enablePoweredByContainer={false}
      onPress={(data, details = null) => {
        if (details) {
          const newLocation = {
            latitude: details.geometry.location.lat,
            longitude: details.geometry.location.lng,
          };
          console.log("New Location Selected:", newLocation);
          searchedLocation(newLocation);
        }
      }}
      query={{
        key: 'AIzaSyAJFnHpRm1b8iokILIejr9z1OngyNbiE-Q',
        language: 'en',
      }}
    />
    </View>
  )
}