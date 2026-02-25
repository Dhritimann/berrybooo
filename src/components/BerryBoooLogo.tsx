import React from 'react';

export const BerryBoooLogo: React.FC<{ className?: string }> = ({ className = "w-10 h-10" }) => {
  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Berry cluster */}
      <g>
        {/* Main berry */}
        <circle cx="50" cy="55" r="22" fill="url(#berry-gradient-1)" />
        <circle cx="50" cy="55" r="22" fill="url(#berry-shine)" opacity="0.3" />
        
        {/* Left berry */}
        <circle cx="32" cy="58" r="16" fill="url(#berry-gradient-2)" />
        <circle cx="32" cy="58" r="16" fill="url(#berry-shine)" opacity="0.2" />
        
        {/* Right berry */}
        <circle cx="68" cy="58" r="16" fill="url(#berry-gradient-3)" />
        <circle cx="68" cy="58" r="16" fill="url(#berry-shine)" opacity="0.2" />
        
        {/* Top berry */}
        <circle cx="50" cy="35" r="14" fill="url(#berry-gradient-1)" />
        <circle cx="50" cy="35" r="14" fill="url(#berry-shine)" opacity="0.25" />
        
        {/* Leaves */}
        <path
          d="M 45 25 Q 40 15 35 20 Q 38 25 45 28 Z"
          fill="url(#leaf-gradient)"
        />
        <path
          d="M 55 25 Q 60 15 65 20 Q 62 25 55 28 Z"
          fill="url(#leaf-gradient)"
        />
        <path
          d="M 50 22 Q 50 10 50 15 Q 50 20 50 25 Z"
          fill="url(#leaf-gradient)"
        />
        
        {/* Berry seeds/dots */}
        <circle cx="48" cy="52" r="1.5" fill="#8B4513" opacity="0.6" />
        <circle cx="52" cy="54" r="1.5" fill="#8B4513" opacity="0.6" />
        <circle cx="50" cy="58" r="1.5" fill="#8B4513" opacity="0.6" />
        <circle cx="46" cy="56" r="1.5" fill="#8B4513" opacity="0.6" />
        <circle cx="54" cy="57" r="1.5" fill="#8B4513" opacity="0.6" />
        
        <circle cx="30" cy="56" r="1.2" fill="#8B4513" opacity="0.5" />
        <circle cx="34" cy="59" r="1.2" fill="#8B4513" opacity="0.5" />
        
        <circle cx="66" cy="56" r="1.2" fill="#8B4513" opacity="0.5" />
        <circle cx="70" cy="59" r="1.2" fill="#8B4513" opacity="0.5" />
        
        <circle cx="48" cy="34" r="1" fill="#8B4513" opacity="0.5" />
        <circle cx="52" cy="36" r="1" fill="#8B4513" opacity="0.5" />
      </g>
      
      {/* Gradients */}
      <defs>
        <radialGradient id="berry-gradient-1" cx="0.3" cy="0.3" r="0.8">
          <stop offset="0%" stopColor="#E63946" />
          <stop offset="100%" stopColor="#A4133C" />
        </radialGradient>
        
        <radialGradient id="berry-gradient-2" cx="0.3" cy="0.3" r="0.8">
          <stop offset="0%" stopColor="#F72585" />
          <stop offset="100%" stopColor="#B5179E" />
        </radialGradient>
        
        <radialGradient id="berry-gradient-3" cx="0.3" cy="0.3" r="0.8">
          <stop offset="0%" stopColor="#7209B7" />
          <stop offset="100%" stopColor="#560BAD" />
        </radialGradient>
        
        <linearGradient id="leaf-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#52B788" />
          <stop offset="100%" stopColor="#2D6A4F" />
        </linearGradient>
        
        <radialGradient id="berry-shine" cx="0.3" cy="0.3" r="0.5">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="100%" stopColor="#FFFFFF" opacity="0" />
        </radialGradient>
      </defs>
    </svg>
  );
};
