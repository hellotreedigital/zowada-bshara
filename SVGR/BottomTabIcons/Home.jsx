import * as React from "react";
import Svg, { G, Path } from "react-native-svg";
import { colors } from "../../globals/colors";

function HomeSVG(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={16.172}
      height={18.385}
      viewBox="0 0 16.172 18.385"
      {...props}
    >
      <G data-name="001-home">
        <G data-name="Group 280">
          <Path
            data-name="Path 971"
            d="M46.779 7.189L39.119.167a.639.639 0 00-.876.013L31.008 7.2a.639.639 0 00-.194.458v10.088a.638.638 0 00.638.638h5.32a.638.638 0 00.638-.638v-4.681h2.98v4.681a.638.638 0 00.638.638h5.32a.638.638 0 00.638-.638V7.66a.639.639 0 00-.207-.471zm-1.07 9.919h-4.043v-4.681a.638.638 0 00-.638-.638h-4.256a.638.638 0 00-.638.638v4.681h-4.043V7.93L38.7 1.516l7.009 6.425v9.167z"
            transform="translate(-30.814)"
            fill={props.focused ? colors.focused : "#104251"}
          />
        </G>
      </G>
    </Svg>
  );
}

export default HomeSVG;
