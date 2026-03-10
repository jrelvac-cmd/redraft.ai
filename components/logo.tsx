import React from "react";

export const Logo = ({ className = "w-9 h-9" }: { className?: string }) => (
  <svg
    viewBox="0 0 256 256"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <rect width="256" height="256" rx="60" fill="#0f172a" />
    <path
      d="M80 80L128 176L176 80"
      stroke="white"
      strokeWidth="24"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M80 144H176"
      stroke="white"
      strokeWidth="24"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
