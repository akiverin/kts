import * as React from 'react'
import Icon, { IconProps } from '../Icon';

const ArrowDownIcon: React.FC<IconProps> = (props) => {
    return (
        <Icon {...props}>
            <path d="M2.33563 8.74738L3.66436 7.25256L12 14.662L20.3356 7.25256L21.6644 8.74738L12 17.3379L2.33563 8.74738Z" fill="currentColor" />
        </Icon>
    )
}

export default ArrowDownIcon;
