import * as React from "react";
import Svg, { G, Path } from "react-native-svg";
import { colors } from "../../globals/colors";

function StoreSVG(props) {
  return (
    <Svg
      data-name="003-shop"
      xmlns="http://www.w3.org/2000/svg"
      width={17.123}
      height={18.408}
      viewBox="0 0 17.123 18.408"
      {...props}
    >
      <G data-name="Group 281">
        <Path
          data-name="Path 972"
          d="M32.3 0H20.555l-2.689 4.208v2.111a2.592 2.592 0 001.323 2.258v9.83h14.557V8.531a2.591 2.591 0 001.243-2.211V4.208zM21.213 1.2h10.429l1.651 2.583H19.562zm6.614 16.007H24.6V11.7h3.223zm1.2 0V10.5H23.4v6.71h-3.011v-8.3h.067a2.586 2.586 0 001.99-.934 2.587 2.587 0 003.981 0 2.587 2.587 0 003.981 0 2.586 2.586 0 001.99.934h.148v8.3h-3.519zm4.761-10.888a1.39 1.39 0 11-2.78 0h-1.2a1.39 1.39 0 01-2.78 0h-1.2a1.39 1.39 0 11-2.78 0h-1.2a1.39 1.39 0 11-2.78 0V4.984h14.72v1.335z"
          transform="translate(-17.866)"
          fill={props.focused ? colors.focused : "#104251"}
        />
      </G>
    </Svg>
  );
}

export default StoreSVG;
