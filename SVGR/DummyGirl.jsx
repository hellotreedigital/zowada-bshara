import * as React from "react";
import Svg, { Defs, Pattern, Image, Circle } from "react-native-svg";
function DummyGirlSVG(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      width={50}
      height={50}
      viewBox="0 0 50 50"
      {...props}
    >
      <Defs>
        <Pattern id="a" width={1} height={1} viewBox="0 5.164 50 50">
          <Image
            preserveAspectRatio="xMidYMid slice"
            width={50}
            height={75}
          />
        </Pattern>
      </Defs>
      <Circle cx={25} cy={25} r={25} fill="url(#a)" />
    </Svg>
  );
}
export default DummyGirlSVG;