import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { IMAGE_URL } from '../api';

export default function FruitCard({ fruit }) {
    const navigation = useNavigation();
    const goToDetail = () => {
        navigation.navigate('Product', { ...fruit})
      };
  return (
    <TouchableOpacity onPress={goToDetail}>
    <View style={styles.cardContainer}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: `${IMAGE_URL}` + fruit.image }} style={styles.cardImage} />
      </View>

      <View style={styles.textContainer}>
        <Text style={styles.cardTitle}>{fruit.name}</Text>
        <Text style={styles.cardPrice}>$ {fruit.price}</Text>
      </View>
    </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    width: 270,
    borderRadius: 20,
    marginLeft: 20,
    backgroundColor: '#fff', // Set your desired background color
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    marginBottom: 20,
  },
  imageContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  cardImage: {
    width: 210,
    height: 210,
    borderRadius: 20,
  },
  textContainer: {
    marginLeft: 20,
    marginTop: 10,
    marginBottom: 10,
  },
  cardTitle: {
    fontWeight: 'bold',
    fontSize: 20,
    color: '#333', // Set your desired text color
  },
  cardPrice: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#555', // Set your desired text color
  },
});
