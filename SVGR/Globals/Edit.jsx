import * as React from "react";
import Svg, { G, Path } from "react-native-svg";

function EditSVG(props) {
  return (
    <Svg
      data-name="001-edit"
      xmlns="http://www.w3.org/2000/svg"
      width={16.25}
      height={16.25}
      viewBox="0 0 16.25 16.25"
      {...props}
    >
      <G data-name="Group 379">
        <Path
          data-name="Path 1011"
          d="M15.3.952a3.251 3.251 0 00-4.6 0l-9.087 9.087a.635.635 0 00-.163.279L.024 15.445a.635.635 0 00.785.781l5.128-1.457a.635.635 0 00.276-1.059l-3.234-3.242 7.532-7.532 2.8 2.8-5.766 5.75a.635.635 0 00.9.9L15.3 5.55a3.251 3.251 0 000-4.6zM4.551 13.843l-3 .853.841-3.02zM14.4 4.652l-.189.189-2.8-2.8.189-.191a1.982 1.982 0 012.8 2.8z"
          fill="#fff"
        />
      </G>
    </Svg>
  );
}

export default EditSVG;
