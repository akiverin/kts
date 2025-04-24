import * as React from 'react';
import Icon, { IconProps } from '../Icon';

const ArrowRight: React.FC<IconProps> = (props) => {
  return (
    <Icon {...props}>
      <path
        d="M8.91016 19.9201L15.4302 13.4001C16.2002 12.6301 16.2002 11.3701 15.4302 10.6001L8.91016 4.08008"
        stroke="currentColor"
        strokeWidth="1.125"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Icon>
  );
};

export default ArrowRight;
