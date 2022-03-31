import * as React from "react";
import Svg, { G, Path } from "react-native-svg";
import { colors } from "../../globals/colors";

function MenuSVG(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={23}
      height={14}
      viewBox="0 0 23 14"
      {...props}
    >
      <G
        data-name="Group 99"
        transform="translate(-149.5 -599.5)"
        fill="none"
        stroke={props.focused ? colors.focused : "#104251"}
        strokeLinecap="round"
        strokeWidth={2}
      >
        <Path
          data-name="Line 5"
          transform="translate(150.5 600.5)"
          d="M0 0L21 0"
        />
        <Path
          data-name="Line 6"
          transform="translate(150.5 606.5)"
          d="M0 0L21 0"
        />
        <Path
          data-name="Line 7"
          transform="translate(150.5 612.5)"
          d="M0 0L21 0"
        />
      </G>
    </Svg>
  );
}

export default MenuSVG;
