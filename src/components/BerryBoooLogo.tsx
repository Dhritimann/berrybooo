import React from 'react';

export const BerryBoooLogo: React.FC<{ className?: string }> = ({ className = "w-10 h-10" }) => {
  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Minimal Premium Organic Logo */}
      <defs>
        <linearGradient id="berry-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="hsl(var(--primary))" />
          <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0.8" />
        </linearGradient>
        <filter id="soft-shadow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur in="SourceAlpha" stdDeviation="2" />
          <feOffset dx="1" dy="1" result="offsetblur" />
          <feComponentTransfer>
            <feFuncA type="linear" slope="0.2" />
          </feComponentTransfer>
          <feMerge>
            <feMergeNode />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Main Berry Shape - Sophisticated organic curve */}
      <path
        d="M50 85C70 85 82 68 82 48C82 28 70 15 50 15C30 15 18 28 18 48C18 68 30 85 50 85Z"
        fill="url(#berry-grad)"
        filter="url(#soft-shadow)"
      />

      {/* Minimal Leaf - Single elegant stroke */}
      <path
        d="M50 22C50 22 52 5 65 5C65 5 55 7 50 22Z"
        fill="#22C55E"
      />
      
      {/* Premium Shine - Subtle accent */}
      <path
        d="M35 35C38 32 42 30 46 30"
        stroke="white"
        strokeWidth="3"
        strokeLinecap="round"
        opacity="0.2"
      />
    </svg>
  );
};
