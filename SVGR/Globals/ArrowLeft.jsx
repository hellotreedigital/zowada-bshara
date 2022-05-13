import * as React from "react";
import Svg, { Path } from "react-native-svg";

function ArrowLeftSVG(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={8.51}
      height={15.522}
      viewBox="0 0 8.761 15.522"
      {...props}
    >
      <Path
        data-name="Path 961"
        d="M6.347 0L0 6.347l6.347 6.347"
        fill="none"
        stroke={props.fill ? props.fill : "#e8af2e"}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
      />
    </Svg>
  );
}

export default ArrowLeftSVG;
