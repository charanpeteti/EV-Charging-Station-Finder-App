import { View, Text, FlatList, Dimensions } from "react-native";

import React, { useContext, useEffect, useRef, useState } from "react";

import PlaceItem from "./PlaceItem";

import { SelectedMarkerContext } from "../../context/SelectedMarkerContext";

import { collection, query, where, getDocs } from "firebase/firestore";

import { auth, db } from "../../utils/firebaseConfig";

export default function PlaceListView({ placeList, onNavigate,selectedPlace  }) {
  const flatListRef = useRef(null);

  const { selectedMarker, setSelectedMarker } = useContext(
    SelectedMarkerContext
  );

  const [listReady, setListReady] = useState(false);

  const [favList, setFavList] = useState([]);

  const screenWidth = Dimensions.get("window").width;

  const itemWidth = screenWidth * 0.9;

  useEffect(() => {
    if (placeList.length > 0) {
      setListReady(true);
    }
  }, [placeList]);

  useEffect(() => {
    if (listReady && selectedMarker !== null) {
      scrollToIndex(selectedMarker);
    }
  }, [selectedMarker, listReady]);

  const scrollToIndex = (index) => {
    if (index < 0 || index >= placeList.length) return; // Prevent errors

    flatListRef.current?.scrollToIndex({
      animated: true,

      index,
    });
  };

  const getItemLayout = (_, index) => ({
    length: screenWidth,

    offset: screenWidth * index,

    index,
  });

  const user = auth.currentUser;

  useEffect(() => {
    user && getFav();
  }, [user]);

  const getFav = async () => {
    if (!user) return;

    try {
      const q = query(
        collection(db, "ev-fav-place"),

        where("email", "==", user.email) // Ensure you're using the correct email property
      );

      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        console.log("No favorite places found for this user.");

        return;
      }

      querySnapshot.forEach((doc) => {
        console.log("Favorite Place:", doc.id, "=>", doc.data());

        setFavList((favList) => [...favList, doc.data()]);
      });
    } catch (error) {
      console.error("Error fetching favorite places:", error.message);
    }
  };
  
  return (
    <View style={{ width: screenWidth, alignItems: "center" }}>
      <FlatList
        removeClippedSubviews={true}
        ref={flatListRef}
        data={placeList}
        horizontal
        pagingEnabled={false}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item, index) => index.toString()}
        getItemLayout={getItemLayout}
        snapToAlignment="center"
        snapToInterval={itemWidth}
        decelerationRate="fast"
        renderItem={({ item }) => (
          <View style={{ width: screenWidth, alignItems: "center" }}>
            <PlaceItem place={item} onNavigate={onNavigate} />
          </View>
        )}
      />
    </View>
  );
}
