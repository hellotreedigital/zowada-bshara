import * as React from "react";
import Svg, { Path } from "react-native-svg";

function ShareSVG(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={17.875}
      height={19.5}
      viewBox="0 0 17.875 19.5"
      {...props}
    >
      <Path
        data-name="Path 25"
        d="M739.828 297.406a3.04 3.04 0 00-2.293 1.044l-6.591-3.758a3.038 3.038 0 000-1.886l6.591-3.758a3.038 3.038 0 10-.6-1.059l-6.591 3.758a3.047 3.047 0 100 4l6.591 3.757a3.047 3.047 0 102.9-2.1zm0-12.187a1.828 1.828 0 11-1.828 1.828 1.83 1.83 0 011.828-1.828zm-11.781 10.359a1.828 1.828 0 111.828-1.828 1.83 1.83 0 01-1.828 1.828zm11.781 6.7a1.828 1.828 0 111.828-1.828 1.83 1.83 0 01-1.828 1.831z"
        transform="translate(-725 -284)"
        fill="#fff"
      />
    </Svg>
  );
}

export default ShareSVG;
