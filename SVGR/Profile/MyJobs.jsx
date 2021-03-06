import * as React from "react";
import Svg, { Rect, Path } from "react-native-svg";

function MyJobsSVG(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={60}
      height={60}
      viewBox="0 0 60 60"
      {...props}
    >
      <Rect
        data-name="Rectangle 1219"
        width={60}
        height={60}
        rx={30}
        fill="#f27e30"
      />
      <Path
        data-name="002-portfolio"
        d="M26.937 3.252h-7.375v-.813A2.441 2.441 0 0017.124 0h-6.5a2.441 2.441 0 00-2.441 2.439v.813H.813A.815.815 0 000 4.064v17.883a2.441 2.441 0 002.439 2.439h22.867a2.441 2.441 0 002.439-2.439V4.078a.789.789 0 00-.808-.826zM9.808 2.439a.814.814 0 01.813-.813h6.5a.814.814 0 01.813.813v.813H9.808zm16 2.439L23.28 12.45a.811.811 0 01-.771.556h-4.572v-.813a.813.813 0 00-.813-.813h-6.5a.813.813 0 00-.813.813v.813H5.236a.811.811 0 01-.771-.556L1.941 4.877zm-9.493 8.128v1.626h-4.881v-1.627zm9.808 8.941a.814.814 0 01-.813.813H2.439a.814.814 0 01-.813-.813V9.073l1.3 3.891a2.435 2.435 0 002.313 1.667h4.569v.813a.813.813 0 00.813.813h6.5a.813.813 0 00.813-.813v-.813h4.572a2.435 2.435 0 002.313-1.667l1.3-3.891zm0 0"
        transform="translate(16 16)"
        fill="#fff"
      />
    </Svg>
  );
}

export default MyJobsSVG;
