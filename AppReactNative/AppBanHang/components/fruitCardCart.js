import { View, Text, TouchableOpacity, Image } from 'react-native';
import React from 'react';
import { themeColors } from '../theme';
import { MinusIcon, PlusIcon } from 'react-native-heroicons/solid';

export default function FruitCardCart({ fruit }) {
    return (
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginVertical: 4, marginHorizontal: 5 }}>
            <View style={{ marginLeft: 5 }}>
                <TouchableOpacity style={{ flexDirection: 'row', justifyContent: 'center', marginBottom: -42, marginLeft: -5, shadowColor: fruit.shadow, overflow: 'visible', shadowRadius: 15, shadowOffset: { width: 0, height: 20 }, shadowOpacity: 0.4 }}>
                    <Image source={fruit.image} style={{ height: 65, width: 65 }} />
                </TouchableOpacity>

                <View style={{ backgroundColor: fruit.color(0.4), height: 60, width: 60, borderRadius: 20, justifyContent: 'flex-end', alignItems: 'center' }} />
            </View>

            <View style={{ flex: 1, flexDirection: 'column', marginHorizontal: 8 }}>
                <Text style={{ color: themeColors.text, fontSize: 16, fontWeight: 'bold' }}>{fruit.name}</Text>
                <Text style={{ color: 'black', fontWeight: 'bold' }}>${fruit.price}</Text>
            </View>

            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 4 }}>
                <TouchableOpacity style={{ backgroundColor: '#ccc', padding: 4, borderRadius: 6 }}>
                    <PlusIcon size={15} color="white" />
                </TouchableOpacity>
                <Text>{fruit.qty}</Text>
                <TouchableOpacity style={{ backgroundColor: '#ccc', padding: 4, borderRadius: 6 }}>
                    <MinusIcon size={15} color="white" />
                </TouchableOpacity>
            </View>
        </View>
    );
}
