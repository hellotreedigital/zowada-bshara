import React, {useState, useEffect} from 'react';
import {ScrollView, View, Text, FlatList} from 'react-native';
import {globalStyles} from '../../../globals/globaStyles';
import {cartStyles as styles} from './CartStyles';
import {CustomPageHeader} from '../../../components/CustomPageHeader/CustomPageHeader';
import {colors} from '../../../globals/colors';
import {CartItem} from './CartItem';
import { CartItemImageBox } from './CartItemImageBox';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "../../../globals/globals";
import {CartCheckoutPop} from './CartCheckoutPop';

const data=[
    {
        id: "0",
        title: "اسم",
        location: "موقع",
        topRanked: true,
        price: '89.00$',
        image:
            "https://images.pexels.com/photos/2113566/pexels-photo-2113566.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
    },
    {
        id: "1",
        title: "اسم",
        location: "موقع",
        topRanked: true,
        price: '89.00$',
        image:
            "https://images.pexels.com/photos/2113566/pexels-photo-2113566.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
    },
    {
        id: "2",
        title: "اسم",
        location: "موقع",
        topRanked: true,
        price: '89.00$',
        image:
            "https://images.pexels.com/photos/2113566/pexels-photo-2113566.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
    }
    ]

export const CartScreen = ({navigation}) => {

    function deleteCartItem(){}
    return(
        <View style={[globalStyles.body]}>
            <CustomPageHeader navigation={navigation} title="عربة التسوق" showShare={false} showNotification={false} color={colors.blue}/>

            <View style={[styles.mainPageContainer]}>
            <FlatList
                        renderItem={(item) => {
                            return(
                                <CartItemImageBox item={item} handleClickEvent={deleteCartItem}/>
                            )
                        }}
                        data={data}
                        keyExtractor={(item) => item.id}
                        showsVerticalScrollIndicator={false}
                        showsHorizontalScrollIndicator={false}
                        ItemSeparatorComponent={() => <ItemDivider/>}
                    />

            </View>
            
            <CartCheckoutPop navigation={navigation}/>
        </View>
    )
}


const ItemDivider = () => {
    return (
      <View
        style={{
          height: 1,
          width: "100%",
          backgroundColor: "#607D8B",
          marginVertical: 10
        }}
      />
    );
  }