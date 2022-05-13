import React, { useContext } from "react";
import {
	StyleSheet,
	Text,
	View,
	TextInput,
	TouchableOpacity,
	I18nManager,
  Platform
} from "react-native";

import { colors } from "../../globals/colors";
import CloseBlueSVG from "../../SVGR/Globals/CloseBlue";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "../../globals/globals";
import FilterSVG from "../../SVGR/Globals/Filter";
import SearchSVG from "../../SVGR/Globals/SearchSVG";
import AppContext from "../../appContext/AppContext";

export const SearchBox = ({
  filterEnabled,
  placeholder,
  multiline,
  onPress,
  width,
  height,
  searchString,
  setSearchString,
  onSearchPress,
  hideFilter,
  filterHidden,
}) => {

  const {
    fixedTitles
} = useContext(AppContext);

  const resetSearchBarHandler = () => {
    setSearchString("");
  };
  
  return (
    <>
      {!filterEnabled ? (
        <TextInput
          textAlignVertical={"top"}
          multiline={multiline}
          style={[
            styles.SearchBox,
            height && { height: height },
            width && { width: width },
          ]}
          value={searchString}
          placeholderTextColor={colors.dark_blue}
          placeholderStyle={styles.textboxfieldd}
          onChangeText={(text) => {
            setSearchString(text);
          }}
          placeholder={placeholder || fixedTitles.shopTitles["search"].title}
        />
      ) : (
        <View style={styles.filteredInput}>
          <View style={styles.row}>
            <View
              style={[
                styles.icon,
                { right: I18nManager.isRTL ? 0 : hideFilter ? 0 : 30 },
                Platform.OS === "ios"
                  ? {
                      alignItems: "center",
                      justifyContent: "center",
                    }
                  : null,
              ]}
            >
              <IconButton
                mode="text"
                icon={SearchSVG}
                compact
                onPress={() => onSearchPress()}
                dark={false}
                disabled={searchString == null ? true : false}
              />
            </View>
            {!hideFilter && (
              <View
                style={[
                  styles.icon,
                  {
                    right: I18nManager.isRTL ? 30 : 0,
                    marginRight: Platform.OS == "android" ? 2 : 0,
                  },
                  Platform.OS === "ios"
                    ? {
                        alignItems: "center",
                        justifyContent: "center",
                      }
                    : null,
                ]}
              >
                <IconButton icon={FilterSVG} onPress={() => onPress()} />
              </View>
            )}
          </View>
          <TextInput
            editable={true}
            style={[
              styles.SearchBox,
              height && { height: height },
              width && { width: width },
            ]}
            value={searchString}
            placeholderTextColor={colors.dark_blue}
            placeholderStyle={styles.textboxfieldd}
            onChangeText={(text) => {
              setSearchString(text);
            }}
            placeholder={fixedTitles.shopTitles["search"].title}
          />
        </View>
      )}
    </>
  );
};



export const SearchBoxWOFilter = ({
  filterEnabled,
  placeholder,
  multiline,
  onPress,
  width,
  height,
  searchString,
  setSearchString,
  onSearchPress,
  searchColor
}) => {

  const {
    fixedTitles
} = useContext(AppContext);

  return (
    <>
      {!filterEnabled ? (
        <TextInput
          textAlignVertical={"top"}
          multiline={multiline}
          style={[
            styles.SearchBox,
            height && { height: height },
            width && { width: width },
          ]}
          value={searchString}
          placeholderTextColor={colors.dark_blue}
          placeholderStyle={styles.textboxfieldd}
          onChangeText={(text) => {
            setSearchString(text);
          }}
          placeholder={placeholder || fixedTitles.shopTitles["search"].title}
        />
      ) : (
        <View style={styles.filteredInput}>
          <View style={styles.row}>
            <TouchableOpacity
              onPress={() => onSearchPress()}
              style={[styles.icon, { right: 0 }]}
              disabled={searchString == null ? true : false}
            >
              <SearchSVG color={searchColor}/>
            </TouchableOpacity>
          </View>
          <TextInput
            style={[styles.SearchBox, width && { width: width }]}
            value={searchString}
            placeholderTextColor={colors.dark_blue}
            placeholderStyle={styles.textboxfieldd}
            onChangeText={(text) => {
              setSearchString(text);
            }}
            placeholder={fixedTitles.shopTitles["search"].title}
          />
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  SearchBox: {
    color: colors.dark_blue,
    backgroundColor: "#F2F5F6",
    width: SCREEN_WIDTH * 0.9,
    alignSelf: "center",
    paddingTop: SCREEN_HEIGHT * 0.017,
    paddingBottom: SCREEN_HEIGHT * 0.012,
    borderRadius: 10,
    paddingHorizontal: SCREEN_WIDTH * 0.04,
    fontFamily: "HelveticaRegular",
    textAlign: I18nManager.isRTL ? "right" : "left",
    height: SCREEN_HEIGHT * 0.048,
    paddingTop: 6,
    zIndex: -1,
  },
  textboxfieldd: {
    textAlign: "right",
  },
  filteredInput: {
    justifyContent: "center",

    zIndex: -1,
  },
  icon: {
    height: SCREEN_HEIGHT * 0.048,
    width: 40,
    alignItems: "center",
    position: "absolute",
    top: Platform.OS == "android" ? SCREEN_HEIGHT * 0.001 : 0,
    justifyContent: "center",
    alignSelf: I18nManager.isRTL ? "flex-end" : "flex-start",
    zIndex: 1,
  },
  row: {},
  imagee:{
    width:20,
    height:20,
    margin: 5
},
  styledicon: {
    height: SCREEN_HEIGHT * 0.018,
    width: SCREEN_HEIGHT * 0.018,
    backgroundColor: "white",
    borderRadius: (SCREEN_HEIGHT * 0.018) / 2,
    alignItems: "center",
    justifyContent: "center",
    top: 14,
    marginHorizontal: 8,
    alignSelf: "flex-start",
  },
});
