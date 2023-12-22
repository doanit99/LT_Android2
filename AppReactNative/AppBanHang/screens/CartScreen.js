import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChevronLeftIcon } from 'react-native-heroicons/solid';
import { useNavigation } from '@react-navigation/native';
import { themeColors } from '../theme';
import FruitCardCart from '../components/fruitCardCart';
import { cartItems } from '../constants';

export default function CartScreen() {
  const navigation = useNavigation();
  const [cart, setCart] = useState([]);

  const handleAddToCart = (product) => {
    addToCart(product);
  };
  

  return (
    <SafeAreaView style={{ flex: 1, justifyContent: 'space-between', backgroundColor: '#FFF9C4' }}>
      <View style={{ flexDirection: 'row', justifyContent: 'flex-start', marginHorizontal: 5 }}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={{ borderWidth: 1, borderColor: '#ccc', borderRadius: 20 }}>
          <ChevronLeftIcon size={30} color="gray" />
        </TouchableOpacity>
      </View>

      <View style={{ flex: 1, marginHorizontal: 5 }}>
        <Text style={{ color: themeColors.text, fontSize: 20, paddingTop: 40 }}>Your <Text style={{ fontWeight: 'bold' }}>cart</Text></Text>
        <View>
          {cart.map((item, index) => (
            <FruitCardCart fruit={item} key={index} />
          ))}
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'flex-end', paddingVertical: 16 }}>
          <Text style={{ fontSize: 18 }}>Total price: <Text style={{ fontWeight: 'bold', color: '#FFC107' }}>
            {cart.reduce((total, item) => total + item.price, 0).toFixed(2)}
          </Text></Text>
        </View>
      </View>

      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginHorizontal: 7 }}>
        <TouchableOpacity
          onPress={() => navigation.navigate('Payment')} // Assuming there's a 'Payment' screen
          style={{
            backgroundColor: 'orange',
            opacity: 0.8,
            shadowColor: 'orange',
            shadowRadius: 25,
            shadowOffset: { width: 0, height: 15 },
            shadowOpacity: 0.4,
            padding: 12,
            flex: 1,
            borderRadius: 20,
          }}
        >
          <Text style={{ fontSize: 20, textAlign: 'center', color: 'white', fontWeight: 'bold' }}>Payment</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
