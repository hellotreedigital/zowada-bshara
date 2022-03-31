import React, { useContext } from "react";
import {
	StyleSheet,
	Text,
	View,
	ActivityIndicator,
	ImageBackground,
} from "react-native";
import UserAvatar from "react-native-user-avatar";
import AuthContext from "../../appContext/AuthContext";
import { colors } from "../../globals/colors";
import { SCREEN_HEIGHT } from "../../globals/globals";

const Avatar = ({ name, loader, small, profilePic, custom, customSize }) => {
	return (
		<View>
			{!profilePic ? (
				<>
					<UserAvatar
						bgColor={colors.dark_blue}
						size={
							small
								? SCREEN_HEIGHT * 0.06
								: SCREEN_HEIGHT * customSize
								? SCREEN_HEIGHT * 0.17
								: SCREEN_HEIGHT * 0.11
						}
						name={name}
						style={{ paddingTop: 4, borderRadius: custom ? 10 : 100 }}
					/>
					<View style={styles.loader}>
						<ActivityIndicator color={colors.focused} animating={loader} />
					</View>
				</>
			) : (
				<>
					<ImageBackground
						source={{
							uri: profilePic,
						}}
						style={[styles.image, small && styles.small]}
					/>
					<View style={styles.loader}>
						<ActivityIndicator color={colors.focused} animating={loader} />
					</View>
				</>
			)}
		</View>
	);
};

export default Avatar;

const styles = StyleSheet.create({
	loader: {
		position: "absolute",
		alignItems: "center",
		justifyContent: "center",
		height: SCREEN_HEIGHT * 0.11,
		width: SCREEN_HEIGHT * 0.11,
	},
	image: {
		height: SCREEN_HEIGHT * 0.11,
		width: SCREEN_HEIGHT * 0.11,
		borderRadius: (SCREEN_HEIGHT * 0.11) / 2,
		overflow: "hidden",
	},
	small: {
		height: SCREEN_HEIGHT * 0.06,
		width: SCREEN_HEIGHT * 0.06,
		borderRadius: (SCREEN_HEIGHT * 0.06) / 2,
	},
});
