import * as React from "react";
import Svg, { Path } from "react-native-svg";
import { colors } from "../../globals/colors";

function SearchSVG(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={14.477}
      height={14.477}
      viewBox="0 0 14.477 14.477"
      {...props}
    >
      <Path
        d="M14.268 13.416l-3.6-3.6a6.034 6.034 0 10-.852.852l3.6 3.6a.6.6 0 10.852-.852zM6.011 10.83a4.819 4.819 0 114.819-4.819 4.819 4.819 0 01-4.819 4.819z"
        transform="translate(.032 .032)"
        fill={props.color? props.color : props.secondary ? colors.focused : colors.dark_blue}
      />
    </Svg>
  );
}

export default SearchSVG;
