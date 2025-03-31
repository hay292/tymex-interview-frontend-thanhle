import React from 'react';
import { Button as AntButton } from 'antd';
import type { ButtonProps } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

type CustomVariant = 'primary' | 'secondary' | 'outline' | 'text';

interface CustomButtonProps extends Omit<ButtonProps, 'className' | 'variant'> {
  className?: string;
  width?: string;
  height?: string;
  loading?: boolean;
  icon?: React.ReactNode;
  variant?: CustomVariant;
}

const CustomButton: React.FC<CustomButtonProps> = ({
  className = '',
  width = '',
  height = 'h-[2.75rem]',
  loading = false,
  icon,
  variant = 'primary',
  children,
  ...props
}) => {
  const baseClasses = 'flex items-center justify-center transition-all duration-200';
  
  const variantClasses = {
    primary: 'btn-gradient text-white hover:opacity-90',
    secondary: 'bg-[#1A1A1D] text-white hover:bg-[#2A2A2D]',
    outline: 'border border-yellow-400 text-yellow-400 hover:bg-yellow-400/10',
    text: 'text-yellow-400 hover:text-yellow-300'
  };

  const buttonClasses = `
    ${baseClasses}
    ${variantClasses[variant]}
    ${height}
    ${width}
    ${className}
  `.trim();

  return (
    <AntButton
      className={buttonClasses}
      loading={loading}
      icon={loading ? <LoadingOutlined /> : icon}
      {...props}
    >
      {children}
    </AntButton>
  );
};

export default CustomButton;