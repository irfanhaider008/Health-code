import React from 'react'
import Svg, { Path } from "react-native-svg"

const CalanderSVG = () => {
    return (
        <Svg xmlns="http://www.w3.org/2000/svg" width={15} height={15}>
            <Path
                data-name="Icon material-date-range"
                d="M5 6.75H3.333v1.5H5zm3.333 0H6.667v1.5h1.667zm3.333 0H10v1.5h1.667zm1.667-5.25H12.5V0h-1.667v1.5H4.167V0H2.5v1.5h-.833A1.582 1.582 0 00.008 3L0 13.5A1.589 1.589 0 001.667 15h11.666A1.6 1.6 0 0015 13.5V3a1.6 1.6 0 00-1.667-1.5zm0 12H1.667V5.25h11.666z"
                fill="#11578f"
            />
        </Svg>
    )
}

export default CalanderSVG
