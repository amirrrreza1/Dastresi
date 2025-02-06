import React from "react";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

export const PrevButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (props, ref) => {
    return (
      <button
        ref={ref}
        {...props}
        className="md:w-[40px] md:h-[40px] w-[25px] h-[25px] absolute z-10 right-0 top-1/2 transform -translate-y-1/2 p-1 rounded-full bg-white shadow-lg border border-gray-400 cursor-pointer hover:bg-gray-400"
      >
        <img
          src="/Images/SVG/ToRightArrow.svg"
          alt="toRightArrow"
          className="w-full h-full"
        />
      </button>
    );
  }
);

export const NextButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (props, ref) => {
    return (
      <button
        ref={ref}
        {...props}
        className="md:w-[40px] md:h-[40px] w-[25px] h-[25px] absolute z-10 left-0 top-1/2 transform -translate-y-1/2 p-1 rounded-full bg-white shadow-lg border border-gray-400 cursor-pointer hover:bg-gray-400"
      >
        <img
          src="/Images/SVG/ToLeftArrow.svg"
          alt="toLeftArrow"
          className="w-full h-full"
        />
      </button>
    );
  }
);
