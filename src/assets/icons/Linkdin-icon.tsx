import React from "react";

const LinkedInIcon = ({ width, height }: { width?: number; height?: number }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      width={width || 24}
      height={height || 24}
    >
      <path d="M4.98 3.5C4.98 4.88 3.88 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM.5 8h4V24h-4V8zm7.5 0h3.8v2.16h.05c.53-.98 1.84-2.01 3.79-2.01 4.05 0 4.8 2.66 4.8 6.11V24h-4v-7.9c0-1.89-.03-4.33-2.64-4.33-2.64 0-3.05 2.06-3.05 4.19V24h-4V8z" />
    </svg>
  );
};

export default LinkedInIcon;
