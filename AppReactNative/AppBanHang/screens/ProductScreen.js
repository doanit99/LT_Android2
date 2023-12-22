import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChevronLeftIcon } from 'react-native-heroicons/solid';
import { useNavigation } from '@react-navigation/native';
import { themeColors } from '../theme';
import StarRating from 'react-native-star-rating';

export default function ProductScreen(props) {
  const [cart, setCart] = useState([]);
  const fruit = props.route.params;
  const navigation = useNavigation();

  const addToCart = () => {
    setCart([...cart, fruit]);
    Alert.alert('Item Added', `${fruit.name} has been added to your cart.`);
    navigation.navigate('Cart'); // Navigate to the Cart screen
  };

  return (
    <View style={{ flex: 1, backgroundColor: fruit.color }}>
      <SafeAreaView>
        <View style={{ flexDirection: 'row', justifyContent: 'flex-start', marginHorizontal: 5 }}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{ backgroundColor: 'rgba(255,255,255,0.2)', borderWidth: 1, borderColor: 'gray', borderRadius: 20 }}
          >
            <ChevronLeftIcon size={30} color="white" />
          </TouchableOpacity>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            marginTop: 5,
            paddingBottom: 10,
            shadowColor: fruit.shadow,
            shadowRadius: 50,
            shadowOffset: { width: 0, height: 50 },
            shadowOpacity: 0.7,
          }}
        >
          <Image source={fruit.image} style={{ width: 290, height: 290 }} />
        </View>
      </SafeAreaView>
      <View style={{ borderTopLeftRadius: 45, borderTopRightRadius: 45, backgroundColor: '#FFEFD5', flex: 1, paddingHorizontal: 6, paddingVertical: 2 }}>
        <Text style={{ color: themeColors.text, marginTop: 20, marginLeft: 10, fontSize: 20, fontWeight: 'bold' }}>{fruit.name}</Text>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 3, marginTop: 8, marginLeft: 10 }}>
          <Text style={{ color: 'gray', fontWeight: 'bold' }}>{fruit.desc}</Text>
          <Text style={{ color: 'gray', fontWeight: 'bold' }}>
            Sold <Text style={{ color: '#333', fontWeight: 'bold' }}> 239</Text>
          </Text>
        </View>
        <StarRating
          disabled={true}
          starSize={18}
          containerStyle={{ width: 120 }}
          maxStars={5}
          rating={fruit.stars}
          emptyStarColor="lightgray"
        />
        <View style={{ height: 165 }}>
          <Text style={{ color: themeColors.text, letterSpacing: 1, paddingVertical: 3 }}>
            {/* Your long description text */}
          </Text>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <Text style={{ fontSize: 30 }}>$ {fruit.price}</Text>
          <TouchableOpacity
            onPress={addToCart}
            style={{
              backgroundColor: fruit.shadow,
              opacity: 0.6,
              shadowColor: fruit.shadow,
              shadowRadius: 25,
              shadowOffset: { width: 0, height: 15 },
              shadowOpacity: 0.5,
              padding: 10,
              marginLeft: 6,
              flex: 1,
              borderRadius: 20
            }}
          >
            <Text style={{ fontSize: 20, textAlign: 'center', color: 'white', fontWeight: 'bold' }}>
              {cart.length > 0 ? `Add to Cart (${cart.length})` : 'Add To Cart'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
