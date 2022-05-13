import * as React from "react";
import Svg, { Path } from "react-native-svg";

function RemoveHoursSVG(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={21.247}
      height={21.247}
      viewBox="0 0 21.247 21.247"
      {...props}
    >
      <Path
        d="M7.512 0a7.512 7.512 0 107.512 7.512A7.512 7.512 0 007.512 0zm0 13.772a6.26 6.26 0 116.26-6.26 6.26 6.26 0 01-6.26 6.26zm3.13-6.26a.626.626 0 01-.626.626H8.138v1.878a.626.626 0 11-1.252 0V8.138H5.008a.626.626 0 010-1.252h1.878V5.008a.626.626 0 011.252 0v1.878h1.878a.626.626 0 01.626.626z"
        transform="rotate(45 5.312 12.824)"
        fill="#104251"
      />
    </Svg>
  );
}

export default RemoveHoursSVG;
