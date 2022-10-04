import * as React from "react"
import Svg, { Path } from "react-native-svg"

function CrossMark() {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={17.53}
      height={17.53}
     
    >
      <Path
        data-name="Icon metro-cross"
        d="M17.37 14.083l-5.318-5.318 5.318-5.318a.549.549 0 000-.775L14.857.16a.549.549 0 00-.775 0L8.765 5.478 3.447.16a.549.549 0 00-.775 0L.16 2.672a.549.549 0 000 .775l5.318 5.318L.16 14.083a.549.549 0 000 .775l2.512 2.514a.549.549 0 00.775 0l5.318-5.318 5.318 5.318a.549.549 0 00.774 0l2.512-2.512a.549.549 0 000-.775z"
        fill="#e91c1c"
      />
    </Svg>
  )
}

export default CrossMark
