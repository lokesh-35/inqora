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
  const primaryColor = variant === 'monochrome' ? 'currentColor' : '#163A35';
  const secondaryColor = variant === 'monochrome' ? 'currentColor' : '#2F6F68';
  const accentColor = variant === 'monochrome' ? 'currentColor' : '#C7A66B';

  return (
    <div className={`inline-flex items-center gap-2.5 select-none ${className}`}>
      {/* Abstract Research Emblem: Open Book Folio + Research Lens + Evidence Node */}
      <svg
        width={size}
        height={size}
        viewBox="0 0 36 36"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0"
        aria-hidden="true"
      >
        {/* Left folio / book spine */}
        <path
          d="M 6 8.5 C 11 7 15 9.5 17.5 12.5 V 29.5 C 15 27 11 25.5 6 27 V 8.5 Z"
          fill={primaryColor}
        />
        {/* Right folio / research lens arc forming abstract R */}
        <path
          d="M 18.5 12.5 C 21 9.5 25 7 30 8.5 V 27 C 25 25.5 21 27 18.5 29.5 V 12.5 Z"
          fill={secondaryColor}
          fillOpacity="0.9"
        />
        {/* Upper precision lens aperture ring */}
        <circle
          cx="22.5"
          cy="15"
          r="4.2"
          stroke={accentColor}
          strokeWidth="1.8"
          fill="none"
        />
        {/* Evidence nexus node */}
        <circle
          cx="22.5"
          cy="15"
          r="1.4"
          fill={accentColor}
        />
      </svg>

      {withText && (
        <span className={`font-heading font-bold tracking-tight text-[#163A35] ${textSize}`}>
          REXA AI
        </span>
      )}
    </div>
  );
};

