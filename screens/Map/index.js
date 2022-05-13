import React, { useContext, useEffect, useState } from "react";

import {
  I18nManager,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";

import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import AppContext from "../../appContext/AppContext";
import { colors } from "../../globals/colors";
import { Navigation } from "../../navigation";
import ArrowSVG from "../../SVGR/Globals/Arrow";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "../../globals/globals";
import Typography from "../../components/Typography/Typography";
import MapArrowSVG from "../../SVGR/Globals/MapArrow";
import * as Location from "expo-location";

export const MapScreen = ({ navigation, route }) => {
  const { location, setShopLocationName, setCustomMap, customMap, setAddress } =
    useContext(AppContext);
  const mapRef = React.useRef(null);

  useEffect(() => {
    if (!customMap) return;
    setCustomMap({
      latitude: location.coords?.latitude,
      longitude: location.coords?.longitude,
      latitudeDelta: 0.004,
      longitudeDelta: 0.009,
    });
  }, []);

  const onMapLocationChange = (coords) => {
    const newState = {};
    newState.longitude = coords?.longitude;
    newState.latitude = coords?.latitude;
    newState.longitudeDelta = 0.004;
    newState.latitudeDelta = 0.009;
  };

  const animateToRegion = (lat, lng, data) => {
    setShopLocationName(data?.description);
    let animtedRegion = {
      latitude: lat,
      longitude: lng,
      latitudeDelta: 0.004,
      longitudeDelta: 0.009,
    };
    setCustomMap(animtedRegion);
  };

  const locationHandler = () => {
    navigation.pop();
  };

  return (
    <>
      <MapView
        ref={mapRef}
        region={customMap}
        showsUserLocation
        initialRegion={customMap}
        moveOnMarkerPress={true}
        customMapStyle={MapStyle}
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        onRegionChangeComplete={(region) => {
          Location.reverseGeocodeAsync({
            latitude: region.latitude,
            longitude: region.longitude,
          }).then((res) => {
            setAddress(res[0]?.name);
          });

          onMapLocationChange(region);
        }}
      />
      <>
        <SafeAreaView style={styles.header}>
          <TouchableOpacity
            style={styles.arrow}
            onPress={() => navigation.pop()}
          >
            <ArrowSVG
              fill={colors.dark_blue}
              style={{
                transform: [{ rotateY: I18nManager.isRTL ? "0deg" : "180deg" }],
              }}
            />
          </TouchableOpacity>

          <View style={styles.searchBox}>
            <GooglePlacesAutocomplete
              onFail={(err) => {}}
              enablePoweredByContainer={false}
              placeholder="Search"
              returnKeyType="search"
              enableHighAccuracyLocation
              minLength={2}
              autoFillOnNotFound
              fetchDetails
              onPress={(data, details = null) => {
                animateToRegion(
                  details.geometry.location.lat,
                  details.geometry.location.lng,
                  data
                );
              }}
              debounce={400}
              nearbyPlacesAPI="GooglePlacesSearch"
              query={{
                key: "AIzaSyB1Z9lrt4GDWKXJ9BQ3GG3ujhRHqT0HRAI",
                language: "en",
              }}
            />
          </View>
        </SafeAreaView>
        <SafeAreaView style={styles.arrowContainer}>
          <View style={styles.maparrow}>
            <MapArrowSVG />
          </View>
        </SafeAreaView>
        <SafeAreaView>
          <View style={styles.buttonWrapper}>
            <TouchableOpacity
              onPress={() => locationHandler()}
              style={styles.button}
            >
              <Typography
                content="تأكيد الموقع"
                align="center"
                color={colors.white}
              />
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </>
    </>
  );
};

const styles = StyleSheet.create({
  map: {
    flex: 1,
    position: "relative",
    zIndex: 0,
  },
  header: {
    position: "absolute",
  },
  arrow: {
    padding: 20,
  },
  searchBox: {
    width: SCREEN_WIDTH - 40,
    marginHorizontal: 20,
  },
  button: {
    width: SCREEN_WIDTH * 0.9,
    height: SCREEN_HEIGHT * 0.05,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.dark_blue,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.19,
    shadowRadius: 3.84,
    alignSelf: "center",
    elevation: 5,
  },
  buttonWrapper: {
    bottom: SCREEN_HEIGHT * 0.04,
    position: "absolute",
    alignSelf: "center",
  },
  maparrow: {
    position: "relative",
    top: "50%",
  },
  arrowContainer: {
    position: "absolute",
    top: "50%",
    alignSelf: "center",
  },
});
const MapStyle = [
  {
    elementType: "geometry",
    stylers: [
      {
        color: "#f5f5f5",
      },
    ],
  },
  {
    elementType: "labels.icon",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#616161",
      },
    ],
  },
  {
    elementType: "labels.text.stroke",
    stylers: [
      {
        color: "#f5f5f5",
      },
    ],
  },
  {
    featureType: "administrative.land_parcel",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#bdbdbd",
      },
    ],
  },
  {
    featureType: "poi",
    elementType: "geometry",
    stylers: [
      {
        color: "#eeeeee",
      },
    ],
  },
  {
    featureType: "poi",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#757575",
      },
    ],
  },
  {
    featureType: "poi.park",
    elementType: "geometry",
    stylers: [
      {
        color: "#e5e5e5",
      },
    ],
  },
  {
    featureType: "poi.park",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#9e9e9e",
      },
    ],
  },
  {
    featureType: "road",
    elementType: "geometry",
    stylers: [
      {
        color: "#ffffff",
      },
    ],
  },
  {
    featureType: "road.arterial",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#757575",
      },
    ],
  },
  {
    featureType: "road.highway",
    elementType: "geometry",
    stylers: [
      {
        color: "#dadada",
      },
    ],
  },
  {
    featureType: "road.highway",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#616161",
      },
    ],
  },
  {
    featureType: "road.local",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#9e9e9e",
      },
    ],
  },
  {
    featureType: "transit.line",
    elementType: "geometry",
    stylers: [
      {
        color: "#e5e5e5",
      },
    ],
  },
  {
    featureType: "transit.station",
    elementType: "geometry",
    stylers: [
      {
        color: "#eeeeee",
      },
    ],
  },
  {
    featureType: "water",
    elementType: "geometry",
    stylers: [
      {
        color: "#c9c9c9",
      },
    ],
  },
  {
    featureType: "water",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#9e9e9e",
      },
    ],
  },
];
