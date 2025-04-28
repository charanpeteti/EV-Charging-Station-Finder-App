import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import Colors from '../../utils/Colors'

export default function LoginScreen({ navigation }) {
  const onPress = () => {
    navigation.navigate('Login');
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: Colors.WHITE,
    },
    heading: {
      fontSize: 24,
      fontFamily: 'outfit-bold', 
      textAlign: 'center',
      marginBottom: 20,
      color: Colors.BLACK,
    },
    description: {
      fontSize: 16,
      fontFamily: 'outfit', 
      textAlign: 'center',
      marginBottom: 40,
      color: Colors.GRAY,
    },
    button: {
      backgroundColor: Colors.PRIMARY,
      padding: 16,
      borderRadius: 50,
      alignItems: 'center',
      justifyContent: 'center',
    },
    buttonText: {
      color: Colors.WHITE,
      fontFamily: 'outfit-medium',  
      fontSize: 16,
      
    },
    logoImage: {
      width: 150,
      height: 80,
      resizeMode: 'contain',
      marginBottom: 20,
    },
    bgImage: {
      width: '100%',
      height: 220,
      resizeMode: 'cover',
      marginBottom: 20,
    },
  });

  return (
    <View style={styles.container}>
      <Image style={styles.logoImage} source={require('../../assets/images/logo.png')} />
      <Image style={styles.bgImage} source={require('../../assets/images/ev-station.png')} />
      <View style={{ padding: 20 }}>
        <Text style={styles.heading}>Your Ultimate EV Charging Station Finder App</Text>
        <Text style={styles.description}>Find EV charging stations near you, plan trips, and more in just one click</Text>
        <TouchableOpacity style={styles.button} onPress={onPress}>
          <Text style={styles.buttonText}>Continue</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
