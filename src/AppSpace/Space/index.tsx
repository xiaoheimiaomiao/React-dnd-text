import React, { CSSProperties, useContext, useMemo } from "react";
import classNames from "classnames";
import "./index.scss";
import { ConfigContext } from "./ConfigProvider";

export type SizeType = "small" | "middle" | "large" | number | undefined;

export interface SpaceProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  style?: React.CSSProperties;
  size?: SizeType | [SizeType, SizeType];
  direction?: "vertical" | "horizontal";
  align?: "start" | "end" | "center" | "baseline";
  split?: React.ReactNode;
  wrap?: boolean;
}

const spaceSize = {
  small: 8,
  middle: 16,
  large: 24,
};

function getNumberSize(size: SizeType) {
  return typeof size === "string" ? spaceSize[size] : size || 0;
}

const Space: React.FC<SpaceProps> = (props) => {
  const { space } = useContext(ConfigContext);

  const {
    className,
    style,
    direction = "horizontal",
    align,
    size = space?.size || "small",
    wrap = false,
    split,
    children,
    ...otherProps
  } = props;

  const childNodes = React.Children.toArray(props.children);

  // 根据direction align 来生成className
  const mergedAlign =
    direction === "horizontal" && align === undefined ? "center" : align;
  const cn = classNames(
    "space",
    `space-${direction}`,
    {
      [`space-align-${mergedAlign}`]: mergedAlign,
    },
    className
  );

  const nodes = childNodes.map((child: any, i) => {
    const key = (child && child.key) || `space-item-${i}`;
    return (
      <>
        <div className="space-item" key={key}>
          {child}
        </div>
        {i < childNodes.length && split && (
          <span className={`&{className}-split`} style={style}>
            {split}
          </span>
        )}
      </>
    );
  });

  const otherStyles: CSSProperties = {};

  const [horizontalSize, verticalSize] = useMemo(
    () =>
      ((Array.isArray(size) ? size : [size, size]) as [SizeType, SizeType]).map(
        (item) => getNumberSize(item)
      ),
    [size]
  );

  otherStyles.columnGap = horizontalSize;
  otherStyles.rowGap = verticalSize;

  if (wrap) {
    otherStyles.flexWrap = "wrap";
  }
  return (
    <div className={cn} style={{ ...otherStyles, ...style }} {...otherProps}>
      {nodes}
    </div>
  );
};

export default Space;
