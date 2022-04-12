import React from "react";
import {
	StyleSheet,
	View,
} from "react-native";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "../../globals/globals";
import {FeedbackPersonCard} from './FeedbackPersonCard'

export const FeedbackCard = ({ data, onPress, size }) => {
	return (
        <View style={styles.containerShadow}>
            <View style={styles.container}>
                <FeedbackPersonCard data={data} size={size}/>
            </View>
        </View>
	);
};

const styles = StyleSheet.create({

    containerShadow:{
        borderRadius: 16,
        padding: 3,
        paddingBottom: -2,
        backgroundColor: 'transparent',
        shadowColor: '#444',
        shadowOffset: {
          width: 6,
          height: 3,
        },
        shadowOpacity: 0.05,
        shadowRadius: 5,
        elevation: 3,
        marginBottom: SCREEN_HEIGHT * 0.005          
    } ,

  container: {
    borderRadius: 10,
    backgroundColor: "#fff",
    padding: 20,
    width: "100%",
    alignSelf: "center",
    paddingHorizontal: SCREEN_WIDTH * 0.04
  },
  dp: {
    width: SCREEN_HEIGHT * 0.09,
    height: SCREEN_HEIGHT * 0.09,
    borderRadius: (SCREEN_HEIGHT * 0.09) / 2,
    overflow: "hidden",
    marginRight: SCREEN_WIDTH * 0.04,
  },
  top: {
    flexDirection: "row",
  },
  userinfo: {
    flexDirection: "column",
  },
  experience: {
    flexDirection: "row",
    position: "relative",
    top: -SCREEN_HEIGHT * 0.01,
  },
  location: {
    top: -SCREEN_HEIGHT * 0.017,
  },
  sperator: {
    marginHorizontal: SCREEN_WIDTH * 0.02,
    borderWidth: 0.4,
    borderColor: "#CFD9DC",
    alignItems: "center",
    justifyContent: "center",
    height: 15,
  },
  seperatorContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    width: SCREEN_WIDTH * 0.32,
    backgroundColor: "#E8AF2E",
    alignItems: "center",
    borderRadius: 5,
    marginBottom: SCREEN_HEIGHT * 0.023,
  },
  fee: {
    position: "relative",
    top: -SCREEN_HEIGHT * 0.02,
  },
  ratingBox: {
    height: SCREEN_HEIGHT * 0.028,
    width: SCREEN_HEIGHT * 0.028,
    borderRadius: (SCREEN_HEIGHT * 0.028) / 2,
    backgroundColor: "white",
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    borderColor: "#E8AF2E",
    position: "absolute",
    top: SCREEN_HEIGHT * 0.05,
  },
  image: {
    position: "relative",
  },
});