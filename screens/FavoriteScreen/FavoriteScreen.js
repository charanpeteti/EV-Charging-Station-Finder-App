import { View, Text, ActivityIndicator, FlatList, StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
import Colors from '../../utils/Colors';
import { auth, db } from "../../utils/firebaseConfig";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import PlaceItem from '../HomeScreen/PlaceItem';

export default function FavoriteScreen() {
  const [favList, setFavList] = useState([]);
  const [loading, setLoading] = useState(true);
  const user = auth.currentUser;

  useEffect(() => {
    if (user) {
      const q = query(
        collection(db, "ev-fav-place"),
        where("email", "==", user.email)
      );

      // Subscribe to real-time updates
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        if (querySnapshot.empty) {
          console.log("No favorite places found.");
          setFavList([]);
        } else {
          const documentsArray = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setFavList(documentsArray);
        }
        setLoading(false);
      });

      return () => unsubscribe(); // Cleanup listener on unmount
    }
  }, [user]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Favorite Places</Text>
      {loading ? (
        <ActivityIndicator size="large" color={Colors.PRIMARY} />
      ) : favList.length === 0 ? (
        <Text style={styles.emptyText}>No favorite places selected.</Text>
      ) : (
        <FlatList
          showsVerticalScrollIndicator={false}
          data={favList}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <PlaceItem place={item.place} />
            </View>
          )}
          contentContainerStyle={styles.listContainer}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F8F8",
    paddingHorizontal: 15,
    paddingTop: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: Colors.PRIMARY,
    textAlign: "center",
    marginBottom: 15,
  },
  // listContainer: {
  //   paddingBottom: 20,
  // },
  // emptyText: {
  //   fontSize: 16,
  //   color: "#888",
  //   textAlign: "center",
  //   marginTop: 20,
  // },
  // card: {
  //   backgroundColor: "white",
  //   padding: 15,
  //   marginBottom: 10,
  //   borderRadius: 10,
  //   shadowColor: "#000",
  //   shadowOffset: { width: 0, height: 2 },
  //   shadowOpacity: 0.1,
  //   shadowRadius: 5,
  //   elevation: 3,
  // },
});
