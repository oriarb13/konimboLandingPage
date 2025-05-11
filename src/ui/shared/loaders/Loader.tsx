import React from "react";

interface LoaderProps {
  size?: number;
  color?: string;
}

const Loader: React.FC<LoaderProps> = ({ size = 50, color = "#82B841" }) => {
  return (
    <div
      className="loader"
      style={{
        width: `${size}px`,
        aspectRatio: "1",
        borderRadius: "50%",
        background: `
          radial-gradient(farthest-side,${color} 94%,#0000) top/8px 8px no-repeat,
          conic-gradient(#0000 30%,${color})
        `,
        WebkitMask:
          "radial-gradient(farthest-side,#0000 calc(100% - 8px),#000 0)",
        mask: "radial-gradient(farthest-side,#0000 calc(100% - 8px),#000 0)",
        animation: "loaderSpin 1s infinite linear",
      }}
    />
  );
};

export default Loader;
