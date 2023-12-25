import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChevronLeftIcon, TrashIcon } from 'react-native-heroicons/solid';
import { themeColors } from '../theme';

export default function CartScreen({ route, navigation }) {
  const { cart } = route.params;
  const [totalPrice, setTotalPrice] = useState(0);

  // Tính tổng giá trị của giỏ hàng mỗi khi giỏ hàng thay đổi
  useEffect(() => {
    const calculateTotalPrice = () => {
      const total = cart.reduce((accumulator, item) => {
        return accumulator + item.price * item.quantity;
      }, 0);
      setTotalPrice(total);
    };

    calculateTotalPrice();
  }, [cart]);

  const handleRemoveItem = (itemId) => {
    const updatedCart = cart.filter(item => item.id !== itemId);
    route.params.updateCart(updatedCart);
  };
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', margin: 16 }}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{
            backgroundColor: 'gray',
            borderWidth: 1,
            borderColor: 'gray',
            borderRadius: 20,
            padding: 10,
          }}
        >
          <ChevronLeftIcon size={30} color="white" />
        </TouchableOpacity>
        <Text style={{ fontSize: 30, fontWeight: 'bold', color: themeColors.text }}>Shopping Cart</Text>
        <View style={{ width: 30 }} />
      </View>
      <FlatList
        data={cart}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 16 }}>
            <Text style={{ fontSize: 18 }}>{item.name}</Text>
            <Text style={{ fontSize: 18 }}>Quantity: {item.quantity}</Text>
            <Text style={{ fontSize: 18 }}>${item.price * item.quantity}</Text>
            <TouchableOpacity onPress={() => handleRemoveItem(item.id)}>
              <TrashIcon size={24} color="red" />
            </TouchableOpacity>
          </View>
        )}
      />
      <View style={{ padding: 16, borderTopWidth: 1, borderColor: 'lightgray', marginTop: 'auto' }}>
        <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 10 }}>Total: ${totalPrice}</Text>
        <TouchableOpacity
          onPress={() => {
            // Xử lý khi người dùng nhấn nút Checkout
            // (chẳng hạn, chuyển đến màn hình thanh toán)
          }}
          style={{
            backgroundColor: themeColors.primary,
            padding: 16,
            borderRadius: 20,
            alignItems: 'center',
          }}
        >
          <Text style={{ fontSize: 20, color: 'white', fontWeight: 'bold' }}>Checkout</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
