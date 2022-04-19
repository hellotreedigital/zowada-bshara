import React from "react";
import {
	ImageBackground,
	Platform,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from "react-native";
import { PrimaryButton } from "../../buttons/PrimaryButton";
import { colors } from "../../globals/colors";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "../../globals/globals";
import Typography from "../Typography/Typography";
import { Rating, AirbnbRating } from 'react-native-ratings';

export const FeedbackPersonCard = ({ data, onPress, size }) => {
	return (
        <View>
			<View style={styles.top}>
				<View style={styles.userinfo}>
					<View style={styles.image}>
						<ImageBackground
							source={{ uri: data?.image_absolute_url || data?.image }}
							style={size === 'small' ? styles.dp : styles.dpLarger}
						/>
					</View>
				</View>
				<View style={styles.userinfo}>
					<View>
						<Typography
							content={data?.full_name}
							size={14}
							bold={true}
							color={colors.dark_blue}
							align="left"
						/>
					</View>
					{data?.experience_domain.title && <View style={styles.experience}>
						<View>
							<Typography
								size={12}
								roman={true}
								color={colors.dark_blue}
								content={data?.experience_domain.title}
								align="left"
							/>
						</View>
					</View>}

                    <View style={styles.experience}>

                    <AirbnbRating
                            showRating={false}
                            count={5}
                            defaultRating={1}
                            size={12}
                            starImage={require("../../assets/emptyStar.png")}
                            isDisabled={true}
                            />
                    </View>
				</View>


			</View>
                {data?.comment && <View style={[styles.verticalTopSpacer20, styles.verticalBottomSpacer20]}>
                    <Text>
                        {data?.comment}
                    </Text>
                </View>}
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
    width: SCREEN_HEIGHT * 0.067,
    height: SCREEN_HEIGHT * 0.067,
    borderRadius: (SCREEN_HEIGHT * 0.09) / 2,
    overflow: "hidden",
    marginRight: SCREEN_WIDTH * 0.04,
  },
  dpLarger: {
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
    justifyContent: 'center'
  },
  experience: {
    flexDirection: "row",
    position: "relative",
    top: -SCREEN_HEIGHT * 0.01,
    marginVertical: 0,
    paddingVertical: 0
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
  ratingContainer:{
      backgroundColor:'#E8AF2E'
  },
  verticalBottomSpacer10:{
      marginBottom: 10
  },
  verticalTopSpacer20:{
      marginTop: 20
  },
});