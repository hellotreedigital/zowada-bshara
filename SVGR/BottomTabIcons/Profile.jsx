import * as React from "react";
import Svg, { Path } from "react-native-svg";
import { colors } from "../../globals/colors";

function ProfileSVG(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={20.945}
      height={20.945}
      viewBox="0 0 20.945 20.945"
      {...props}
    >
      <Path
        data-name="004-user"
        d="M17.878 3.067A10.473 10.473 0 003.067 17.878 10.473 10.473 0 0017.878 3.067zM5.25 18.1a5.3 5.3 0 0110.445 0 9.225 9.225 0 01-10.445 0zm1.893-8.942a3.33 3.33 0 113.33 3.33 3.334 3.334 0 01-3.33-3.33zm9.615 8.088a6.54 6.54 0 00-3.8-4.269 4.557 4.557 0 10-4.966 0 6.54 6.54 0 00-3.8 4.269 9.245 9.245 0 1112.571 0zm0 0"
        fill={props.focused ? colors.focused : "#104251"}
      />
    </Svg>
  );
}

export default ProfileSVG;
