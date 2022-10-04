import React from 'react';
import Svg, {Path, Text, TSpan} from 'react-native-svg';

const HiSvgWhite = () => {
  return (
    <Svg
      data-name="Group 1317"
      xmlns="http://www.w3.org/2000/svg"
      width={43.871}
      height={42.635}
      viewBox="0 0 43.871 42.635"
    >
      <Path
        d="M30.338-13.129c1.647 0 2.55-.687 3.707-2.472l3.09-4.943h4.943c6 0 9.886-3.944 9.886-9.886v-15.448c0-5.942-3.885-9.886-9.886-9.886H17.98c-5.981 0-9.886 3.925-9.886 9.886v15.448c0 5.962 3.905 9.886 9.886 9.886h4.943L26.63-15.6c1.118 1.745 2.06 2.471 3.708 2.471z"
        transform="translate(-8.093 55.764)"
        fill="#f6f5ff"
      />
      <Text
        transform="translate(21.436 22.818)"
        fill="#464646"
        fontSize={15}
    //    fontFamily="Helvetica-Bold, Helvetica"
        fontWeight={700}>
        <TSpan x={-7.5} y={0}>
          {'Hi'}
        </TSpan>
      </Text>
    </Svg>
  );
};
export default HiSvgWhite;
