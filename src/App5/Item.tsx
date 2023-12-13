import React, { FC } from "react";

export interface Itemtype {
  className?: string;
  children: React.ReactNode;
  index: number;
  direction?: "vertical" | "horizontal";
  marginDirection: "marginLeft" | "marginRight";
  split?: string | React.ReactNode;
  wrap: boolean;
}
const Item: FC<Itemtype> = (ItemProps) => {
  const {
    children,
    className,
    direction,
    index,
    marginDirection,
    split,
    wrap,
  } = ItemProps;
  // console.log("className: ", className);
  return <div className={className}>{children}</div>;
};
export default Item;
