import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChevronLeftIcon, MinusIcon, PlusIcon, TrashIcon } from 'react-native-heroicons/solid';
import { themeColors } from '../theme';

export default function CartScreen({ route, navigation }) {
  const { cart: initialCart, setCart } = route.params;
  const [cart, setLocalCart] = useState(initialCart);
  const [totalPrice, setTotalPrice] = useState(0);


  useEffect(() => {
    const calculateTotalPrice = () => {
      const total = cart.reduce((accumulator, item) => accumulator + item.price * item.quantity, 0);
      setTotalPrice(total);
    };
    calculateTotalPrice();
  }, [cart]);

  const updateQuantity = (itemId, newQuantity) => {
    // Kiểm tra nếu newQuantity không âm
    if (newQuantity >= 0) {
      const updatedCart = cart.map(item => {
        if (item.id === itemId) {
          return { ...item, quantity: newQuantity };
        }
        return item;
      });
  
      setLocalCart(updatedCart);
      setCart(updatedCart);
    }
  };


  const removeItemFromCart = (itemId) => {
    // Filter out the item with the specified itemId
    const updatedCart = cart.filter(item => item.id !== itemId);

    // Update the local cart state
    setLocalCart(updatedCart);

    // Update the global cart state
    setCart(updatedCart);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', margin: 16 }}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{
            backgroundColor: themeColors.primary,
            padding: 10,
            borderRadius: 10,
            marginRight: 10,
          }}
        >
          <ChevronLeftIcon size={30} color="white" />
        </TouchableOpacity>
        <Text style={{ fontSize: 30, fontWeight: 'bold', color: themeColors.text }}>Shopping Cart</Text>
        <View style={{ width: 30 }} />
      </View>
      <FlatList
          data={cart || []}  // Bảo vệ trước khi sử dụng cart
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
          <View style={{
            flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 16, backgroundColor: 'lightgray',
            marginBottom: 10, borderRadius: 10
          }}>
            <Text style={{ fontSize: 18 }}>{item.name}</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <TouchableOpacity
                onPress={() => updateQuantity(item.id, item.quantity - 1)}
                style={{ paddingLeft: 8, paddingRight: 8, paddingBottom: 5, paddingTop: 5, borderRadius: 5, backgroundColor: themeColors.primary }}
              >
                <Text style={{ color: 'white', fontSize: 18 }}>-</Text>
              </TouchableOpacity>

              <Text style={{ fontSize: 18, marginHorizontal: 8 }}>{item.quantity}</Text>

              <TouchableOpacity
                onPress={() => updateQuantity(item.id, item.quantity + 1)}
                style={{ padding: 5, borderRadius: 5, backgroundColor: themeColors.primary }}
              >
                <Text style={{ color: 'white', fontSize: 18 }}>+</Text>
              </TouchableOpacity>

            </View>
            <Text style={{ fontSize: 18 }}>${item.price * item.quantity}</Text>
            <TouchableOpacity onPress={() => removeItemFromCart(item.id)}>
              <TrashIcon size={24} color="red" />
            </TouchableOpacity>
          </View>
        )}
      />
      <View style={{ padding: 16, borderTopWidth: 1, borderColor: 'lightgray', marginTop: 'auto' }}>
        <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 10 }}>Total: ${totalPrice}</Text>
        <TouchableOpacity
          onPress={() => navigation.navigate('PaymentScreen', { total: totalPrice })}
          style={{
            backgroundColor: themeColors.primary,
            padding: 16,
            borderRadius: 10,
            alignItems: 'center',
            marginTop: 10,
          }}
        >
          <Text style={{ fontSize: 20, color: 'white', fontWeight: 'bold' }}>Checkout</Text>
        </TouchableOpacity>

      </View>
    </SafeAreaView>
  );
}
