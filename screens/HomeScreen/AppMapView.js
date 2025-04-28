import React, { useContext,useEffect,useRef,useState  } from "react";
import { View, StyleSheet, Image,Text } from "react-native";
import MapView, { Marker,Polyline } from "react-native-maps";
import MapViewStyle from "../../utils/MapViewStyle.json";
import { UserLocationContext } from "../../context/UserLocationContext";
import { PROVIDER_GOOGLE } from "react-native-maps";
import Markers from "./Markers";
import MapRoute from "./MapRoute";
import polyline from "polyline";
import Colors from '../../utils/Colors.js'

const GOOGLE_MAPS_API_KEY = "apikey-Q";

const AppMapView = ({placeList,selectedPlace }) => {
  const { location } = useContext(UserLocationContext);
  const mapRef = useRef(null);
  const [routeCoordinates, setRouteCoordinates] = useState([]);
  const [distance, setDistance] = useState(null);
  const [duration, setDuration] = useState(null);

  useEffect(() => {
    if (location?.latitude && mapRef.current) {
      mapRef.current.animateToRegion(
        {
          latitude: location.latitude,
          longitude: location.longitude,
          latitudeDelta: 0.02,
          longitudeDelta: 0.02,
        },
        1000 // Animation duration
      );
    }
  }, [location]);

  useEffect(() => {
    if (selectedPlace && location) {
      fetchRoute(location, selectedPlace.location);
    }
  }, [selectedPlace]);

  
  

  const fetchRoute = async (start, end) => {
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/directions/json?origin=${start.latitude},${start.longitude}&destination=${end.latitude},${end.longitude}&mode=driving&key=${GOOGLE_MAPS_API_KEY}`
      );
  
      const data = await response.json();
  
      if (data.routes.length > 0) {
        const encodedPolyline = data.routes[0].overview_polyline.points;
        const decodedCoordinates = polyline.decode(encodedPolyline).map(([lat, lng]) => ({
          latitude: lat,
          longitude: lng,
        }));
  
        setRouteCoordinates(decodedCoordinates);
  
        const routeLeg = data.routes[0].legs[0];
        setDistance(routeLeg.distance.text);
        setDuration(routeLeg.duration.text);
      } else {
        console.warn("No route found");
      }
    } catch (error) {
      console.error("Error fetching directions:", error);
    }
  };
  

  return (
    location?.latitude && (
      <View style={styles.container}>
        {selectedPlace && distance && duration && (
          <View style={styles.infoContainer}>
            <Text style={styles.infoText}>Distance: {distance}</Text>
            <Text style={styles.infoText}>ETA: {duration}</Text>
          </View>
        )}
        <MapView
          ref={mapRef}
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          customMapStyle={MapViewStyle}
          region={{
            latitude: location.latitude || 37.7749,
            longitude: location.longitude || -122.4194,
            latitudeDelta: 0.02,
            longitudeDelta: 0.02,
          }}
          toolbarEnabled={false}
          showsMyLocationButton={false}
          
        >
          {location ? (
            <Marker
              coordinate={{
                latitude: location.latitude,
                longitude: location.longitude,
              }}
              title="You are here"
            >
              <View style={{ width: 30, height: 40 }}>
                <Image
                  source={require("./../../assets/images/car.png")}
                  style={{
                    width: "150%",
                    height: "130%",
                    resizeMode: "contain",
                  }}
                />
              </View>
            </Marker>
          ) : null}

          {routeCoordinates.length > 0 && (
            <Polyline
              coordinates={routeCoordinates}
              strokeColor={Colors.PRIMARY}
              strokeWidth={3}
            />
          )}

          {placeList &&
            placeList.map((item, index) => (
              <Markers key={index} index={index} place={item} />
            ))}
        </MapView>
        
      </View>
    )
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  infoContainer: {
    position: "absolute",
    bottom:160,
    marginLeft:20,
    backgroundColor: "white",
    padding: 8,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
    alignItems: "center",
    zIndex: 4,
  },
  infoText: {
    fontSize: 16,
    fontFamily:'outfit-regular',
    
  },
  
});

export default AppMapView;
