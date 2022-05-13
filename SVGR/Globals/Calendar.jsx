import * as React from "react";
import Svg, { Path } from "react-native-svg";

function CalendarSVG(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={8.979}
      height={8.979}
      viewBox="0 0 8.979 8.979"
      {...props}
    >
      <Path
        data-name="Path 4414"
        d="M25.084 18.029h-.962v-.641a.321.321 0 00-.641 0v.641h-3.848v-.641a.321.321 0 00-.641 0v.641h-.962a.962.962 0 00-.962.962v6.093a.962.962 0 00.962.962h7.055a.962.962 0 00.962-.962v-6.093a.962.962 0 00-.963-.962zm-7.055.641h.962v.641a.321.321 0 10.641 0v-.641h3.848v.641a.321.321 0 10.641 0v-.641h.962a.321.321 0 01.321.321v1.283h-7.7v-1.283a.321.321 0 01.325-.321zm7.055 6.735h-7.055a.321.321 0 01-.321-.321v-4.169h7.7v4.169a.321.321 0 01-.324.321z"
        transform="translate(-17.067 -17.067)"
        fill="#fff"
      />
    </Svg>
  );
}

export default CalendarSVG;
