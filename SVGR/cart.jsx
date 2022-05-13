import * as React from "react";
import Svg, { Path } from "react-native-svg";

function CartSVG(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={15.408}
      height={13.241}
      viewBox="0 0 15.408 13.241"
      {...props}
    >
      <Path
        data-name="003-shopping-cart-1"
        d="M14.806 3.856H4.14L3.475.967A.6.6 0 002.889.5H.6a.6.6 0 000 1.2h1.81l2.109 9.163a.6.6 0 00.587.467h8.256a.6.6 0 00.586-.467l1.444-6.274a.6.6 0 00-.586-.733zm-1.923 6.274h-7.3L4.417 5.06h9.633zM7.277 7.595a.6.6 0 01.6-.6h2.708a.6.6 0 110 1.2H7.879a.6.6 0 01-.602-.6zm4.965 5.394a.752.752 0 11-.752-.752.752.752 0 01.753.752zm-4.514 0a.752.752 0 11-.752-.752.752.752 0 01.753.752zm0 0"
        transform="translate(0 -.5)"
        fill="#e54c2e"
      />
    </Svg>
  );
}

export default CartSVG;
