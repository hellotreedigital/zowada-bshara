import * as React from "react";
import { Platform } from "react-native";
import Svg, { Text, TSpan } from "react-native-svg";

function PlusSVG(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={11}
      height={16}
      viewBox="0 0 11 16"
      {...props}
    >
      <Text
        data-name="+"
        transform="translate(1 12)"
        fill="#e54c2e"
        stroke="#e54c2e"
        strokeWidth={1}
        fontSize={14}
        fontFamily="Helvetica"
      >
        <TSpan x={0} y={Platform.OS == "android" ? 1 : 0}>
          {"+"}
        </TSpan>
      </Text>
    </Svg>
  );
}

export default PlusSVG;
