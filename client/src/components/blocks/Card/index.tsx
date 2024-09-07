import React from "react";
import { ICardProps } from "./type";

const Card: React.FC<ICardProps> = ({
  children,
  className,
  type,
  key = "idi233242",
}) => {
  return (
    <>
      {type === "center" ? (
        <div className="flex items-center justify-center h-screen p-4">
          <div
            className={`${className} flex flex-col rounded-md md:w-[500px] shadow-2xl items-center p-6 pb-10 gap-4`}
          >
            {children}
          </div>
        </div>
      ) : (
        <div
          className={`${className}  rounded-md  shadow-2xl  p-6 pb-10 gap-4`}
          key={key}
        >
          {children}
        </div>
      )}
    </>
  );
};

export default Card;
