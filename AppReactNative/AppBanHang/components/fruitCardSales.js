import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'

export default function FruitCardSales({ fruit }) {
  const navigation = useNavigation();
  return (
    <View style={{ marginRight: 6 }}>
      <TouchableOpacity
        onPress={() => navigation.navigate('Product', { ...fruit, color: fruit.color(1) })}
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          marginBottom: -39,
          shadowColor: fruit.shadow,
          shadowRadius: 15,
          shadowOpacity: 0.4,
          
        }}
      >
        <Image
          source={fruit.image}
          style={{
            height: 65,
            width: 65,
          }}
        />
      </TouchableOpacity>

      <View
        style={{
          backgroundColor: fruit.color(0.4),
          height: 75,
          width: 80,
          borderRadius: 20,
          justifyContent: 'flex-end',
          alignItems: 'center',
        }}
      >
        <Text style={{ fontWeight: 'bold', textAlign: 'center', color: '#333', paddingBottom: 3 }}>
          $ {fruit.price}
        </Text>
      </View>
    </View>
  )
}