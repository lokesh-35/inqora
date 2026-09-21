import React from 'react';

interface ConsensusLogoProps {
  className?: string;
  size?: number;
  withText?: boolean;
  textSize?: string;
  variant?: 'color' | 'monochrome';
}

export const ConsensusLogo: React.FC<ConsensusLogoProps> = ({
  className = '',
  size = 28,
  withText = false,
  textSize = 'text-xl',
  variant = 'color',
}) => {
  return (
    <div className={`inline-flex items-center gap-1.5 select-none ${className}`}>
      <img 
        src="/inqora_logo.png" 
        alt="Inqora Logo" 
        width={size * 1.6} 
        height={size * 1.6} 
        className="object-contain rounded-md mix-blend-multiply"
      />

      {withText && (
        <span className={`font-heading font-bold tracking-tight text-[#1D4A49] ${textSize}`}>
          Inqora
        </span>
      )}
    </div>
  );
};
