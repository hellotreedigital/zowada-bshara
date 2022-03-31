import * as React from "react";
import Svg, { Path } from "react-native-svg";

function AppleSVG(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      x="3px"
      y="0px"
      viewBox="0 0 12 18"
      {...props}
      fill="black"
      width={20.519}
      height={24.299}
    >
      <Path d="M11.6 10.1c-.4-.3-1.4-.8-1.4-2.3 0-1.3.8-1.9 1.3-2.2l.3-.2-.2-.4c-1-1.4-2.5-1.6-3.1-1.6-.7 0-1.3.2-1.8.5-.2 0-.5.1-.6.1-.2 0-.5-.1-.8-.2-.4-.2-1-.4-1.4-.4-1.1 0-3.9.8-3.9 4.5 0 2.3 1.8 6.7 4 6.7.6 0 1.1-.2 1.4-.3.3-.1.6-.2.8-.2.5 0 .8.1 1.1.2.4.1.7.3 1.2.3 2 0 3.5-3.8 3.5-4 0-.3-.2-.4-.4-.5zM8.7 0C7.4 0 5.8 1.7 6 3.2c1.4.1 2.8-1.3 2.7-3.2z" />
    </Svg>
  );
}

export default AppleSVG;
