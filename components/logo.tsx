import React from "react";

export const Logo = ({ className = "w-9 h-9", fill = "#1c1917", stroke = "white" }: { className?: string, fill?: string, stroke?: string }) => (
  <svg
    viewBox="0 0 256 256"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <rect width="256" height="256" rx="60" fill={fill} />
    <path
      d="M80 80L128 176L176 80"
      stroke={stroke}
      strokeWidth="24"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M80 144H176"
      stroke={stroke}
      strokeWidth="24"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
