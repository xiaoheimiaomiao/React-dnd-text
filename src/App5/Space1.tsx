import React, { Children, FC, ReactElement, ReactNode, useMemo } from "react";
import { isJsxFragment } from "typescript";
import { ConfigProvider } from "antd";
import Item from "./Item";
import classNames from "classnames";

export type SizeType = "small" | "middle" | "large";

export type SpaceSize = SizeType | number;

export interface SpaceType {
  align?: "start" | "end" | "center" | "baseline";
  direction?: "vertical" | "horizontal";
  size?: SpaceSize | [SpaceSize, SpaceSize];
  split?: ReactNode;
  wrap?: boolean;
  className?: string;
  style?: React.CSSProperties;
  children: any;
}

export interface Option {
  keepEmpty?: boolean;
}

// export function toArray(children: ReactNode, option: Option = {}) {
//   let ret: ReactElement[] = [];

//   Children.forEach(children, (child: any | any[]) => {
//     if ((child === undefined || child === null) && !option.keepEmpty) {
//       return;
//     }
//     if (Array.isArray(child)) {
//       console.log("Array.isArray(child): ", Array.isArray(child));
//       ret = ret.concat(toArray(child));
//     } else if (child.props) {
//       console.log("child.props: ", child.props);
//       ret = ret.concat(toArray(child.props.children, option));
//       console.log("ret: ", ret);
//     } else {
//       ret.push(child);
//     }
//   });
//   console.log("ret: ", ret);
//   return ret;
// }

const spaceSize = {
  small: 8,
  middle: 16,
  large: 24,
};

const getNumberSize = (size: SpaceSize) => {
  return typeof size === "string" ? spaceSize[size] : size || 0;
};

export const SpaceContext = React.createContext({
  // latestIndex: 0,
  // 水平size
  horizontalSize: 0,
  // 垂直size
  verticalSize: 0,
  // supportFlexGap: false,
});
const Space1: FC<SpaceType> = (props) => {
  const {
    getPrefixCls,
    space,
    direction: directionConfig,
  } = React.useContext(ConfigProvider.ConfigContext);
  const {
    children,

    className,
    direction = "horizontal",
    size = space?.size || "small",
    align,
    split,
    wrap = false,
  } = props;
  // console.log("children: ", children);
  // const childNodes = toArray(children, { keepEmpty: true });
  // console.log("childNodes: ", childNodes);

  const [horizontalSize, verticalSize] = useMemo(
    () =>
      (
        (Array.isArray(size) ? size : [size, size]) as [SpaceSize, SpaceSize]
      ).map((item) => getNumberSize(item)),
    [size]
  );
  // const supportFlexGap=useFlexGapSupport();
  const spaceContext = useMemo(
    () => ({
      horizontalSize,
      verticalSize,
    }),
    [horizontalSize, verticalSize]
  );
  console.log("horizontalSize: ", horizontalSize);
  console.log("verticalSize: ", verticalSize);

  const mergedAlign =
    align === undefined && direction === "horizontal" ? "center" : align;
  const prefixCls = getPrefixCls("space");
  const cn = classNames(
    prefixCls,
    `${prefixCls}-${direction}`,
    {
      // ant-space-gap-row-middle
      [`${prefixCls}-rtl`]: directionConfig === "rtl",
      [`${prefixCls}-align-${mergedAlign}`]: mergedAlign,
      // [`gap-x-4`]: horizontalSize,
    },
    className
  );

  const itemClassName = `${prefixCls}-item`;
  const marginDirection =
    directionConfig === "rtl" ? "marginLeft" : "marginRight";

  let latestIndex = 0;
  const nodes = children.map((child: any, index: number) => {
    if (child !== null && child !== undefined) {
      latestIndex = index;
    }
    const key = (child && child.key) || `${itemClassName}-${index}`;

    return (
      <Item
        className={itemClassName}
        key={key}
        direction={direction}
        index={index}
        marginDirection={marginDirection}
        split={split}
        wrap={wrap}
      >
        {child}
      </Item>
    );
  });
  // console.log("nodes: ", nodes);

  return (
    <div className={cn}>
      <SpaceContext.Provider value={spaceContext}>
        {nodes}
      </SpaceContext.Provider>
    </div>
  );
};
export default Space1;
// import React from "react";

// export default function Space1() {
//   return <div>Space1</div>;
// }
