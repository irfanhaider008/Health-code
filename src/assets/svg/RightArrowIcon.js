import * as React from "react"
import Svg, { G, Path } from "react-native-svg"

const RightArrowIcon = (props) => (
    <Svg
        xmlns="http://www.w3.org/2000/svg"
        width={80}
        height={80}
      
    >
        <G>
            <G
                style={{
                    stroke: "none",
                    strokeWidth: 0,
                    strokeDasharray: "none",
                    strokeLinecap: "butt",
                    strokeLinejoin: "miter",
                    strokeMiterlimit: 10,
                    fill: "none",
                    fillRule: "nonzero",
                    opacity: 1,
                }}
            >
                <Path
                    d="M24.25 90a3.499 3.499 0 0 1-2.475-5.974L60.8 45 21.775 5.975a3.5 3.5 0 1 1 4.95-4.95l41.5 41.5a3.499 3.499 0 0 1 0 4.949l-41.5 41.5A3.487 3.487 0 0 1 24.25 90z"
                    style={{
                        stroke: "none",
                        strokeWidth: 1,
                        strokeDasharray: "none",
                        strokeLinecap: "butt",
                        strokeLinejoin: "miter",
                        strokeMiterlimit: 10,
                        fill: "#000",
                        fillRule: "nonzero",
                        opacity: 1,
                    }}
                    transform="translate(1.964 1.964) scale(2.8008)"
                />
            </G>
        </G>
    </Svg>
)

export default RightArrowIcon
