import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import Colors from '../../utils/Colors';
import { auth } from '../../utils/firebaseConfig';


export default function Login({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false); 
  const [loading, setLoading] = useState(false);

  const handleAuth = async () => {
    setLoading(true);
    try {
      let userCredential;

      if (isSignUp) {
        userCredential = await createUserWithEmailAndPassword(auth, email, password);
        Alert.alert("Success", "Signed up successfully!");
      } else {
        userCredential = await signInWithEmailAndPassword(auth, email, password);
        // Alert.alert("Success", "Logged in successfully!");
      }

      navigation.navigate('TabNavigation'); // Navigate after successful auth

    } catch (error) {
      // console.error("Authentication Error:", error); 

      let errorMessage = "An error occurred. Please try again."; // Default message

      switch (error.code) {
        case 'auth/invalid-email':
          errorMessage = "Invalid email address.";
          break;
        case 'auth/user-not-found':
        case 'auth/wrong-password':
          errorMessage = "Invalid email or password."; // Combined for UX
          break;
        case 'auth/email-already-in-use':
          errorMessage = "Email address is already in use.";
          break;
        case 'auth/weak-password':
          errorMessage = "The password is too weak.";
          break;
        case 'auth/invalid-credential': // Handle the specific error
          errorMessage = "Invalid credentials. Please check your email and password.";
          break;
        // ... other error cases as needed
        default:
          console.error("Full Error:", error); // Keep this for development debugging
          // In production, you might want to log this to a crash reporting service
          // but *don't* show the raw error to the user.
          break;
      }

      Alert.alert("Error", errorMessage); // Display the error message in an Alert
    } finally {
      setLoading(false);
    }
  };

  const toggleAuthMode = () => {
    setIsSignUp(!isSignUp);
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      padding: 20,
      backgroundColor: Colors.WHITE,
    },
    input: {
      height: 40,
      borderColor: 'gray',
      borderWidth: 1,
      marginBottom: 10,
      paddingHorizontal: 10,
    },
    button: {
      backgroundColor: Colors.PRIMARY,
      padding: 16,
      borderRadius: 50,
      width: '100%',
      alignItems: 'center',
      justifyContent: 'center',
    },
    buttonText: {
      color: Colors.WHITE,
      fontFamily: 'outfit-medium', // Replace with your font family
      fontSize: 16,
    },
    toggleButton: {  // Style for the "Sign Up/Login" toggle button
      marginTop: 10,
      alignItems: 'center',
    },
    toggleButtonText: {
      color: Colors.PRIMARY, // Or any other suitable color
      textDecorationLine: 'underline',
    },
  });

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <TouchableOpacity style={styles.button} onPress={handleAuth} disabled={loading}>
        {loading ? (
          <ActivityIndicator color={Colors.WHITE} />
        ) : (
          <Text style={styles.buttonText}>{isSignUp ? "Sign Up" : "Login"}</Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity style={styles.toggleButton} onPress={toggleAuthMode}>
        <Text style={styles.toggleButtonText}>
          {isSignUp ? "Already have an account? Login" : "Don't have an account? Sign Up"}
        </Text>
      </TouchableOpacity>
    </View>
  );
}