import { View, Text, Image, Dimensions, Pressable, ToastAndroid } from "react-native";
import React,{ useState,useEffect }  from "react";
import Colors from "../../utils/Colors";
import GlobalApi from "../../utils/GlobalApi";
import { LinearGradient } from "expo-linear-gradient";
import Ionicons from '@expo/vector-icons/Ionicons';
import { db } from "../../utils/firebaseConfig";
import { doc,setDoc,getDoc,deleteDoc } from "firebase/firestore";
import { auth } from "../../utils/firebaseConfig";


export default function PlaceItem({ place,onNavigate }) {
  const PLACE_PHOTO_BASE_URL = "https://places.googleapis.com/v1/";
  const [isFavorite, setIsFavorite] = useState(false);
  const user = auth.currentUser;
  

  useEffect(() => {
    if (!user) return;
    const favDocRef = doc(db, "ev-fav-place", `${user?.uid}_${place.id}`);

    const checkFavoriteStatus = async () => {
      try {
        const docSnap = await getDoc(favDocRef);
        setIsFavorite(docSnap.exists()); // Update state based on Firestore
      } catch (error) {
        console.error("Error fetching favorite status:", error);
      }
    };

    checkFavoriteStatus();
  }, [user, place.id])



  const onSetFav = async () => {
    if (!user) return;
    const favDocRef = doc(db, "ev-fav-place", `${user.uid}_${place.id}`);

    try {
      if (isFavorite) {  
        await deleteDoc(favDocRef)
        setIsFavorite(false);
        ToastAndroid.show("Removed from Favorites!", ToastAndroid.SHORT);
      }else {  
        await setDoc(favDocRef,{
          userId: user.uid,
          email: user.email,
          place: place, 
        })
        setIsFavorite(true);
        ToastAndroid.show("Added to Favorites!", ToastAndroid.SHORT);
      }
    } catch (error) {
      console.error("Error updating favorite:", error);
      ToastAndroid.show("Failed to update favorite!", ToastAndroid.SHORT);
    }
  };
  
  // const onNavigatePress = () => {
  //   if (!place?.location?.latitude || !place?.location?.longitude) {
  //     ToastAndroid.show("Location not available!", ToastAndroid.SHORT);
  //     return;
  //   }
  
  //   const latitude = place.location.latitude;
  //   const longitude = place.location.longitude;
  
  //   const url = https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}&travelmode=driving;
  
  //   Linking.openURL(url).catch((err) =>
  //     console.error("Error opening Google Maps:", err)
  //   );
  // };
  
  return (
    <View
      style={{
        backgroundColor: Colors.WHITE,
        margin: 5,
        borderRadius: 10,
        width: Dimensions.get("window").width * 0.9,
        overflow: "hidden",
      }}
    >
      <LinearGradient colors={["transparent", "#0BC224"]}>
        <Pressable
          style={{ position: "absolute", right: 0, margin: 5 }}
          onPress={() => onSetFav(place)}
        >
          <Ionicons
            name={isFavorite ? "heart" : "heart-outline"}
            size={24}
            color={Colors.PRIMARY}
          />
        </Pressable>

        {/* {console.log("Image URL:", PLACE_PHOTO_BASE_URL + place?.photos?.[0]?.name + "media?key=" + GlobalApi.API_KEY)} */}
        {/* <Image
          source={
            place?.photos
              ? {
                  uri:
                    PLACE_PHOTO_BASE_URL +
                    place?.photos[0]?.name +
                    "media?key=" +
                    GlobalApi?.API_KEY +
                    "&maxHeightPx=800&maxWidthPx=1200",
                }
              : require("./../../assets/images/ev-station.png")
          }
          style={{ width: "100%", borderRadius: 10, height: 180, zIndex: -1 }}
        /> */}
        <View style={{ padding: 15 }}>
          <Text
            numberOfLines={1}
            style={{
              fontSize: 23,
              fontFamily: "outfit-medium",
            }}
          >
            {place.displayName.text}
          </Text>
          <Text
            numberOfLines={1}
            style={{
              color: Colors.WHITE,
              fontFamily: "outfit",
            }}
          >
            {place?.shortFormattedAddress}
          </Text>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              marginTop: 10,
            }}
          >
            <View style={{ flexDirection: "column", alignItems: "center" }}>
              <Text
                style={{
                  fontFamily: "outfit",
                  color: Colors.WHITE,
                  fontSize: 17,
                }}
              >
                Connectors
              </Text>
              <Text
                style={{
                  fontFamily: "outfit-medium",
                  fontSize: 20,
                  marginTop: 2,
                }}
              >
                {place?.evChargeOptions?.connectorCount} Points
              </Text>
            </View>
            <Pressable
              style={{
                padding: 5,
                backgroundColor: Colors.WHITE,
                borderRadius: 29,
                paddingHorizontal: 5,
              }}
              onPress={() => onNavigate(place)} // Call navigation function on press
            >
              <Ionicons
                name="navigate-circle-outline"
                size={22}
                color={Colors.PRIMARY}
              />
            </Pressable>
          </View>
        </View>
      </LinearGradient>
    </View>
  );
}