import React, { useContext } from "react";
import {
  ActivityIndicator,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import AppContext from "../../appContext/AppContext";
import { PrimaryButton } from "../../buttons/PrimaryButton";
import { colors } from "../../globals/colors";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "../../globals/globals";
import numeral from "numeral";
import Typography from "../Typography/Typography";
import * as Animatable from "react-native-animatable";

export const ExpertCard = ({ data, onPress, index }) => {
  const { fixedTitles } = useContext(AppContext);
  const fadeIn = {
    from: {
      opacity: 0,
    },
    to: {
      opacity: 1,
    },
  };
  return (
    <Animatable.View animation={fadeIn} delay={index ? 250 * index : 250}>
      <TouchableOpacity onPress={() => onPress(data)} style={styles.container}>
        <View style={styles.top}>
          <View>
            <View style={styles.image}>
              <ImageBackground
                source={{ uri: data.image_absolute_url }}
                style={styles.dp}
              />
            </View>
          </View>

          {data.rating > 0 && (
            <View style={styles.ratingBox}>
              <Typography
                content={parseFloat(data.rating).toFixed(1)}
                color="#E8AF2E"
                size={10}
                bold={false}
              />
            </View>
          )}

          <View style={styles.userinfo}>
            <View style={styles.name}>
              <Typography
                content={data?.full_name}
                size={14}
                bold={true}
                color={colors.dark_blue}
                align="left"
                fit={true}
                lines={1}
              />
            </View>
            <View style={styles.experience}>
              <View>
                <Typography
                  size={12}
                  roman={true}
                  color={colors.dark_blue}
                  content={data?.experience_domain?.title}
                  align="left"
                  fit={true}
                  lines={1}
                />
              </View>
              <View style={styles.seperatorContainer}>
                <View style={styles.sperator} />
              </View>
              <View>
                <Typography
                  size={12}
                  roman={true}
                  color={colors.dark_blue}
                  content={
                    data?.years_of_experience_id +
                    " " +
                    fixedTitles.expertsTitles["years-of-experience"].title
                  }
                  align="left"
                  fit={true}
                  lines={1}
                />
              </View>
            </View>
            {data.location && (
              <View style={[styles.experience, styles.location]}>
                <Typography
                  content={data.location}
                  color={"#CFD9DC"}
                  size={12}
                />
              </View>
            )}
            <View style={styles.fee}>
              <Typography
                content={`${numeral(data.consultancy_fee).format(
                  "0,0"
                )} LBP / ${fixedTitles.expertsTitles["hour"].title}`}
                color={"#E8AF2E"}
                size={12}
                roman={true}
                align="left"
                fit={true}
                lines={1}
              />
            </View>
            <View style={{ top: -SCREEN_WIDTH * 0.03 }}>
              <TouchableOpacity onPress={onPress} style={styles.button}>
                <Typography
                  fit={true}
                  lines={1}
                  content={
                    fixedTitles.expertsTitles["view-expert-profile"].title
                  }
                  color={colors.white}
                  size={12}
                  roman={true}
                  align="left"
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </Animatable.View>
  );
};

const styles = StyleSheet.create({
  container: {
    minHeight: SCREEN_HEIGHT * 0.17,
    backgroundColor: "#fff",
    width: SCREEN_WIDTH,

    shadowColor: "#000",
    borderRadius: 10,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.16,
    shadowRadius: 6.51,

    elevation: 5,
    marginBottom: SCREEN_HEIGHT * 0.005,
    marginTop: SCREEN_HEIGHT * 0.0144,
    width: SCREEN_WIDTH * 0.9,
    alignSelf: "center",
    paddingHorizontal: SCREEN_WIDTH * 0.04,
    paddingTop: 20,
  },
  dp: {
    width: SCREEN_HEIGHT * 0.068,
    height: SCREEN_HEIGHT * 0.068,
    borderRadius: (SCREEN_HEIGHT * 0.068) / 2,
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
    flexWrap: "wrap",
    width: "91%",
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
    width: SCREEN_WIDTH * 0.37,
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
    zIndex: 1000,
    elevation: 20,
  },
  image: {
    position: "relative",
    zIndex: 10000,
  },
  name: {
    width: SCREEN_WIDTH * 0.5,
  },
});
