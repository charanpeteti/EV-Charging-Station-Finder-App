import { View, Text, StyleSheet,TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import Colors from '../../utils/Colors';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faChargingStation } from '@fortawesome/free-solid-svg-icons';
import { faFilter } from '@fortawesome/free-solid-svg-icons';
import { useNavigation } from '@react-navigation/native';


export default function Header() {
  const [userEmail, setUserEmail] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user && user.email) {
        setUserEmail(user.email);
      } else {
        setUserEmail(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const firstLetter = userEmail ? userEmail.charAt(0).toUpperCase() : '?';

  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{firstLetter}</Text>
        </View>
      </TouchableOpacity>
      <View style={styles.logo}>
        <Text style={{ fontFamily: "outfit-bold", fontSize: 24 }}>EV</Text>
        <FontAwesomeIcon
          icon={faChargingStation}
          size={24}
          color={Colors.PRIMARY}
        />
        <Text style={{ fontFamily: "outfit-bold", fontSize: 24 }}>STATION</Text>
      </View>
      <FontAwesomeIcon icon={faFilter} size={18} />
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 14,
    paddingTop:6,
    paddingBottom:9,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.PRIMARY,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  logo:{
    flexDirection:'row',
    justifyContent:'center',
    alignItems: 'center'
  }
});
