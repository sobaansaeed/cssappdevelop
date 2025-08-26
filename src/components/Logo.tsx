import React from 'react';
import Image from 'next/image';

interface LogoProps {
  size?: number;
  className?: string;
  showText?: boolean;
}

const Logo: React.FC<LogoProps> = ({ size = 32, className = '', showText = true }) => {
  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      <Image
        src="/logo.svg"
        alt="CSS KRO Logo"
        width={size}
        height={size}
        className="flex-shrink-0"
      />
      {showText && (
        <span className={`text-xl font-bold ${className.includes('text-white') ? 'text-white' : 'text-gray-900'}`}>CSS KRO</span>
      )}
    </div>
  );
};

export default Logo;
