import React, { useContext, useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import AppMapView from "./AppMapView";
import Header from "./Header";
import SearchBar from "./SearchBar";
import { UserLocationContext } from "../../context/UserLocationContext";
import GlobalApi from "../../utils/GlobalApi";
import PlaceListView from "./PlaceListView";
import { SelectedMarkerContext } from "../../context/SelectedMarkerContext";

export default function HomeScreen({ navigation  }) {

  const {location,setLocation} = useContext(UserLocationContext);
  const [placeList,setPlaceList] = useState([]);
  const [selectedMarker,setSelectedMarker] =useState([]);
  const [selectedPlace, setSelectedPlace] = useState(null);

  useEffect(() => {
    if (location?.latitude) {
      GetNearByPlace();
    }
  }, [location]);

  const GetNearByPlace=()=>{
    if (!location?.latitude || !location?.longitude) return;

    const data = {
      includedTypes: ["electric_vehicle_charging_station"],
      maxResultCount: 10,
      locationRestriction: {
        circle: {
          center: {
            latitude: location.latitude,
            longitude: location.longitude,
          },
          radius: 5000.0,
        },
      },
    };
    GlobalApi.NewNearByPlace(data).then((resp) => {
      if (resp.data?.places?.length) {
        setPlaceList(resp.data.places);
      } else {
        console.log("No places found:", resp.data);
      }
    });
  };

  return (
    <SelectedMarkerContext.Provider value={{selectedMarker,setSelectedMarker}}>
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Header/>
        <SearchBar 
          searchedLocation={(newLocation) => {
            console.log("Setting Location:", newLocation); 
            setLocation(newLocation); 
          }}
        />
      </View>
      {placeList&&<AppMapView placeList={placeList} selectedPlace={selectedPlace}/>}
      <View style={styles.placeListContainer}>
        {placeList&&<PlaceListView placeList={placeList} onNavigate={setSelectedPlace}/>}
      </View>
    </View>
    </SelectedMarkerContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, // Ensure it takes full screen
  },
  headerContainer: {
    position: "absolute",
    zIndex:10,
    padding:25,
    width:'100%',
    paddingHorizontal:20
  },
  placeListContainer:{
    position:"absolute",
    bottom:0,
    zIndex:10,
    width:'100%'
  },
});
