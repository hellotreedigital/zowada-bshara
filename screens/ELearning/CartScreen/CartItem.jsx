import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import { CartItemImageBox } from './CartItemImageBox';


export const CartItem = ({data}) =>{


    function DeleteItem(){

    }

    return(
        <View>
            <CartItemImageBox item={data} handleClickEvent={() => {DeleteItem()}}/>
        </View>
    )
}