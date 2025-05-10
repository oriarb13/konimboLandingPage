import React, { useEffect } from "react";

interface LoaderProps {
  size?: number;
  color?: string;
  className?: string;
}

const DotsLoader: React.FC<LoaderProps> = ({
  size = 12,
  color = "#FFF",
  className = "",
  ...props
}) => {
  useEffect(() => {
    const styleExists = document.getElementById("loader-styles");
    if (!styleExists) {
      const styleSheet = document.createElement("style");
      styleSheet.id = "loader-styles";
      styleSheet.textContent = `
        @keyframes animloader {
          0% { box-shadow: 14px 0 0 -2px, 38px 0 0 -2px, -14px 0 0 -2px, -38px 0 0 -2px; }
          25% { box-shadow: 14px 0 0 -2px, 38px 0 0 -2px, -14px 0 0 2px, -38px 0 0 -2px; }
          50% { box-shadow: 14px 0 0 -2px, 38px 0 0 -2px, -14px 0 0 2px, -38px 0 0 -2px; }
          75% { box-shadow: 14px 0 0 2px, 38px 0 0 -2px, -14px 0 0 -2px, -38px 0 0 -2px; }
          100% { box-shadow: 14px 0 0 -2px, 38px 0 0 2px, -14px 0 0 -2px, -38px 0 0 -2px; }
        }

        .loader {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          display: block;
          margin: 15px auto;
          position: relative;
          color: #FFF;
          box-sizing: border-box;
          animation: animloader 2s linear infinite;
        }
      `;
      document.head.appendChild(styleSheet);
    }
  }, []);

  return (
    <div
      className={`loader ${className}`}
      style={{
        width: `${size}px`,
        height: `${size}px`,
        color,
      }}
      {...props}
    />
  );
};

export default DotsLoader;
