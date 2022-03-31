import * as React from "react";
import Svg, { G, Circle } from "react-native-svg";

function TakeImageSVG(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={60}
      height={60}
      viewBox="0 0 60 60"
      {...props}
    >
      <G
        data-name="Ellipse 122"
        fill="rgba(255,255,255,0.5)"
        stroke="#f2f5f6"
        strokeWidth={4}
      >
        <Circle cx={30} cy={30} r={30} stroke="none" />
        <Circle cx={30} cy={30} r={28} fill="none" />
      </G>
    </Svg>
  );
}

export default TakeImageSVG;
