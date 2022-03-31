import * as React from "react";
import Svg, { G, Path } from "react-native-svg";
import { colors } from "../../globals/colors";

function ExpertSVG(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={33.331}
      height={26.923}
      viewBox="0 0 33.331 15.923"
      {...props}
    >
      <G
        data-name="Group 352"
        fill="none"
        stroke={props.focused ? colors.focused : "#104251"}
        strokeWidth={1.5}
      >
        <Path
          data-name="Path 1007"
          d="M227.121 21.464h-2.292a.715.715 0 01-.748-.453l-.707-2.175a.788.788 0 00-1.5 0l-.707 2.175a.715.715 0 01-.747.453h-2.281a.838.838 0 00-.462 1.5l1.852 1.336a.778.778 0 01.285.873l-.745 2.161a.794.794 0 00-.04.28.818.818 0 001.287.592l1.852-1.336a.791.791 0 01.924 0l1.851 1.336a.819.819 0 001.288-.592.793.793 0 00-.04-.28l-.746-2.161a.778.778 0 01.286-.873l1.852-1.336a.838.838 0 00-.462-1.5zm0 0"
          transform="translate(-205.964 -17.546)"
        />
        <Path
          data-name="Path 1008"
          d="M237.74 25.81h-2.289a.715.715 0 01-.747-.452l-.707-2.175a.788.788 0 00-1.5 0l-.707 2.175a.716.716 0 01-.748.452h-2.289a.838.838 0 00-.462 1.5l1.851 1.336a.778.778 0 01.286.873l-.745 2.161a.8.8 0 00-.04.28.818.818 0 001.288.593l1.852-1.336a.789.789 0 01.924 0l1.852 1.336a.819.819 0 001.288-.593.789.789 0 00-.04-.28l-.746-2.161a.778.778 0 01.286-.873l1.851-1.336a.838.838 0 00-.458-1.5zm0 0"
          transform="translate(-205.964 -17.546)"
        />
        <Path
          data-name="Path 1009"
          d="M216.502 25.81h-2.289a.716.716 0 01-.748-.452l-.707-2.175a.788.788 0 00-1.5 0l-.707 2.175a.715.715 0 01-.747.452h-2.284a.838.838 0 00-.462 1.5l1.851 1.336a.778.778 0 01.286.873l-.745 2.161a.8.8 0 00-.04.28.818.818 0 001.288.593l1.852-1.336a.789.789 0 01.924 0l1.852 1.336a.819.819 0 001.288-.593.79.79 0 00-.04-.28l-.746-2.161a.778.778 0 01.286-.873l1.852-1.336a.838.838 0 00-.464-1.5zm0 0"
          transform="translate(-205.964 -17.546)"
        />
      </G>
    </Svg>
  );
}

export default ExpertSVG;
