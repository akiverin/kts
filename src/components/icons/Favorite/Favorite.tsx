import * as React from 'react';
import Icon, { IconProps } from '../Icon';

const Favorite: React.FC<IconProps> = (props) => {
  return (
    <Icon {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 4.46572C10.0007 1.83928 6.65975 1.02759 4.1547 3.43263C1.64964 5.83766 1.29697 9.85871 3.2642 12.7032C4.89982 15.0681 9.84978 20.056 11.4721 21.6704C11.6536 21.8511 11.7443 21.9414 11.8502 21.9768C11.9426 22.0077 12.0437 22.0077 12.1361 21.9768C12.242 21.9414 12.3327 21.8511 12.5142 21.6704C14.1366 20.056 19.0865 15.0681 20.7221 12.7032C22.6894 9.85871 22.3797 5.81236 19.8316 3.43263C17.2835 1.05289 13.9993 1.83928 12 4.46572Z"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Icon>
  );
};

export default Favorite;
