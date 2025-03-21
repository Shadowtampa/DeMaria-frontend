import React from 'react';
import './Button.less';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'outline' | 'danger';
    size?: 'small' | 'large';
    iconLeft?: React.ReactNode;
    iconRight?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
    variant = 'primary',
    size,
    className,
    children,
    iconLeft,
    iconRight,
    ...props
}) => {
    const classes = [
        'button',
        `button--${variant}`,
        size && `button--${size}`,
        className
    ].filter(Boolean).join(' ');

    return (
        <button className={classes} {...props}>
            {iconLeft && <span className="icon icon--left">{iconLeft}</span>}
            {children}
            {iconRight && <span className="icon icon--right">{iconRight}</span>}
        </button>
    );
}; 