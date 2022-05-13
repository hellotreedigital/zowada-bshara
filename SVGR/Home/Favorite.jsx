import * as React from "react";
import Svg, { Path, G } from "react-native-svg";

function FavoriteSVG(props) {
  return (
    <Svg
      data-name="Group 284"
      xmlns="http://www.w3.org/2000/svg"
      width={13.983}
      height={12.551}
      viewBox="0 0 12.983 11.551"
      {...props}
    >
      {!props.isLiked ? (
        <Path
          data-name="Path 984"
          d="M761.492 369.551a.762.762 0 01-.5-.189c-.524-.459-1.03-.89-1.476-1.27a27.464 27.464 0 01-3.224-3.026A4.833 4.833 0 01755 361.9a4.058 4.058 0 011.03-2.771 3.492 3.492 0 012.6-1.13 3.266 3.266 0 012.04.7.826.826 0 101.649 0 3.266 3.266 0 012.04-.7 3.492 3.492 0 012.6 1.13 4.058 4.058 0 011.03 2.771 4.832 4.832 0 01-1.288 3.163 27.453 27.453 0 01-3.223 3.025c-.447.381-.953.813-1.479 1.272a.762.762 0 01-.5.188zm-2.865-10.79a2.739 2.739 0 00-2.038.885 3.3 3.3 0 00-.829 2.256 4.066 4.066 0 001.113 2.678 27 27 0 003.127 2.932c.448.382.956.814 1.484 1.276.531-.463 1.04-.9 1.489-1.278a27.021 27.021 0 003.131-2.932 4.066 4.066 0 001.113-2.678 3.3 3.3 0 00-.829-2.256 2.739 2.739 0 00-2.038-.885 2.522 2.522 0 00-1.575.545 3.69 3.69 0 00-.878 1.016.48.48 0 01-.825 0 3.687 3.687 0 00-.878-1.016 2.522 2.522 0 00-1.575-.545zm0 0"
          transform="translate(-755 -358)"
          fill="#e54c2e"
        />
      ) : (
        <G data-name="001-empathy">
          <G data-name="Group 4147">
            <G data-name="Group 4146">
              <Path
                data-name="Path 5099"
                d="M85.068.9a3.979 3.979 0 00-2.578.939A3.979 3.979 0 0079.912.9 3.855 3.855 0 0076 4.686a5.885 5.885 0 001.011 3.184 10.928 10.928 0 002.148 2.386 16.746 16.746 0 003.086 2.072l.246.121.246-.121a16.747 16.747 0 003.086-2.072 10.928 10.928 0 002.146-2.386 5.885 5.885 0 001.011-3.184A3.855 3.855 0 0085.068.9z"
                transform="translate(-76 -.9) translate(76 .9) translate(-76 -.9)"
                fill="#e54c2e"
              />
            </G>
          </G>
        </G>
      )}
    </Svg>
  );
}

export default FavoriteSVG;
