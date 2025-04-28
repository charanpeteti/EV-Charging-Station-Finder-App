import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Alert, StyleSheet, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getAuth, signOut, onAuthStateChanged } from "firebase/auth";
import Ionicons from '@expo/vector-icons/Ionicons';
import { LinearGradient } from "expo-linear-gradient";
import Colors from '../../utils/Colors';

export default function ProfileScreen() {
    const navigation = useNavigation();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    
    const auth = getAuth();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (authUser) => {  
            setUser(authUser);
            setLoading(false); 
        });

        return () => unsubscribe();
    }, []);

    const handleLogout = async () => {
        signOut(auth).then(() => {
          Alert.alert("Success", "Signed out successfully!");
          navigation.navigate("LoginScreen")
        }).catch((error) => {
          console.error("Authentication Error:", error); 
        })
    };

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color={Colors.PRIMARY} />
            </View>
        );
    }

    return (
        <LinearGradient colors={["#0BC224", "#087F19"]} style={styles.container}>
            <View style={styles.profileCard}>
                <Ionicons name="person-circle-outline" size={80} color={Colors.PRIMARY} />
                <Text style={styles.title}>Hello,</Text>
                <Text style={styles.email}>{user?.email || "No User Logged In"}</Text>
            </View>

            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("Favorite")}>
                <Ionicons name="heart" size={22} color={Colors.WHITE} />
                <Text style={styles.buttonText}>My Favorites</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.button, styles.logoutButton]} onPress={handleLogout}>
                <Ionicons name="log-out-outline" size={22} color={Colors.WHITE} />
                <Text style={styles.buttonText}>Logout</Text>
            </TouchableOpacity>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    profileCard: {
        backgroundColor: Colors.WHITE,
        padding: 25,
        borderRadius: 15,
        alignItems: "center",
        width: "90%",
        shadowColor: Colors.BLACK,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 6,
        elevation: 5,
        marginBottom: 30,
    },
    title: {
        fontSize: 22,
        fontFamily: "outfit-bold",
        color: Colors.BLACK,
        marginTop: 10,
    },
    email: {
        fontSize: 16,
        fontFamily: "outfit",
        color: Colors.GRAY,
        marginTop: 5,
    },
    button: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: Colors.PRIMARY,
        paddingVertical: 14,
        paddingHorizontal: 25,
        borderRadius: 30,
        shadowColor: Colors.BLACK,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 5,
        width: "80%",
        marginBottom: 15,
    },
    logoutButton: {
        backgroundColor: "#D32F2F",
    },
    buttonText: {
        color: Colors.WHITE,
        fontSize: 16,
        fontFamily: "outfit-medium",
        marginLeft: 10,
    },
});
