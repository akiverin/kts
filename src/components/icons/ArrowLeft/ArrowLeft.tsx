import * as React from 'react';
import Icon, { IconProps } from '../Icon';

const ArrowLeft: React.FC<IconProps> = (props) => {
  return (
    <Icon {...props}>
      <path
        d="M15.0898 19.9201L8.56984 13.4001C7.79984 12.6301 7.79984 11.3701 8.56984 10.6001L15.0898 4.08008"
        stroke="currentColor"
        strokeWidth="1.125"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Icon>
  );
};

export default ArrowLeft;
