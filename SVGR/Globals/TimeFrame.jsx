import * as React from "react";
import Svg, { G, Path } from "react-native-svg";

function TimeFrameSVG(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={16.342}
      height={16.342}
      viewBox="0 0 16.342 16.342"
      {...props}
    >
      <G data-name="Group 445">
        <G data-name="Group 444" fill="#e54c2e">
          <Path
            data-name="Path 4415"
            d="M25.238 17.067a8.171 8.171 0 108.171 8.171 8.171 8.171 0 00-8.171-8.171zm0 15.174a7 7 0 117-7 7 7 0 01-7 7z"
            transform="translate(-244.087 -257.087) translate(244.087 257.087) translate(-17.067 -17.067)"
          />
          <Path
            data-name="Path 4416"
            d="M107.653 102.4a.584.584 0 00-.584.584v4.085h-4.085a.584.584 0 100 1.167h4.669a.584.584 0 00.584-.584v-4.669a.584.584 0 00-.584-.583z"
            transform="translate(-244.087 -257.087) translate(244.087 257.087) translate(-99.482 -99.482)"
          />
        </G>
      </G>
    </Svg>
  );
}

export default TimeFrameSVG;
