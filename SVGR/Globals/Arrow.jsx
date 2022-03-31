import * as React from "react";
import Svg, { G, Path } from "react-native-svg";

function ArrowSVG(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={8.761}
      height={15.522}
      viewBox="0 0 8.761 15.522"
      {...props}
    >
      <G data-name="Back Arrow">
        <Path
          data-name="Path 3"
          d="M6.347 0L0 6.347l6.347 6.347"
          fill="none"
          stroke={props.fill ? props.fill : "#fff"}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          transform="rotate(180 3.88 7.054)"
        />
      </G>
    </Svg>
  );
}

export default ArrowSVG;
