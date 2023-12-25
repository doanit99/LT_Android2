import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChevronLeftIcon, ShoppingCartIcon } from 'react-native-heroicons/solid';
import { useNavigation } from '@react-navigation/native';
import { themeColors } from '../theme';
import StarRating from 'react-native-star-rating';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ProductScreen(props) {
  const [cart, setCart] = useState([]);
  const fruit = props.route.params;
  const navigation = useNavigation();

  // Load giỏ hàng từ AsyncStorage khi component được tạo
  useEffect(() => {
    const loadCart = async () => {
      try {
        const storedCart = await AsyncStorage.getItem('cart');
        if (storedCart) {
          setCart(JSON.parse(storedCart));
        }
      } catch (error) {
        console.error('Error loading cart from AsyncStorage:', error);
      }
    };

    loadCart();
  }, []);

  // Lưu giỏ hàng vào AsyncStorage mỗi khi giỏ hàng thay đổi
  useEffect(() => {
    const saveCart = async () => {
      try {
        await AsyncStorage.setItem('cart', JSON.stringify(cart));
      } catch (error) {
        console.error('Error saving cart to AsyncStorage:', error);
      }
    };

    saveCart();
  }, [cart]);

  const showAddToCartAlert = () => {
    Alert.alert('Item Added', `${fruit.name} has been added to your cart.`);
  };

  const addToCart = () => {
    const existingItemIndex = cart.findIndex((item) => item.id === fruit.id);

    if (existingItemIndex !== -1) {
      // Nếu sản phẩm đã tồn tại trong giỏ hàng, tăng số lượng
      const updatedCart = [...cart];
      updatedCart[existingItemIndex].quantity += 1;
      setCart(updatedCart);
    } else {
      // Nếu sản phẩm chưa tồn tại trong giỏ hàng, thêm mới
      setCart([...cart, { ...fruit, quantity: 1 }]);
    }

    showAddToCartAlert();

  };
  const navigateToCart = () => {
    navigation.navigate('Cart', { cart: cart });
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
        <Text style={{ fontSize: 30, fontWeight: 'bold', color: themeColors.text }}>{fruit.name}</Text>
        <TouchableOpacity onPress={navigateToCart} style={{ padding: 10 }}>
          
          <ShoppingCartIcon size="25" color="orange" />
        </TouchableOpacity>
      </View>
      <View style={{ alignItems: 'center', shadowRadius: 10, shadowOffset: { width: 0, height: 5 }, shadowOpacity: 0.3 }}>
        <Image source={{ uri: 'http://192.168.43.149:8081/images/' + fruit.image }} style={{ width: 290, height: 290 }} />
      </View>
      <View style={{ flex: 1, backgroundColor: '#C8E6C9', borderTopLeftRadius: 45, borderTopRightRadius: 45, padding: 16 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 }}>
          <Text style={{ color: 'gray', fontWeight: 'bold' }}>Số lượng: {fruit.qty}</Text>
          <StarRating disabled={true} starSize={18} containerStyle={{ width: 120 }} maxStars={5} rating={5}
            fullStarColor="#FFA500" emptyStarColor="lightgray" />
        </View>
        <Text style={{ color: themeColors.text, fontSize: 16 }}>{fruit.detail}</Text>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', marginTop: 20, marginBottom: 20 }}>
          <Text style={{ fontSize: 30, fontWeight: 'bold' }}>$ {fruit.price}</Text>
          <TouchableOpacity
            onPress={addToCart}
            style={{
              backgroundColor: 'pink',
              marginLeft: 15,
              padding: 16,
              borderRadius: 20,
              shadowRadius: 10,
              shadowOffset: { width: 0, height: 5 },
              shadowOpacity: 0.3,
              flex: 1,
            }}

          >
            <Text style={{ fontSize: 20, color: 'white', fontWeight: 'bold', textAlign: 'center' }}>
              Add To Cart
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
