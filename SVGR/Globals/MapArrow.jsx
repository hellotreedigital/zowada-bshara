import * as React from "react";
import Svg, { Path } from "react-native-svg";

function MapArrowSVG(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={18}
      height={24}
      viewBox="0 0 18 24"
      {...props}
    >
      <Path
        data-name="001-location-pin"
        d="M12 0a9.043 9.043 0 00-9 9.065c0 7.1 8.154 14.437 8.5 14.745a.752.752 0 001 0c.346-.31 8.5-7.642 8.5-14.745A9.043 9.043 0 0012 0zm0 14a5 5 0 115-5 5.006 5.006 0 01-5 5z"
        transform="translate(-3)"
        fill="#104251"
      />
    </Svg>
  );
}

export default MapArrowSVG;
