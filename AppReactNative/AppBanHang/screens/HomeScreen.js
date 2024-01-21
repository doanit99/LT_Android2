import { View, Text, TouchableOpacity, Image, ScrollView, Touchable, TextInput, ToastAndroid } from 'react-native'

import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ArrowLongDownIcon, Bars3CenterLeftIcon, HeartIcon, ShoppingCartIcon } from 'react-native-heroicons/solid';
import { themeColors } from '../theme';
import FruitCard from '../components/fruitCard';
import { useNavigation } from '@react-navigation/native';
import FruitCardSales from '../components/fruitCardSales';
import { featuredFruits, categories } from '../constants';
import { BASE_URL } from '../api';
import Login from '../components/login';


export default function HomeScreen({ route }) {
  const { username } = route.params;
  const [activeCategory, setActiveCategory] = useState('Oranges');
  const navigation = useNavigation();
  const [responseData, setResponseData] = useState(null);
  const [productData, setProductData] = useState(null);
  const [productCategory, setProductCategory] = useState([]);
  const [searchText, setSearchText] = useState('');


  const fetchData = async () => {
    try {
      const response = await fetch(`${BASE_URL}Categories`);
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

  //Get all products
  const fetchProduct = async () => {
    try {
      const product = await fetch(`${BASE_URL}Products/GetProducts`);
      const data = await product.json();
      setProductData(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  useEffect(() => {
    fetchProduct();
  }, []);

  //Get product by category
  const fetchProductCategory = async (categoryId) => {
    try {
      const product = await fetch(`${BASE_URL}Products/GetProductByCategory/${categoryId}`);
      const data = await product.json();
      setProductCategory(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  useEffect(() => {
    if (activeCategory === 'all') {
      fetchProduct();
    } else {
      fetchProductCategory(activeCategory);
    }
  }, [activeCategory]);

  //
  const handleCategoryPress = (categoryId) => {
    setActiveCategory(categoryId);
    if (categoryId === 'all') {
      fetchProduct();
    } else if (!productCategory.length) {
      fetchProductCategory(categoryId);
    }
  };

  const filterProducts = () => {
    if (!searchText.trim()) {
      return activeCategory === 'all' ? productData : productCategory;
    }
  
    const productsToFilter = activeCategory === 'all' ? productData : productCategory;
  
    if (!Array.isArray(productsToFilter)) {
      // Xử lý trường hợp không phải là mảng, có thể là null hoặc undefined
      return [];
    }
  
    const filteredProducts = productsToFilter.filter(
      (product) => {
        const productName = product.name || ''; 
        const productDescription = product.description || ''; 
  
        return (
          productName.toLowerCase().includes(searchText.toLowerCase()) ||
          productDescription.toLowerCase().includes(searchText.toLowerCase())
        );
      }
    );
  
    return filteredProducts;
  };
  
  // const navigateToLogin = () => {
  //   navigation.navigate(Login);
  // };
  const navigateToLogout = () => {
    ToastAndroid.show('Đăng xuất thành công', ToastAndroid.SHORT);
    navigation.navigate(Login);
  };
    

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#FFEFD5' }}>
      {/* top bar */}
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginHorizontal: 5 }}>
        <Bars3CenterLeftIcon size="30" color="black" />
        <TextInput
            style={{ borderWidth: 1, borderColor: 'gray', marginRight: 10, marginLeft:10, borderRadius: 5, flex: 1 }}
            placeholder="Search..."
            value={searchText}
            onChangeText={(text) => setSearchText(text)}
          />
        
        <TouchableOpacity style={{ padding: 10 }}>
          {/* <Text onPress={navigateToLogin}>Login</Text> */}
          <Text>Hi, {username} </Text>
          <Text onPress={navigateToLogout}>Đăng xuất</Text>
        </TouchableOpacity>
        

      </View>
      {/* categories */}
      <View style={{ marginTop: 20 }}>
        {/* <Text style={{ color: themeColors.text, fontSize: 20, fontWeight: 'bold', marginLeft: 5 }}>Seasonal</Text> */}
        <Text style={{ color: themeColors.text, fontSize: 30, fontWeight: 'bold', marginLeft: 5 }}>Fruits and Vegetables</Text>
       
        <ScrollView style={{ marginTop: 8, paddingHorizontal: 5 }} horizontal showsHorizontalScrollIndicator={false}>
          <TouchableOpacity
            style={{
              marginRight: 15,
              paddingVertical: 8,
              paddingHorizontal: 15,
              backgroundColor: activeCategory === 'all' ? themeColors.primary : '#e0e0e0',
              borderRadius: 10,
              borderWidth: 1,
              borderColor: themeColors.primary,
            }}
            onPress={() => handleCategoryPress('all')}
          >
            <Text style={{ color: activeCategory === 'all' ? 'white' : themeColors.text, fontSize: 16 }}>All</Text>
          </TouchableOpacity>
          {Array.isArray(responseData) &&
            responseData.map((category, index) => (
              <TouchableOpacity
                key={index}
                style={{
                  marginRight: 15,
                  paddingVertical: 8,
                  paddingHorizontal: 15,
                  backgroundColor: activeCategory === category.id ? themeColors.primary : '#e0e0e0',
                  borderRadius: 10,
                  borderWidth: 1,
                  borderColor: themeColors.primary,
                }}
                onPress={() => handleCategoryPress(category.id)}
              >
                <Text style={{ color: activeCategory === category.id ? 'white' : themeColors.text, fontSize: 16 }}>{category.name}</Text>
              </TouchableOpacity>
            ))}
        </ScrollView>

      </View>
      {/* carousel */}
      <View style={{ marginTop: 18, flexDirection: 'column' }}>
        {/* Hiển thị sản phẩm khi có kết quả tìm kiếm */}
        {Array.isArray(filterProducts()) && filterProducts().length > 0 && (
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 10 }}>
            {filterProducts().map((fruit, index) => (
              <View key={index} style={{ marginRight: 15 }}>
                <FruitCard fruit={fruit} />
              </View>
            ))}
          </ScrollView>
        )}

        {/* Hiển thị thông báo khi không có kết quả tìm kiếm */}
        {Array.isArray(filterProducts()) && filterProducts().length === 0 && (
          <Text style={{ fontSize: 18, textAlign: 'center', marginTop: 20 }}>Không có kết quả tìm kiếm.</Text>
        )}
      </View>

      {/* hot sales */}
      {/* <View style={{ marginTop: 8, paddingLeft: 5, marginBottom: 1 }}>
        <Text style={{ color: themeColors.text, fontSize: 20, fontWeight: 'bold' }}>Hot Sales</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ overflow: 'visible' }}>
          {
            [...featuredFruits].reverse().map((fruit, index) => {
              return (
                <FruitCardSales key={index} fruit={fruit} />
              );
            })
          }
        </ScrollView>

      </View> */}

    </SafeAreaView>
  )
}