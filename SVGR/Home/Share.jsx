import * as React from "react";
import Svg, { G, Path } from "react-native-svg";

function ShareSVG(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={13.928}
      height={12.106}
      viewBox="0 0 13.928 12.106"
      {...props}
    >
      <G data-name="001-send">
        <Path
          data-name="Path 19"
          d="M13.919 33.986a.408.408 0 00-.544-.467L.263 38.524a.408.408 0 000 .762l3.683 1.423v4.481a.408.408 0 00.772.184l1.523-3.024 3.718 2.759a.408.408 0 00.633-.209c3.471-11.38 3.321-10.885 3.327-10.914zm-3.236 1.434L4.3 39.969l-2.753-1.061zm-5.922 5.219l5.567-3.965c-4.791 5.054-4.541 4.788-4.561 4.816s.054-.121-1.006 1.983zm5.219 3.47L6.708 41.68l5.917-6.242z"
          transform="translate(-1.001 -34.492) translate(1 1)"
          fill={props.color ? props.color : "#e54c2e"}
        />
      </G>
    </Svg>
  );
}

export default ShareSVG;
