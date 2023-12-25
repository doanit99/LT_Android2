import { View, Text, TouchableOpacity, Image, ScrollView, Touchable } from 'react-native'

import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import {Bars3CenterLeftIcon, HeartIcon, ShoppingCartIcon} from 'react-native-heroicons/solid';
import { themeColors } from '../theme';
import FruitCard from '../components/fruitCard';
import { useNavigation } from '@react-navigation/native';
import FruitCardSales from '../components/fruitCardSales';
import { featuredFruits, categories } from '../constants';


export default function HomeScreen() {
  const [activeCategory, setActiveCategory] = useState('Oranges');
  const navigation = useNavigation();
  const [responseData, setResponseData] = useState(null);
  const [productData, setProductData] = useState(null);

  const fetchData = async () => {
    try {
      const response = await fetch('http://192.168.43.149:8081/api/Categories');
      const data = await response.json();
      setResponseData(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  // Call fetchData when the component mounts
  useEffect(() => {
    fetchData();
  }, []);

  const fetchProduct = async () => {
    try {
      const product = await fetch('http://192.168.43.149:8081/api/Products');
      const data = await product.json();
      setProductData(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  useEffect(() => {
    fetchProduct();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#FFEFD5' }}>
        {/* top bar */}
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginHorizontal: 5 }}>
          <Bars3CenterLeftIcon size="30" color="black" />
          <TouchableOpacity onPress={()=> navigation.navigate('Cart')} style={{ padding: 10}}>
            <ShoppingCartIcon size="25" color="orange" />
          </TouchableOpacity>
        </View>
        {/* categories */}
        <View style={{ marginTop: 20 }}>
          <Text style={{ color: themeColors.text, fontSize: 20, fontWeight: 'bold', marginLeft: 5 }}>Seasonal</Text>
          <Text style={{ color: themeColors.text, fontSize: 30, fontWeight: 'bold', marginLeft: 5 }}>Fruits and Vegetables</Text>
          <ScrollView style={{ marginTop: 8, paddingHorizontal: 5 }} horizontal showsHorizontalScrollIndicator={false}>
            {Array.isArray(responseData) &&
              responseData.map((category, index) => (
                <TouchableOpacity key={index} style={{ marginRight: 15, padding: 10, backgroundColor: '#e0e0e0', borderRadius: 10 }}>
                  <Text style={{ color: themeColors.text, fontSize: 16 }}>{category.name}</Text>
                </TouchableOpacity>
              ))}
          </ScrollView>
        </View>
        {/* carousel */}
        <View style={{ marginTop: 18, flexDirection: 'row' }}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {Array.isArray(productData) &&
              productData.map((fruit, index)=>{
                return (
                  <FruitCard fruit={fruit} key={index} />
                )
              })
            }
          </ScrollView>
        </View>

        {/* hot sales */}
        <View style={{ marginTop: 8, paddingLeft: 5, marginBottom: 1 }}>
        <Text style={{ color: themeColors.text, fontSize: 20, fontWeight: 'bold' }}>Hot Sales</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{overflow: 'visible'}}>
          {
            [...featuredFruits].reverse().map((fruit, index)=>{
              return (
                <FruitCardSales key={index} fruit={fruit} />
              );
            })
          }
        </ScrollView>
        
      </View>
      
    </SafeAreaView>
  )
}