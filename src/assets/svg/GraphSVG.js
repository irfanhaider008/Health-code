import * as React from "react"
import Svg, { Path, G ,Rect} from "react-native-svg"

const GraphSVG = () => {
    return (
        <Svg xmlns="http://www.w3.org/2000/svg" width={13} height={13} >
            <G transform="translate(-328 -441)">
                <Rect
                    data-name="Rectangle 3891"
                    width={13}
                    height={13}
                    rx={1}
                    transform="translate(328 441)"
                    fill="#cce4f3"
                />
                <Path
                    data-name="Icon open-graph"
                    d="M337.896 442.696l-3.537 3.5-1.163-1.168-3.5 3.532 1.166 1.166 2.334-2.367 1.163 1.166 4.663-4.663zm-8.2 8.16v1.166h9.326v-1.166z"
                    fill="#0077c1"
                />
            </G>
        </Svg>
    )
}

export default GraphSVG