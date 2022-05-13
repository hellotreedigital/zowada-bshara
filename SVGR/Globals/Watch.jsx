import * as React from "react";
import Svg, { G, Path } from "react-native-svg";

function WatchSVG(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={10.096}
      height={10.096}
      viewBox="0 0 10.096 10.096"
      {...props}
    >
      <G data-name="Group 445">
        <G data-name="Group 444" fill="#fff">
          <Path
            data-name="Path 4415"
            d="M22.115 17.067a5.048 5.048 0 105.048 5.048 5.048 5.048 0 00-5.048-5.048zm0 9.375a4.327 4.327 0 114.327-4.327 4.327 4.327 0 01-4.327 4.327z"
            transform="translate(-244.087 -257.087) translate(244.087 257.087) translate(-17.067 -17.067)"
          />
          <Path
            data-name="Path 4416"
            d="M105.645 102.4a.361.361 0 00-.361.361v2.524h-2.524a.361.361 0 100 .721h2.885a.361.361 0 00.361-.361v-2.885a.361.361 0 00-.361-.36z"
            transform="translate(-244.087 -257.087) translate(244.087 257.087) translate(-100.597 -100.597)"
          />
        </G>
      </G>
    </Svg>
  );
}

export default WatchSVG;
