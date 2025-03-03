import React from 'react';
import { Gamepad2 } from 'lucide-react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ size = 'md', className = '' }) => {
  const sizeClasses = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-2xl',
  };

  const iconSizes = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
  };

  return (
    <div className={`flex items-center justify-center ${className}`}>
      <div className="bg-accent-purple p-2 rounded-lg mr-2">
        <Gamepad2 className={`${iconSizes[size]} text-white`} />
      </div>
      <span className={`font-bold ${sizeClasses[size]} tracking-tight`}>
        Game<span className="text-accent-purple">Glow</span>
      </span>
    </div>
  );
};

export default Logo;
