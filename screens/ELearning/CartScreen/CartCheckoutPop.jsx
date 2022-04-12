import React from 'react';
import {View, Text, I18nManager} from 'react-native';
import {cartStyles as styles} from './CartStyles';
import ArrowSVG from "../../../SVGR/Globals/Arrow";
import ShareSVG from "../../../SVGR/Home/Share";
import Typography from "../../../components/Typography/Typography";
import { colors } from '../../../globals/colors';
import { SecondaryButton } from "../../../buttons/SecondaryButton";
import { TransparentButton } from "../../../buttons/TransparentButton";
import {globalStyles} from '../../../globals/globaStyles'

export const CartCheckoutPop = ({navigation}) => {

    function goToCheckout(){
      navigation.push('checkoutScreen');
    }

    return(<View style={styles.checkoutPop}>
        <View style={[styles.status]}>
      <View style={[styles.left, styles.headTitle]}>
        <Typography
          content={'المجموع'}
          color={colors.dark_blue}
          size={14}
          bold={true}
          lh={26}
          align="left"
        />
      </View>
      <View style={styles.right}>
      <Typography
          content={'346$'}
          color={colors.blue}
          size={14}
          bold={true}
          lh={26}
          align="left"
        />
      </View>
    </View>
    <View style={[globalStyles.verticalTopSpacer10]}>
            <SecondaryButton content="باشر التسجيل" fullWidth={true} onPress={() => {goToCheckout()}}/>
          </View>
    <View style={[globalStyles.verticalTopSpacer10]}>
            <TransparentButton content="مواصلة البحث" fullWidth={true} onPress={() => {navigation.pop(2)}}/>
          </View>
    </View>)
}