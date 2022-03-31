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

export const ExpertCard = ({ data, onPress }) => {
	return (
		<TouchableOpacity onPress={() => onPress(data)} style={styles.container}>
			<View style={styles.top}>
				<View>
					<View style={styles.image}>
						<ImageBackground
							source={{ uri: data.image || data.image_absolute_url }}
							style={styles.dp}
						/>
					</View>
				</View>
				<View style={styles.ratingBox}>
					<Typography content="4.1" color="#E8AF2E" size={10} bold={false} />
				</View>
				<View style={styles.userinfo}>
					<View>
						<Typography
							content={data.full_name}
							size={14}
							bold={true}
							color={colors.dark_blue}
							align="left"
						/>
					</View>
					<View style={styles.experience}>
						<View>
							<Typography
								size={12}
								roman={true}
								color={colors.dark_blue}
								content={data.experience_domain.title}
								align="left"
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
								content={data.years_of_experience + " عاما من الخبرة"}
								align="left"
							/>
						</View>
					</View>
					{data.location && (
						<View style={[styles.experience, styles.location]}>
							<Typography content={data.location} color={"#CFD9DC"} size={12} />
						</View>
					)}
					<View style={styles.fee}>
						<Typography
							content={`${data.consultancy_fee} LBP / الساعة`}
							color={"#E8AF2E"}
							size={12}
							roman={true}
							align="left"
						/>
					</View>
					<View style={{ top: -SCREEN_WIDTH * 0.03 }}>
						<TouchableOpacity onPress={onPress} style={styles.button}>
							<Typography
								content="عرض الملف الشخصي"
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
	);
};

const styles = StyleSheet.create({

  container: {
    height: SCREEN_HEIGHT * 0.18,
    backgroundColor: "#fff",
    width: "100%",

    shadowColor: "#00000080",
    borderRadius: 10,
    shadowOffset: {
      width: 0,
      height: -1,
    },
    shadowOpacity: 0.16,
    shadowRadius: 6.51,

    elevation: 1,
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
