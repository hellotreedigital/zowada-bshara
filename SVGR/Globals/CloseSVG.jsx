import * as React from "react";
import Svg, { G, Path } from "react-native-svg";

function CloseSVG(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={17.905}
      height={17.905}
      viewBox="0 0 17.905 17.905"
      {...props}
    >
      <G data-name="Group 403">
        <G
          data-name="Group 279"
          transform="translate(-97.086 -145.086) translate(0 3) translate(98.5 143.5)"
          fill="none"
          stroke={props.stroke ? props.stroke : "#E8AF2E"}
          strokeLinecap="round"
          strokeWidth={2}
        >
          <Path data-name="Line 25" d="M0 15.077L15.077 0" />
          <Path data-name="Line 26" d="M15.077 15.077L0 0" />
        </G>
      </G>
    </Svg>
  );
}

export default CloseSVG;
