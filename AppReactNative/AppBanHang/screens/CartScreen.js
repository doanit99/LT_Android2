import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, Alert, Image, Modal, StyleSheet, TextInput, Linking } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChevronLeftIcon, MinusIcon, PlusIcon, TrashIcon } from 'react-native-heroicons/solid';
import { themeColors } from '../theme';
import { IMAGE_URL } from '../api';

export default function CartScreen({ route, navigation }) {
  const { cart: initialCart, setCart } = route.params;
  const [cart, setLocalCart] = useState(initialCart);
  const [totalPrice, setTotalPrice] = useState(0);
  const [isModalVisible, setModalVisible] = useState(false);
  const [address, setAddress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

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

  const handlePayment = () => {
    setModalVisible(true);
  };

  const handleConfirmPayment = () => {
    // Implement your payment logic here
    // If payment is successful, clear the cart
    // For example, you can use an API call or a payment library
    // Địa chỉ URI Scheme của ứng dụng Momo (ví dụ, có thể là "momo://")
    const momoUriScheme = "momo://"; // Cần thay đổi theo URI Scheme thực tế của Momo
    const recipientInfo = {
      name: "Nguyễn Bách Đoan",
      phone: "0367925474",
      amount: 100000, // Số tiền
      note: "Ghi chú giao dịch",
    };
    // Tạo URL chứa thông tin người nhận
    const momoUrl = `${momoUriScheme}?action=transfer&recipient_name=${recipientInfo.name}&recipient_phone=${recipientInfo.phone}&amount=${recipientInfo.amount}&note=${recipientInfo.note}`;
    // Kiểm tra xem thiết bị có hỗ trợ URI Scheme không
    Linking.canOpenURL(momoUriScheme)
      .then((supported) => {
        if (supported) {
          // Mở ứng dụng Momo
          return Linking.openURL(momoUrl);
        } else {
          console.log("Không hỗ trợ mở ứng dụng Momo trên thiết bị này");
        }
      })
      .catch((error) => console.error("Lỗi khi mở ứng dụng Momo:", error));
   
    // Close the modal after successful payment
    setModalVisible(false);
  };

  const handleOrder = () => {
    
    // Assuming your clearCart function looks like this
    clearCart();

    // You can also show a success message to the user
    alert('Order Success');

    // Close the modal after successful payment
    setModalVisible(false);
  };

  const clearCart = () => {
    // Clear the cart by setting it to an empty array
    setLocalCart([]);
    setCart([]); // Update the global cart state as well
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
            <Image
              source={{ uri: `${IMAGE_URL}` + item.image }} // Replace 'item.imageUrl' with the actual image URL or local path
              style={{ width: 50, height: 50, borderRadius: 25, marginRight: 10 }}
            />
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
          onPress={handlePayment}
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


        <Modal
          visible={isModalVisible}
          transparent={true}
          animationType="slide"
        >
          <View style={styles.modalContainer}>
            <Text>Enter your address:</Text>
            <TextInput
              style={styles.input}
              value={address}
              onChangeText={setAddress}
              placeholder="Address"


            />

            <Text>Enter your phone number:</Text>
            <TextInput
              style={styles.input}
              value={phoneNumber}
              onChangeText={setPhoneNumber}
              placeholder="Phone Number"
            />
            <View style={{ flexDirection: 'row', justifyContent: 'space-between'}}>
              <TouchableOpacity onPress={handleOrder} style={styles.orderButton}>
                <Text style={styles.buttonText}>Order</Text>

              </TouchableOpacity>
              <TouchableOpacity onPress={handleConfirmPayment} style={styles.confirmButton}>
                <Text style={styles.buttonText}>Confirm Payment</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.cancelButton}>
              <Text style={styles.buttonText} >Cancel</Text>
            </TouchableOpacity>
          </View>
        </Modal>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20,
  },
  input: {
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 8,
    backgroundColor: '#f8f8f8',
    width: '100%',
  },
  modalContent: {
    width: '80%',
    maxWidth: 400,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalText: {
    fontSize: 16,
    marginBottom: 20,
  },
  modalButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  modalButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    backgroundColor: '#3498db',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  confirmButton: {
    backgroundColor: '#27ae60',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginTop: 10,
    alignItems: 'center',
  },
  orderButton: {
    backgroundColor: '#007EA7',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginTop: 10,
    marginRight: 7,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#e74c3c',
    paddingVertical: 12,
    paddingHorizontal: 100,
    borderRadius: 8,
    marginTop: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },

});