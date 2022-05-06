import React, { useState, useEffect } from "react";
import { ScrollView, View, Text, FlatList, ImageBackground, Image, StyleSheet, TouchableOpacity } from "react-native";
import { globalStyles } from "../../../globals/globaStyles";
import { CustomPageHeader } from "../../../components/CustomPageHeader/CustomPageHeader";
import { colors } from "../../../globals/colors";
import { SecondaryButton } from "../../../buttons/SecondaryButton";
import ThumbsUp from "../../../assets/ThumbsUp.png";
import Comment from "../../../assets/Comment.png";
import Typography from "../../../components/Typography/Typography";
import { SearchBox } from "../../../components/SearchBox/SearchBox";
import {
    SCREEN_HEIGHT,
    SCREEN_WIDTH,
    STATUS_BAR_HEIGHT,
} from "../../../globals/globals";


export const FilterScreen = ({ navigation, route }) => {

    const [searchString, setSearchString] = useState(null);
    const [cheapestSelected, setCheapestSelected] = useState(false);
    const [mostExpensiveSelected, setMostExpensiveSelected] = useState(false);
    const [aZSelected, setAZSelected] = useState(false);


  function goToResultCertificate(){
    route.params.onGoBack({searchString: searchString,
      cheapestSelected: cheapestSelected,
      mostExpensiveSelected:mostExpensiveSelected,
      aZSelected: aZSelected
    })
    navigation.pop()

    // const screenData ={
    //     backButtonTitle:"دراسة الحالة",
    //     contentText: longText,
    //     continueTo:"caseStudyScreen"
    //   }

    // navigation.push('courseCertificateScreen',{
    //     data: screenData
    // })
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
          navigation={navigation} title="فلتر" showShare={false} showNotification={false} color={colors.dark_blue} spaceHorizontally={true}
        />

      <View style={[styles.mainPageContainer, styles.bottomPadding]}>

      {false && <View style={styles.searchBox}>
                    <SearchBox
                        filterEnabled={false}
                        onPress={() => setModalVisible(true)}
                        onSearchPress={() => searchHandler()}
                        searchString={searchString}
                        setSearchString={setSearchString}
                    />
        </View>}
        

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
          content={'الأغلى'}
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
          content={'أرخص'}
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
