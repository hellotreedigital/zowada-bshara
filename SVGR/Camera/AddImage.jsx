import * as React from "react";
import Svg, { Defs, Pattern, Image, G, Rect } from "react-native-svg";
function AddImageSVG(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      width={40}
      height={40}
      viewBox="0 0 40 40"
      {...props}
    >
      <Defs>
        <Pattern
          id="a"
          preserveAspectRatio="xMidYMid slice"
          width="100%"
          height="100%"
          viewBox="0 0 4288 2848"
        >
          <Image
            width={4288}
            height={2848}
          />
        </Pattern>
      </Defs>
      <G stroke="#fff" strokeWidth={2} fill="url(#a)">
        <Rect width={40} height={40} rx={20} stroke="none" />
        <Rect x={1} y={1} width={38} height={38} rx={19} fill="none" />
      </G>
    </Svg>
  );
}
export default AddImageSVG;