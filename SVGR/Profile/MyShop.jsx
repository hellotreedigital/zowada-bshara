import * as React from "react";
import Svg, { G, Rect, Path } from "react-native-svg";
import { SCREEN_HEIGHT } from "../../globals/globals";

function MyShopsSVG(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={SCREEN_HEIGHT * 0.08}
      height={SCREEN_HEIGHT * 0.08}
      viewBox="0 0 60 60"
      {...props}
    >
      <G data-name="Group 283" transform="translate(-287 -300)">
        <Rect
          data-name="Rectangle 1221"
          width={60}
          height={60}
          rx={30}
          transform="translate(287 300)"
          fill="#104251"
        />
        <G data-name="Group 542">
          <Path
            data-name="Path 972"
            d="M41.427 0H22.256l-4.39 6.869v3.447A4.231 4.231 0 0020.025 14v16.048h23.763V13.925a4.23 4.23 0 002.028-3.61V6.869zm-18.1 1.96h17.026l2.694 4.216H20.635zm10.8 26.128h-5.263v-8.994h5.262zm1.96 0V17.135H26.9v10.953h-4.92V14.541h.11a4.221 4.221 0 003.249-1.525 4.223 4.223 0 006.5 0 4.224 4.224 0 006.5 0 4.222 4.222 0 003.249 1.525c.081 0 .161 0 .241-.007v13.554h-5.744zm7.772-17.773a2.269 2.269 0 11-4.538 0h-1.96a2.269 2.269 0 01-4.538 0h-1.96a2.269 2.269 0 11-4.538 0h-1.96a2.269 2.269 0 11-4.538 0v-2.18h24.03v2.181z"
            transform="translate(303 315.952) translate(-17.866)"
            fill="#fff"
          />
        </G>
      </G>
    </Svg>
  );
}

export default MyShopsSVG;
