import React, { useContext, useState } from "react";
import { ScrollView, View, StyleSheet, TouchableOpacity } from "react-native";
import { globalStyles } from "../../../globals/globaStyles";
import { CustomPageHeader } from "../../../components/CustomPageHeader/CustomPageHeader";
import { colors } from "../../../globals/colors";
import { SecondaryButton } from "../../../buttons/SecondaryButton";
import Typography from "../../../components/Typography/Typography";
import {
    SCREEN_HEIGHT,
    SCREEN_WIDTH,
} from "../../../globals/globals";
import AppContext from "../../../appContext/AppContext";


export const FilterScreen = ({ navigation, route }) => {

    const [searchString, setSearchString] = useState(null);
    const [cheapestSelected, setCheapestSelected] = useState(false);
    const [mostExpensiveSelected, setMostExpensiveSelected] = useState(false);
    const [aZSelected, setAZSelected] = useState(false);
    const {
      fixedTitles
    } = useContext(AppContext);

  function goToResultCertificate(){
    route.params.onGoBack({searchString: searchString,
      cheapestSelected: cheapestSelected,
      mostExpensiveSelected:mostExpensiveSelected,
      aZSelected: aZSelected
    })
    navigation.pop()
  }

  return (
    <ScrollView
      style={[
        globalStyles.body,
        globalStyles.backgrounWhite,
        styles.bottomPadding,
      ]}
    >
       <CustomPageHeader
          navigation={navigation} title={fixedTitles.menuTitle["filter"].title} showShare={false} showNotification={false} color={colors.dark_blue} spaceHorizontally={true}
        />

      <View style={[styles.mainPageContainer, styles.bottomPadding]}>
        

      <TouchableOpacity
          style={[]}
          onPress={() => {setAZSelected((prev) => !prev ); setMostExpensiveSelected(false); setCheapestSelected(false);}}
        >
      <View style={[styles.spacing, styles.headTitle, ]}>
        <Typography
          content={'A- Z'}
          color={colors.dark_blue}
          size={16}
          bold={aZSelected}
          lh={26}
          align="left"
        />
      </View>
        </TouchableOpacity>


        <TouchableOpacity
          style={[]}
          onPress={() => {setMostExpensiveSelected((prev) => !prev ); setCheapestSelected(false); setAZSelected(false);}}
        >
      <View style={[styles.spacing, styles.headTitle, ]}>
        <Typography
          content={fixedTitles.menuTitle["most-expensive"].title}
          color={colors.dark_blue}
          size={16}
          bold={mostExpensiveSelected}
          lh={26}
          align="left"
        />
      </View>
        </TouchableOpacity>


        <TouchableOpacity
          style={[]}
          onPress={() => {setCheapestSelected((prev) => !prev ); setMostExpensiveSelected(false); setAZSelected(false);}}
        >
      <View style={[styles.spacing, styles.headTitle, ]}>
        <Typography
          content={fixedTitles.menuTitle["cheapest"].title}
          color={colors.dark_blue}
          size={16}
          bold={cheapestSelected}
          lh={26}
          align="left"
        />
      </View>
        </TouchableOpacity>


        <View style={[globalStyles.verticalTopSpacer20]}>
          <SecondaryButton
            content="استمر"
            fullWidth={true}
            onPress={() => goToResultCertificate()}
          />
        </View>
        
        

      </View>

      



    </ScrollView>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      width: SCREEN_WIDTH,
      alignSelf: "center",
    },
    arrow: {
      flexDirection: "row",
      width: SCREEN_WIDTH * 0.9,
      alignSelf: "center",
    },
    list: {
      height: SCREEN_HEIGHT * 0.8,
    },
    searchBox: {
        alignSelf: "center",
        zIndex: 100000000,
    },mainPageContainer:{
        position:'relative',
        marginHorizontal: 20
    },
  });
