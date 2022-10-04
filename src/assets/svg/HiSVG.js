import React from 'react'
import Svg, { Path, Text, TSpan } from "react-native-svg"

const HiSVG = () => {
    return (
        <Svg xmlns="http://www.w3.org/2000/svg" width={71} height={69} >
        <Path
          d="M36 69c2.666 0 4.127-1.112 6-4l5-8h8c9.712 0 16-6.383 16-16V16c0-9.617-6.288-16-16-16H16C6.32 0 0 6.352 0 16v25c0 9.648 6.32 16 16 16h8l6 8c1.807 2.825 3.334 4 6 4z"
          fill="#0179c2"
        />
        <Text
          transform="translate(36 36)"
          fill="#fff"
          fontSize={24}
       //   fontFamily="SegoeUI-Bold, Segoe UI"
          fontWeight={700}
        >
          <TSpan x={-12.604} y={0}>
            {"Hi"}
          </TSpan>
        </Text>
      </Svg>
    )
}
export default HiSVG
