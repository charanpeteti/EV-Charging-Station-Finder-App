import { View, Text, Image } from "react-native";
import React, { useContext } from "react";
import { Marker } from "react-native-maps";
import { SelectedMarkerContext } from "../../context/SelectedMarkerContext";

export default function Markers({ index, place }) {
  const { selectedMarker, setSelectedMarker } = useContext(SelectedMarkerContext);
  const isSelected = selectedMarker === index;

  return (
    place && (
      <Marker
        coordinate={{
          latitude: place.location.latitude,
          longitude: place.location.longitude,
        }}
        onPress={() => setSelectedMarker(index)}
      >
        <View style={{ width: 30, height: 30 }}>
          <Image
            source={
              isSelected
                ? require("./../../assets/images/SelectedMarker.png")
                : require("./../../assets/images/marker.png")
            }
            style={{
              width: isSelected ? '180%' : '150%', // Slightly larger icon for selected
              height: isSelected ? '180%' : '130%',
              resizeMode: 'contain',
            }}
          />
        </View>
      </Marker>
    )
  );
}
