import React from "react";
import MapViewDirections from "react-native-maps-directions";

const GOOGLE_MAPS_API_KEY = "apikey-Q"; 

const MapRoute = ({ origin, destination }) => {
  if (!origin || !destination) return null;

  return (
    <MapViewDirections
      origin={{
        latitude: origin.latitude,
        longitude: origin.longitude,
      }}
      destination={{
        latitude: destination.latitude,
        longitude: destination.longitude,
      }}
      apikey={GOOGLE_MAPS_API_KEY}
      strokeWidth={4}
      strokeColor="blue"
    />
  );
};

export default MapRoute;
