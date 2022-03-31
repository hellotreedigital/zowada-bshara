import * as React from "react";
import Svg, { Defs, G, Circle, Path } from "react-native-svg";

function EditProfileSVG(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={39}
      height={39}
      viewBox="0 0 39 39"
      {...props}
    >
      <Defs></Defs>
      <G data-name="Group 466">
        <G
          transform="translate(-13.5 -20.5) translate(13.5 20.5)"
          filter="url(#a)"
        >
          <Circle
            data-name="Ellipse 7"
            cx={15}
            cy={15}
            r={15}
            transform="translate(4.5 4.5)"
            fill="#fff"
          />
        </G>
        <G data-name="001-edit">
          <G data-name="Group 379">
            <Path
              data-name="Path 1011"
              d="M11.768.733a2.5 2.5 0 00-3.537 0l-6.99 6.99a.488.488 0 00-.125.214l-1.1 3.944a.488.488 0 00.6.6l3.944-1.12a.488.488 0 00.212-.814l-2.48-2.495 5.794-5.793 2.155 2.155-4.436 4.423a.488.488 0 00.69.691l5.273-5.258a2.5 2.5 0 000-3.537zM3.5 10.648l-2.308.652.647-2.323zm7.577-7.07l-.146.145-2.155-2.155.145-.145a1.524 1.524 0 012.156 2.155z"
              fill="#e54c2e"
              transform="translate(-13.5 -20.5) translate(27 34)"
            />
          </G>
        </G>
      </G>
    </Svg>
  );
}

export default EditProfileSVG;
