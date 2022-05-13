import * as React from "react";
import Svg, { Path, Circle } from "react-native-svg";

function CartSVG(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={16}
      height={11.5}
      viewBox="0 0 16 11.5"
      {...props}
    >
      <Path
        data-name="003-shopping-cart-1"
        d="M12.859 3.415H3.6L3.018.905A.523.523 0 002.509.5H.523a.523.523 0 000 1.045h1.57L3.925 9.5a.523.523 0 00.509.405H11.6a.523.523 0 00.509-.405l1.254-5.449a.523.523 0 00-.504-.636zm-1.67 5.449H4.85L3.837 4.46H12.2zm-4.868-2.2a.523.523 0 01.523-.523H9.2a.523.523 0 010 1.045H6.843a.523.523 0 01-.522-.524zm4.313 4.685a.653.653 0 11-.653-.653.653.653 0 01.652.651zm-3.921 0a.653.653 0 11-.653-.653.653.653 0 01.653.651zm0 0"
        transform="translate(0 -.5)"
        fill="#104251"
      />
      <Circle
        data-name="Ellipse 85"
        cx={2.5}
        cy={2.5}
        r={2.5}
        transform="translate(11 1)"
        fill="#e54c2e"
      />
    </Svg>
  );
}

export default CartSVG;
