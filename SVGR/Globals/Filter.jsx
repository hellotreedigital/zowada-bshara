import * as React from "react";
import Svg, { G, Path } from "react-native-svg";

function FilterSVG(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={22.5}
      height={11.5}
      viewBox="0 0 22.5 11.5"
      {...props}
    >
      <G
        data-name="Group 105"
        transform="translate(-149.75 -599.75)"
        fill="none"
        stroke="#e54c2e"
        strokeLinecap="round"
        strokeWidth={1.5}
      >
        <Path
          data-name="Line 5"
          transform="translate(150.5 600.5)"
          d="M0 0L21 0"
        />
        <Path
          data-name="Line 6"
          transform="translate(153.5 605.5)"
          d="M0 0L15 0"
        />
        <Path data-name="Path 8" d="M156.264 610.5h9.471" />
      </G>
    </Svg>
  );
}

export default FilterSVG;
